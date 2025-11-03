import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Polygon Badge Section */}
      <section className="py-12 relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4">
          <Card className="p-8 md:p-12 bg-gradient-primary text-background relative overflow-hidden">
            <div className="relative z-10 text-center space-y-4">
              <div className="inline-flex items-center gap-3 mb-4">
                <svg className="w-12 h-12" viewBox="0 0 38.4 33.5" fill="currentColor">
                  <path d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3c-0.7-0.4-1.2-1.2-1.2-2.1 v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7c0-0.8-0.4-1.6-1.2-2.1 l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2 l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5 c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1 v-9.5c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"/>
                </svg>
                <h2 className="text-4xl md:text-5xl font-bold">Polygon</h2>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Built on Polygon Network
              </h3>
              <p className="text-background/90 max-w-3xl mx-auto text-lg">
                AI Oracle is optimized for Polygon, delivering lightning-fast, low-cost AI inferences
                directly to your smart contracts. Leverage Polygon's industry-leading scalability
                and security for your next-generation AI-powered decentralized applications.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{"<"}1¢</div>
                  <div className="text-background/80 text-sm">Average transaction cost</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{"<"}2s</div>
                  <div className="text-background/80 text-sm">Block confirmation time</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-background/80 text-sm">Network uptime</div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="polygon-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <polygon points="10,0 20,10 10,20 0,10" fill="currentColor" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#polygon-pattern)"/>
              </svg>
            </div>
          </Card>
        </div>
      </section>

      <HowItWorks />
      <UseCases />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
