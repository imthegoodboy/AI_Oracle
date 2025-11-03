-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'provider', 'developer');

-- Create enum for model types
CREATE TYPE public.model_type AS ENUM ('text', 'image', 'audio', 'video', 'multimodal');

-- Create enum for request status
CREATE TYPE public.request_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'disputed');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create ai_providers table
CREATE TABLE public.ai_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_name TEXT NOT NULL,
  description TEXT,
  website_url TEXT,
  stake_amount DECIMAL(20, 2) DEFAULT 0,
  reputation_score DECIMAL(5, 2) DEFAULT 0,
  total_requests INTEGER DEFAULT 0,
  successful_requests INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create ai_models table
CREATE TABLE public.ai_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES public.ai_providers(id) ON DELETE CASCADE,
  model_name TEXT NOT NULL,
  model_type model_type NOT NULL,
  description TEXT,
  version TEXT DEFAULT '1.0.0',
  price_per_inference DECIMAL(10, 4) NOT NULL,
  response_time_ms INTEGER,
  accuracy_rate DECIMAL(5, 2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create inference_requests table
CREATE TABLE public.inference_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  developer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  model_id UUID NOT NULL REFERENCES public.ai_models(id) ON DELETE RESTRICT,
  request_data JSONB NOT NULL,
  response_data JSONB,
  status request_status NOT NULL DEFAULT 'pending',
  price DECIMAL(10, 4) NOT NULL,
  processing_time_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  request_id UUID REFERENCES public.inference_requests(id) ON DELETE SET NULL,
  amount DECIMAL(20, 4) NOT NULL,
  transaction_type TEXT NOT NULL, -- 'payment', 'stake', 'reward', 'withdrawal'
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inference_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create function to check user role (security definer to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for ai_providers
CREATE POLICY "Anyone can view active providers"
  ON public.ai_providers FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Providers can manage own profile"
  ON public.ai_providers FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for ai_models
CREATE POLICY "Anyone can view active models"
  ON public.ai_models FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Providers can manage own models"
  ON public.ai_models FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.ai_providers
      WHERE ai_providers.id = ai_models.provider_id
      AND ai_providers.user_id = auth.uid()
    )
  );

-- RLS Policies for inference_requests
CREATE POLICY "Users can view own requests"
  ON public.inference_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = developer_id);

CREATE POLICY "Developers can create requests"
  ON public.inference_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = developer_id);

CREATE POLICY "Providers can view requests for their models"
  ON public.inference_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.ai_models
      JOIN public.ai_providers ON ai_models.provider_id = ai_providers.id
      WHERE ai_models.id = inference_requests.model_id
      AND ai_providers.user_id = auth.uid()
    )
  );

-- RLS Policies for transactions
CREATE POLICY "Users can view own transactions"
  ON public.transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own transactions"
  ON public.transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Assign default 'developer' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'developer');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_providers_updated_at
  BEFORE UPDATE ON public.ai_providers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_models_updated_at
  BEFORE UPDATE ON public.ai_models
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();