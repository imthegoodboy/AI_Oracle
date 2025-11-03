import { Card } from "@/components/ui/card";
import { Code, Book, Zap, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useRef, useState } from "react";

const Docs = () => {
  const sections = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of integrating AI Oracle into your project",
      contentByLang: {
        javascript: `import { AIOracle } from '@ai-oracle/sdk';
const oracle = new AIOracle(process.env.AI_ORACLE_API_KEY);
const result = await oracle.inference({ model: 'gpt-4o-mini', prompt: 'Analyze wallet 0x...' });`,
        python: `from ai_oracle import AIOracle
oracle = AIOracle(api_key=os.getenv('AI_ORACLE_API_KEY'))
result = oracle.inference({ 'model': 'gpt-4o-mini', 'prompt': 'Analyze wallet 0x...' })`,
        solidity: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract AIOracle { /* See full example below */ }`,
      },
    },
    {
      icon: Code,
      title: "Smart Contract Integration",
      description: "Connect AI to your Polygon smart contracts",
      contentByLang: {
        solidity: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
contract AIOracle is ChainlinkClient { /* see README for full impl */ }`,
        javascript: `// Off-chain: relay result back on-chain via oracle adapter`,
        python: `# Use your backend to bridge results via oracle adapter`,
      },
    },
    {
      icon: Zap,
      title: "API Reference",
      description: "Complete API documentation and endpoints",
      contentByLang: {
        javascript: `// POST /v1/inference\n// body: { model, prompt|text|image_url|... }\n// returns: { id, result, processing_time, cost }`,
        python: `# Same as JS; see SDK docs`,
        solidity: `// Contracts consume verified result emitted by oracle adapter`,
      },
    },
    {
      icon: Shield,
      title: "Security Best Practices",
      description: "Keep your integrations secure and reliable",
      contentByLang: {
        javascript: `// Keep keys server-side; validate inputs/outputs; cache and rate-limit`,
        python: `# Same as JS; rotate keys; sanitize outputs`,
        solidity: `// Validate oracle responses and add circuit breakers`,
      },
    },
  ];

  const [lang, setLang] = useState<"javascript" | "python" | "solidity">("javascript");
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const toc = useMemo(
    () => sections.map((s) => ({ id: s.title.toLowerCase().replace(/\s+/g, "-"), title: s.title })),
    [sections]
  );

  const scrollTo = (id: string) => {
    const el = refs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold">
              <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to integrate AI Oracle into your blockchain applications
            </p>
          </div>
          <div className="hidden md:block w-64" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8">
          {/* Main */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const id = section.title.toLowerCase().replace(/\s+/g, "-");
              return (
                <Card key={index} className="p-8 bg-gradient-card backdrop-blur-sm border-primary/20" ref={(el) => (refs.current[id] = el)}>
                  <div id={id} className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                      <p className="text-muted-foreground">{section.description}</p>
                    </div>
                  </div>

                  <Tabs value={lang} onValueChange={(v) => setLang(v as any)} className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="javascript">🟨 JavaScript</TabsTrigger>
                      <TabsTrigger value="python">🐍 Python</TabsTrigger>
                      <TabsTrigger value="solidity">🟪 Solidity</TabsTrigger>
                    </TabsList>
                    {(["javascript", "python", "solidity"] as const).map((l) => (
                      <TabsContent key={l} value={l} className="m-0">
                        <div className="prose prose-invert max-w-none">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs uppercase tracking-wide text-muted-foreground">{l}</span>
                          </div>
                          <pre className="bg-muted/30 p-4 rounded-lg overflow-x-auto text-sm border border-primary/20">
                            <code>{section.contentByLang?.[l] || "// Not available in this language"}</code>
                          </pre>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </Card>
              );
            })}

            {/* Built on Polygon */}
            <Card className="mt-12 p-8 bg-gradient-primary text-background">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Built on Polygon Network</h3>
                <p className="text-background/80 max-w-2xl mx-auto">
                  AI Oracle is optimized for Polygon, providing fast, low-cost AI inferences directly to your smart contracts.
                </p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="hidden md:block sticky top-24 h-[calc(100vh-8rem)]">
            <Card className="p-4 bg-gradient-card backdrop-blur-sm border-primary/20">
              <div className="text-sm font-semibold mb-3">On this page</div>
              <nav className="space-y-2">
                {toc.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="block w-full text-left px-2 py-1.5 rounded hover:bg-muted/30 text-sm"
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Language</div>
                <div className="flex gap-2">
                  {(["javascript", "python", "solidity"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-2 py-1 rounded text-xs border ${lang === l ? "border-primary/60" : "border-border/60"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Docs;
