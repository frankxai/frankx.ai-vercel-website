# Model & Agent Arena — Persistent Multi-Agent Team & Cross-Site Federation

**Date:** 2026-10-14
**Canonical Vertical:** `Starlight-Intelligence-System/verticals/model-agent-arena/`
**Lead Agent:** `starlight-evaluator`

---

## 1. Mission

Maintain `frankx.ai/llm-hub` and `frankx.ai/research/model-arena` as the estate's canonical, receipt-backed frontier model and agent intelligence authority, while syndicating verified manifests and receipts to `starlightintelligence.org`, `gencreator.ai`, `arcanea.ai`, and `starlight-command-center`.

## 2. Persistent 6-Seat Team Responsibilities in `frankx.ai-vercel-website`

| Seat | Agent ID | Files Owned in `frankx.ai-vercel-website` | Verification Command |
|------|----------|-------------------------------------------|----------------------|
| **1. Commander** | `starlight-evaluator` | `public/research/arena-receipts/*.json`, `data/model-arena/routing-verdicts.json` | `npm run test:intelligence-layer` |
| **2. Harvester** | `arena-harvester` | `data/model-registry.json`, `data/intelligence/external.json` | `npm run intelligence:check && npm run intelligence:validate` |
| **3. Runner** | `arena-runner` | `app/research/model-arena/data.ts`, Langfuse EU sync (`SIS/src/telemetry/langfuse.ts`) | `npm run test:intelligence-ingest` |
| **4. Visual Critic** | `arena-critic` | `components/intelligence/*.tsx`, `public/images/arena/*` (via CDP `:9223`) | `npm run type-check` |
| **5. Publisher** | `arena-publisher` | `lib/llm-hub/{editorial,decisions,comparisons,articles}.ts`, `content/blog/*-analysis-2026.mdx` | `npm run claims:audit:strict && npm run ai-slop:audit:strict` |
| **6. Federator** | `arena-federator` | `app/llm-hub/manifest.json/route.ts`, `app/research/model-arena/receipts.json/route.ts` | `npm run links:check:static` |

## 3. Adding a New Model (The 8-Step Checklist)

1. Add the model entry to `data/model-registry.json` with `verification_scope` on all vendor benchmarks.
2. Refresh `data/intelligence/external.json` (`npm run intelligence:validate`).
3. Add editorial guidance (`whyItMatters`, `useWhen`, `skipWhen`, `frankNote`) in `lib/llm-hub/editorial.ts`.
4. Update decision rules in `lib/llm-hub/decisions.ts` and head-to-head pairs in `lib/llm-hub/comparisons.ts`.
5. Run the Proving Ground harness (`Starlight-Intelligence-System/tools/arena/run-argon-eval.ts`) and commit the receipt JSON to `public/research/arena-receipts/`.
6. Update `data/model-arena/routing-verdicts.json` and `app/research/model-arena/data.ts`.
7. Author the deep-dive analysis MDX in `content/blog/<slug>-analysis-2026.mdx` and link it in `lib/llm-hub/articles.ts`.
8. Run `npm run intelligence:check`, `npm run test:intelligence-layer`, `npm run claims:audit:strict`, and `npm run ai-slop:audit:strict`.
