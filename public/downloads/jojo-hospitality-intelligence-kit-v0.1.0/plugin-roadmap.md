# Plugin Roadmap

Do not build a Codex or Claude plugin in v0.1.0.

## Why Not Yet

The first job is to validate the workflow:

- Does the service briefing save time?
- Does booking support reduce friction?
- Does review learning create better owner decisions?
- Does the team want to keep using it?

If not, a plugin would only package the wrong behavior.

## Build A Plugin When

- one workflow is used for at least 4 weeks
- the data boundary is clear
- the team knows who approves outputs
- the owner wants repeatable commands
- the same pattern can help other houses

## Candidate Plugin Commands

- `prepare-service-briefing`
- `draft-booking-reply`
- `summarize-review-patterns`
- `create-team-training-note`
- `update-menu-story`
- `prepare-hotel-handoff`

## Governance

Every command should include:

- source inputs
- private data warning
- human approval checkpoint
- output type
- audit note

