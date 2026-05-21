#!/usr/bin/env node
/**
 * debrief-to-newsletter.mjs
 *
 * Generates a 120-180 word newsletter snippet from a workshop debrief.
 * Appends to data/newsletter-queue.json.
 *
 * Usage:
 *   node scripts/workshops/debrief-to-newsletter.mjs docs/workshops/_active/2026-05-19-sovereign-leadership-nldigital/
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')

// ─── Arg parsing ──────────────────────────────────────────────────

const folderArg = process.argv[2]
if (!folderArg) {
  console.error('Usage: node scripts/workshops/debrief-to-newsletter.mjs <workshop-folder>')
  console.error('  Example: node scripts/workshops/debrief-to-newsletter.mjs docs/workshops/_active/2026-05-19-sovereign-leadership-nldigital/')
  process.exit(1)
}

const workshopDir = resolve(ROOT, folderArg.replace(/\\/g, '/'))
if (!existsSync(workshopDir)) {
  console.error(`Workshop folder not found: ${workshopDir}`)
  process.exit(1)
}

// ─── File helpers ─────────────────────────────────────────────────

function readFileSafe(path) {
  if (!existsSync(path)) return null
  return readFileSync(path, 'utf8')
}

function readJson(path) {
  if (!existsSync(path)) return []
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return []
  }
}

function writeJson(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

// ─── Frontmatter parser ───────────────────────────────────────────

function parseFrontmatter(text) {
  if (!text) return { meta: {}, body: '' }
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { meta: {}, body: text }

  const meta = {}
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (key) meta[key] = val
  }
  return { meta, body: match[2].trim() }
}

// ─── Section extractor ────────────────────────────────────────────

function extractSection(markdown, heading) {
  if (!markdown) return null
  const regex = new RegExp(`^##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm')
  const match = regex.exec(markdown)
  if (!match) return null
  const start = match.index + match[0].length
  const rest = markdown.slice(start)
  const nextH2 = rest.search(/\n## /)
  return nextH2 === -1 ? rest.trim() : rest.slice(0, nextH2).trim()
}

// ─── nanoid (same as other CRM scripts) ──────────────────────────

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789'
function nanoid(len = 8) {
  let id = ''
  for (let i = 0; i < len; i++) {
    id += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return id
}

// ─── Load inputs ──────────────────────────────────────────────────

const folderName = basename(workshopDir)

const briefRaw    = readFileSafe(resolve(workshopDir, 'brief.md'))
const debriefRaw  = readFileSafe(resolve(workshopDir, 'debrief.md'))

if (!briefRaw) {
  console.error(`brief.md not found in ${workshopDir}`)
  process.exit(1)
}

const { meta: briefMeta, body: briefBody } = parseFrontmatter(briefRaw)
const { body: debriefBody }  = parseFrontmatter(debriefRaw ?? '')

// ─── Resolve workshop from CRM ────────────────────────────────────

const workshops = readJson(resolve(ROOT, 'data', 'crm', 'workshops.json'))
const workshopId = briefMeta.workshop_id
const workshop = workshops.find(w => w.id === workshopId)

const title    = workshop?.title  || `Workshop — ${briefMeta.host_org || 'Unknown Host'}`
const date     = briefMeta.date   || workshop?.date   || 'unknown date'
const hostOrg  = briefMeta.host_org || workshop?.host_org_id || 'Unknown'
const city     = briefMeta.city   || workshop?.city   || ''
const slug     = (workshop?.slug || folderName.replace(/^\d{4}-\d{2}-\d{2}-/, '')).replace(/-\d{4}-\d{2}-\d{2}$/, '')
const format   = briefMeta.format || workshop?.format || 'workshop'

// ─── Extract useful content ───────────────────────────────────────

// Hook from brief
const hookLine = (() => {
  const hookSection = extractSection(briefBody, 'The hook \\(opening 2 minutes\\)') ||
                      extractSection(briefBody, 'The hook')
  if (!hookSection) return null
  const m = hookSection.match(/_"([^"]+)"_|"([^"]+)"/)
  return m ? (m[1] || m[2]) : null
})()

// Through-line / framework from brief
const throughLine = (() => {
  const section = extractSection(briefBody, 'The through-line') ||
                  extractSection(briefBody, 'The through.line')
  if (!section) return null
  // First non-empty paragraph
  return section.split('\n\n').find(p => p.trim().length > 20)?.trim() ?? null
})()

// Outcomes from brief
const outcomesSection = extractSection(briefBody, 'Outcomes')

// Feedback from debrief
const feedbackSection = debriefBody ? extractSection(debriefBody, 'Feedback') : null
const whatWorked      = debriefBody ? extractSection(debriefBody, 'What worked') : null

// ─── Assemble snippet ─────────────────────────────────────────────

/**
 * Target: 120-180 words, 4 sentences + 1 CTA line.
 * Structure:
 *   Line 1: 1-sentence hook (where, who, setting)
 *   Line 2-3: 2 sentences on the framework
 *   Line 4: 1 sentence on attendee takeaway
 *   CTA: workshop page + book link
 */

