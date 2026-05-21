#!/usr/bin/env node
/**
 * Amplification queue CLI.
 *
 * Commands:
 *   add     -- log an attendee's content post into engagements.json
 *   list    -- print engagements (filterable by repost status)
 *   repost  -- mark an engagement as reposted by Frank
 *
 * Usage:
 *   node scripts/amplify/queue.mjs add --person p_xxx --workshop w_xxx --platform linkedin --url "https://..."
 *   node scripts/amplify/queue.mjs list [--pending | --reposted]
 *   node scripts/amplify/queue.mjs repost --engagement e_xxx --url "https://frank-repost-url..."
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const CRM = resolve(ROOT, 'data', 'crm')

// ─── nanoid (same alphabet + length as scripts/crm/new-id.mjs) ───

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789'

function nanoid(len = 8) {
  let id = ''
  for (let i = 0; i < len; i++) {
    id += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return id
}

function newEngagementId() {
  return `e_${nanoid()}`
}

// ─── CRM file helpers ────────────────────────────────────────────

function readJson(file) {
  try {
    return JSON.parse(readFileSync(resolve(CRM, file), 'utf8'))
  } catch (err) {
    console.error(`Error reading ${file}: ${err.message}`)
    process.exit(1)
  }
}

function writeJson(file, data) {
  writeFileSync(resolve(CRM, file), JSON.stringify(data, null, 2) + '\n', 'utf8')
}

// ─── Referential integrity ────────────────────────────────────────

function requirePerson(personId) {
  const people = readJson('people.json')
  const person = people.find(p => p.id === personId)
  if (!person) {
    console.error(`Person "${personId}" not found in data/crm/people.json`)
    console.error(`Available IDs: ${people.map(p => p.id).join(', ') || '(none)'}`)
    process.exit(1)
  }
  return person
}

function requireWorkshop(workshopId) {
  const workshops = readJson('workshops.json')
  const workshop = workshops.find(w => w.id === workshopId)
  if (!workshop) {
    console.error(`Workshop "${workshopId}" not found in data/crm/workshops.json`)
    console.error(`Available IDs: ${workshops.map(w => w.id).join(', ') || '(none)'}`)
    process.exit(1)
  }
  return workshop
}

// ─── Commands ────────────────────────────────────────────────────

function cmdAdd(args) {
  const personId = flag(args, '--person')
  const workshopId = flag(args, '--workshop')
  const platform = flag(args, '--platform')
  const url = flag(args, '--url')
  const text = flag(args, '--text') // optional original post text

  if (!personId || !workshopId || !platform || !url) {
    console.error('Usage: queue.mjs add --person <id> --workshop <id> --platform <platform> --url <url> [--text "<post text>"]')
    console.error('  platform: linkedin | twitter | youtube')
    process.exit(1)
  }

  const VALID_PLATFORMS = ['linkedin', 'twitter', 'youtube']
  if (!VALID_PLATFORMS.includes(platform)) {
    console.error(`Invalid platform "${platform}". Must be one of: ${VALID_PLATFORMS.join(', ')}`)
    process.exit(1)
  }

  // Validate referential integrity
  const person = requirePerson(personId)
  const workshop = requireWorkshop(workshopId)

  const engagements = readJson('engagements.json')
  const id = newEngagementId()
  const now = new Date().toISOString()

  const entry = {
    id,
    person_id: personId,
    type: 'content-posted',
    workshop_id: workshopId,
    date: now.slice(0, 10),
    details: {
      platform,
      content_url: url,
      reposted_by_frank: false,
      ...(text ? { original_text: text } : {}),
    },
    created_at: now,
  }

  engagements.push(entry)
  writeJson('engagements.json', engagements)

  console.log(`Added engagement ${id}`)
  console.log(`  Person:   ${person.name} (${personId})`)
  console.log(`  Workshop: ${workshop.title} (${workshopId})`)
  console.log(`  Platform: ${platform}`)
  console.log(`  URL:      ${url}`)
  console.log(`  Status:   pending repost`)
}

function cmdList(args) {
  const filterPending = args.includes('--pending')
  const filterReposted = args.includes('--reposted')

  const engagements = readJson('engagements.json')
  const people = readJson('people.json')
  const workshops = readJson('workshops.json')

  let items = engagements
    .filter(e => e.type === 'content-posted')
    .sort((a, b) => b.created_at.localeCompare(a.created_at))

  if (filterPending) {
    items = items.filter(e => !e.details?.reposted_by_frank)
  } else if (filterReposted) {
    items = items.filter(e => e.details?.reposted_by_frank)
  }

  if (items.length === 0) {
    console.log('No engagements match the filter.')
    return
  }

  const personMap = Object.fromEntries(people.map(p => [p.id, p]))
  const workshopMap = Object.fromEntries(workshops.map(w => [w.id, w]))

  for (const e of items) {
    const person = personMap[e.person_id] || { name: e.person_id }
    const workshop = workshopMap[e.workshop_id] || { title: e.workshop_id || 'N/A' }
    const status = e.details?.reposted_by_frank ? 'REPOSTED' : 'PENDING'
    const repostUrl = e.details?.repost_url ? `\n    Repost URL: ${e.details.repost_url}` : ''

    console.log(`\n${e.id}  [${status}]  ${e.date}`)
    console.log(`  Person:   ${person.name} (${e.person_id})`)
    console.log(`  Workshop: ${workshop.title}`)
    console.log(`  Platform: ${e.details?.platform || 'unknown'}`)
    console.log(`  URL:      ${e.details?.content_url || 'N/A'}${repostUrl}`)
  }

  const total = items.length
  const reposted = items.filter(e => e.details?.reposted_by_frank).length
  console.log(`\n${total} engagement(s) — ${reposted} reposted, ${total - reposted} pending`)
}

function cmdRepost(args) {
  const engagementId = flag(args, '--engagement')
  const repostUrl = flag(args, '--url')

  if (!engagementId || !repostUrl) {
    console.error('Usage: queue.mjs repost --engagement <id> --url <frank-repost-url>')
    process.exit(1)
  }

  const engagements = readJson('engagements.json')
  const index = engagements.findIndex(e => e.id === engagementId)

  if (index === -1) {
    console.error(`Engagement "${engagementId}" not found in data/crm/engagements.json`)
    process.exit(1)
  }

  const e = engagements[index]

  if (e.details?.reposted_by_frank) {
    console.warn(`Warning: engagement ${engagementId} was already marked as reposted.`)
    console.warn(`Existing repost URL: ${e.details.repost_url}`)
    console.warn('Updating with new URL.')
  }

  engagements[index] = {
    ...e,
    details: {
      ...e.details,
      reposted_by_frank: true,
      repost_url: repostUrl,
      reposted_at: new Date().toISOString(),
    },
  }

  writeJson('engagements.json', engagements)

  const people = readJson('people.json')
  const person = people.find(p => p.id === e.person_id) || { name: e.person_id }

  console.log(`Engagement ${engagementId} marked as reposted.`)
  console.log(`  Person:     ${person.name}`)
  console.log(`  Original:   ${e.details?.content_url}`)
  console.log(`  Repost URL: ${repostUrl}`)
}

// ─── Argument parser ─────────────────────────────────────────────

function flag(args, name) {
  const i = args.indexOf(name)
  if (i === -1) return undefined
  const val = args[i + 1]
  if (!val || val.startsWith('--')) return undefined
  return val
}

// ─── Entry point ─────────────────────────────────────────────────

const [, , command, ...rest] = process.argv

switch (command) {
  case 'add':
    cmdAdd(rest)
    break
  case 'list':
    cmdList(rest)
    break
  case 'repost':
    cmdRepost(rest)
    break
  default:
    console.error('Usage: queue.mjs <command> [options]')
    console.error('  Commands: add | list | repost')
    console.error('')
    console.error('  add     --person <id> --workshop <id> --platform <platform> --url <url>')
    console.error('  list    [--pending | --reposted]')
    console.error('  repost  --engagement <id> --url <frank-repost-url>')
    process.exit(1)
}
