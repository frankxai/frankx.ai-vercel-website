# Discovery — support triage

Fixture: every answer below is part of the worked example's definition, not a transcript of a
real interview. The tagging convention is real and is what `gate.discovery` counts.

Tags: `[answered]` means someone stated it or it was verified against a system, with the source
named inline. `[unknown]` means asked and genuinely not known, with the person who could answer
it named. There is no third tag, and no answer here is a guess wearing a hedge word.

## business context

### 1. What breaks today, in one sentence?
[answered] The support inbox is triaged by whoever opens it first, so routing is inconsistent and
the first reply lands somewhere between 20 minutes and two days. Stated by the support lead.

### 2. Who feels it?
[answered] Four support agents and one support lead, and every customer whose ticket sat in the
wrong queue overnight. Stated by the support lead.

### 3. What has been tried?
[answered] Keyword rules in the support platform, added over eight months, now 31 rules that
nobody is willing to change because no one knows which are load-bearing. Source: the platform's
rules export in the fixture repo, `fixtures/support-rules.json` (31 objects).

### 4. What is the cost of doing nothing for another quarter?
[unknown] The support lead can produce a first-reply-time series from the platform but has not.
Named follow-up: support lead, before the next cost review.

## process and operations

### 11. Walk me through the last ticket that went wrong.
[answered] A churn-risk escalation was routed to the billing queue by a keyword rule matching the
word "invoice" in a signature block, and sat for 31 hours. Stated by the support lead; the ticket
id is deliberately not copied into this artifact.

### 12. What are the queues, and who owns each?
[answered] Four: technical, billing, account changes, escalations. Owners are the support lead
for escalations, named agents for the other three. Source: `fixtures/queues.yaml`.

### 13. Which steps must stay human?
[answered] Sending. Every outbound message is sent by a person from the support platform UI.
Stated by the support lead and confirmed by the head of engineering as a condition of building
this at all.

## data and information

### 21. What does the system read?
[answered] Ticket subject and body, the thread so far, the customer's plan tier, and up to three
retrieved macros from a corpus of approved replies. Source: `apps/worker/src/triage.ts:L18`.

### 22. Where do the macros live?
[answered] A managed vector store, re-indexed nightly from the macros directory in the support
repository. Source: `apps/worker/src/index-macros.ts:L9`.

### 23. Is customer data leaving the current processor boundary?
[unknown] The head of engineering has a data processing agreement covering the support platform
but has not checked whether the model provider is listed as a sub-processor. Named follow-up:
head of engineering, before any production traffic. This blocks launch, not this document.

## users and stakeholders

### 31. Who approves the drafted reply?
[answered] The support agent who owns the queue the ticket routed into. Stated by the support lead.

### 32. What does an agent do when the draft is wrong?
[answered] Edits it and sends, then flags the ticket with a `bad-draft` tag. The tag is the input
to the weekly eval review. Source: `fixtures/queues.yaml:L22`.

### 33. Who is paged when the system is down?
[answered] Nobody. The system degrades to the current manual process and the support lead is
notified by email. Stated by the head of engineering. This is a decision, not a gap.

## technical environment

### 41. What runs the current support integrations?
[answered] A request-scoped API and a queued worker in one repository, both TypeScript. Source:
`apps/api/`, `apps/worker/`.

### 42. Where does a model call happen today?
[answered] Three modules import a provider SDK directly. In the fixture repository,
`rg -l "from ['\"](openai|@anthropic-ai/sdk)" -tsrc` returns `packages/llm/src/client.ts`,
`apps/worker/src/summarize.ts`, `apps/api/src/routes/reply-draft.ts` — 3 files. This is the
fixture's central finding and it is what keeps the `model` decision open.

### 43. What is the longest thing the system runs today?
[answered] 41 seconds, the nightly macro re-index over the 2 GB corpus. The request-scoped
runtime's ceiling is 300 seconds. Source: `fx.run.longest` and `fx.run.ceiling` in `00-frame.md`.

### 44. Is there a trace that ties a model call, a tool call and a ticket together?
[unknown] Application logs exist per service; nothing correlates them by run, and nobody owns
adding it. Named follow-up: platform engineer. This is why the model plane has no owner in
`SYSTEM.md` and why `gate.decisions` is red.

## AI-specific questions

### 51. What does a wrong answer cost here?
[answered] A wrong route costs time. A wrong draft that a human sends costs trust with one
customer. Because sending is human-gated, no wrong output reaches a customer unread. Stated by
the support lead.

### 52. What must the system refuse to do?
[answered] Refuse to answer contract, legal or pricing-exception questions; route them to the
escalation queue with no draft. Stated by the support lead. Encoded as `refusal-001` and
`refusal-002` in `06-evals/cases.jsonl`.

### 53. What untrusted content enters the context window?
[answered] The ticket body, which is written by a stranger, and the retrieved macro text. T3 and
T1 respectively, traced in `05-trust-boundary.md`.

## project constraints

### 61. What is the budget?
[unknown] No number was set. The head of engineering asked for a run cost per ticket instead, and
`04-roi.md` gives one. Named follow-up: head of engineering, at the next cost review.

### 62. What is the deadline?
[answered] Four weeks of production before the kill criterion is measured, on 2026-10-04. Stated
by the head of engineering. Source: `00-frame.md`, kill criterion.

### 63. Who can change the support platform's configuration?
[answered] The support lead, and only the support lead. Stated by the support lead.

## follow-up deep dives

### 71. What happens if the model provider is unavailable for an hour?
[answered] Tickets stay in the inbox and the current manual process continues. Queue depth is the
only signal. Source: `apps/worker/src/queue.ts:L11`.

### 72. What would make you turn this off?
[answered] The two thresholds in `00-frame.md`'s kill criterion, stated by the support lead
without prompting, which is why they are in the frame rather than invented afterwards.

## gaps

Everything still open, in one place, so `flow` and `decide` know what they are building without.

| id | gap | who can answer | blocks |
|---|---|---|---|
| `g1` | cost of doing nothing — no first-reply-time series exists | support lead | the benefit half of `04-roi.md` beyond the fixture assumption |
| `g2` | model provider's sub-processor status under the data processing agreement | head of engineering | production launch, not design |
| `g3` | no run-level trace correlating model call, tool call and ticket | platform engineer | the model plane's owner, and any incident review |
| `g4` | no budget number | head of engineering | nothing yet; cost per ticket is the stand-in |

Generated by AI Architect · https://www.frankx.ai/ai-architect
