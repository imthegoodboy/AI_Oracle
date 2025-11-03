import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Brain, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredModels } from "@/data/models";

type AIModel = Database["public"]["Tables"]["ai_models"]["Row"];

const Marketplace = () => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    const { data, error } = await supabase
      .from("ai_models")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setModels(data);
    }
    setLoading(false);
  };

  const getModelIcon = (type: string) => {
    return <Brain className="w-5 h-5" />;
  };

  // Merge Supabase models with featured models for display
  const combinedModels = useMemo(() => {
    const normalizedDb = models.map((m) => ({
      id: m.id,
      model_type: m.model_type,
      model_name: m.model_name,
      description: m.description || "",
      response_time_ms: m.response_time_ms || undefined,
      accuracy_rate: m.accuracy_rate || undefined,
      price_per_inference: Number(m.price_per_inference),
      source: "db" as const,
    }));

    const normalizedFeatured = featuredModels.map((m) => ({
      id: m.id,
      model_type: m.modelType,
      model_name: m.modelName,
      description: m.description,
      response_time_ms: m.responseTimeMs,
      accuracy_rate: m.accuracyRate,
      price_per_inference: m.pricePerInference,
      source: "featured" as const,
    }));

    const map = new Map<string, typeof normalizedFeatured[number]>();
    [...normalizedFeatured, ...normalizedDb].forEach((m) => {
      if (!map.has(m.id)) map.set(m.id, m);
    });
    return Array.from(map.values());
  }, [models]);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold">
            AI Model <span className="gradient-text">Marketplace</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse and integrate powerful AI models into your smart contracts
          </p>
        </div>

        {/* Models Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading models...</p>
          </div>
        ) : combinedModels.length === 0 ? (
          <Card className="p-12 text-center bg-gradient-card backdrop-blur-sm border-primary/20">
            <Brain className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
            <h3 className="text-xl font-bold mb-2">No Models Available Yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to register as an AI provider and add your models!
            </p>
            <a href="/provider-dashboard">
              <Button className="bg-gradient-primary">Become a Provider</Button>
            </a>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {combinedModels.map((model) => (
              <Card
                key={model.id}
                className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 card-glow"
              >
                <div className="space-y-4">
                  {/* Icon and Type */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      {getModelIcon(String(model.model_type))}
                    </div>
                    <Badge variant="outline" className="border-primary/50">
                      {String(model.model_type)}
                    </Badge>
                  </div>

                  {/* Model Info */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{model.model_name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {model.description || "No description available"}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Zap className="w-4 h-4" />
                        Response
                      </div>
                      <div className="font-bold">{model.response_time_ms || "N/A"}ms</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Star className="w-4 h-4" />
                        Accuracy
                      </div>
                      <div className="font-bold">{model.accuracy_rate || "N/A"}%</div>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <div className="text-sm text-muted-foreground">Price per inference</div>
                      <div className="text-2xl font-bold text-primary">
                        ${model.price_per_inference}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/marketplace/${model.id}`}>
                        <Button size="sm" className="bg-gradient-primary">Use Model</Button>
                      </Link>
                      <Link to={`/docs/models/${model.id}`}>
                        <Button size="sm" variant="outline" className="border-primary/50">View Docs</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
