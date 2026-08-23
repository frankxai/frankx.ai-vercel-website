# User flows — contract question answering

Three flows. Each names an actor and a trigger, each has a human step, and each has a failure
branch stating what the person sees and what the system does.

## flow 1 — ask a question about an executed contract

Actor: an employee in commercial, delivery or finance. Trigger: a question typed into the internal
tool.

Stages: `question arrives` → `scope check` → `retrieve clauses` → `rerank` → `answer with
citations` → `asker reads and opens citations` → `audit record`.

1. `question arrives` — the question and the asker's identity are recorded.
2. `scope check` — is this about an executed contract, and is it a locate-and-quote question rather
   than a request for advice? Out-of-scope questions stop here with a named person to ask.
3. `retrieve clauses` — eight clauses are retrieved, filtered to those in force on the question's
   date (`services/qa/src/retrieve.py:L48`).
4. `rerank` — the retrieved set is reranked and any clause from a superseded amendment is dropped.
5. `answer with citations` — the answer quotes the governing clause and links every claim to a
   clause id.
6. `asker reads and opens citations` — the asker reads the answer and opens at least one citation.
7. `audit record` — the run record is written and retained 400 days.

### human step

Stage `asker reads and opens citations`. This is the weakest human step in any of the three
examples in this plugin, and it is weak on purpose rather than by accident: no one reviews each
answer (`01-discovery.md` § 32). The design compensates in two places — every claim carries a
clause id, and the legal ops lead samples 40 answers a week, which is what the kill criterion
measures. A reader who does not open a citation has no check at all, and the system cannot make
them.

### failure branch

- **Nothing in force on the question's date.** The asker sees "no clause in force on that date —
  ask the contract owner", with the contract owner named. The system does not answer from a
  superseded clause, which is the exact failure that motivated the project (`01-discovery.md` § 11).
- **Question is out of scope.** The asker sees a refusal that names the lawyer to ask. No partial
  answer, no hedged paraphrase.
- **Retrieval returns nothing.** Same refusal path as above, plus the run record is flagged for the
  knowledge manager, because repeated empty retrievals are how a corpus gap becomes visible.
- **Model provider unavailable.** The asker sees an error and the instruction to ask a person.
  There is no cached-answer fallback: a stale contract answer is worse than no answer.
- **Injected instruction inside a clause.** Today the asker sees an answer that may have followed
  it. This is the open finding: `injection-002` currently fails
  (`06-evals/rubric.md` run log), and until the fix in `review.md` lands, this branch describes a
  failure the system does not yet handle. It is written here as the current state rather than the
  intended one.

## flow 2 — monthly corpus re-index

Actor: knowledge manager (owner; the run itself is unattended). Trigger: the first of the month,
and any bulk contract load.

Stages: `export contracts` → `split into clauses` → `embed` → `swap index` → `report`.

1. `export contracts` — executed contracts are exported from the contract management system.
2. `split into clauses` — documents are split, each clause tagged with contract id, amendment
   number and effective date.
3. `embed` — changed clauses are embedded.
4. `swap index` — the new namespace is promoted; the previous is retained for seven days.
5. `report` — counts, durations and any document that failed to split are written to the run log.

### human step

Stage `report`, read by the knowledge manager. A document that failed to split is a silent hole in
the corpus, and the report is the only place it becomes visible.

### failure branch

- **A contract fails to split.** The knowledge manager sees it named in the report and the clause
  count for that contract shows zero. The index swap still happens; a corpus missing one contract
  is better than a corpus a month out of date, and the gap is visible rather than assumed.
- **Embedding fails part-way.** The previous namespace stays live and the report says the swap was
  skipped. No partial namespace is ever promoted.
- **Re-index runs past its window.** The workflow is durable and resumes; the longest run in the
  fixture is 41 minutes against no request ceiling, because this does not run in a request
  (`services/ingest/src/workflow.py:L19`).

## flow 3 — weekly citation audit

Actor: legal ops lead. Trigger: weekly, and the kill-criterion measurement on 2026-10-11.

Stages: `sample answers` → `check citations` → `record verdicts` → `decide`.

1. `sample answers` — 40 answers from the week are sampled from the audit records.
2. `check citations` — the legal ops lead reads each answer against the clause it cites.
3. `record verdicts` — correct-and-correctly-cited, or not, per answer.
4. `decide` — continue, restrict, or turn the system off per `00-frame.md`.

### human step

The whole flow is the human step; stages 2 and 4 are judgement that no part of this system is
allowed to make about itself. Verdicts feed `06-evals/cases.jsonl` as new cases when the legal ops
lead promotes them.

### failure branch

- **Sample below the threshold.** The system is turned off, not tuned. The runbook step exists
  (`07-runbook.md` step 8) so that turning it off is one command rather than a decision that needs
  a meeting.
- **Audit not run.** The last run date is printed in the internal tool's footer, so an unaudited
  week is visible to every asker rather than only to the legal ops lead.
- **A promoted case fails.** It stays red in the suite and is listed in `review.md`. Cases are not
  deleted to keep the suite green.

Generated by AI Architect · https://www.frankx.ai/ai-architect
