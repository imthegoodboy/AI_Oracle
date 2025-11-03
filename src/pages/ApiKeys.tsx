import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, KeyRound, PlusCircle, Trash2 } from "lucide-react";

type ApiKey = {
  id: string;
  name: string;
  key: string;
  createdAt: string;
};

const STORAGE_KEY = "ai_oracle_api_keys";
const MAX_FREE_KEYS = 3;

const generateKey = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const segment = (len: number) => Array.from({ length: len }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return `aio_${segment(6)}-${segment(6)}-${segment(6)}-${segment(8)}`;
};

const ApiKeys = () => {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [name, setName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setKeys(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  }, [keys]);

  const canCreate = keys.length < MAX_FREE_KEYS && name.trim().length > 0;

  const handleCreate = () => {
    if (!canCreate) return;
    const newKey: ApiKey = {
      id: crypto.randomUUID(),
      name: name.trim(),
      key: generateKey(),
      createdAt: new Date().toISOString(),
    };
    setKeys([newKey, ...keys]);
    setName("");
  };

  const handleDelete = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  const remaining = useMemo(() => MAX_FREE_KEYS - keys.length, [keys.length]);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">API Keys</h1>
          <p className="text-muted-foreground">Create and manage your API keys. Free plan allows up to 3 keys.</p>
        </div>

        {/* Create */}
        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="keyName">API Name</Label>
              <Input id="keyName" placeholder="My dApp Backend" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <Button onClick={handleCreate} disabled={!canCreate} className="bg-gradient-primary">
              <PlusCircle className="w-4 h-4 mr-2" /> Create Key
            </Button>
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            Remaining free keys: <span className="font-medium">{Math.max(remaining, 0)}</span>
          </div>
        </Card>

        {/* List */}
        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Your Keys</h2>
            <Badge variant="outline" className="border-primary/50">{keys.length} / {MAX_FREE_KEYS}</Badge>
          </div>
          {keys.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <KeyRound className="w-10 h-10 mx-auto mb-3 opacity-60" />
              No API keys yet. Create your first key above.
            </div>
          ) : (
            <div className="space-y-4">
              {keys.map((k) => (
                <div key={k.id} className="p-4 rounded-lg border border-border/50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="space-y-1">
                    <div className="font-medium">{k.name}</div>
                    <div className="text-sm text-muted-foreground">Created {new Date(k.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="px-2 py-1 rounded bg-muted/30 text-sm">{k.key}</code>
                    <Button variant="outline" size="sm" className="border-primary/50" onClick={() => copyToClipboard(k.key, k.id)}>
                      <Copy className="w-4 h-4 mr-1" /> {copiedId === k.id ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-500/40 hover:bg-red-500/10" onClick={() => handleDelete(k.id)}>
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20">
          <h3 className="text-xl font-bold mb-2">Next steps</h3>
          <p className="text-muted-foreground mb-4">Use this API key with any model. Start from Marketplace or docs.</p>
          <div className="flex gap-3">
            <a href="/marketplace"><Button className="bg-gradient-primary">Browse Models</Button></a>
            <a href="/docs"><Button variant="outline" className="border-primary/50">View Documentation</Button></a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApiKeys;


