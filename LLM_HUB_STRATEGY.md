# LLM Hub Strategy — First Principles

*Last updated: 2026-05-20 · Owner: FrankX Intelligence Pipeline · Surface: `/llm-hub`*

## 1. The problem, stated honestly

There are already excellent places to get raw LLM data:

- **OpenRouter** — the inference marketplace. 300+ models behind one API, live per-token pricing, throughput/latency, usage-based rankings. Its data is about *inference economics and routing*. Moat: being the gateway.
- **Artificial Analysis** — the independent benchmark authority. Intelligence Index (composite of ~10 evals), independently measured speed/latency/price, 72-hour rolling data. Moat: trusted measurement infrastructure.
- **LMArena** — crowdsourced human-preference Elo. Moat: human preference signal at scale.
- **HuggingFace** — the open-model hub. Moat: weights + community.

A long tail of SEO content farms (clickrank, vertu, whatllm) simply *reposts* the above with affiliate links.

**We cannot and should not try to beat any of them at their own game.** We are not an inference gateway (so we can't out-OpenRouter OpenRouter), and we don't run evals 8×/day on our own infra (so we can't out-measure Artificial Analysis). Mirroring their tables makes us the 50th content farm.

## 2. The wedge — the decision layer

The raw-data sites answer *"what are the numbers?"* **Almost nobody answers *"for THIS job, pick THIS model — and here's the workflow."*** That gap is our wedge.

> **Positioning: FrankX LLM Hub is the decision layer on top of the raw data.**
> We cite OpenRouter (live pricing), Artificial Analysis (benchmarks), and LMArena (preference) as sources, and we add the four things they structurally don't:

1. **Task-first / capability-first navigation.** Not "browse 300 models" — "I want to generate video / ship an agent / write code" → here's the shortlist with real tradeoffs.
2. **The agentic-platform layer.** OpenRouter and AA cover *models*. Nobody systematically covers *agentic runtimes* — Claude Code vs Antigravity 2.0 vs Cursor vs Codex vs Gemini Spark. This is where builders and creators actually live, and it's genuinely under-covered by everyone.
3. **Curated editorial verdicts in the FrankX voice** — "what to actually do this week," from someone who ships with these tools daily. Honest about limitations (vendor benchmarks pending reproduction, etc.).
4. **A creator lens.** The data sites are dev/enterprise. We add music (Suno), image (nano-banana / Imagen 4), video (Omni / Veo / Sora), and writing — the stacks creators actually assemble.

## 3. Built for humans AND agents

This is a first-class design constraint, not an afterthought.

- **Humans** get a fast, scannable, sortable explorer + curated verdicts + comparison pages.
- **Agents** get the *same curated intelligence* as clean, structured surfaces:
  - `/llm-hub.json` — machine-readable registry + verdicts (ISR, 1h).
  - JSON-LD (`ItemList`, `FAQPage`, `BreadcrumbList`, per-model structured data).
  - Deep links in `/llms.txt` so agentic crawlers discover every model + comparison page.
  - Per-model and per-comparison pages that read cleanly as plaintext.

When an AI assistant is asked "which model should I use for X," our curated answer should be the one that's easy to cite — because it's structured, sourced, and dated.

## 4. Data strategy — enrich, don't mirror

We blend two layers:

- **Curated layer (source of truth):** `data/model-registry.json` — benchmarks, capability tags, agentic-platform mapping, editorial verdicts. This is *ours*, hand-maintained via `/new-model`, refreshed within 48h of every frontier release.
- **Live layer (attributed):** OpenRouter's public `GET /api/v1/models` (unauthenticated) — live per-token pricing + context + availability for models we map via `openrouterId`. Fetched server-side with ISR (1h), **graceful degradation** to static registry values if the API is unreachable. Always attributed: "live pricing via OpenRouter."

This is the honest version of "pull from them and do more on top": we enrich our editorial layer with their live economics, link back to them, and never present their data as our own measurement.

Future (not now): optionally layer Artificial Analysis figures where their terms permit, always attributed.

## 5. SEO / AEO architecture

**Subdomain decision: NO.** Per the repo's own rule ("never rename working URLs / structural changes need approval"), and from first principles: a subdomain (`llm.frankx.ai`) starts SEO authority from zero and dilutes the main domain. `/llm-hub` as a path on the established domain *inherits* frankx.ai's authority. Keep it a path. (If we ever spin a subdomain, it would be a deliberate, separate, approved decision — documented here so it isn't done by accident.)

**The programmatic SEO play — three page tiers:**

1. **Hub** `/llm-hub` — pillar page. Targets `llm provider comparison`, `best llm 2026`, `agentic ai platforms`.
2. **Per-model** `/llm-hub/[slug]` — e.g. `/llm-hub/gemini-3-5-flash`. Targets `gemini 3.5 flash benchmarks`, `gemini 3.5 flash pricing`. One authoritative, structured, dated page per model.
3. **Comparison** `/llm-hub/compare/[a-vs-b]` — e.g. `/llm-hub/compare/gemini-3-5-flash-vs-claude-opus-4-6`. Comparison queries are massive-volume, high-intent, and under-served by quality. This is the SEO goldmine. FAQ schema on each.

Internal link graph: hub ↔ model ↔ comparison ↔ blog ↔ research domain ↔ arena, all cross-linked. Each model page links its comparisons; each comparison links both model pages; everything links the I/O '26 blog and the research domain.

## 6. Why this is good for the business (not just traffic)

- **Authority compounding.** A continuously-fresh decision layer makes frankx.ai the place AI assistants cite for "which model." That's durable brand equity in the AEO era.
- **Funnel-honest.** The hub naturally surfaces ACOS (model routing), the research domain, and the consulting/products ladder — without being salesy. Helpfulness first.
- **Creator pull.** The creator-stack lens differentiates us from every dev-centric comparison site and connects to the existing Suno / music / visual-creation surfaces.
- **Low maintenance, high freshness.** One registry edit (via `/new-model`) propagates to the hub, every model page, every comparison, the JSON endpoint, llms.txt, and the sitemap. Add a model in one place; the whole surface updates.

## 7. Roadmap

**Shipped (this iteration):**
- Live OpenRouter pricing integration with graceful fallback.
- Sortable/filterable Model Explorer.
- Per-model pages (`/llm-hub/[slug]`) with structured data.
- Comparison pages (`/llm-hub/compare/[slug]`) — curated matchups.
- Creator-stack lens.
- Decision matrix ("pick your constraint → recommendation").
- Agent-readable `/llm-hub.json` + `/llms.txt` deep links.
- OG image, full sitemap coverage, sources & methodology section.

**Next:**
- Auto-open a `/new-model` PR when OpenRouter surfaces a model we don't track yet (freshness flywheel).
- Optional Artificial Analysis Intelligence Index column (attributed, terms permitting).
- Per-comparison OG images.
- "Saved stacks" — let creators export a chosen stack as a shareable card.

## 8. The one-line version

**Everyone else publishes the numbers. We publish the decision — for humans and agents, with the receipts.**
