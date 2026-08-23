# User flows — personal AI centre of excellence

Three flows, one actor. The actor is named in every flow anyway, because "the operator" wearing
the reader hat and "the operator" wearing the maintainer hat make different mistakes, and the
failure branches below are mostly about the second one.

## flow 1 — morning brief

Actor: the operator, as reader. Trigger: a scheduled task at 06:30 local time, registered at
`scripts/schedule/register-tasks.ps1:L27`.

Stages: `collect sources` → `summarise` → `rank` → `write brief` → `operator reads` → `act or bin`.

1. `collect sources` — new notes since the last run, unread inbox items, and any feed the operator
   subscribed to are gathered locally.
2. `summarise` — each item is summarised with a link back to the source path or URL.
3. `rank` — items are grouped, not ranked by importance; ordering is by source and recency, because
   ranking importance is explicitly a non-goal (`00-frame.md`).
4. `write brief` — the brief is written to `~/.coe/briefs/<date>.md` and a line is appended to the
   run log.
5. `operator reads` — the operator opens the brief.
6. `act or bin` — the operator moves items into their own day, or bins them. Nothing is auto-filed.

### human step

Stage `operator reads`, and it is the only reason the loop exists. The kill criterion measures
exactly this step: a brief nobody opens is not a partially working system, it is a job to delete.

### failure branch

- **Machine asleep at 06:30.** The operator sees no brief that morning and a gap in the run log.
  The task does not catch up later — a brief that arrives at 14:00 is noise, and skipping is
  cheaper than a stale run.
- **A source is unreachable.** The brief is written anyway, with a line naming the missing source.
  A partial brief that says what is missing beats a complete-looking brief that quietly dropped a
  feed.
- **Model provider unavailable.** The run log records a failure line and the loop exits without
  writing a brief. There is no fallback provider today (`01-discovery.md` § 71); with a single call
  seam, adding one is a config change, so this is a gap with a cheap fix and not a design flaw.
- **Brief is enormous.** Above the token budget at `packages/loops/src/run.ts:L58` the loop stops
  and writes what it has, with a line stating that it truncated. It does not silently drop the tail.

## flow 2 — inbox distill

Actor: the operator, as reader. Trigger: a scheduled task at 12:30.

Stages: `read inbox export` → `classify` → `draft replies` → `queue for review` → `operator sends`.

1. `read inbox export` — the local export is read; the mail account itself is not connected.
2. `classify` — messages are grouped into reply, read-later, and ignore.
3. `draft replies` — short replies are drafted into a queue file, never into the mail client.
4. `queue for review` — the queue is written to `~/.coe/outbox/<date>.md`.
5. `operator sends` — the operator copies a draft into their mail client and sends it themselves.

### human step

Stage `operator sends`. The system holds no send tool, so `external_send` is enforced by absence
rather than by policy — the same structural choice made in `05-trust-boundary.md`'s tool table.

### failure branch

- **A message contains instructions aimed at the model.** The operator sees the draft with the span
  flagged and quoted. The loop treats it as content, does not act on it, and does not silently
  strip it — the operator needs to see what was attempted.
- **Draft is wrong in a way the operator does not notice.** This is the one the system cannot
  catch. The mitigation is that the operator retypes rather than copies whenever the message
  matters, which is a habit, not a control, and is recorded as such in `review.md`.
- **Queue not read for three days.** Drafts age in place. Nothing sends, nothing expires, and the
  stale count is printed at the top of the next distill.

## flow 3 — evening ledger and memory promotion

Actor: the operator, as maintainer. Trigger: a scheduled task at 21:00, plus any manual run.

Stages: `collect the day` → `propose facts` → `operator promotes` → `write memory` → `backup`.

1. `collect the day` — runs, decisions and finished work from the day are collected.
2. `propose facts` — the loop proposes candidate facts for long-term memory, each with its source.
3. `operator promotes` — the operator accepts or rejects each candidate. Nothing is promoted
   without this step.
4. `write memory` — accepted facts are written to `~/.coe/memory/` and the index is updated.
5. `backup` — the nightly encrypted backup runs.

### human step

Stage `operator promotes`. A wrong fact in long-term memory shapes every later brief, which is why
this is the one stage that cannot be skipped even when the operator is tired — and why the loop
proposes at most seven candidates a night, so that "accept all" stays a considered act rather than
a reflex.

### failure branch

- **Operator accepts everything without reading.** Real, and not solvable in software. The
  mitigation is the cap of seven candidates and the weekly review of what was promoted. Recorded as
  finding F2 in `review.md` rather than claimed as handled.
- **Memory write fails part way.** The index is rebuilt from the store on the next run; the store
  is the source of truth and the index is derived. Evidence: `packages/memory/src/store.ts:L9`.
- **Backup fails.** The operator sees a failure line in the run log. Today this is the sharpest
  failure branch in the system: the restore path has never been tested and the tool it calls is not
  installed (`01-discovery.md` § 24). Until that is fixed, a backup failure means the machine is
  the only copy, and `gate.operate` stays red.

Generated by AI Architect · https://www.frankx.ai/ai-architect
