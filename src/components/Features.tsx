import { Card } from "@/components/ui/card";
import { Globe, Lock, Zap, DollarSign, CheckCircle2, GitBranch } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Cross-Chain",
    description: "Works seamlessly across Polygon, Ethereum, and other major blockchains"
  },
  {
    icon: Lock,
    title: "Trustless & Secure",
    description: "Decentralized verification ensures no single point of failure"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed with sub-second inference response times"
  },
  {
    icon: DollarSign,
    title: "Pay-Per-Use",
    description: "Only pay for the AI inferences you need, when you need them"
  },
  {
    icon: CheckCircle2,
    title: "Verified Results",
    description: "Multi-node consensus ensures accuracy and prevents manipulation"
  },
  {
    icon: GitBranch,
    title: "Scalable Network",
    description: "Anyone can become an AI provider and earn rewards"
  }
];

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Why Choose Our <span className="gradient-text">Network</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for developers, powered by decentralization
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
