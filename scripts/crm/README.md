# CRM Scripts

Scripts for managing the local CRM (`data/crm/*.json`) and syncing to Notion.

---

## Scripts

| Script | Purpose |
|---|---|
| `new-id.mjs` | Generate a new CRM ID (`p_`, `o_`, `w_`, `e_`) |
| `list.mjs` | List records from any CRM entity |
| `sync-to-notion.mjs` | Push local CRM records to Notion databases |

---

## new-id.mjs

```bash
node scripts/crm/new-id.mjs p   # → p_r3k9x2m7
node scripts/crm/new-id.mjs o   # → o_j7nm4b2x
node scripts/crm/new-id.mjs w   # → w_ab4c9d2e
node scripts/crm/new-id.mjs e   # → e_zx9k1m3p
```

---

## list.mjs

```bash
node scripts/crm/list.mjs people
node scripts/crm/list.mjs orgs
node scripts/crm/list.mjs workshops
node scripts/crm/list.mjs engagements --person p_xxx
node scripts/crm/list.mjs engagements --workshop w_xxx
node scripts/crm/list.mjs linkedin --target nldigital
```

---

## sync-to-notion.mjs

Pushes local CRM records to Notion databases. One-way: **local → Notion**. Does not read from or delete Notion records.

### Setup

Add the following to `.env.local` (never commit this file):

```
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PEOPLE_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_ORGS_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_WORKSHOPS_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_ENGAGEMENTS_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Finding database IDs:** Open a Notion database → Share → Copy link. The 32-character hex string in the URL is the database ID.

**Creating the Notion integration:** https://www.notion.so/my-integrations → New integration → copy the token. Share each database with the integration.

If env vars are missing, the script prints a clear message and exits 0. It is safe to run unconditionally.

### Usage

```bash
# Sync everything
node scripts/crm/sync-to-notion.mjs --entity all

# Sync one entity
node scripts/crm/sync-to-notion.mjs --entity people
node scripts/crm/sync-to-notion.mjs --entity orgs
node scripts/crm/sync-to-notion.mjs --entity workshops
node scripts/crm/sync-to-notion.mjs --entity engagements

# Dry run (print what would change, no writes)
node scripts/crm/sync-to-notion.mjs --entity all --dry-run

# Only sync records created after a date
node scripts/crm/sync-to-notion.mjs --entity people --since 2026-01-01
node scripts/crm/sync-to-notion.mjs --entity all --dry-run --since 2026-04-01
```

### Schema mapping — `notion-schema.json`

The file `scripts/crm/notion-schema.json` maps local JSON field names to Notion property names. This lets Frank name Notion columns whatever he wants without changing any code.

**To customize:**
1. Create Notion databases (ideally via Notion AI so the schema is good from the start)
2. Open `scripts/crm/notion-schema.json`
3. For each field, update the `"notion"` value to match the exact column name in your Notion database
4. The `"type"` values follow Notion property types: `title`, `rich_text`, `email`, `url`, `date`, `select`, `multi_select`
5. The `_ext_id_property` key is the Notion property used to match existing records — it must exist in every database (create a "FrankX ID" text property, or rename it and update `_ext_id_property`)

**Example:** If your Notion People database has a column called "Full Name" instead of "Name":
```json
"name": { "notion": "Full Name", "type": "title" }
```

### How matching works

The script stores the local `id` value (e.g. `p_r3k9x2m7`) in the Notion property named by `_ext_id_property` (default: `"FrankX ID"`). On each run, it queries Notion for a page with that value — if found, it updates; if not, it creates. No duplicate pages are created as long as the `FrankX ID` property exists in the database.
