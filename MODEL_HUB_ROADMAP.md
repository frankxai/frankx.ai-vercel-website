# Model Hub — 90-Day Roadmap & ROI

*Decided 2026-05-29 · Re-decide every 30 days · Owner: Frank + curator agent*

## Decision

**Build out selectively.** Maintain aggressively (automation does the work), expand surgically (high-leverage adds only), stop chasing (no own evals, no subdomain, no blind-vote arena). Re-evaluate every 30 days against the metrics below.

## The leverage map

```
                 EFFORT (low)              EFFORT (high)
                 ─────────────────────────────────────────────
VALUE (high)  │  Tier 1 — DO              │  Tier 2 — CONSIDER
              │  • Comparison expansion   │  • Open-source registry repo
              │  • RSS / agent feeds      │  • AA Intelligence Index column
              │  • Newsletter integration │  • Stack-builder UI
              │  • AEO citation monitor   │
              ─────────────────────────────────────────────────
VALUE (low)   │  Tier 3 — DEFER           │  Tier 4 — NEVER
              │  • Per-comparison OG      │  • Own benchmark evals
              │  • Theme polish           │  • Subdomain migration
              │                           │  • LMArena blind-vote UI
```

## Tier 1 — DO (this month)

1. **Expand comparison pages 15 → ~35.** Each ranks for one "X vs Y" query. ~30 min per page. Targets:
   - LLMs: Opus 4.8 vs Opus 4.6, Opus 4.8 vs GPT-5.4, Sonnet 4.5 vs Haiku 4.5, Grok 4.1 vs Opus 4.8, DeepSeek vs Sonnet, Llama 4 vs DeepSeek, GPT-5.4 vs Gemini 3.5 Flash, Opus 4.8 vs Gemini 3.5 Pro
   - Multimodal: Suno vs Lyria, Cartesia vs Inworld, ElevenLabs Music vs Lyria, Wan vs Hailuo, Genie 3 vs Veo (concept), Cohere Embed vs Gemini Embedding
2. **RSS for "new model added"** at `/llm-hub.rss` and `/models.rss`. Perplexity, Feedly, and AI agents ingest RSS. Same source-of-truth registry — pure read. ~1h to build.
3. **Newsletter integration** — the AI Architect Newsletter skill (FrankX repo) already exists; just teach it to pull the latest `/llm-hub.json` and feature 1-2 new entries weekly. Composition cost only.
4. **AEO citation monitor** — once a week (cron), query a panel of AI assistants ("best LLM for agentic coding 2026", "compare Claude Opus 4.8 vs GPT-5.4") and log whether frankx.ai is cited. Free baseline; tells us if the AEO play is working.
5. **`/models/sources` page** — parallel to `/llm-hub/sources` for multimodal. ~1h, mirrors the existing component.

## Tier 1b — IN FLIGHT: starlight-eval integration

The SIS repo's **starlight-eval** project (separate session) extends SIS's "measured claims" philosophy to model evaluation — small, reproducible, task-specific evals on Frank's real workloads. This is the answer to our biggest honest-assessment gap (zero first-party measured numbers) **without** violating the "no generic public benchmark evals" stance: we don't compete with Artificial Analysis; we measure what only we can — FrankX's own tasks.

- Contract + schema: `data/evals/README.md` (shipped)
- Ingestion loader: `lib/evals/starlight.ts` (shipped, returns empty until first drop)
- Display wiring (sources tier `first-party measured`, model pages, arena rows, agent JSON): lands with the first result file
- The harness itself lives in the Starlight Intelligence System repo — division of labor documented in the contract

## Tier 2 — CONSIDER (if Tier 1 metrics validate)

1. **Open-source `frontier-model-registry` repo.** Move the JSON registries to a public MIT repo; the website imports them as a dependency. Becomes a "living awesome-list" — citation magnet for blogs, papers, downstream tooling. The website remains the curated/editorial layer. ~1 day.
2. **Artificial Analysis Intelligence Index column** — if their ToS permits scraping or they expose an API. Add a single column on `/llm-hub` and the arena showing the AA Intelligence Index per model. Independent measurement → real authority. ~1 day.
3. **Stack builder UI** — drag-pick 1 model per modality, save the stack with a shareable URL. Captures the creator workflow we already understand. ~2 days.
4. **Per-comparison OG images** — programmatic `opengraph-image.tsx` per `/llm-hub/compare/[slug]` and `/models/compare/[slug]`. Lifts social CTR. ~3h.

## Tier 3 — DEFER (after 90 days, only if metrics warrant)

- Multi-lingual versions (only if non-EN traffic > 10%)
- Community testimonials / "I picked X because Y"
- Per-model historical pricing chart
- Discord webhook on new-model commits

## Tier 4 — NEVER (deliberate)

- **Generic public benchmark evals** (re-running MMLU/SWE-bench style suites). Cost-prohibitive vs the decision-layer wedge; cite AA, LMArena, ARC Prize. *Refined 2026-06-10: first-party task-specific evals via starlight-eval are IN (Tier 1b) — measuring our own workloads is differentiation, not duplication.*
- **Subdomain migration.** Would fragment domain authority. `/llm-hub` and `/models` paths stay.
- **LMArena blind-vote UI.** Different product; not enough traffic to be meaningful; outside our positioning.
- **Pure content-farm comparison expansion** (>50 pages with thin coverage). Quality bar holds.

## Success metrics — review every 30 days

| Metric | 30-day target | 90-day target | Current |
|---|---|---|---|
| Models tracked | maintain 53 | 65+ (new releases) | 53 |
| Comparison pages | 15 → 25 | 35 | 15 |
| Models with `verification` block | 9 → 19 (all LLMs) | all 53 | 9/53 |
| Audit-flagged "stale" models | 39 → <15 | <10 | 39 |
| `/llm-hub/*` monthly visits | establish baseline | 2× baseline | unknown |
| AI assistant citations of frankx.ai | establish baseline | growing | unknown |
| Funnel: hub → product page CTR | establish baseline | 2-3% | unknown |

## Operating cadence

| Cadence | Action | Owner |
|---|---|---|
| Daily 07:00 UTC | OpenRouter pricing probe + redeploy on drift | Vercel cron |
| Weekly Mon 08:00 | Staleness audit → GitHub issue | Vercel cron + Action |
| Weekly | Curator agent processes audit issue (1-3 model refreshes) | model-intelligence-curator |
| Monthly | Comparison expansion pass (3-5 new pages) | Frank or curator |
| Monthly | AEO citation check + metric review | Frank |
| Quarterly | Re-decide this roadmap | Frank |

## The rule that overrides everything

If a new frontier model drops, `/new-model` or `/new-gen-model` runs same-day. The freshness flywheel is the core asset; everything else is downstream.

## What "world class" means for this surface, going forward

- Three-click max from "I need an answer about model X" to the answer.
- Every claim sourced.
- Updated within 48h of every frontier release.
- The honest provenance page is the trust signal.
- Agents can ingest the whole thing as clean JSON.

If we maintain that for 12 months, we are the place AI assistants cite. That is the real ROI — durable, compounding, and unbought-able.
