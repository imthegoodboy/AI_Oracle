import { useParams, Link } from "react-router-dom";
import { featuredModels } from "@/data/models";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ModelDocs = () => {
  const { id } = useParams();
  const model = featuredModels.find((m) => m.id === id);

  if (!model) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-card backdrop-blur-sm border-primary/20">
            <h2 className="text-2xl font-bold mb-2">Documentation not found</h2>
            <p className="text-muted-foreground mb-6">Please go back and choose another model.</p>
            <Link to="/docs">
              <Button className="bg-gradient-primary">Back to Docs</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{model.modelName} Docs</h1>
          <p className="text-muted-foreground">Topic-wise documentation to integrate and use this model.</p>
        </div>

        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <div className="prose prose-invert max-w-none">
            <pre className="bg-muted/30 p-4 rounded-lg overflow-x-auto text-sm"><code>{model.docs.overview}</code></pre>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Setup</h2>
          <div className="prose prose-invert max-w-none">
            <pre className="bg-muted/30 p-4 rounded-lg overflow-x-auto text-sm"><code>{model.docs.setup}</code></pre>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
          <h2 className="text-2xl font-bold mb-4">API</h2>
          <div className="prose prose-invert max-w-none">
            <pre className="bg-muted/30 p-4 rounded-lg overflow-x-auto text-sm"><code>{model.docs.api}</code></pre>
          </div>
        </Card>

        <div className="flex gap-4">
          <Link to={`/marketplace/${model.id}`}>
            <Button variant="outline" className="border-primary/50">Back to Model</Button>
          </Link>
          <Link to="/developer-dashboard">
            <Button className="bg-gradient-primary">Use this Model</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModelDocs;


