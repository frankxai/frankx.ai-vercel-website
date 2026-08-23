# System architecture — personal AI centre of excellence

One sentence: one person's routine reading, sorting and recall runs as three scheduled loops on
their own machine, and every output is a draft that person reads before it becomes a decision.

Generated for goal: build a personal AI centre of excellence on the operator's own machine.
Stage of record: decide · last updated 2026-08-23.

Fixture: this is a worked example shipped with the plugin. Paths, commands and outputs are the
example's definition, not a recording from a live machine.

## Boundary

| question | answer |
|---|---|
| in scope | three scheduled loops, a local memory store, an ad-hoc session mode, all on one machine |
| out of scope | serving anyone else, cloud runtime, autonomous publishing, self-rewriting memory, ranking what matters |
| who operates it | the operator, who is also the only user |
| who is accountable when it is wrong | the operator; there is nobody else, and the design says so rather than implying a reviewer |
| kill criterion | brief opened on fewer than 20 of 30 days, measured 2026-09-22 with `node scripts/brief-open-rate.mjs --last 30`; or the weekly ledger costing over 30 minutes for three weeks running (`00-frame.md`) |

Inputs crossing the boundary, with tiers (T0 private local · T1 scoped project · T2 external tools
· T3 untrusted content):

| input | source | tier (T0-T3) | where it lands in the context window |
|---|---|---|---|
| local notes | `~/notes` | T0 | data position, labelled `<local_note>` at `packages/prompt/src/context.ts:L27` |
| long-term memory | `~/.coe/memory/` | T0 | data position, labelled `<memory>` |
| inbox export | other people | T3 | data position, labelled `<untrusted_message>` |
| fetched web pages | the open web | T3 | data position, labelled `<untrusted_web>` at `packages/prompt/src/context.ts:L33` |
| prompt files for each loop | the repository | T1 | instruction position — operator-authored |

## The seven planes

Every plane has one named owner. Here every owner is the same person, which is honest rather than
tidy: the table's job is to show which hat that person wears and where the bus factor is.

| # | plane | owns | the boundary below it | owner | evidence |
|---|---|---|---|---|---|
| 07 | `experience` | streaming partial work; letting a human interrupt or approve | human — approval and interruption live here or nowhere | operator, as reader | `03-experience-blueprint.md` flow 3, stage `operator promotes` |
| 06 | `observability` | every model call, tool call and token as one traceable run | evidence — below this line you are guessing | operator, as maintainer | `packages/loops/src/run.ts:L88` — one run-log line per run |
| 05 | `evaluation` | deciding a change helped, before users do | correctness — the loop is only as good as what grades it | operator, as maintainer | `06-evals/rubric.md` run log, 13 cases |
| 04 | `orchestration` | the shape: workflow, one loop, or many | privilege — the loop decides what gets called with real permissions | operator, as maintainer | `packages/loops/src/run.ts:L58` — token budget as the exit condition |
| 03 | `tools` | capability with schemas, scopes, an audit trail | `trust` — everything returned from here is untrusted input | operator, as maintainer | `05-trust-boundary.md` tool table, eight tools, two findings |
| 02 | `context` | the right tokens in the window, the rest out | relevance — retrieval failures arrive disguised as model failures | operator, as maintainer | `packages/prompt/src/context.ts:L33` |
| 01 | `model` | reaching a model; surviving it being slow, wrong, or gone | vendor — swap cost is decided the day you build this | operator, as maintainer | `rg -l "from ['\"](openai\|@anthropic-ai/sdk\|@google/genai)" -tsrc` → 1 file |

Bus factor one. Recorded in `01-discovery.md` § 33 as an accepted property of a personal system,
not discovered later.

## The four decisions

Verdicts are `MADE` or `OPEN`. When several are `OPEN`, fix in this order: `trust`, `run`, `loop`,
`model`. All four are `MADE` here; the red gate in this run is `gate.operate`, not a decision.

| id | decision | verdict | evidence pointer | deferral cost (dated) |
|---|---|---|---|---|
| model | model call seam — exactly one module knows a provider's name | MADE | `packages/model/src/route.ts:L14` — one module, routing by task; `rg -l "from ['\"](openai\|@anthropic-ai/sdk\|@google/genai)" -tsrc` → 1 file | — |
| loop | orchestration shape — fixed workflow, single loop, parallel or sequential sub-agents | MADE | `packages/loops/src/run.ts:L58` — fixed workflow per job, token budget as the exit condition in code | — |
| trust | trust boundary — the line where retrieved text becomes labelled data | MADE | `packages/prompt/src/context.ts:L33` — fetched text wrapped as `<untrusted_web>` in the user message | — |
| run | long-run home — where an eleven-minute run lives | MADE | `scripts/schedule/register-tasks.ps1:L27` — local scheduled tasks; longest run 400 s, no platform ceiling, bounded by the loop's token budget | — |

Accepted decision records live in `adr/`.

## Evidence pointers

The table the independent verifier re-runs in a fresh context.

| id | claim | how to re-derive | observed on 2026-08-23 |
|---|---|---|---|
| `ev.model.seam` | exactly one module knows a provider's name | `rg -l "from ['\"](openai\|@anthropic-ai/sdk\|@google/genai)" -tsrc` | 1 file, `packages/model/src/route.ts` |
| `ev.loop.exit` | the exit condition is a token budget in code | `rg -n "budget.remaining" packages/loops/src/run.ts` | 1 hit, L58 |
| `ev.trust.label` | fetched text is labelled before it reaches the model | `rg -n "untrusted_web" packages/prompt/src/context.ts` | 1 hit, L33 |
| `ev.trust.callers` | no loop builds its own context string | `rg -l "buildContext\(" -tsrc` | 3 files, all in `packages/loops/` |
| `ev.run.home` | the long run is a local scheduled task | `rg -n "Register-ScheduledTask" scripts/schedule/register-tasks.ps1` | 1 hit, L27 |
| `ev.tools.send` | no send or publish capability exists | `rg -n "send_mail\|publish_post" packages/tools/src` | 0 hits |
| `ev.operate.restore` | the restore tool is absent, so the rollback has never run | `command -v restic` | exit 1, no output |
| `ev.evals.count` | the case set meets the gate's floor | `wc -l docs/architecture/06-evals/cases.jsonl` | 13 |

## Open questions

| question | why it matters | who can answer | by when |
|---|---|---|---|
| how does the memory store get restored | it is the only artifact here that is expensive to lose, and the path is untested | the operator | before the memory-store migration runs |
| what else on this machine can read `~/.coe/` | other agent harnesses are installed and unaudited | the operator | before any credential is stored there |
| is the 45-minute baseline real | it is self-reported and it is the load-bearing input of `04-roi.md` | the operator | at the kill-criterion measurement, 2026-09-22 |

Generated by AI Architect · https://www.frankx.ai/ai-architect
