# Discovery — contract question answering

Fixture: the answers below are part of the worked example's definition, not a transcript of a real
interview. The tagging convention is real and is what `gate.discovery` counts. `[answered]` names
its source inline; `[unknown]` names who could close it. There is no third tag.

## business context

### 1. What breaks today, in one sentence?
[answered] Commercial and delivery teams ask the in-house legal team the same twenty questions
about executed contracts, and each answer costs someone twenty minutes of searching. Stated by the
legal ops lead.

### 2. Who feels it?
[answered] Four in-house lawyers, and roughly sixty people across commercial and delivery who wait
for them. Stated by the legal ops lead.

### 3. What has been tried?
[answered] A shared FAQ page, last updated fourteen months ago, and full-text search in the
contract management system, which finds documents rather than clauses. Source:
`fixtures/faq-export.md`, 31 entries.

### 4. What is the cost of doing nothing?
[answered] The queue continues and grows with the contract count, which grew by roughly 300
contracts last year. Stated by the legal ops lead, from the contract management system's own count.

## process and operations

### 11. Walk me through the last question that went wrong.
[answered] Someone read a termination clause from a superseded amendment and quoted a notice period
that had changed. Stated by the legal ops lead. It is the reason citations are non-negotiable in
`00-frame.md`'s outcome sentence.

### 12. Which questions are in scope?
[answered] Locating and quoting clauses in executed contracts: notice periods, liability caps,
assignment, governing law, renewal. Not advice, not drafts in flight. Stated by the legal ops lead.

### 13. Which steps must stay human?
[answered] Any answer that leaves the firm, and any question about a contract in negotiation. Both
route to a named lawyer. Stated by the general counsel through the legal ops lead.

## data and information

### 21. What does the system read?
[answered] Executed contracts exported nightly from the contract management system, split into
clauses. Source: `services/ingest/src/split.py:L34`.

### 22. How are amendments handled?
[answered] Each clause carries its contract id, amendment number and effective date; retrieval
filters to the clause in force on the question's date. Source:
`services/qa/src/retrieve.py:L48`.

### 23. Where does the clause text go once retrieved?
[answered] It is concatenated into the system prompt at `services/qa/src/prompt.py:L57`. This is
the fixture's central finding: there is no line at which the clause text becomes labelled data, so
`gate.trust` is red and the `trust` decision is `OPEN`.

### 24. Does anything leave the firm?
[answered] Prompt content, which includes clause text, goes to the model provider. The provider is
covered by the firm's data processing agreement. Source: `fixtures/dpa-register.csv:L12`.

### 25. Can people outside the firm upload a contract to ask about it?
[unknown] The product owner wants this; nobody has decided whether it is allowed. Named follow-up:
general counsel. It is out of scope in `00-frame.md` today, and the reason is the same finding as
§ 23 — an external upload is a T3 document entering a system with no label line.

## users and stakeholders

### 31. Who asks the questions?
[answered] Commercial, delivery and finance. Roughly sixty people, self-serve. Stated by the legal
ops lead.

### 32. Who reviews the answers?
[answered] Nobody, per answer. The legal ops lead samples 40 answers a week — which is the kill
criterion's measurement, and which means most answers are read by their asker and no one else.
Stated by the legal ops lead. This is the single most consequential design fact in this file.

### 33. Who is accountable for a wrong answer?
[answered] The asker, for acting on it; the legal ops lead, for the system continuing to run.
Stated by the general counsel through the legal ops lead.

## technical environment

### 41. What runs it?
[answered] A request-scoped Python service for questions, and a durable workflow for the monthly
re-index. Source: `services/qa/`, `services/ingest/`.

### 42. Where does a model call happen?
[answered] One module. `rg -l "import (openai|anthropic)" -tpy` returns `services/qa/src/model.py`
— 1 file. Routing by task lives there: rerank and scope-check on the small model, the answer on the
mid model.

### 43. What is the longest run?
[answered] 34 seconds for a question, against a 300-second request ceiling. The monthly re-index
runs 41 minutes and lives in the durable workflow, not in a request. Source:
`services/ingest/src/workflow.py:L19`.

### 44. What does observability look like?
[answered] Every question run writes a record with question, retrieved clause ids, model, tokens
and the answer, retained 400 days for audit. Source: `services/qa/src/audit.py:L22`.

### 45. What is the retrieval quality baseline?
[unknown] No measurement exists of how often the right clause is in the retrieved eight. Named
follow-up: the knowledge manager, before the kill-criterion date — otherwise a failing answer
cannot be attributed to retrieval or to the model.

## AI-specific questions

### 51. What does a wrong answer cost here?
[answered] Unbounded, in the sense that matters: a wrong notice period acted on is a contractual
position the firm cannot take back. This is why `00-frame.md`'s kill criterion turns the system off
rather than retuning it.

### 52. What must the system refuse to do?
[answered] Refuse advice, refuse questions about contracts in negotiation, refuse to answer when
retrieval returns nothing in force on the question's date. Stated by the legal ops lead; encoded as
`refusal-001` to `refusal-003`.

### 53. What untrusted content enters the context window?
[answered] Clause text from executed contracts. Executed contracts are counterparty-authored
documents, which makes them T3 whatever the firm's relationship with the counterparty is. They
currently enter the instruction position — see § 23.

## project constraints

### 61. What is the budget?
[answered] Under $200 a month of run cost, stated by the product owner. `04-roi.md` puts the
fixture at $51.80.

### 62. What is the deadline?
[answered] Six weeks to the kill-criterion measurement on 2026-10-11, and a nearer date of
2026-09-06 for the injection case (`00-frame.md`).

### 63. What cannot ship?
[answered] External uploads, until the trust-boundary finding is closed. Stated by the general
counsel through the legal ops lead, and enforced as a toggle at `07-runbook.md` step 7 rather than
as a policy sentence.

## follow-up deep dives

### 71. What happens when the provider is unavailable?
[answered] The question returns an error telling the asker to ask a person, and the run record
notes the failure. There is no cached-answer fallback, deliberately: a stale contract answer is the
failure mode this system exists to prevent.

### 72. What would make you turn this off?
[answered] The kill criterion. The legal ops lead asked for it to be a hard switch rather than a
threshold that triggers a review, and that is how it is written.

## gaps

| id | gap | who can answer | blocks |
|---|---|---|---|
| `g1` | retrieved clause text enters the instruction position; no label line exists | backend engineer, with the trust reviewer | `gate.trust`, `gate.evals`, and external uploads |
| `g2` | no decision on whether people outside the firm may upload contracts | general counsel | the scope of the next release, not this one |
| `g3` | no retrieval-quality baseline, so a wrong answer cannot be attributed to retrieval or to the model | knowledge manager | diagnosing anything the kill-criterion sample finds |

Generated by AI Architect · https://www.frankx.ai/ai-architect
