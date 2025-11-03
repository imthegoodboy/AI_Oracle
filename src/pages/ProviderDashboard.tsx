import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { TrendingUp, Users, Zap, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AIProvider = Database["public"]["Tables"]["ai_providers"]["Row"];

const ProviderDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<AIProvider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (user) {
      fetchProviderData();
    }
  }, [user, authLoading, navigate]);

  const fetchProviderData = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("ai_providers")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!error) {
      setProvider(data);
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!user) return navigate("/auth");
    const { data, error } = await supabase
      .from("ai_providers")
      .insert({
        user_id: user.id,
        provider_name: user.user_metadata?.full_name || "New Provider",
        description: "AI provider on AI Oracle Network",
        website: null,
        stake_amount: 0,
        total_requests: 0,
        successful_requests: 0,
        reputation_score: 0,
      })
      .select("*")
      .maybeSingle();

    if (!error) {
      setProvider(data as AIProvider);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Provider <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Manage your AI models and track earnings</p>
        </div>

        {!provider ? (
          <Card className="p-12 text-center bg-gradient-card backdrop-blur-sm border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Become an AI Provider</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Register as an AI provider to start earning rewards by providing AI inference services
            </p>
            <Button className="bg-gradient-primary" onClick={handleRegister}>Register as Provider</Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Earned</div>
                    <div className="text-2xl font-bold">${provider.stake_amount?.toFixed(2) || "0.00"}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Requests</div>
                    <div className="text-2xl font-bold">{provider.total_requests || 0}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                    <div className="text-2xl font-bold">
                      {provider.total_requests
                        ? ((provider.successful_requests / provider.total_requests) * 100).toFixed(1)
                        : 0}
                      %
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Reputation</div>
                    <div className="text-2xl font-bold">{provider.reputation_score?.toFixed(1) || "0.0"}</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Models Section */}
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your AI Models</h2>
                <Button className="bg-gradient-primary">Add New Model</Button>
              </div>
              <p className="text-muted-foreground text-center py-8">
                No models registered yet. Add your first AI model to start earning!
              </p>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <p className="text-muted-foreground text-center py-8">No recent activity</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
