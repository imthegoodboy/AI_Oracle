import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for testing and small projects",
    features: [
      "100 free inferences/month",
      "Access to basic models",
      "Community support",
      "API access",
      "Standard response times",
    ],
  },
  {
    name: "Professional",
    price: "$99",
    description: "For growing projects and teams",
    features: [
      "10,000 inferences/month",
      "Access to all models",
      "Priority support",
      "Advanced API features",
      "Faster response times",
      "Custom integrations",
      "Analytics dashboard",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale deployments",
    features: [
      "Unlimited inferences",
      "Dedicated AI models",
      "24/7 premium support",
      "Custom model training",
      "SLA guarantees",
      "On-premise deployment",
      "Dedicated account manager",
      "Custom pricing",
    ],
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. Scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`p-8 bg-gradient-card backdrop-blur-sm transition-all duration-300 ${
                tier.popular
                  ? "border-primary/50 card-glow scale-105"
                  : "border-primary/20 hover:border-primary/40"
              }`}
            >
              {tier.popular && (
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  {tier.price}
                  {tier.price !== "Custom" && tier.price !== "Free" && (
                    <span className="text-lg text-muted-foreground">/month</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href={tier.price === "Custom" ? "/docs" : "/auth"}>
                <Button
                  className={`w-full ${
                    tier.popular ? "bg-gradient-primary" : "bg-primary/10 hover:bg-primary/20"
                  }`}
                >
                  {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </a>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-card backdrop-blur-sm border-primary/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Pay-as-you-go Pricing</h3>
            <p className="text-muted-foreground mb-6">
              All plans include pay-per-use pricing for inferences beyond your monthly quota:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <div className="font-bold">Text Models</div>
                <div className="text-sm text-muted-foreground">$0.01 - $0.10 per inference</div>
              </div>
              <div className="space-y-2">
                <div className="font-bold">Image Models</div>
                <div className="text-sm text-muted-foreground">$0.05 - $0.50 per inference</div>
              </div>
              <div className="space-y-2">
                <div className="font-bold">LLM Queries</div>
                <div className="text-sm text-muted-foreground">$0.10 - $1.00 per query</div>
              </div>
              <div className="space-y-2">
                <div className="font-bold">Custom Models</div>
                <div className="text-sm text-muted-foreground">Contact for pricing</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
