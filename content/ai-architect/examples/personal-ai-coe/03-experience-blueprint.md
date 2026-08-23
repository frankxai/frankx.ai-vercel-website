# Experience blueprint — personal AI centre of excellence

One table per flow in `02-user-flows.md`, every stage including failure stages, and a Human cell in
every row even when it says "none". One person holds every Human cell here; the column still earns
its place, because it shows which hat that person is wearing and how long they have to react.

## Flow 1 — morning brief

| Stage | Human | AI/Agents | Systems |
|---|---|---|---|
| Collect sources | None — unattended at 06:30 | Gathers new notes, unread inbox items and subscribed feeds since the last run | Local notes (`~/notes`), inbox export, feed cache |
| Summarise | None | Summarises each item with a link back to its source path or URL | Model routing seam (`packages/model/src/route.ts`) |
| Rank | None | Groups by source and recency; does not rank importance | Loop runner (`packages/loops/src/run.ts`) |
| Write brief | None | Writes the brief and appends a run-log line | `~/.coe/briefs/`, `~/.coe/runs/brief.jsonl` |
| Operator reads | Operator reads the brief — the step the kill criterion measures | None | Text editor |
| Act or bin | Operator moves items into the day or bins them; nothing is auto-filed | None | The operator's own task list |
| Failure: machine asleep | Operator sees no brief and a gap in the run log | None — the run is skipped, not caught up later | Scheduler |
| Failure: source unreachable | Operator reads a brief that names what is missing | Writes the brief anyway with the gap stated | Feed cache, run log |
| Failure: provider unavailable | Operator sees a failure line and does the reading by hand | Exits without writing a brief; no fallback provider today | Run log |
| Failure: over token budget | Operator sees a truncation line at the end of the brief | Stops at the budget and states that it truncated | `packages/loops/src/run.ts:L58` |

## Flow 2 — inbox distill

| Stage | Human | AI/Agents | Systems |
|---|---|---|---|
| Read inbox export | None | Reads the local export; the mail account is not connected | Inbox export file |
| Classify | None | Groups into reply, read-later, ignore | Model routing seam |
| Draft replies | None | Drafts short replies into a queue file, never into the mail client | `~/.coe/outbox/` |
| Queue for review | None | Writes the queue and the stale count | `~/.coe/outbox/`, run log |
| Operator sends | Operator copies a draft into the mail client and sends it — the system holds no send tool | None | Mail client |
| Failure: message contains injected instructions | Operator sees the flagged span quoted in the draft | Treats it as content, does not act on it, does not strip it | `packages/prompt/src/context.ts:L33` |
| Failure: draft subtly wrong | Operator retypes rather than copies when the message matters — a habit, not a control | None | Mail client |
| Failure: queue unread for three days | Operator sees the stale count at the top of the next distill | Ages drafts in place; nothing expires | `~/.coe/outbox/` |

## Flow 3 — evening ledger and memory promotion

| Stage | Human | AI/Agents | Systems |
|---|---|---|---|
| Collect the day | None — unattended at 21:00 | Collects runs, decisions and finished work | Run logs, notes |
| Propose facts | None | Proposes at most seven candidate facts, each with its source | Model routing seam |
| Operator promotes | Operator accepts or rejects each candidate — nothing enters memory without this | None | Terminal prompt |
| Write memory | None | Writes accepted facts and updates the index | `~/.coe/memory/` (`packages/memory/src/store.ts`) |
| Backup | None | Runs the nightly encrypted backup | Object storage |
| Failure: operator accepts everything | Operator, in the weekly review, reads what was promoted | Caps candidates at seven | `~/.coe/memory/`, weekly review |
| Failure: memory write partial | Operator does nothing; the next run rebuilds | Rebuilds the index from the store, which is the source of truth | `packages/memory/src/store.ts:L9` |
| Failure: backup fails | Operator sees a failure line — and today cannot restore, because the restore tool is not installed | Records the failure and exits | Run log, object storage |

## Irreversible actions, cross-checked against the trust boundary

| Stage | Category | Human cell holds the gate? |
|---|---|---|
| Operator sends | `external_send` | Yes — enforced by absence; there is no send tool |
| Write memory | `destructive` (a wrong fact is expensive to unpick) | Yes — the promote step, one candidate at a time |
| Backup | `destructive` if a restore ever overwrites the store | Partly — the restore has never been run and its tool is absent. This is finding F1 and why `gate.operate` is red |
| Any publish | `publish` | Not applicable — no publishing path exists in this system (`00-frame.md`, non-goals) |

One person holds every gate in this table. A gate whose approver is also its requester, in the same
minute, is a speed bump rather than a control — recorded as finding F2 in `review.md`, because
naming it is the only honest option available to a system with one human in it.

Generated by AI Architect · https://www.frankx.ai/ai-architect
