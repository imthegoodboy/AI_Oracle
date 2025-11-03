import { Card } from "@/components/ui/card";
import { Brain, Code2, Network } from "lucide-react";

const steps = [
  {
    icon: Brain,
    title: "AI Providers",
    description: "Register and stake tokens to offer AI models",
    features: [
      "Upload or connect your AI model",
      "Stake tokens to prove trust",
      "Earn rewards for accurate results"
    ],
    color: "primary"
  },
  {
    icon: Code2,
    title: "Developers",
    description: "Request AI inference for smart contracts",
    features: [
      "Access AI models via simple API",
      "Pay using $ORACLE tokens",
      "Get verified results on-chain"
    ],
    color: "secondary"
  },
  {
    icon: Network,
    title: "Oracle Network",
    description: "Decentralized verification and routing",
    features: [
      "Route requests to providers",
      "Verify and aggregate results",
      "Deliver trusted outputs on-chain"
    ],
    color: "primary"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three key participants power our decentralized AI oracle network
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="relative p-8 bg-gradient-card backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 card-glow group"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-${step.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 text-${step.color}`} />
                  </div>

                  {/* Step number */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 w-full">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-left">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
