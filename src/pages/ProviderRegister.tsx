import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const ProviderRegister = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [providerName, setProviderName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.from("ai_providers").insert({
      user_id: user.id,
      provider_name: providerName || user.user_metadata?.full_name || "New Provider",
      website: website || null,
      description: description || "",
      stake_amount: 0,
      total_requests: 0,
      successful_requests: 0,
      reputation_score: 0,
    });
    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }
    navigate("/provider-dashboard");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8 bg-gradient-card backdrop-blur-sm border-primary/20">
          <h1 className="text-3xl font-bold mb-2">Register as Provider</h1>
          <p className="text-muted-foreground mb-6">Create your provider profile to list AI models and start earning.</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="providerName">Provider Name</Label>
              <Input id="providerName" placeholder="Acme AI" value={providerName} onChange={(e) => setProviderName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website (optional)</Label>
              <Input id="website" type="url" placeholder="https://example.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your AI offerings" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            {error && <div className="text-sm text-red-400">{error}</div>}

            <div className="flex gap-3">
              <Button type="submit" className="bg-gradient-primary" disabled={submitting}>
                {submitting ? "Submitting..." : "Create Provider"}
              </Button>
              <Button type="button" variant="outline" className="border-primary/50" onClick={() => navigate("/provider-dashboard")}>Cancel</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProviderRegister;


