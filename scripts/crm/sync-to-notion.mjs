#!/usr/bin/env node
/**
 * sync-to-notion.mjs
 *
 * Pushes local CRM records to Notion databases (one-way: local → Notion).
 * Zero writes if env vars are missing. Safe to run at any time.
 *
 * Usage:
 *   node scripts/crm/sync-to-notion.mjs --entity all
 *   node scripts/crm/sync-to-notion.mjs --entity people --dry-run
 *   node scripts/crm/sync-to-notion.mjs --entity workshops --since 2026-01-01
 *
 * Required env vars (in .env.local):
 *   NOTION_API_KEY
 *   NOTION_PEOPLE_DB_ID
 *   NOTION_ORGS_DB_ID
 *   NOTION_WORKSHOPS_DB_ID
 *   NOTION_ENGAGEMENTS_DB_ID
 */

import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const CRM_DIR = resolve(ROOT, 'data', 'crm')
const SCHEMA_PATH = resolve(__dirname, 'notion-schema.json')

// ─── ANSI colour helpers ──────────────────────────────────────────

const c = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
}
const ok    = (s) => `${c.green}✓${c.reset} ${s}`
const upd   = (s) => `${c.cyan}~${c.reset} ${s}`
const skip  = (s) => `${c.dim}—${c.reset} ${s}`
const err   = (s) => `${c.red}✗${c.reset} ${s}`
const info  = (s) => `${c.dim}${s}${c.reset}`
const bold  = (s) => `${c.bold}${s}${c.reset}`

// ─── Arg parsing ──────────────────────────────────────────────────

function flag(args, name) {
  const i = args.indexOf(name)
  if (i === -1) return undefined
  const val = args[i + 1]
  if (!val || val.startsWith('--')) return undefined
  return val
}

const args = process.argv.slice(2)
const entityArg  = flag(args, '--entity') ?? 'all'
const dryRun     = args.includes('--dry-run')
const sinceArg   = flag(args, '--since')   // YYYY-MM-DD

const VALID_ENTITIES = ['people', 'orgs', 'workshops', 'engagements', 'all']
if (!VALID_ENTITIES.includes(entityArg)) {
  console.error(`Invalid --entity "${entityArg}". Must be one of: ${VALID_ENTITIES.join(' | ')}`)
  process.exit(1)
}

// ─── Env check ───────────────────────────────────────────────────

const REQUIRED_ENV = {
  NOTION_API_KEY:          'Notion integration token',
  NOTION_PEOPLE_DB_ID:     'People database ID',
  NOTION_ORGS_DB_ID:       'Orgs database ID',
  NOTION_WORKSHOPS_DB_ID:  'Workshops database ID',
  NOTION_ENGAGEMENTS_DB_ID:'Engagements database ID',
}

// Try to load .env.local
const envPath = resolve(ROOT, '.env.local')
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
}

const missingEnv = Object.entries(REQUIRED_ENV)
  .filter(([key]) => !process.env[key])
  .map(([key, desc]) => `  ${key}  (${desc})`)

if (missingEnv.length > 0) {
  console.log('')
  console.log('Notion sync not configured. Add the following to .env.local:')
  console.log('')
  for (const line of missingEnv) console.log(line)
  console.log('')
  console.log('See scripts/crm/README.md for setup steps.')
  process.exit(0)  // exit 0 — idempotent, not an error
}

// ─── Load schema ──────────────────────────────────────────────────

let SCHEMA
try {
  SCHEMA = JSON.parse(readFileSync(SCHEMA_PATH, 'utf8'))
} catch (e) {
  console.error(`Cannot read schema: ${SCHEMA_PATH}`)
  console.error(e.message)
  process.exit(1)
}

const EXT_ID_PROP = SCHEMA['_ext_id_property'] ?? 'FrankX ID'

// ─── Notion client (dynamic import of @notionhq/client) ──────────

// We import dynamically so the missing-env guard above can exit before
// attempting to instantiate the client.
const { Client } = await import('@notionhq/client')

const notion = new Client({ auth: process.env.NOTION_API_KEY })

// ─── DB ID map ────────────────────────────────────────────────────

const DB_IDS = {
  people:      process.env.NOTION_PEOPLE_DB_ID,
  orgs:        process.env.NOTION_ORGS_DB_ID,
  workshops:   process.env.NOTION_WORKSHOPS_DB_ID,
  engagements: process.env.NOTION_ENGAGEMENTS_DB_ID,
}

const CRM_FILES = {
  people:      'people.json',
  orgs:        'orgs.json',
  workshops:   'workshops.json',
  engagements: 'engagements.json',
}

// ─── File helpers ─────────────────────────────────────────────────

function readJson(file) {
  const path = resolve(CRM_DIR, file)
  if (!existsSync(path)) return []
  return JSON.parse(readFileSync(path, 'utf8'))
}

// ─── Property builders ────────────────────────────────────────────

/**
 * Converts a local field value to a Notion property object based on type.
 */
