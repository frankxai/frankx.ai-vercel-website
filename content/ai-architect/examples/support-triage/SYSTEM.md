# System architecture — support triage

One sentence: every inbound support email is classified, routed, and answered with a drafted reply
that a support agent approves before anything leaves the building.

Generated for goal: triage the inbound support inbox of a 40-person B2B software company.
Stage of record: decide · last updated 2026-08-23.

Fixture: this is a worked example shipped with the plugin. Paths, commands and outputs are the
example's definition, not a recording from a live repository.

## Boundary

| question | answer |
|---|---|
| in scope | classification, routing, macro retrieval, and a drafted reply attached as an internal note |
| out of scope | sending, ticket state, billing and contract answers, live chat, learning between runs |
| who operates it | the support lead runs it day to day; the platform engineer owns the deploy |
| who is accountable when it is wrong | the support agent who owns the destination queue, for anything a customer sees; the support lead, for routing quality |
| kill criterion | unedited send rate below one in three, or routing accuracy below 90 out of 100 on the weekly sample, measured 2026-10-04 (`00-frame.md`) |

Inputs crossing the boundary, with trust tier (T0 private local · T1 scoped project · T2 external
tools · T3 untrusted content):

| input | source | tier (T0-T3) | where it lands in the context window |
|---|---|---|---|
| ticket subject and body | the customer | T3 | data position, wrapped at `packages/prompt/src/build.ts:L27` |
| thread history | support platform | T3 | data position, same wrapper |
| customer plan tier | billing table | T1 | data position, typed field |
| retrieved macros | approved macro corpus | T1 | data position, labelled `<approved_macro>` |
| queue definitions | `fixtures/queues.yaml` | T1 | instruction position — operator-authored |

## The seven planes

Every plane has one named owner. A plane with no owner is where the next incident comes from.
One plane in this system has no owner, and that is why `gate.decisions` is red.

| # | plane | owns | the boundary below it | owner | evidence |
|---|---|---|---|---|---|
| 07 | `experience` | streaming partial work; letting a human interrupt or approve | human — approval and interruption live here or nowhere | support lead | `03-experience-blueprint.md`, flow 1, stage `agent review` |
| 06 | `observability` | every model call, tool call and token as one traceable run | evidence — below this line you are guessing | platform engineer | `apps/worker/src/queue.ts:L11` (queue depth alert); no run-level trace yet, gap `g3` in `01-discovery.md` |
| 05 | `evaluation` | deciding a change helped, before users do | correctness — the loop is only as good as what grades it | support lead | `06-evals/rubric.md` run log, 12 cases |
| 04 | `orchestration` | the shape: workflow, one loop, or many | privilege — the loop decides what gets called with real permissions | backend engineer | `apps/worker/src/triage.ts:L64` (exit condition in code) |
| 03 | `tools` | capability with schemas, scopes, an audit trail | `trust` — everything returned from here is untrusted input | backend engineer | `05-trust-boundary.md` tool table, six tools, one finding |
| 02 | `context` | the right tokens in the window, the rest out | relevance — retrieval failures arrive disguised as model failures | backend engineer | `apps/worker/src/retrieve.ts:L31` |
| 01 | `model` | reaching a model; surviving it being slow, wrong, or gone | vendor — swap cost is decided the day you build this | **unowned** | `rg -l "from ['\"](openai\|@anthropic-ai/sdk)" -tsrc` → 3 files |

The unowned plane is the model plane, and the evidence is the same grep that keeps the `model`
decision open: three modules import a provider SDK directly, so no single person owns the
fallback path, the cache key, or the spend line. Two feature teams each own their own call site
and neither owns the seam. Named fix in `review.md`, finding F1.

## The four decisions

Verdicts are `MADE` or `OPEN`. "I do not know" is `OPEN`. When several are `OPEN`, fix in this
order: `trust`, `run`, `loop`, `model`.

| id | decision | verdict | evidence pointer | deferral cost (dated) |
|---|---|---|---|---|
| model | model call seam — exactly one module knows a provider's name | OPEN | `rg -l "from ['\"](openai\|@anthropic-ai/sdk)" -tsrc` → 3 files: `packages/llm/src/client.ts`, `apps/worker/src/summarize.ts`, `apps/api/src/routes/reply-draft.ts` | three call sites to migrate, measured 2026-08-23; every feature added before the seam lands adds one more, and the fallback path cannot be written once until they collapse |
| loop | orchestration shape — fixed workflow, single loop, parallel or sequential sub-agents | MADE | `apps/worker/src/triage.ts:L64` — fixed workflow, exit condition is a step list with three attempts, no prompt-level stop instruction | — |
| trust | trust boundary — the line where retrieved text becomes labelled data | MADE | `packages/prompt/src/build.ts:L27` — ticket body wrapped as `<untrusted_ticket>` in the user message | — |
| run | long-run home — where an eleven-minute run lives | MADE | `apps/worker/src/queue.ts:L11` — queued worker; longest observed run 41 s against a 300 s request-scoped ceiling | — |

Accepted decision records for each `MADE` verdict live in `adr/`. `model` has no ADR, because it
has not been decided; an ADR claiming otherwise would be the exact failure this table exists to
prevent.

## Evidence pointers

The table the independent verifier re-runs in a fresh context. Every row is re-derivable from the
repository alone.

| id | claim | how to re-derive | observed on 2026-08-23 |
|---|---|---|---|
| `ev.model.seam` | more than one module knows a provider's name | `rg -l "from ['\"](openai\|@anthropic-ai/sdk)" -tsrc` | 3 files |
| `ev.loop.exit` | the loop's exit condition is in code, not in a prompt | `rg -n "attempts >= 3" apps/worker/src/triage.ts` | 1 hit, L64 |
| `ev.trust.label` | untrusted ticket text is labelled before it reaches the model | `rg -n "untrusted_ticket" packages/prompt/src/build.ts` | 1 hit, L27 |
| `ev.trust.callers` | no call site skips the wrapper | `rg -l "buildPrompt\(" -tsrc` | 2 files, both importing `packages/prompt` |
| `ev.run.ceiling` | the long run does not sit in a request | `rg -n "enqueue\(" apps/api/src/routes/intake.ts` | 1 hit, L22 |
| `ev.tools.send` | the system holds no send capability | `rg -n "send_email" apps/worker/src/tools.ts` | 0 hits |
| `ev.evals.count` | the case set meets the gate's floor | `wc -l docs/architecture/06-evals/cases.jsonl` | 12 |

## Open questions

| question | why it matters | who can answer | by when |
|---|---|---|---|
| who owns the model plane | an unowned plane means no one owns the fallback, the cache key, or the spend line | head of engineering | before the seam work is scheduled |
| is the model provider a listed sub-processor | production traffic depends on it, design does not | head of engineering | before launch |
| what is the current first-reply-time series | it is the only honest baseline for the benefit half of `04-roi.md` | support lead | next cost review |

Generated by AI Architect · https://www.frankx.ai/ai-architect
