---
name: monday-intel
description: Weekly content intelligence sweep — outliers, hooks, demand validation → Notion ideas
---

# /monday-intel

Run the Monday intelligence stage of the Content Engine. Model: Sonnet 5.5 (`claude-sonnet-5-5`).

1. Load skills: `xpoz-intelligence`, `brand-voice`, `content-strategy`.
2. Xpoz sweep per pillar (AI architecture / creator systems / performance): top posts 7d, hook patterns, competitor outliers.
3. Sandcastles export review if provided; Higgsfield video-analysis on any competitor video >3x baseline.
4. Read `docs/strategy/search-research-budget.md`. Validate at most three selected long-form candidates against saved evidence first. Execute metered Semrush reports only after balance, tariff and aggregate authorized allowance are recorded; unknown means zero paid execution. Record cache hits, actual units or UNKNOWN, and partial/denied responses. Do not expand every candidate or retry quota failures.
5. File into Notion `Content Engine`: 3 long-form + 10 short candidates as `Idea`, each with evidence link, hook, pattern name, suggested platforms.
6. Write the weekly brief into Ops Log; flag the single highest-conviction candidate.
7. End: one-paragraph summary to Frank with the pick-list. He promotes Ideas → Validated; nothing advances without his pick.
