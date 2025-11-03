export type FeaturedModel = {
  id: string;
  modelName: string;
  modelType: "text" | "image" | "audio" | "multimodal";
  description: string;
  pricePerInference: number;
  responseTimeMs?: number;
  accuracyRate?: number;
  capabilities: string[];
  exampleUsage: {
    title: string;
    code: string;
    language: "javascript" | "solidity" | "python";
  }[];
  docs: {
    overview: string;
    setup: string;
    api: string;
  };
};

export const featuredModels: FeaturedModel[] = [
  {
    id: "gpt-4o-mini",
    modelName: "GPT-4o Mini (Text Intelligence)",
    modelType: "text",
    description:
      "Lightweight LLM for on-chain prompts: risk scoring, summarization, classification, and structured extraction.",
    pricePerInference: 0.05,
    responseTimeMs: 450,
    accuracyRate: 94.5,
    capabilities: [
      "Risk scoring for wallets",
      "Token and market summarization",
      "Toxicity and spam classification",
      "JSON structured extraction",
    ],
    exampleUsage: [
      {
        title: "JavaScript SDK",
        language: "javascript",
        code: `import { AIOracle } from '@ai-oracle/sdk';
const oracle = new AIOracle(process.env.AI_ORACLE_API_KEY);
const result = await oracle.inference({
  model: 'gpt-4o-mini',
  prompt: 'Score wallet 0xabc... for risk (0-100) and explain briefly',
});
console.log(result);`,
      },
      {
        title: "Solidity (request placeholder)",
        language: "solidity",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract UseAIOracle { /* See docs for Chainlink/Oracle integration */ }`,
      },
    ],
    docs: {
      overview:
        "GPT-4o Mini is ideal for low-latency, low-cost inference. Perfect for classification and summarization on-chain flows.",
      setup:
        "Install the SDK and set your AI_ORACLE_API_KEY. Configure webhooks for async results if needed.",
      api:
        "POST /v1/inference { model: 'gpt-4o-mini', prompt, parameters? } → { id, result, processing_time, cost }",
    },
  },
  {
    id: "vision-lite",
    modelName: "Vision Lite (Image Classifier)",
    modelType: "image",
    description:
      "Fast image classification and object tags for supply chain and NFT metadata automation.",
    pricePerInference: 0.15,
    responseTimeMs: 900,
    accuracyRate: 92.1,
    capabilities: [
      "Object and quality detection",
      "NSFW moderation",
      "Damage detection for shipments",
    ],
    exampleUsage: [
      {
        title: "JavaScript SDK",
        language: "javascript",
        code: `const result = await oracle.inference({
  model: 'vision-lite',
  image_url: 'https://example.com/photo.jpg',
  task: 'detect_objects'
});`,
      },
    ],
    docs: {
      overview:
        "Vision Lite provides robust image classification for enterprise and NFT use-cases with low latency.",
      setup:
        "Provide a public image_url or upload via signed URL. Results returned as JSON labels with confidence.",
      api:
        "POST /v1/inference { model: 'vision-lite', image_url, task } → { labels: [{name, confidence}] }",
    },
  },
  {
    id: "sentiment-alpha",
    modelName: "Sentiment Alpha (Market Sentiment)",
    modelType: "text",
    description:
      "Crypto-native sentiment model trained on market news, tweets, and on-chain chatter.",
    pricePerInference: 0.08,
    responseTimeMs: 500,
    accuracyRate: 90.4,
    capabilities: [
      "Bullish/Bearish scoring",
      "Topic extraction",
      "Signal generation for DeFi",
    ],
    exampleUsage: [
      {
        title: "JavaScript SDK",
        language: "javascript",
        code: `const result = await oracle.inference({
  model: 'sentiment-alpha',
  text: 'ETH is rallying after ETF approvals...'
});`,
      },
    ],
    docs: {
      overview:
        "Sentiment Alpha is optimized for short-form crypto text and offers a normalized score from -1 to +1.",
      setup:
        "Stream content to your backend, cache scores, and push verified aggregates on-chain via the oracle.",
      api:
        "POST /v1/inference { model: 'sentiment-alpha', text } → { score: -1..1, label }",
    },
  },
  {
    id: "price-predictor-x",
    modelName: "Price Predictor X (Time-series)",
    modelType: "text",
    description: "Lightweight model for short-horizon asset price movement signals.",
    pricePerInference: 0.12,
    responseTimeMs: 620,
    accuracyRate: 88.3,
    capabilities: ["Short-term price signal", "Volatility tagging", "Confidence scoring"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'price-predictor-x', symbol: 'MATIC', horizon: '1h' });` }],
    docs: { overview: "Generates short-horizon signals for assets.", setup: "Pass symbol and horizon.", api: "POST /v1/inference { model, symbol, horizon } → { signal, confidence }" },
  },
  {
    id: "toxicity-guard",
    modelName: "Toxicity Guard (Moderation)",
    modelType: "text",
    description: "Content moderation for spam, harassment, and NSFW text.",
    pricePerInference: 0.03,
    responseTimeMs: 300,
    accuracyRate: 95.2,
    capabilities: ["Spam detection", "Hate/harassment", "NSFW text"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'toxicity-guard', text: '...' });` }],
    docs: { overview: "Fast moderation for social dApps.", setup: "Send text field.", api: "POST /v1/inference { model: 'toxicity-guard', text } → { label, scores }" },
  },
  {
    id: "address-risk-lite",
    modelName: "Address Risk Lite (On-chain)",
    modelType: "text",
    description: "Wallet risk scoring using on-chain heuristics.",
    pricePerInference: 0.09,
    responseTimeMs: 700,
    accuracyRate: 89.4,
    capabilities: ["Risk score 0-100", "Flag reason", "Heuristics"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'address-risk-lite', address: '0x...' });` }],
    docs: { overview: "Quick risk checks for wallets.", setup: "Provide EVM address.", api: "POST /v1/inference { model, address } → { score, reasons[] }" },
  },
  {
    id: "vision-quality",
    modelName: "Vision Quality (Defects)",
    modelType: "image",
    description: "Detects product defects and quality issues from images.",
    pricePerInference: 0.22,
    responseTimeMs: 1100,
    accuracyRate: 91.7,
    capabilities: ["Defect tags", "Quality pass/fail", "Confidence"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'vision-quality', image_url: 'https://...' });` }],
    docs: { overview: "Quality control for supply chains.", setup: "Provide image_url.", api: "POST /v1/inference { model, image_url } → { defects[], pass }" },
  },
  {
    id: "nft-metadata-gen",
    modelName: "NFT Metadata Gen (Text)",
    modelType: "text",
    description: "Generates fun, lore-friendly NFT attributes and descriptions.",
    pricePerInference: 0.06,
    responseTimeMs: 520,
    accuracyRate: 93.1,
    capabilities: ["Trait generation", "Lore description", "JSON output"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'nft-metadata-gen', theme: 'cyberpunk' });` }],
    docs: { overview: "Auto-generate NFT metadata.", setup: "Pass theme/topic.", api: "POST /v1/inference { model, theme } → { attributes[], description }" },
  },
  {
    id: "speech-lite",
    modelName: "Speech Lite (Audio → Text)",
    modelType: "audio",
    description: "Low-latency speech-to-text for voice dApps.",
    pricePerInference: 0.2,
    responseTimeMs: 1400,
    accuracyRate: 87.9,
    capabilities: ["Transcription", "Timestamps", "Language auto-detect"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'speech-lite', audio_url: 'https://...' });` }],
    docs: { overview: "Speech to text.", setup: "Provide audio_url.", api: "POST /v1/inference { model, audio_url } → { text }" },
  },
  {
    id: "face-verify",
    modelName: "Face Verify (KYC)",
    modelType: "image",
    description: "Face match and liveness checks for identity flows.",
    pricePerInference: 0.35,
    responseTimeMs: 1600,
    accuracyRate: 96.2,
    capabilities: ["Liveness", "Match score", "Spoof detection"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'face-verify', selfie_url: 'https://...', id_url: 'https://...' });` }],
    docs: { overview: "Basic KYC checks.", setup: "Provide selfie and id images.", api: "POST /v1/inference { model, selfie_url, id_url } → { match, score }" },
  },
  {
    id: "topic-extractor",
    modelName: "Topic Extractor (NLP)",
    modelType: "text",
    description: "Extracts key topics and entities from text.",
    pricePerInference: 0.04,
    responseTimeMs: 380,
    accuracyRate: 92.8,
    capabilities: ["Topics", "Entities", "Keywords"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'topic-extractor', text: '...' });` }],
    docs: { overview: "NLP topic extraction.", setup: "Send text.", api: "POST /v1/inference { model, text } → { topics[], entities[] }" },
  },
  {
    id: "summarizer-fast",
    modelName: "Summarizer Fast (LLM)",
    modelType: "text",
    description: "High-speed summarization for feed processing.",
    pricePerInference: 0.05,
    responseTimeMs: 300,
    accuracyRate: 90.2,
    capabilities: ["Brief summaries", "Bullet points", "Length control"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'summarizer-fast', text: '...' });` }],
    docs: { overview: "Quick summaries.", setup: "Send text and length.", api: "POST /v1/inference { model, text, length? } → { summary }" },
  },
  {
    id: "translation-lite",
    modelName: "Translation Lite (NLP)",
    modelType: "text",
    description: "Fast multi-language translation.",
    pricePerInference: 0.07,
    responseTimeMs: 410,
    accuracyRate: 91.5,
    capabilities: ["20+ languages", "Auto-detect", "Tone control"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'translation-lite', text: '...', target_lang: 'es' });` }],
    docs: { overview: "Translate content.", setup: "Provide text and target_lang.", api: "POST /v1/inference { model, text, target_lang } → { text }" },
  },
  {
    id: "image-captioner",
    modelName: "Image Captioner (Vision+Text)",
    modelType: "multimodal",
    description: "Generates descriptive captions for images.",
    pricePerInference: 0.18,
    responseTimeMs: 1200,
    accuracyRate: 89.9,
    capabilities: ["Alt text", "Rich captions", "Hashtag suggestions"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'image-captioner', image_url: 'https://...' });` }],
    docs: { overview: "Caption images.", setup: "Provide image_url.", api: "POST /v1/inference { model, image_url } → { caption }" },
  },
  {
    id: "code-classifier",
    modelName: "Code Classifier (DevSec)",
    modelType: "text",
    description: "Labels code snippets by language and flags secrets.",
    pricePerInference: 0.06,
    responseTimeMs: 520,
    accuracyRate: 90.6,
    capabilities: ["Language detect", "Secret detect", "Complexity estimate"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'code-classifier', code: '...' });` }],
    docs: { overview: "Classify code.", setup: "Send code field.", api: "POST /v1/inference { model, code } → { language, secrets[] }" },
  },
  {
    id: "doc-qa-lite",
    modelName: "Doc QA Lite (RAG)",
    modelType: "text",
    description: "Question answering over small docs using embeddings.",
    pricePerInference: 0.11,
    responseTimeMs: 800,
    accuracyRate: 88.8,
    capabilities: ["RAG over URLs", "Citations", "Confidence"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'doc-qa-lite', url: 'https://docs...' , question: '...' });` }],
    docs: { overview: "RAG QA.", setup: "Provide url(s) and question.", api: "POST /v1/inference { model, url, question } → { answer, sources[] }" },
  },
  {
    id: "agent-router",
    modelName: "Agent Router (Orchestrator)",
    modelType: "multimodal",
    description: "Routes tasks to the best specialist model and aggregates output.",
    pricePerInference: 0.25,
    responseTimeMs: 1500,
    accuracyRate: 93.4,
    capabilities: ["Routing", "Aggregation", "Audit trace"],
    exampleUsage: [{ title: "JavaScript SDK", language: "javascript", code: `await oracle.inference({ model: 'agent-router', task: { type: 'analyze', input: { text: '...' } } });` }],
    docs: { overview: "Meta-orchestrator for tasks.", setup: "Provide task object.", api: "POST /v1/inference { model, task } → { result, route }" },
  },
];


