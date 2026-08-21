# AI architecture — working files

Planning material behind the `/ai-architecture` field guide. Neither file is publishable
copy, and neither should be cited as fact without the check described below.

| File | What it is | How much to trust it |
|---|---|---|
| `SEO-CONTENT-STRATEGY-2026-08.md` | Keyword/intent architecture, canonical-URL decision, the 12-piece series plan, link graph, publishing cadence. | Repo claims were verified by reading source on 2026-08-20. Search volumes come from the Semrush MCP (US database, same date) and are labelled inline. Two items are explicitly flagged unverifiable: SERP-competitor characterisation and the frankx.ai rank baseline. |
| `RESEARCH-BRIEF-2026-08-UNVERIFIED.md` | Landscape scan of 2026 agent/LLM architecture practice and the competitor set. | **Mixed provenance — read the tags.** Produced in a session behind a restrictive egress proxy, so most primary sources could not be read directly. Lines carry `[FETCHED]`, `[SEARCH]`, `[INFERENCE]`, or `UNVERIFIED`. The file's own "Unverified / could not confirm" section lists what must not be repeated. |

## What actually shipped on the page

Only two external claims are asserted on `/ai-architecture`, and both were read from
primary source on 2026-08-20 rather than taken from the brief:

- **MCP revision 2026-07-28** — read in full from the specification repository
  (`modelcontextprotocol/modelcontextprotocol`, `docs/specification/2026-07-28/changelog.mdx`).
- **OWASP GenAI LLM Top 10 2026**, published 2026-08-04 — entry list read from the
  project repository (`GenAI-Security-Project/GenAI-LLM-Top10`).

Everything the brief reported but could not trace to a primary source — the multi-agent
performance numbers, context-window reduction figures, model version identifiers, incident
counts — was deliberately left off the page. The "Contested ground" section states the
disagreements without repeating the numbers, because the numbers are the part that is not
reproducible.

## Freshness

The page prints the date its sources were last read. That date is a promise: when the
verification pass is redone, update `SOURCES_VERIFIED_ON` in
`components/ai-architecture/pillar/PillarGuide.tsx` and re-read both specifications. If the
pass slips, drop the printed date rather than letting it go stale.
