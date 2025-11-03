import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 neural-bg opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-card backdrop-blur-sm border border-primary/20 rounded-3xl p-12 md:p-16 text-center space-y-8 card-glow">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Join the Network</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Build with <span className="gradient-text">AI on Chain?</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start integrating powerful AI models into your smart contracts today. No setup required, pay as you go.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group bg-gradient-primary hover:opacity-90 transition-opacity">
                Start Building
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                Become a Provider
              </Button>
            </div>

            {/* Additional info */}
            <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div>
                <div className="text-2xl font-bold text-primary">$0.01</div>
                <div className="text-sm text-muted-foreground">Starting price per inference</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">5 mins</div>
                <div className="text-sm text-muted-foreground">Average integration time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support & uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
