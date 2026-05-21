# Hook Learning Loop

Closed-loop analytics → hook-generation bias. Solves the ACO research finding from
`docs/ops/HANDOVER-2026-04-21-aco-video-stack.md`:
every viral-content system the research found ingests platform analytics and
feeds winning patterns back into prompt generation. This is that loop.

## Files

| File | Purpose |
|---|---|
| `learned.json` | Canonical snapshot of proven hook patterns. Consumed by `/hook` and `/talking-head-ship`. |
| `schema.json` | JSON-schema for `learned.json` — validation + editor autocomplete. |
| `README.md` | This file. |

## How it works

```
┌──────────────────┐     ┌──────────────────────┐     ┌──────────────┐
│ platform source  │ ──► │ scripts/hooks/       │ ──► │ learned.json │
│ (MCP or CSV)     │     │ reduce-weekly.mjs    │     │              │
└──────────────────┘     └──────────────────────┘     └──────┬───────┘
                                                             │
                                                             ▼
                                                   ┌─────────────────┐
                                                   │ /hook command   │
                                                   │ reads top-N     │
                                                   │ patterns        │
                                                   └─────────────────┘
```

## Sources (ranked by integration maturity)

1. **CSV manual** (today) — drop YouTube Studio / TikTok export CSV into
   `content/hooks/inbox/*.csv`, run `node scripts/hooks/reduce-weekly.mjs`.
2. **MCP YouTube Analytics** (`dogfrogfog/youtube-analytics-mcp`) — ranked
   install priority in the ACO handover. When installed, the reducer reads
   directly from the MCP.
3. **MCP TikTok insights** (not yet available as OSS MCP) — CSV until then.
4. **MCP LinkedIn analytics** (research showed no reliable OSS MCP) — CSV.

## Pattern lifecycle

- A pattern enters `learned.json` when it appears in ≥ 3 distinct posts AND
  beats baseline by ≥ 20% on the primary metric (CTR for YT, watch% for TT).
- `score` decays when last_observed is > 60 days ago.
- Patterns with `sample_size < 3` are suggestions, not instructions — `/hook`
  treats them as hypotheses to test.
- `do_not_use_if` entries prevent overfitting to one niche.

## Using in `/hook` command

The hook command reads the top 10 shipped patterns (by score) and injects them
as "proven patterns to lean on" in the generation prompt. It also reads the
`do_not_use_if` list and emits warnings when a generated hook matches an
anti-pattern.

## Not in scope (yet)

- Per-creator hook learning (this is Frank-specific today — multi-creator
  scoring requires a tenant dimension).
- Real-time scoring (weekly reduction is fine; compute cost matters more
  than recency for hook templates).
- Hook personalization by audience segment (v2 — needs cohort data).
