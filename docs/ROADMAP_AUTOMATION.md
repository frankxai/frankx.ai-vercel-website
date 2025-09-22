# Roadmap Automation Playbook

Run `npm run roadmap:check` from the repository root to generate a CLI snapshot of the FrankX specs and roadmap. The script reads `data/specs-roadmap.json` and prints:

- The North Star vision statement
- Pillar commitments with source documentation links
- Quarterly milestones plus deliverables
- Delivery rituals with cadence and owners
- Outcome signals and their targets
- Next actions (status + notes)

Use this command before logging updates in `docs/DAILY_INTELLIGENCE_OPERATIONS.md` or when responding to a "check specs and roadmap" prompt so every session starts from the same baseline.

