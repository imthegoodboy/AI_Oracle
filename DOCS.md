# AI Oracle Network – Product Documentation

This guide explains exactly what the app does, how to use it (step by step), and links to topic-wise documentation. Built on Polygon Network.

## 1) What the Web App Does
- Connects AI models with smart contracts so dApps can request AI inference (text, vision, sentiment) in a trustless, verifiable way.
- Marketplace for models; Provider and Developer dashboards; Docs and pricing.

## 2) Quick Start (3 Steps)
1. Create an account: Go to `Auth` → Sign up.
2. Browse models: Visit `Marketplace` → pick a model → View Docs or Use Model.
3. Integrate: Use the SDK/API to request inferences from your backend or smart contracts.

## 3) Built on Polygon
- Low fees (< 1¢), fast confirmation (< 2s), and Ethereum-grade security.

---

## Topic-wise Documentation

### A) Getting Started
- Sign up and obtain API key from `Developer Dashboard`.
- Install SDK:
```bash
npm install @ai-oracle/sdk
```
- First request (JavaScript):
```javascript
import { AIOracle } from '@ai-oracle/sdk';
const oracle = new AIOracle(process.env.AI_ORACLE_API_KEY);
const result = await oracle.inference({
  model: 'gpt-4o-mini',
  prompt: 'Analyze this wallet address for risk',
});
console.log(result);
```

### B) Smart Contract Integration (Polygon)
- Use an oracle pattern (e.g., Chainlink) to bridge off-chain inference results to your contracts.
- Example outline (see `Docs` in-app for full contract):
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract AIOracle { /* See in-app Docs for a complete example */ }
```

### C) API Reference (Core)
- POST /v1/inference: request AI inference
- GET /v1/models: list available models

### D) Models (Pre-available)
- GPT-4o Mini (Text): risk scoring, summarization, moderation, structured JSON
- Vision Lite (Image): object detection, NSFW moderation, shipment damage
- Sentiment Alpha (Text): crypto-native bullish/bearish scoring

Each model has its own page with:
- What it can do
- Example usage
- View Docs (per-model, topic-wise)

### E) Security & Best Practices
- Keep API keys server-side; rotate regularly
- Validate inputs/outputs; sanitize before on-chain use
- Rate limiting, caching, and webhooks recommended

---

## Step-by-Step (End-to-End)
1) Sign up → Get API key
2) Choose a model from `Marketplace`
3) Read the model's Docs → copy example code
4) Implement backend endpoint to call the SDK/API
5) If needed on-chain, wire an oracle pattern to deliver verified results to your contract on Polygon
6) Track usage and costs in `Developer Dashboard`

---

## Pages Overview
- `Home`: Overview, Polygon badge, CTA to Auth and Docs
- `Marketplace`: Featured + database models with Use Model and View Docs buttons
- `Docs`: Getting Started, Smart Contract Integration, API, Security
- `Docs / models / :id`: Per-model documentation (Overview, Setup, API)
- `Developer Dashboard`: Requests, stats, Browse Models CTA
- `Provider Dashboard`: Register models, earnings, reputation (coming with provider onboarding)
- `Pricing`: Tiers and pay-as-you-go; Get Started opens Auth

---

## Support
- Email: support@aioracle.network
- Discord: https://discord.gg/aioracle


