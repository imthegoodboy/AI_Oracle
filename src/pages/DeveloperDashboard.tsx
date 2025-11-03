import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Code, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

type InferenceRequest = Database["public"]["Tables"]["inference_requests"]["Row"];

const DeveloperDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<InferenceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (user) {
      fetchRequests();
    }
  }, [user, authLoading, navigate]);

  const fetchRequests = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("inference_requests")
      .select("*")
      .eq("developer_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data);
    }
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const totalSpent = requests.reduce((sum, req) => sum + Number(req.price), 0);
  const completedRequests = requests.filter((r) => r.status === "completed").length;
  const avgProcessingTime =
    requests.filter((r) => r.processing_time_ms).length > 0
      ? requests.reduce((sum, r) => sum + (r.processing_time_ms || 0), 0) /
        requests.filter((r) => r.processing_time_ms).length
      : 0;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Developer <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Request AI inferences and track your usage</p>
        </div>

        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Requests</div>
                  <div className="text-2xl font-bold">{requests.length}</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                  <div className="text-2xl font-bold">{completedRequests}</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Avg Time</div>
                  <div className="text-2xl font-bold">{Math.round(avgProcessingTime)}ms</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Code className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Spent</div>
                  <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                </div>
              </div>
            </Card>
          </div>

          {/* New Request Button */}
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Request AI Inference</h2>
                <p className="text-muted-foreground">
                  Browse the marketplace and request AI inferences for your smart contracts
                </p>
              </div>
              <Button className="bg-gradient-primary" onClick={() => navigate("/marketplace")}>
                Browse Models
              </Button>
            </div>
          </Card>

          {/* Recent Requests */}
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
            <h2 className="text-2xl font-bold mb-6">Recent Requests</h2>
            {requests.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No requests yet. Start by browsing the AI marketplace!
              </p>
            ) : (
              <div className="space-y-4">
                {requests.slice(0, 10).map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(request.status)}
                      <div>
                        <div className="font-medium">Request #{request.id.slice(0, 8)}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(request.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="border-primary/50">
                        {request.status}
                      </Badge>
                      <div className="text-right">
                        <div className="font-bold text-primary">${request.price}</div>
                        {request.processing_time_ms && (
                          <div className="text-sm text-muted-foreground">
                            {request.processing_time_ms}ms
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
