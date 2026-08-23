# User flows — support triage

Three flows. Each names an actor and a trigger, each has at least one human step, and each has a
failure branch that says what the person sees and what the system does. Stage names here are the
same strings used as rows in `03-experience-blueprint.md`.

## flow 1 — inbound ticket triage and drafted reply

Actor: support agent who owns the destination queue. Trigger: a customer email arrives in the
support inbox and the platform emits an intake event.

Stages: `ticket arrives` → `classify and route` → `retrieve macros` → `draft reply` → `agent
review` → `send` → `feedback`.

1. `ticket arrives` — the platform's intake webhook enqueues the ticket id. Nothing is read yet.
2. `classify and route` — the worker classifies urgency and destination queue against the four
   queues in `fixtures/queues.yaml`, and writes the route to the ticket.
3. `retrieve macros` — up to three approved macros are retrieved from the vector store.
4. `draft reply` — a reply is drafted and attached to the ticket as an internal note, never as an
   outbound message.
5. `agent review` — the agent reads the route and the draft, edits or discards.
6. `send` — the agent clicks send in the support platform.
7. `feedback` — the agent tags a bad draft; the tag is collected for the weekly eval review.

### human step

Stage `agent review`, performed by the support agent who owns the destination queue. The agent
is the only actor who can move a draft into an outbound message. No agent-side configuration can
skip this step: the system has no send capability at all (`05-trust-boundary.md`, tool table).

### failure branch

- **Classifier below the confidence floor.** The agent sees the ticket in the escalation queue
  with an internal note reading "not classified — confidence below floor", and no draft. The
  system stops before drafting rather than guessing a queue.
- **Vector store unavailable.** The agent sees a draft marked "written without macros". The
  system drafts from the ticket alone and labels the omission rather than silently producing an
  unsourced reply.
- **Model provider unavailable.** The agent sees the ticket untouched in the inbox, exactly as
  today. The worker leaves the job in the queue and stops after three attempts
  (`apps/worker/src/triage.ts:L64`). Queue depth is the only alert, and the support lead is
  emailed at depth 50.
- **Nobody reviews within four hours.** The support lead sees the ticket on the stale-review
  list. The draft stays as an internal note, untouched; nothing expires and nothing sends.

## flow 2 — nightly macro re-index

Actor: platform engineer (owner, not operator — the run is unattended). Trigger: a nightly
schedule at 02:00 in the support platform's timezone.

Stages: `re-index starts` → `embed changed macros` → `swap index` → `report`.

1. `re-index starts` — the job reads the macros directory and diffs against the stored digest.
2. `embed changed macros` — only changed macros are embedded.
3. `swap index` — the new namespace is promoted; the previous one is kept for one day.
4. `report` — a line is appended to the job log with counts and duration.

### human step

Stage `report`, read by the platform engineer the next morning. This is a review step, not an
approval step, and the flow says so rather than implying an approval that does not happen.

### failure branch

- **Embedding call fails part-way.** The platform engineer sees the job log line "index swap
  skipped — partial embed". The system does not promote a partial namespace; yesterday's index
  stays live and search quality is unchanged rather than silently degraded.
- **Macro corpus grows past the storage assumption.** The job log records the corpus size against
  `fx.corpus` in `00-frame.md`. The platform engineer sees a line reading "corpus above modelled
  size", which is the signal to re-run `04-roi.md` rather than absorb the cost quietly.

## flow 3 — weekly eval review

Actor: support lead. Trigger: the weekly review slot, plus any ticket tagged `bad-draft`.

Stages: `collect tagged tickets` → `promote to cases` → `run harness` → `decide`.

1. `collect tagged tickets` — tickets tagged `bad-draft` in the last seven days are listed.
2. `promote to cases` — the support lead chooses which become eval cases in
   `06-evals/cases.jsonl`. Nothing is promoted automatically.
3. `run harness` — the harness runs the whole case set (`07-runbook.md`, step 5).
4. `decide` — the support lead decides whether behaviour changes this week; changes go through
   the same review as any other change.

### human step

Stage `promote to cases`, performed by the support lead. A correction becoming a permanent
expectation is a judgement, so a person makes it. This is also the reason the system does not
learn from corrections between runs — see `00-frame.md`, non-goals.

### failure branch

- **A promoted case fails on the current system.** The support lead sees a red case id in the
  harness output. The case stays red and is listed in `review.md`; it is not deleted to make the
  suite green, and it is not quietly marked expected-fail.
- **Nobody runs the review.** The case set ages. The stale date is visible in
  `06-evals/rubric.md`'s run log, so an unrun review is discoverable rather than invisible.

Generated by AI Architect · https://www.frankx.ai/ai-architect
