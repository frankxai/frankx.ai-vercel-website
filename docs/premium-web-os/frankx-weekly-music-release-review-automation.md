# FrankX Weekly Music Release Review Automation

Status: paused until Frank approves activation
Automation ID: `frankx-weekly-music-release-review`
Owner: FrankX Music Release Curator
Review cadence: weekly

## Tool Owner

Codex automation owns the recurring review because the work requires repository context, editorial
judgment, rights-state skepticism, and a written recommendation. A Starlight Queen job owns any later
cross-repo implementation. n8n is the fallback only if a future event-driven catalog source or a
branching approval workflow needs to run independently of Codex.

## Cadence

Thursday at 10:00 in the local Codex scheduling context. The automation is created in a paused state
to honor the estate rule that scheduled work stays off until explicitly approved.

## Scope And Sources

- `data/music/suno-catalog.json`
- `data/homepage-featured-release.ts`
- Agentic Music OS release and rights gates
- no social account, inbox, private memory, or credential access

## Output Contract

One dated report at:

`C:\Users\frank\starlight\queen\reports\frankx-weekly-release-review-YYYY-MM-DD.md`

The report contains:

- current approved homepage release;
- no more than three newer catalog candidates;
- source IDs, URLs, dates, artwork/audio presence, and copy readiness;
- explicit ownership, persona, rights, and provenance gaps;
- a recommended candidate or a no-change decision;
- a human approval checklist.

## No-Findings Behavior

Write a short no-change report and retain the existing reviewed release. Silence is not treated as an
approval and catalog visibility is not treated as commercial-rights or copyright proof.

## Approval Gates

The automation cannot edit the homepage or release config. It cannot send, post, publish, schedule
social content, email, deploy, spend, change permissions, or contact anyone. Frank must approve the
track, rights state, artwork, link, copy, and production promotion.

## Escalation

Escalate when ownership, persona, rights, artwork, audio, or source-link evidence is missing or
contradictory. Do not improvise a release label such as "new this week" when the evidence is stale.

## Validation

Before activation:

1. run the prompt manually against a fixed catalog snapshot;
2. verify it writes only the dated Queen report;
3. confirm a no-change result when no candidate clears the evidence gate;
4. inspect the report for private markers and unsupported rights claims;
5. activate only after Frank accepts the first dry-run packet.

## Durable State And Archive Behavior

The dated Queen report is the durable artifact. The automation task may close after writing the
report; it must not open follow-up tasks or mutate queue state automatically. Decisions about a
candidate are recorded in the homepage release review and the relevant Queen handoff.