const locationStr = city ? `${city}` : hostOrg

const line1 = `Last week I ran the ${format === 'sovereign-leadership' ? 'Sovereign Leadership' : title} workshop with ${hostOrg} in ${locationStr} — ${briefMeta.attendee_count ? `${briefMeta.attendee_count} leaders` : 'a room of senior leaders'} working through what AI governance actually means when your name is on the decisions.`

const line2_3 = throughLine
  ? `${throughLine} The question I kept returning to: which AI decisions in your organization does a human actually own — not approve, but own? Most rooms go quiet at that point. This one didn't.`
  : `The workshop runs the 6-pillar AI CoE framework — Strategy, Governance, Ethics — not as a compliance exercise but as a judgment exercise. The distinction between "approving" an AI decision and "owning" one is where most leadership conversations stall. We didn't let it stall.`

const line4 = (() => {
  if (feedbackSection || whatWorked) {
    // Pull first bullet or quoted line from debrief
    const raw = feedbackSection || whatWorked
    const firstLine = raw?.split('\n').find(l => l.trim().startsWith('-') || l.trim().startsWith('>'))
    if (firstLine) {
      const cleaned = firstLine.replace(/^[->\s*]+/, '').trim()
      return `The room left with Personal AI Sovereignty Assessments in hand and, per one attendee: "${cleaned.slice(0, 120)}${cleaned.length > 120 ? '...' : ''}"`
    }
  }
  return `Every attendee left with a Personal AI Sovereignty Assessment — their own decisions mapped, delegation choices made explicit, and a Q3 commitment written in.`
})()

const ctaLine = `[Run this with your organization → frankx.ai/workshops/${slug.replace('-recap', '')} | Book a session → frankx.ai/workshops/sovereign-leadership#book]`

const snippet = [line1, '', line2_3, '', line4, '', ctaLine].join('\n')
const wordCount = snippet.replace(/\[.*?\]/g, '').split(/\s+/).filter(Boolean).length

// ─── Append to newsletter queue ───────────────────────────────────

const queuePath = resolve(ROOT, 'data', 'newsletter-queue.json')
const queue = readJson(queuePath)

const queueItem = {
  id: `nq_${nanoid()}`,
  workshop_id: workshopId || null,
  status: 'pending',
  draft: snippet,
  word_count: wordCount,
  created_at: new Date().toISOString(),
}

queue.push(queueItem)
writeJson(queuePath, queue)

// ─── Output ───────────────────────────────────────────────────────

console.log('')
console.log('─'.repeat(60))
console.log('NEWSLETTER SNIPPET DRAFT')
console.log(`Workshop: ${title}`)
console.log(`Word count: ~${wordCount} (target: 120-180)`)
console.log('─'.repeat(60))
console.log('')
console.log(snippet)
console.log('')
console.log('─'.repeat(60))
console.log('')
console.log(`Appended to: data/newsletter-queue.json (id: ${queueItem.id})`)
console.log('')

if (!debriefRaw) {
  console.log('Note: debrief.md not found. Run /workshop-debrief after delivery for richer content.')
  console.log('')
}

if (wordCount < 100) {
  console.log(`Warning: snippet is ${wordCount} words — below the 120-word target. Add detail from the debrief.`)
} else if (wordCount > 200) {
  console.log(`Warning: snippet is ${wordCount} words — above the 180-word target. Trim before use.`)
}
