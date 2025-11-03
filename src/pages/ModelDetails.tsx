import { useParams, Link } from "react-router-dom";
import { featuredModels } from "@/data/models";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ModelDetails = () => {
  const { id } = useParams();
  const model = featuredModels.find((m) => m.id === id);

  if (!model) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-card backdrop-blur-sm border-primary/20">
            <h2 className="text-2xl font-bold mb-2">Model not found</h2>
            <p className="text-muted-foreground mb-6">Please go back and choose another model.</p>
            <Link to="/marketplace">
              <Button className="bg-gradient-primary">Back to Marketplace</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{model.modelName}</h1>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-primary/50 capitalize">{model.modelType}</Badge>
            <span className="text-sm text-muted-foreground">${model.pricePerInference} per inference</span>
            {model.responseTimeMs && (
              <span className="text-sm text-muted-foreground">{model.responseTimeMs}ms</span>
            )}
            {model.accuracyRate && (
              <span className="text-sm text-muted-foreground">{model.accuracyRate}%</span>
            )}
          </div>
          <p className="text-muted-foreground max-w-3xl">{model.description}</p>
        </div>

        {/* Capabilities */}
        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
          <h2 className="text-2xl font-bold mb-4">What it can do</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {model.capabilities.map((cap, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Examples */}
        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {model.exampleUsage.map((ex, i) => (
              <div key={i} className="space-y-2">
                <div className="font-semibold">{ex.title}</div>
                <pre className="bg-muted/30 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{ex.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Link to={`/docs/models/${model.id}`}>
            <Button variant="outline" className="border-primary/50">View Docs</Button>
          </Link>
          <Link to="/developer-dashboard">
            <Button className="bg-gradient-primary">Use this Model</Button>
          </Link>
          <Link to="/api-keys">
            <Button variant="outline" className="border-primary/50">Create API Key</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;


