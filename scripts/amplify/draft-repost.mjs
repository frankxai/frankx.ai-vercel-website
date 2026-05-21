#!/usr/bin/env node
/**
 * Draft Frank's repost copy for an attendee's content post.
 *
 * Usage:
 *   node scripts/amplify/draft-repost.mjs --person <person_id> --engagement <engagement_id>
 *   node scripts/amplify/draft-repost.mjs --person <person_id> --url <content-url>
 *
 * Output: prints a prefilled repost draft to stdout.
 * Suggests a pbcopy command at the end.
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const CRM = resolve(ROOT, 'data', 'crm')

// ─── Platform limits ──────────────────────────────────────────────

const CHAR_BUDGET = {
  linkedin: 1300,
  twitter: 270,
  youtube: 500,
}

// ─── File helpers ─────────────────────────────────────────────────

function readJson(file) {
  try {
    return JSON.parse(readFileSync(resolve(CRM, file), 'utf8'))
  } catch (err) {
    console.error(`Error reading ${file}: ${err.message}`)
    process.exit(1)
  }
}

// ─── Argument parser ──────────────────────────────────────────────

function flag(args, name) {
  const i = args.indexOf(name)
  if (i === -1) return undefined
  const val = args[i + 1]
  if (!val || val.startsWith('--')) return undefined
  return val
}

// ─── Draft generators ─────────────────────────────────────────────

function draftLinkedIn({ person, workshop, engagementUrl, originalText }) {
  const handle = person.linkedin
    ? `(LinkedIn: ${person.linkedin})`
    : `@${person.name.toLowerCase().replace(/\s+/g, '')}`
  const role = [person.role, person.org_ids?.length ? '[their org]' : ''].filter(Boolean).join(' at ')

  const bestLine = originalText
    ? `"[FILL IN: the best line from their post]"`
    : `"[FILL IN: quote their best line — max 2 sentences]"`

  const draft = [
    bestLine,
    '',
    `${person.name}${role ? ` — ${role}` : ''} attended the ${workshop.title} workshop and named the thing most leaders miss.`,
    '',
    '[FILL IN: 1 sentence on why this framing matters for your audience]',
    '',
    `This is what I want more leaders to take from that room. Well said, ${person.name.split(' ')[0]}.`,
    '',
    `#SovereignLeadership #HumanCentricAI #AILeadership`,
  ].join('\n')

  return { draft, platform: 'LinkedIn', budget: CHAR_BUDGET.linkedin }
}

function draftTwitter({ person, workshop, engagementUrl, originalText }) {
  const xHandle = `@${person.twitter_handle || '[their-x-handle]'}`

  const bestLine = originalText
    ? `"[FILL IN: the best line from their post — max 1 sentence]"`
    : `"[FILL IN: quote their best 1-sentence line]"`

  const draft = [
    bestLine,
    '',
    `${xHandle} was in the ${workshop.title} workshop and said it better than I could.`,
    '',
    '[FILL IN: 1 sentence on why this matters]',
    '',
    `#SovereignLeadership #HumanCentricAI`,
  ].join('\n')

  return { draft, platform: 'Twitter/X', budget: CHAR_BUDGET.twitter }
}

// ─── Main ─────────────────────────────────────────────────────────

const [, , ...args] = process.argv

const personId = flag(args, '--person')
const engagementId = flag(args, '--engagement')
const contentUrl = flag(args, '--url')

if (!personId || (!engagementId && !contentUrl)) {
  console.error('Usage:')
  console.error('  draft-repost.mjs --person <person_id> --engagement <engagement_id>')
  console.error('  draft-repost.mjs --person <person_id> --url <content-url>')
  process.exit(1)
}

// Load CRM data
const people = readJson('people.json')
const orgs = readJson('orgs.json')
const workshops = readJson('workshops.json')
const engagements = readJson('engagements.json')

// Resolve person
const person = people.find(p => p.id === personId)
if (!person) {
  console.error(`Person "${personId}" not found in data/crm/people.json`)
  process.exit(1)
}

// Resolve org name (first org only)
const orgName = person.org_ids?.length
  ? orgs.find(o => o.id === person.org_ids[0])?.name || '[org unknown]'
  : null

// Resolve engagement
let engagement = null
let workshop = null

if (engagementId) {
  engagement = engagements.find(e => e.id === engagementId)
  if (!engagement) {
    console.error(`Engagement "${engagementId}" not found in data/crm/engagements.json`)
    process.exit(1)
  }
  if (engagement.workshop_id) {
    workshop = workshops.find(w => w.id === engagement.workshop_id)
  }
} else if (contentUrl) {
  // Match by URL
  engagement = engagements.find(e => e.details?.content_url === contentUrl)
  if (!engagement) {
    console.warn(`No engagement found for URL: ${contentUrl}`)
    console.warn('Proceeding with first confirmed workshop for this person.')
    // Fall back to first workshop that includes this person
    for (const w of workshops) {
      if (w.attendee_ids?.includes(personId)) {
        workshop = w
        break
      }
    }
  } else if (engagement.workshop_id) {
    workshop = workshops.find(w => w.id === engagement.workshop_id)
  }
}

// Final workshop fallback
if (!workshop) {
  workshop = workshops[0]
  if (!workshop) {
    console.error('No workshops found in data/crm/workshops.json')
    process.exit(1)
  }
  console.warn(`Warning: could not resolve specific workshop — using "${workshop.title}" as fallback.`)
}

const platform = engagement?.details?.platform || 'linkedin'
const engagementUrl = engagement?.details?.content_url || contentUrl || '[URL not found]'
const originalText = engagement?.details?.original_text || null

// Enrich person with org name for display
const personDisplay = { ...person }
if (orgName) {
  personDisplay._orgName = orgName
}

// Generate drafts
console.log('='.repeat(72))
console.log(`REPOST DRAFT — ${person.name}`)
console.log(`Workshop: ${workshop.title} (${workshop.date})`)
console.log(`Original: ${engagementUrl}`)
console.log(`Platform: ${platform}`)
if (originalText) {
  console.log('')
  console.log('ORIGINAL POST TEXT:')
  console.log('-'.repeat(40))
  console.log(originalText)
}
console.log('='.repeat(72))

// Always generate LinkedIn + Twitter drafts
const liDraft = draftLinkedIn({ person, workshop, engagementUrl, originalText })
const twDraft = draftTwitter({ person, workshop, engagementUrl, originalText })

console.log('')
console.log(`--- LINKEDIN (budget: ${liDraft.budget} chars) ---`)
console.log('')
console.log(liDraft.draft)
console.log('')
console.log(`[Char count: ~${liDraft.draft.length}]`)

console.log('')
console.log(`--- TWITTER/X (budget: ${twDraft.budget} chars) ---`)
console.log('')
console.log(twDraft.draft)
console.log('')
console.log(`[Char count: ~${twDraft.draft.length}]`)

console.log('')
console.log('='.repeat(72))
console.log('PROTOCOL CHECKLIST (from crosspost-checklist.md):')
console.log('  [ ] Quoted their best line (max 2 sentences)')
console.log('  [ ] Added 1 sentence on why it matters')
console.log('  [ ] @mentioned them with permission')
console.log('  [ ] Included workshop hashtag')
console.log('  [ ] Did NOT correct their framing')
console.log('')
console.log('QUALITY GATE:')
console.log('  [ ] Post is accurate (not embarrassing to either party)')
console.log('  [ ] Reflects real takeaway, not a forced pitch')
console.log('  [ ] Contains a specific artifact or outcome')
console.log('  [ ] "Would I be proud to have taught this person?"')
console.log('='.repeat(72))
console.log('')
console.log('To copy LinkedIn draft to clipboard (macOS):')
console.log(`  node scripts/amplify/draft-repost.mjs --person ${personId} ${engagementId ? `--engagement ${engagementId}` : `--url "${engagementUrl}"`} | pbcopy`)
console.log('')
console.log('After posting, mark as reposted:')
if (engagement) {
  console.log(`  node scripts/amplify/queue.mjs repost --engagement ${engagement.id} --url "<your-repost-url>"`)
} else {
  console.log(`  node scripts/amplify/queue.mjs repost --engagement <engagement_id> --url "<your-repost-url>"`)
}
