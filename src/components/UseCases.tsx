import { Card } from "@/components/ui/card";
import { TrendingUp, Image, Gamepad2, MessageSquare, Shield, Landmark } from "lucide-react";

const useCases = [
  {
    icon: TrendingUp,
    title: "DeFi Intelligence",
    description: "Risk analysis, price predictions, and automated trading strategies powered by AI"
  },
  {
    icon: Image,
    title: "Dynamic NFTs",
    description: "Create evolving NFTs that change based on AI-generated content and analysis"
  },
  {
    icon: Gamepad2,
    title: "Gaming NPCs",
    description: "On-chain AI characters that interact and evolve using real AI models"
  },
  {
    icon: MessageSquare,
    title: "Content Moderation",
    description: "Decentralized social platforms with AI-powered content filtering"
  },
  {
    icon: Shield,
    title: "Identity Verification",
    description: "KYC and fraud detection using facial recognition and liveness checks"
  },
  {
    icon: Landmark,
    title: "Prediction Markets",
    description: "AI-driven odds and market analysis for decentralized betting platforms"
  }
];

const UseCases = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Real-World <span className="gradient-text">Use Cases</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock powerful AI capabilities across multiple blockchain applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card 
                key={index}
                className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 card-glow group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
