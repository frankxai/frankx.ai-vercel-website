# Model Hub — Honest Assessment

*Authored 2026-05-29 · Updated whenever the picture shifts*

This is the document the curator agent and any reviewer should read first. It's the truth about what's solid, what's weak, and what we'll fix — for both `/llm-hub` (text) and `/models` (multimodal).

## What's actually thought out and works

**Engineering.** Two registries → typed helpers → ISR pages → comparison pages → agent JSON → JSON-LD → sitemap → llms.txt, all driven from one source of truth per layer. Adding a model in the registry propagates everywhere. The build runs green at ~1,335 pages.

**Automation.** Daily Vercel cron probes OpenRouter for pricing drift and (with `VERCEL_DEPLOY_HOOK_MODELS` set) auto-redeploys ISR on > 5% drift. Weekly cron runs `runStalenessAudit()` over both registries. A GitHub Action turns the audit into a labelled issue. The audit logic was sanity-checked in a fresh Node process and correctly flagged 46/50 models (40 stale, 5 missing-sources, 1 preview-overdue) against the day's data — the system works; the data is what's behind.

**Decision layer positioning.** We don't try to out-OpenRouter OpenRouter or out-Artificial-Analysis AA. We cite them, link them, and add what they don't: task-first navigation, agentic-platform comparison, curated verdicts, creator-stack lens, agent-readable surfaces.

## Where it's genuinely weak

**1. The text-LLM data is two versions behind the frontier.** Audit findings as of 2026-05-29:
- **Claude Opus 4.8** shipped May 28, 2026 (Anthropic) with new benchmarks: agentic coding 69.2%, OSWorld 83.4%, GDPval 1890, AA Intelligence Index 61 (#1). Registry shows 4.6.
- **Claude Opus 4.7** existed between 4.6 and 4.8 — entirely missing from the registry.
- **GPT-5.4** has been GA since early March 2026 (75% OSWorld, 83% GDPval, 75.1% Terminal-Bench). Registry shows GPT-5.2 Pro.
- **GPT-5.5** also exists. Missing.
- **5/16 LLM entries have no `sources[]`** — Sonnet 4.5, Haiku 4.5, GPT-5.2 Pro, Gemini 3 Pro, Llama 4 Maverick. Violates the "every claim has a source" rule.

**2. Multimodal sources lean on aggregator blogs, not primary measurement.** 34/34 have sources, but the domain distribution is:

| Domain type | Count |
|---|---|
| Vendor primary (deepmind.google, suno.com, etc.) | 9 sources |
| Aggregator / comparison blogs (atlascloud, sureprompts, soloa, getaiperks, decrypt, tooldirectory, elephas, etc.) | 25+ sources |

Only 25/34 have at least one independent-ish source, and "independent" here often means a comparison blog, not measured eval data. We have **zero** independently measured benchmark numbers in the multimodal registry.

**3. "Arena" is currently a static radar, not a real arena.** `/ai-ops/models-2026` shows a benchmark radar of three hand-picked models with hardcoded scores. That's a visualization, not an arena. A real arena lets a human pick any two models and instantly see the head-to-head; that's what we'll build.

**4. No live, independently-measured numbers anywhere.** OpenRouter wiring exists but only refreshes pricing, not quality. Artificial Analysis publishes Intelligence Index v4.0 (GDPval-AA, τ²-Bench, Terminal-Bench Hard, SciCode, AA-LCR, etc.) — we cite them but don't ingest their numbers.

**5. Can't validate live integrations from the build sandbox.** OpenRouter, Artificial Analysis, GitHub API all return 403 in this environment (sandbox restriction). The cron endpoints will work in production Vercel; we can't prove it from here. The audit logic was directly executed and verified.

**6. Sora 2 is marked `legacy` (correct, deprecated April 2026), but we don't yet have its replacement on the OpenAI side.** The video category leans Google + Chinese labs; OpenAI is absent.

## What "world-class" actually means here

It's not "more models in the table." It's three concrete things:

1. **A real arena interface** — pick any two models, instantly see the head-to-head: spec deltas, benchmark deltas, pricing deltas, who wins what, and the verdict. Linked from every model page. This is the upgrade from "directory" to "arena."

2. **Honest provenance — visible.** Every model carries a `verification` block (last verified date + source quality). The UI shows a badge: ✅ independent, ⚠️ vendor-reported, 📝 aggregated. Builds trust at a glance.

3. **Live data where it matters.** The Vercel cron pulls pricing live (already wired). Adding Artificial Analysis Intelligence Index where reachable. A `/llm-hub/sources` page that shows freshness + provenance honestly.

## What we're shipping next (this work session)

- Registry refresh: Opus 4.8, Opus 4.7, GPT-5.4, GPT-5.5; fill missing sources; mark superseded models correctly.
- `verification` block added to the schema; UI badges on model cards.
- `/llm-hub/arena` — interactive side-by-side comparison picker (the actual arena).
- `/llm-hub/sources` — honest provenance + freshness dashboard, public.
- Cross-link the arena from every model page, the hub, and `/ai-ops/models-2026`.

## What stays on the roadmap (deliberate decisions)

- **We won't run our own evals.** Cost-prohibitive, low-leverage vs. the decision layer we're already differentiating on.
- **We won't build an LMArena-style blind-vote interface.** Different product, requires significant traffic to be meaningful.
- **We won't fragment to a subdomain.** Domain authority stays consolidated on frankx.ai.

## How to read this doc

If the audit issue mentions any of the items above, this is the rationale. If you're considering adding a model and want to know what "source quality" means, this is the standard.
