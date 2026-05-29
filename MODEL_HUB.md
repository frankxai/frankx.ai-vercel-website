# Generative Model Hub — Architecture & Maintenance

*Last updated 2026-05-29 · Owner: FrankX Intelligence Pipeline · Surfaces: `/llm-hub`, `/models`*

## What this is

A two-layer intelligence system over the entire generative-AI model landscape — **text + image + video + audio/music + voice + embeddings + world models** — built for humans *and* agents.

- **`/llm-hub`** — the text & reasoning vertical (LLMs). Shipped first; deepest.
- **`/models`** — the umbrella hub covering *every modality*, with per-category hubs and per-model pages.

This is the **decision layer**, not a generation engine. The generation engine already exists in the ecosystem (`frankxai/arcanea-studio` — 200+ image/video/lipsync/cinema models via a proxy). We don't duplicate the doing; we own the *deciding*: which model for which job, why, with the receipts — and we make that intelligence consumable by AI agents.

## Why one site, not a new repo

Per the LLM Hub strategy (`LLM_HUB_STRATEGY.md`): never fragment domain authority. `/models` as a path on frankx.ai inherits the domain's authority; a separate repo/subdomain starts from zero. The generation engine (`arcanea-studio`) and the intelligence layer (this) are complementary, cross-linked, not merged.

## Architecture

```
data/model-registry.json            # text LLMs (source of truth, /llm-hub)
data/generative-model-registry.json # image/video/audio/voice/embedding/world (source of truth, /models)

lib/llm-hub/*                        # text helpers (shipped)
lib/models-hub/*                     # multimodal helpers (registry, categories, rows)

app/llm-hub/*                        # text hub + per-model + comparisons (shipped)
app/models/page.tsx                  # umbrella hub (all 7 categories)
app/models/[category]/page.tsx       # category hub (image, video, audio, voice, embedding, world)
app/models/[category]/[slug]/page.tsx# per-model page
app/models.json/route.ts            # agent-readable JSON
app/models/opengraph-image.tsx      # social card

components/models-hub/*              # CategoryCard, GenModelCard, GenModelExplorer, GenDecisionMatrix
```

### Categories (7)
text (→ /llm-hub) · image · video · audio (music) · voice (speech/TTS) · embedding · world

### Per-model schema (`generative-model-registry.json`)
`name · category · organization · released · status · io · license · tagline · best_for[] · watch_out · pricing_note · access[] · highlight · sources[]`

Multimodal models price per image/second/minute (not per token), so we use a human `pricing_note` + `access[]` (where to run it) rather than token pricing.

## SEO / AEO

- **Pillar:** `/models` (kw: "best generative ai models 2026", "ai model comparison").
- **Category hubs:** `/models/image` etc. (kw: "best ai image generator 2026", "best ai video model 2026").
- **Per-model:** `/models/image/imagen-4` (kw: "imagen 4 vs flux 2", "imagen 4 pricing").
- JSON-LD on every page (`ItemList`, `FAQPage`, `BreadcrumbList`, `SoftwareApplication`).
- Agent surfaces: `/models.json` + deep links in `/llms.txt`.
- Sitemap: every category + model auto-registered.

## Autonomous maintenance

The system maintains itself via:

- **Skill** `.claude/skills/model-intelligence/SKILL.md` — the single source of truth for *how* to keep both registries + hubs current.
- **Agent** (FrankX) `.claude/agents/model-intelligence-curator.md` — researches a new model (any modality), validates, updates the registry, refreshes the hub.
- **Command** (FrankX) `.claude/commands/new-gen-model.md` — `/new-gen-model <name>` end-to-end.

Add a model in **one place** (the registry) → hub, category page, model page, explorer, JSON endpoint, llms.txt, and sitemap all update.

## Data freshness & honesty

- Grounded in current (May 2026) public sources per category; vendor-reported figures labelled, pending reproduction.
- Sources cited per page and in `/models.json`.
- `pricing_note` and benchmark claims carry a "verify with provider" expectation — the landscape moves weekly.

## Roadmap

- Cross-modal "creator stacks" (music → video → thumbnail pipelines) — partially shipped on `/llm-hub`, extend to `/models`.
- Deep-link into `arcanea-studio` for one-click generation from a model page.
- Per-category comparison pages (`/models/compare/...`) mirroring `/llm-hub/compare`.
- Auto-flag stale entries (released > N months, status changes) for the curator agent.
