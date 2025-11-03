import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Marketplace from "./pages/Marketplace";
import Pricing from "./pages/Pricing";
import Docs from "./pages/Docs";
import ProviderDashboard from "./pages/ProviderDashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import NotFound from "./pages/NotFound";
import ModelDetails from "./pages/ModelDetails";
import ModelDocs from "./pages/ModelDocs";
import ApiKeys from "./pages/ApiKeys";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/api-keys" element={<ApiKeys />} />
              <Route path="/marketplace/:id" element={<ModelDetails />} />
              <Route path="/docs/models/:id" element={<ModelDocs />} />
              <Route path="/provider-dashboard" element={<ProviderDashboard />} />
              <Route path="/developer-dashboard" element={<DeveloperDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