function buildNotionProperty(type, value) {
  if (value === null || value === undefined) return null

  switch (type) {
    case 'title':
      return { title: [{ type: 'text', text: { content: String(value) } }] }
    case 'rich_text':
      if (Array.isArray(value)) value = value.join(', ')
      return { rich_text: [{ type: 'text', text: { content: String(value) } }] }
    case 'email':
      return { email: String(value) }
    case 'url':
      return { url: String(value) }
    case 'date':
      // accepts ISO string or YYYY-MM-DD
      return { date: { start: String(value).slice(0, 10) } }
    case 'select':
      return { select: { name: String(value) } }
    case 'multi_select':
      if (!Array.isArray(value)) value = [value]
      return { multi_select: value.map(v => ({ name: String(v) })) }
    case 'number':
      return { number: Number(value) }
    case 'checkbox':
      return { checkbox: Boolean(value) }
    default:
      return { rich_text: [{ type: 'text', text: { content: String(value) } }] }
  }
}

/**
 * Build a Notion properties object for a CRM record, driven by the schema map.
 */
function buildProperties(entity, record) {
  const entitySchema = SCHEMA[entity]
  if (!entitySchema) return {}

  const props = {}
  for (const [localKey, mapping] of Object.entries(entitySchema)) {
    const value = record[localKey]
    if (value === undefined || value === null) continue
    const built = buildNotionProperty(mapping.type, value)
    if (built) props[mapping.notion] = built
  }
  return props
}

// ─── Notion page lookup ───────────────────────────────────────────

/**
 * Find an existing Notion page by the FrankX ID ext_id property.
 * Returns page id string or null.
 */
async function findExistingPage(dbId, frankxId) {
  try {
    const results = await notion.databases.query({
      database_id: dbId,
      filter: {
        property: EXT_ID_PROP,
        rich_text: { equals: frankxId },
      },
      page_size: 1,
    })
    return results.results[0]?.id ?? null
  } catch (e) {
    throw new Error(`Query failed for db ${dbId}: ${e.message}`)
  }
}

// ─── Sync single entity ───────────────────────────────────────────

async function syncEntity(entityName) {
  const dbId = DB_IDS[entityName]
  const file = CRM_FILES[entityName]
  let records = readJson(file)

  console.log('')
  console.log(bold(`Syncing ${entityName} → Notion`))
  console.log(info(`  Database: ${dbId}`))
  console.log(info(`  Records loaded: ${records.length}`))

  // Apply --since filter
  if (sinceArg) {
    const cutoff = sinceArg
    records = records.filter(r => (r.created_at ?? '').slice(0, 10) >= cutoff)
    console.log(info(`  After --since ${sinceArg}: ${records.length} record(s)`))
  }

  const stats = { created: 0, updated: 0, skipped: 0, errors: 0 }

  for (const record of records) {
    const frankxId = record.id
    if (!frankxId) {
      console.log(skip(`  record with no id — skipping`))
      stats.skipped++
      continue
    }

    let existingPageId = null
    try {
      existingPageId = dryRun ? null : await findExistingPage(dbId, frankxId)
    } catch (e) {
      console.log(err(`  ${frankxId}: lookup error — ${e.message}`))
      stats.errors++
      continue
    }

    const properties = buildProperties(entityName, record)

    if (dryRun) {
      const action = existingPageId ? 'would update' : 'would create'
      console.log(upd(`  [DRY RUN] ${frankxId} — ${action}`))
      stats.updated++ // just count toward "would write"
      continue
    }

    try {
      if (existingPageId) {
        await notion.pages.update({ page_id: existingPageId, properties })
        console.log(upd(`  ${frankxId} — updated`))
        stats.updated++
      } else {
        await notion.pages.create({
          parent: { database_id: dbId },
          properties,
        })
        console.log(ok(`  ${frankxId} — created`))
        stats.created++
      }
    } catch (e) {
      console.log(err(`  ${frankxId} — ${e.message}`))
      stats.errors++
    }
  }

  const label = dryRun ? ' (dry run)' : ''
  console.log(info(`  Done${label}: ${stats.created} created, ${stats.updated} updated, ${stats.skipped} skipped, ${stats.errors} errors`))
  return stats
}

// ─── Main ─────────────────────────────────────────────────────────

const START = Date.now()

if (dryRun) console.log(info('\n[DRY RUN — no writes will be made]'))

const entitiesToSync = entityArg === 'all'
  ? ['people', 'orgs', 'workshops', 'engagements']
  : [entityArg]

let totalErrors = 0
for (const entity of entitiesToSync) {
  const stats = await syncEntity(entity)
  totalErrors += stats.errors
}

const elapsed = ((Date.now() - START) / 1000).toFixed(1)
console.log('')
console.log(bold(`Sync complete in ${elapsed}s`))
if (totalErrors > 0) {
  console.log(err(`${totalErrors} error(s) — check output above`))
  process.exit(1)
}
