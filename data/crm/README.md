# CRM — Local JSON Mirror

**Source of truth** for Workshop OS CRM data. Lives in private `FrankX` repo. Never synced to production website repo.

## Files

| File | Purpose | Record count |
|---|---|---|
| `people.json` | Individual humans (engaged contacts) | Grows from intake + workshops |
| `orgs.json` | Companies and organizations | Grows as new hosts / attendee employers appear |
| `workshops.json` | Workshop instances (actual delivered events) | One per scheduled workshop |
| `engagements.json` | Touchpoints: workshop attendance, content posts, intros, meetings | Unbounded |
| `linkedin-profiles.json` | Pre-engagement staging (Dream 100, Oracle Spain, NLDigital lists) | Unbounded |

## ID convention

`{prefix}_{nanoid8}` — 8-character lowercase nanoid.

| Prefix | Entity |
|---|---|
| `p_` | person |
| `o_` | org |
| `w_` | workshop instance |
| `e_` | engagement |
| `c_` | content piece (future) |

Generate via `scripts/crm/new-id.mjs` or `/crm-log` skill.

## Schemas

See `docs/superpowers/specs/2026-04-22-workshop-os-design.md` → "Tier 1 — CRM data model" for full TypeScript-style schemas.

## Future Notion sync

When a Notion CRM database is built (with Notion AI's help), `scripts/crm/sync-to-notion.mjs` will push records up. Until then, these JSON files are canonical. Don't write to Notion programmatically yet.

## Editing

- **Via skills:** `/crm-log` adds an engagement. `/workshop-new` adds a workshop. `/workshop-prep` adds or updates a person.
- **By hand:** Edit the JSON file. Commit. The skills will read the new state.
- **Never:** Delete records. Set `status: "archived"` or add a `deleted_at` timestamp instead.
