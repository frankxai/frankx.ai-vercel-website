# Sonnet 5 content swarm — 2026-07-01

Branch: `agent/claude/sonnet5-content-swarm` (worktree: `.worktrees/sonnet5-content-swarm`, based off `origin/main` @ 4848daf7)
Deploy gate: autonomous merge to main once guardians green (Frank's call, matches repo default doctrine).
Reporting: file-only, this doc + `progress-log.md` in this folder. No in-session check-ins requested.

## Why

Sonnet 5 shipped 2026-06-30 (Anthropic). Two goals converge:
1. Reflect it accurately in Research Hub / Model Arena, backed by real data (published benchmarks + a real in-harness eval run tonight, not invented numbers).
2. Audit site-wide copy for internal-ops language that leaked into public pages (Model Arena is patient zero — see finding below) and rewrite for the actual reader: AI architects, ambitious creators, founders. Confident and specific, not grandiose (repo brand voice explicitly bans "grandiose claims" / "self-help-guru tone" — holding that line even though tonight's brief leaned hype-ward).

## Scope tonight (tiered, per Frank's decision)

- **Tier 0 — full coverage, mechanical:** Haiku leak-scan across all content/blog/*.mdx (201 posts) + top-level app pages. Cheap, fast, catches internal jargon / broken links / unverified-claim red flags everywhere, not just priority pages.
- **Tier 1 — deep rewrite, ~20-25 pages:** homepage, about, Research Hub, Model Arena, pricing/offer, + whatever Tier 0 flags as worst offenders + cornerstone posts.
- **Tier 2 — backlog:** everything else Tier 0 didn't flag as broken, ranked, left for a follow-up session. Not silently dropped — tracked in `backlog.md`.

## Model routing (starlight-queen doctrine)

- **Haiku** — mechanical: leak-scan grep sweep, per-file validation (links, no fabricated claims, no internal jargon) after every rewrite.
- **Sonnet 5** — the workhorse: arena eval contestant, all Tier 1 rewrites, Research Hub refresh.
- **Opus 4.8** — one consolidated board pass at the end on the highest-stakes surfaces only (homepage, about, Research Hub, Model Arena + full diff skim). Not used per-file.

## Finding: Model Arena page is the leak example

`app/research/model-arena/page.tsx` + `data.ts`: exposes real internal file paths (`.agent/active-agents.md`), unexplained internal jargon ("substrate-gate," "governance-gated edit," "reservation registry," "6-Pillar CoE," "SIP"), zero plain-English framing for a first-time reader. Fixing this page is both a Tier 1 rewrite and the flagship proof-point for the whole audit.

## Sonnet 5 grounding (sourced, not invented)

Anthropic, released 2026-06-30. Default model for Free/Pro; available Max/Team/Enterprise.
- Agentic coding: 63.2% (Sonnet 5) vs 69.2% (Opus 4.8) vs 58.1% (Sonnet 4.6)
- Computer use (OSWorld-Verified): 81.2% vs Sonnet 4.6's 78.5%
- Knowledge work (GDPval-AA v2): 1,618 (Sonnet 5) vs 1,615 (Opus 4.8) — edges the flagship
- Pricing: $2/$10 per M tokens (in/out) through Aug 31, then $3/$15
- Safety: lower undesirable-behavior rate than predecessor; better prompt-injection resistance

Sources: [Anthropic](https://www.anthropic.com/news/claude-sonnet-5) · [TechCrunch](https://techcrunch.com/2026/06/30/anthropic-launches-claude-sonnet-5-as-a-cheaper-way-to-run-agents/) · [MarkTechPost](https://www.marktechpost.com/2026/06/30/anthropic-claude-sonnet-5-vs-sonnet-4-6-vs-opus-4-8-agentic-coding-benchmarks-api-pricing-and-cost-performance-tradeoffs-compared/)

Plan: cite these as "Published Benchmarks" (clearly external-sourced), PLUS run one real new in-harness round tonight (Sonnet 5 vs Opus 4.8, self-verifying tasks, mechanically graded) so the Arena's own "every claim traces to a receipt" standard holds for the new entry too.
