# FrankX Content Strategy — June 2026 (current source of truth)

Supersedes earlier strategy notes. This is data-proven, not aspirational — it's built on the first real traffic capture (2026-W23) and the systems shipped since.

## The thesis (proven, not guessed)

**Search-intent, year-dated, comparison / "what-works-now" posts on the hottest AI tooling are the entire traffic engine.** Ten of the top thirteen pages by traffic are this exact shape (video-gen comparison #1 at 9%, prompt-engineering, frontier-models, Suno). Hub-polish and brand pages drew ~zero traffic. Attention comes from a *content library*, not from chrome.

Corollary: **the research hub punches above its weight** (`/research/agent-benchmarks` is #3). Benchmark/data content ranks.

## The flywheel

```
Comparison/AEO post ranks → captures frontier-name search traffic
   → refresh-queue keeps it factually current (facts decay fast)
   → affiliate layer monetizes via the recurring payers it recommends
   → traffic + revenue fund the next post
```

Three systems automate the loop, all sharing one traffic input (`docs/ops/analytics/traffic-latest.json`):
- **`/refresh-queue`** — ranks posts by `traffic × staleness` → fix the highest-traffic decaying post first.
- **`/affiliate-audit`** — ranks which programs to join + which posts to link (frontier LLMs pay nothing; monetize the adjacent recurring payers — Higgsfield first).
- **`/article-excellence`** — the 7-pass pipeline (research → architect → draft → multi-perspective critic panel → revise → gate → ship) for every flagship post.

## The AEO playbook (the quality bar)

The June 2026 `/seo-check` found the #1 systematic gap: **question-based H2s were missing sitewide.** Answer engines (ChatGPT, Perplexity, Gemini) extract question-headers + the direct answer beneath them. So every new article ships with:

1. **TL;DR answer box** in the first 100 words — a direct, citable answer.
2. **Every H2 is a real search query** ("What's the best X for Y?").
3. **One comparison/spec table** — the citation + conversion unit.
4. **FAQ, 5+ Q&A** with FAQPage schema.
5. `schema: ["Article", "FAQPage"]` + 3+ internal links + a defined reading goal.

This is enforced by `/article-excellence` and checked at the gate. It's not optional.

## The five pillars (topical authority)

Each pillar is a hub + 4-6 cluster posts that interlink. Backlog detail: `docs/ops/affiliate/CONTENT-BACKLOG.md`.

- **A. The Complete AI Coding Stack** — Cursor-vs-Claude-vs-Windsurf, Claude Code pricing, is-it-worth-it, beginners, local-LLM-for-coding → links to build-your-own-Jarvis.
- **B. The Faceless Creator AI Stack** — faceless-YouTube, ElevenLabs alternatives, HeyGen-vs-Synthesia, Shorts tools, cheap AI music. **Highest affiliate density.**
- **C. Run AI Privately on Your Machine** — local LLM by RAM, Ollama-vs-LMStudio, hardware, local-vs-cloud breakeven. Frank's 32GB-rig authority; low competition.
- **D. Get Cited by AI (the AEO Playbook)** — best AEO tools, AEO-vs-GEO-vs-SEO, structure-for-citation, schema, AI-visibility tracking. Compounds the whole blog's own citability.
- **E. Build a Personal AI CoE Under $100/mo** — the exact stack, cheapest frontier access, no-code agents, AI writer, presentation maker. **Strongest brand fit** — maps to the ACOS / Personal-AI-CoE narrative; affiliate links read as service, not promotion.

## Tonight's sprint (2026-06-06) — 10 articles

Built via parallel `/article-excellence` agents, AEO-structured, image needs documented for Grok/agy (`data/tools/image-needs.json`), validate heroes later:

1. faceless-youtube-ai-tools-2026 (Pillar B)
2. cursor-vs-claude-code-vs-windsurf-2026 (A)
3. claude-code-pricing-explained-2026 (A, AEO-citable)
4. best-elevenlabs-alternatives-2026 (B, AEO-citable)
5. suno-vs-udio-2026 (B)
6. best-no-code-ai-agent-builders-2026 (E)
7. heygen-vs-synthesia-vs-argil-2026 (B)
8. best-local-llm-2026 (C, AEO-citable)
9. cheapest-frontier-model-access-2026 (E, AEO-citable)
10. best-ai-presentation-maker-2026 (E, AEO-citable)

Plus the already-shipped flagship `best-ai-superpowers-stack-2026` (the tools+MCP directory) and the 4 fact-refreshed winners.

## The cadence

| When | Do |
|---|---|
| Sunday | `/refresh-queue` + `/affiliate-audit` (paste week's traffic first) → fix the top 🔴, link the top gap |
| Tue–Thu | `/article-excellence <backlog item>` — 2-3 flagship posts/week |
| Continuous | Pre-stage newsjack stubs (Claude Mythos, GPT-5.6, Veo 4) → publish day-of |
| Friday | Newsletter spotlights the week's best post |

## Metrics that matter

- Traffic share by post TYPE (comparison vs hub vs research) — confirm the pattern holds.
- AEO citations — does ChatGPT/Perplexity cite the post? (manual spot-check on the 5 AEO-citable ones).
- Affiliate: programs joined → `ourLink` set → links placed → first conversions.
- Refresh latency — days a 🔴 post sits stale before fix (target: same week).

## Anti-patterns

- ❌ Polishing hubs/chrome — proven zero-traffic. Spend nights on comparison content + refreshes.
- ❌ Question-less H2s — kills AEO. Every header is a query.
- ❌ Linking a tool you can't vouch for, or letting an affiliate link override the honest pick.
- ❌ Chasing frontier-LLM affiliate revenue — they pay nothing; capture their traffic, monetize the adjacents.
- ❌ Shipping a stale comparison post — facts decay in weeks; the refresh-queue is the guard.
