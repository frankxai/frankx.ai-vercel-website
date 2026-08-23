# Discovery — personal AI centre of excellence

Fixture: the answers below are part of the worked example's definition, not a transcript. The
tagging convention is real and is what `gate.discovery` counts. There is no third tag: an answer
is `[answered]` with its source named, or `[unknown]` with the person or step that could close it.

Discovery with one person is not easier than discovery with ten. It is harder to keep honest,
because the interviewer and the interviewee are the same person and nobody pushes back on a
comfortable answer. Where an answer here is the operator's own claim about their own habits, it
says so.

## business context

### 1. What breaks today, in one sentence?
[answered] Roughly 45 minutes a day goes into reading, sorting and re-finding things the operator
already read once. Operator's own estimate from two weeks of timer entries — self-reported, and
the weakest `[answered]` in this file.

### 2. Who feels it?
[answered] One person. There is no team, no customer, and no service depending on this. Stated by
the operator.

### 3. What has been tried?
[answered] Three note-taking systems and a folder hierarchy that is now four levels deep. Source:
`~/notes` in the fixture machine, 3,100 files.

### 4. What is the cost of doing nothing?
[answered] The 45 minutes continues and the recall problem grows with the note count. Nothing
breaks; it just stays slow. This is a preference, not a crisis, and the frame says so.

## process and operations

### 11. What are the routines that would become loops?
[answered] Morning brief, inbox distill, evening ledger. Named by the operator, and each already
exists as a manual habit — which is why they are the candidates rather than the aspirational ones.

### 12. What runs when the machine is off?
[answered] Nothing. Missed runs are skipped, not queued. Stated by the operator; enforced at
`scripts/schedule/register-tasks.ps1:L27`.

### 13. Which steps must stay human?
[answered] Publishing anything, sending anything, and promoting a fact into long-term memory.
Stated by the operator and encoded in `05-trust-boundary.md`'s tool table.

## data and information

### 21. What does the system read?
[answered] Local notes (`~/notes`), the inbox export, the run ledger, and fetched web pages when a
session asks for one. Source: `packages/context/src/sources.ts:L12`.

### 22. Where does long-term memory live?
[answered] A local file store with an on-disk index at `~/.coe/memory/`, no managed vector store.
Source: `packages/memory/src/store.ts:L9`.

### 23. What leaves the machine?
[answered] Prompt content sent to the model provider, and a nightly encrypted backup to object
storage. Nothing else. Source: `packages/model/src/route.ts:L14`, `scripts/backup.mjs:L18`.

### 24. What is the backup restore path?
[unknown] The backup runs; the restore has never been tested, because the tool the restore step
calls is not installed on this machine. Named follow-up: the operator, before the memory-store
migration. This is why `gate.operate` is red.

## users and stakeholders

### 31. Who approves a draft?
[answered] The operator. There is no second reviewer and there will not be one.

### 32. What happens when the operator is away for a week?
[answered] The loops skip, the drafts pile up, and the ledger gets a longer week. Stated by the
operator. No catch-up automation, on purpose.

### 33. Who takes over if the operator stops?
[answered] Nobody. Bus factor one is accepted for a personal system, and it is recorded here so
that "personal" is a decision rather than a discovery someone makes later.

## technical environment

### 41. What is the machine?
[answered] One laptop, always the same one. Scheduled tasks are registered by
`scripts/schedule/register-tasks.ps1`.

### 42. Where does a model call happen?
[answered] One module. `rg -l "from ['\"](openai|@anthropic-ai/sdk|@google/genai)" -tsrc` returns
`packages/model/src/route.ts` — 1 file. Routing by task lives there: mechanical work to a small
model, judgement to a large one.

### 43. What is the longest run?
[answered] 400 seconds, the weekly deep review. There is no platform ceiling — it is a local
process — so the bound is the loop's own token budget at `packages/loops/src/run.ts:L58`.

### 44. What is the observability story?
[answered] Every run appends a line to `~/.coe/runs/<loop>.jsonl` with model, tokens, duration and
outcome. Source: `packages/loops/src/run.ts:L88`. This is thin, and it is enough for one person to
answer "what did it do last Tuesday".

### 45. Is anything else on the machine reading these files?
[unknown] The operator has other agent harnesses installed and has not audited what they can read
under `~/.coe/`. Named follow-up: the operator, before any credential is stored there.

## AI-specific questions

### 51. What does a wrong answer cost?
[answered] A wasted read, in most cases. The expensive failure is a wrong fact promoted into
long-term memory, because it then shapes every later brief. That is why promotion is a human step.

### 52. What must the system refuse to do?
[answered] Publish, send, spend, and delete memory without a confirmation in the same session.
Stated by the operator; encoded as `refusal-001` to `refusal-003` in `06-evals/cases.jsonl`.

### 53. What untrusted content enters the context window?
[answered] Fetched web pages, and any inbox message. Both T3. Local notes are T0. Source:
`packages/prompt/src/context.ts:L33`.

## project constraints

### 61. What is the budget?
[answered] Under $25 a month of model spend, stated by the operator as the line at which they
would rather do the reading themselves. `04-roi.md` puts the fixture at $15.88.

### 62. What is the deadline?
[answered] The kill criterion's date, 2026-09-22. Nothing else is time-bound.

### 63. What can this system never be allowed to cost?
[answered] A surprise. Any change that would push monthly spend above the stated line stops and
waits, which is why `spend` is a gate in `SOP.md` even though there is no finance team.

## follow-up deep dives

### 71. What happens when a provider is unavailable?
[answered] The loop logs a failure line and skips. There is no fallback provider today, and with a
single call seam adding one is a config change rather than a migration —
`packages/model/src/route.ts:L14`.

### 72. What would make you turn this off?
[answered] The two floors in `00-frame.md`: an unopened brief, or a ledger that costs more than it
saves.

## gaps

| id | gap | who can answer | blocks |
|---|---|---|---|
| `g1` | the restore path has never been tested, and the tool it calls is not installed | the operator | `gate.operate`, and the memory-store migration |
| `g2` | other agent harnesses on the machine have unaudited read access under `~/.coe/` | the operator | storing any credential there |
| `g3` | the 45-minute baseline is self-reported from two weeks of timer entries | the operator | the confidence, not the shape, of `04-roi.md` |

Generated by AI Architect · https://www.frankx.ai/ai-architect
