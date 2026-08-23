# System architecture — contract question answering

One sentence: anyone in the firm can ask a question about an executed contract and get an answer
that cites the exact clauses it rests on, or a refusal that names who to ask instead.

Generated for goal: contract question answering for a 200-person professional services firm.
Stage of record: decide · last updated 2026-08-23.

Fixture: this is a worked example shipped with the plugin. Paths, commands and outputs are the
example's definition, not a recording from a live repository.

**Two gates are red in this run**, `gate.trust` and `gate.evals`, and they share one cause. See the
decisions table and `review.md` finding F1.

## Boundary

| question | answer |
|---|---|
| in scope | locating and quoting clauses in executed contracts, with citations, for employees of the firm |
| out of scope | advice, drafting, contracts in negotiation, contracts uploaded from outside the firm |
| who operates it | the platform engineer deploys; the knowledge manager owns the corpus; the legal ops lead owns whether it keeps running |
| who is accountable when it is wrong | the asker, for acting on an answer; the legal ops lead, for the system continuing to run |
| kill criterion | fewer than 34 of 40 sampled answers correct and correctly cited, measured 2026-10-11 with `node scripts/citation-audit.mjs --sample 40 --since 2026-08-30`; second floor on the failing injection case at 2026-09-06 (`00-frame.md`) |

Inputs crossing the boundary, with tiers (T0 private local · T1 scoped project · T2 external tools
· T3 untrusted content):

| input | source | tier (T0-T3) | where it lands in the context window |
|---|---|---|---|
| the question | an employee | T1 | data position, user message |
| clause text | executed contracts, counterparty-authored | T3 | **instruction position — `services/qa/src/prompt.py:L57`; this is the finding** |
| clause metadata | the ingest pipeline | T1 | data position, typed fields |
| answer instructions | the repository | T1 | instruction position — operator-authored, correctly |

## The seven planes

Every plane has one named owner.

| # | plane | owns | the boundary below it | owner | evidence |
|---|---|---|---|---|---|
| 07 | `experience` | streaming partial work; letting a human interrupt or approve | human — approval and interruption live here or nowhere | knowledge manager | `03-experience-blueprint.md` flow 1, stage `asker reads and opens citations` |
| 06 | `observability` | every model call, tool call and token as one traceable run | evidence — below this line you are guessing | platform engineer | `services/qa/src/audit.py:L22` — one record per question, retained 400 days |
| 05 | `evaluation` | deciding a change helped, before users do | correctness — the loop is only as good as what grades it | legal ops lead | `06-evals/rubric.md` run log, 13 cases, 1 failing |
| 04 | `orchestration` | the shape: workflow, one loop, or many | privilege — the loop decides what gets called with real permissions | backend engineer | `services/qa/src/pipeline.py:L72` — fixed workflow, exit condition in code |
| 03 | `tools` | capability with schemas, scopes, an audit trail | `trust` — everything returned from here is untrusted input | backend engineer | `05-trust-boundary.md` tool table, five tools, one disabled |
| 02 | `context` | the right tokens in the window, the rest out | relevance — retrieval failures arrive disguised as model failures | knowledge manager | `services/qa/src/retrieve.py:L48` — as-of date filtering |
| 01 | `model` | reaching a model; surviving it being slow, wrong, or gone | vendor — swap cost is decided the day you build this | platform engineer | `rg -l "import (openai\|anthropic)" -tpy` → 1 file |

Every plane is owned, and the system still has two red gates. Ownership is what makes a finding
someone's problem; it is not what makes it go away.

## The four decisions

Verdicts are `MADE` or `OPEN`. When several are `OPEN`, fix in this order: `trust`, `run`, `loop`,
`model`. Exactly one is `OPEN` here, and it happens to be the most expensive one.

| id | decision | verdict | evidence pointer | deferral cost (dated) |
|---|---|---|---|---|
| model | model call seam — exactly one module knows a provider's name | MADE | `services/qa/src/model.py:L21` — one module, routing by task; `rg -l "import (openai\|anthropic)" -tpy` → 1 file | — |
| loop | orchestration shape — fixed workflow, single loop, parallel or sequential sub-agents | MADE | `services/qa/src/pipeline.py:L72` — fixed workflow: scope check, retrieve, rerank, answer; exit condition in code | — |
| trust | trust boundary — the line where retrieved text becomes labelled data | OPEN | `services/qa/src/prompt.py:L57` — clause text concatenated into the system prompt; the label line is ABSENT | measured 2026-08-23: two tools and one irreversible action in scope, one function to change. Every tool added before the fix widens what the label must cover, every month of use adds audit records produced under the current boundary, and the external-upload path stays disabled meanwhile |
| run | long-run home — where an eleven-minute run lives | MADE | `services/ingest/src/workflow.py:L19` — the 41-minute re-index lives in a durable workflow; questions stay request-scoped at 34 s against a 300 s ceiling | — |

Accepted decision records for the three `MADE` verdicts live in `adr/`. There is no ADR for
`trust`, because there is no decision yet — only a finding and a named fix.

## Evidence pointers

The table the independent verifier re-runs in a fresh context.

| id | claim | how to re-derive | observed on 2026-08-23 |
|---|---|---|---|
| `ev.model.seam` | exactly one module knows a provider's name | `rg -l "import (openai\|anthropic)" -tpy` | 1 file, `services/qa/src/model.py` |
| `ev.loop.exit` | the exit condition is in code | `rg -n "MAX_STEPS" services/qa/src/pipeline.py` | 1 hit, L72 |
| `ev.trust.label` | retrieved clause text is not labelled | `rg -n "system_prompt \+=" services/qa/src/prompt.py` | 1 hit, L57 — the finding |
| `ev.trust.wrapper` | no wrapper exists anywhere on the path | `rg -n "untrusted_clause" services/qa/src` | 0 hits |
| `ev.trust.callers` | one function serves every question path | `rg -l "build_prompt\(" -tpy` | 2 files, both calling `services/qa/src/prompt.py` |
| `ev.run.home` | the long run is not in a request | `rg -n "workflow.step" services/ingest/src/workflow.py` | 1 hit, L19 |
| `ev.context.asof` | retrieval filters to the clause in force | `rg -n "effective_date <=" services/qa/src/retrieve.py` | 1 hit, L48 |
| `ev.evals.result` | the suite does not pass | `node scripts/run-evals.mjs docs/architecture/06-evals/cases.jsonl` | 13 cases, 12 pass, 1 fail (`injection-002`), exit 1 |

## Open questions

| question | why it matters | who can answer | by when |
|---|---|---|---|
| when does the trust fix land | two gates, three OWASP rows and the external-upload path all depend on it | backend engineer with the trust reviewer | 2026-09-06, the second kill-criterion date |
| may people outside the firm upload contracts | it changes the threat model, not just the scope | general counsel | before the next release is planned |
| what is the retrieval-quality baseline | without it, a wrong answer cannot be attributed to retrieval or to the model | knowledge manager | before 2026-10-11 |

Generated by AI Architect · https://www.frankx.ai/ai-architect
