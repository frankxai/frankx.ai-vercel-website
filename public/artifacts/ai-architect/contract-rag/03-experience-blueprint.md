# Experience blueprint — contract question answering

One table per flow in `02-user-flows.md`, failure stages included, and a Human cell in every row.

## Flow 1 — ask a question about an executed contract

| Stage | Human | AI/Agents | Systems |
|---|---|---|---|
| Question arrives | Employee types a question — the only input the system takes | None yet | Internal question tool, audit record (`services/qa/src/audit.py`) |
| Scope check | None | Decides whether this is a locate-and-quote question about an executed contract; stops if not | Scope classifier on the small model (`services/qa/src/model.py`) |
| Retrieve clauses | None | Retrieves eight clauses, filtered to those in force on the question's date | Managed vector store, clause index (`services/qa/src/retrieve.py:L48`) |
| Rerank | None | Reranks and drops clauses from superseded amendments | Small model, clause metadata |
| Answer with citations | None | Writes the answer with a clause id against every claim | Answer model, internal question tool |
| Asker reads and opens citations | Employee reads and opens at least one citation — the only per-answer check that exists | None | Internal question tool, contract management system links |
| Audit record | None | Writes question, retrieved ids, tokens and answer, retained 400 days | Audit store |
| Failure: nothing in force on that date | Employee reads a refusal naming the contract owner | Refuses rather than answering from a superseded clause | Clause index, contract owner directory |
| Failure: out of scope | Employee is told which lawyer to ask | Refuses with a named person, no partial answer | Scope classifier, lawyer directory |
| Failure: retrieval empty | Employee gets the same refusal; knowledge manager sees the flag | Flags the run for corpus review | Audit store, knowledge manager's queue |
| Failure: provider unavailable | Employee is told to ask a person | Returns an error; no cached-answer fallback | Audit store |
| Failure: injected instruction in a clause | Employee may read an answer that followed it — the current state, not the intended one | No structural defence today; the label line does not exist | `services/qa/src/prompt.py:L57`, `06-evals` (`injection-002` failing) |

## Flow 2 — monthly corpus re-index

| Stage | Human | AI/Agents | Systems |
|---|---|---|---|
| Export contracts | None — unattended, reported afterwards | Pulls executed contracts | Contract management system export |
| Split into clauses | None | Splits documents and tags each clause with contract id, amendment number, effective date | `services/ingest/src/split.py:L34` |
| Embed | None | Embeds changed clauses only | Embedding endpoint, vector store write path |
| Swap index | None | Promotes the new namespace; retains the previous for seven days | Managed vector store namespaces |
| Report | Knowledge manager reads the report — review, not approval | Writes counts, durations and every document that failed to split | Run log |
| Failure: contract fails to split | Knowledge manager sees it named, with a zero clause count | Swaps anyway; a visible gap beats a month-old corpus | Run log, clause index |
| Failure: embedding partial | Knowledge manager sees "swap skipped" | Refuses to promote a partial namespace | Vector store |
| Failure: run past its window | None — the workflow resumes | Durable workflow resumes from its last state transition | `services/ingest/src/workflow.py:L19` |

## Flow 3 — weekly citation audit

| Stage | Human | AI/Agents | Systems |
|---|---|---|---|
| Sample answers | Legal ops lead runs the sampler | Samples 40 answers from the week | Audit store, `scripts/citation-audit.mjs` |
| Check citations | Legal ops lead reads each answer against the clause it cites | None — the system is not allowed to grade itself here | Contract management system |
| Record verdicts | Legal ops lead records correct or not, per answer | None | Audit store |
| Decide | Legal ops lead continues, restricts, or turns the system off | None | `07-runbook.md` step 8 |
| Failure: sample below threshold | Legal ops lead runs one command to turn the system off | None | `07-runbook.md` step 8 |
| Failure: audit not run | Every asker sees the stale audit date in the tool's footer | None | Internal question tool |
| Failure: promoted case fails | Legal ops lead leaves it red and records it in `review.md` | None | Eval harness |

## Irreversible actions, cross-checked against the trust boundary

| Stage | Category | Human cell holds the gate? |
|---|---|---|
| Answer with citations | none — the answer is read, not acted on by the system | Not irreversible for the system; potentially irreversible for the reader who acts on it, which is why citations and the weekly audit exist |
| Swap index | `destructive` | Partly — automatic promotion, previous namespace retained seven days, rollback is one command. Recorded as an accepted risk in `05-trust-boundary.md` |
| External upload of a contract | `legal_ip` | Not applicable today — the path is disabled at `07-runbook.md` step 7 and stays disabled until the trust finding is closed |

Generated by AI Architect · https://www.frankx.ai/ai-architect
