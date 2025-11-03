import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-ai-blockchain.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden neural-bg">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Decentralized AI Oracle Network</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">AI Intelligence</span>
              <br />
              Meets Blockchain
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg">
              Connect smart contracts with real-time AI models. Trustless, verifiable, and cross-chain AI inference for the decentralized web.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/auth">
                <Button size="lg" className="group bg-gradient-primary hover:opacity-90 transition-opacity">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="/docs">
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                  View Documentation
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">AI Providers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">10M+</div>
                <div className="text-sm text-muted-foreground">Inferences</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
            <img 
              src={heroImage} 
              alt="AI Blockchain Network" 
              className="relative rounded-2xl shadow-2xl border border-primary/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
