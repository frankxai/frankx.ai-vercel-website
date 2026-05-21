#!/usr/bin/env node
/**
 * debrief-to-blog.mjs
 *
 * Generates a blog post MDX draft from a workshop folder.
 *
 * Usage:
 *   node scripts/workshops/debrief-to-blog.mjs docs/workshops/_active/2026-05-19-sovereign-leadership-nldigital/
 *
 * Reads:
 *   {folder}/brief.md
 *   {folder}/debrief.md          (may not exist yet — handled gracefully)
 *   {folder}/content-kit/blog-recap.md
 *
 * Resolves workshop metadata from data/crm/workshops.json.
 *
 * Writes:
 *   content/drafts/YYYY-MM-DD-{workshop-slug}-recap.mdx
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')

// ─── Arg parsing ──────────────────────────────────────────────────

const folderArg = process.argv[2]
if (!folderArg) {
  console.error('Usage: node scripts/workshops/debrief-to-blog.mjs <workshop-folder>')
  console.error('  Example: node scripts/workshops/debrief-to-blog.mjs docs/workshops/_active/2026-05-19-sovereign-leadership-nldigital/')
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
  return JSON.parse(readFileSync(path, 'utf8'))
}

// ─── Frontmatter parser (minimal) ────────────────────────────────

/**
 * Parses YAML-style frontmatter from a markdown string.
 * Returns { meta: {}, body: string }
 */
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

/**
 * Extracts all content under a given H2 heading from a markdown body.
 * Returns the content as a string, or null if heading not found.
 */
function extractSection(markdown, heading) {
  if (!markdown) return null
  const headingRegex = new RegExp(`^##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm')
  const match = headingRegex.exec(markdown)
  if (!match) return null

  const start = match.index + match[0].length
  const rest = markdown.slice(start)

  // End at next H2 or end of file
  const nextH2 = rest.search(/\n## /)
  return nextH2 === -1 ? rest.trim() : rest.slice(0, nextH2).trim()
}

/**
 * Extract a bullet list section and return as plain text.
 */
function extractBullets(markdown, heading) {
  const section = extractSection(markdown, heading)
  if (!section) return null
  return section
}

// ─── [FILL IN] detector ───────────────────────────────────────────

function findFillIns(text) {
  const matches = []
  const regex = /\[FILL IN[^\]]*\]/g
  let m
  while ((m = regex.exec(text)) !== null) {
    matches.push(m[0])
  }
  return [...new Set(matches)]
}

// ─── Slug from folder name ────────────────────────────────────────

function folderToSlug(folderName) {
  // e.g. "2026-05-19-sovereign-leadership-nldigital" → "sovereign-leadership-nldigital"
  // Strip leading date if present
  return folderName.replace(/^\d{4}-\d{2}-\d{2}-/, '')
}

/**
 * Normalize a slug for use in the output filename and frontmatter.
 * Strips trailing -YYYY-MM-DD suffixes that end up duplicated when the
 * workshop slug itself contains the date.
 * e.g. "sovereign-leadership-nldigital-2026-05-19" → "sovereign-leadership-nldigital"
 */
function normalizeSlug(slug) {
  return slug.replace(/-\d{4}-\d{2}-\d{2}$/, '')
}

// ─── Load inputs ──────────────────────────────────────────────────

const folderName = basename(workshopDir)

const briefRaw   = readFileSafe(resolve(workshopDir, 'brief.md'))
const debriefRaw = readFileSafe(resolve(workshopDir, 'debrief.md'))
const blogRecapRaw = readFileSafe(resolve(workshopDir, 'content-kit', 'blog-recap.md'))

if (!briefRaw) {
  console.error(`brief.md not found in ${workshopDir}`)
  console.error('The workshop folder must contain brief.md.')
  process.exit(1)
}

const { meta: briefMeta, body: briefBody } = parseFrontmatter(briefRaw)
const { body: debriefBody } = parseFrontmatter(debriefRaw ?? '')

// ─── Resolve workshop from CRM ────────────────────────────────────

const workshops = readJson(resolve(ROOT, 'data', 'crm', 'workshops.json'))
const workshopId = briefMeta.workshop_id
const workshop = workshops.find(w => w.id === workshopId)

if (!workshop && workshopId) {
  console.warn(`Warning: workshop "${workshopId}" not found in data/crm/workshops.json. Using brief metadata.`)
}

const date       = briefMeta.date || (workshop?.date ?? 'YYYY-MM-DD')
const title      = workshop?.title || `Workshop Recap — ${briefMeta.host_org || 'Unknown Host'}`
const hostOrg    = briefMeta.host_org || workshop?.host_org_id || 'Unknown'
const format     = briefMeta.format || workshop?.format || 'workshop'
const city       = briefMeta.city || workshop?.city || ''
const slug       = normalizeSlug(workshop?.slug || folderToSlug(folderName))

// Tags from format
const tags = [
  'Workshop',
  format === 'sovereign-leadership' ? 'AI Leadership' : 'AI',
  'Executive Education',
  'AI CoE',
].filter(Boolean)

// ─── Extract sections ─────────────────────────────────────────────

// From brief
const audienceSection   = extractSection(briefBody, 'Audience')
const outcomesSection   = extractSection(briefBody, 'Outcomes')
const hookLine          = (() => {
  const hookSection = extractSection(briefBody, 'The hook \\(opening 2 minutes\\)') ||
                      extractSection(briefBody, 'The hook')
  if (!hookSection) return null
  // Extract the italicised or quoted line
  const m = hookSection.match(/_"([^"]+)"_|"([^"]+)"/)
  return m ? (m[1] || m[2]) : hookSection.split('\n')[0].replace(/^_|_$/g, '').trim()
})()

// From debrief (may be empty/template)
const whatWorked     = debriefBody ? extractSection(debriefBody, 'What worked')    : null
const surprises      = debriefBody ? extractSection(debriefBody, 'Surprises')      : null
const feedbackSection = debriefBody ? extractSection(debriefBody, 'Feedback')       : null
const followUps      = debriefBody ? extractSection(debriefBody, 'Business follow-ups') : null

// From content-kit blog-recap (attendee-facing — mine for framework structure)
const blogFrameworkSection = blogRecapRaw ? extractSection(
  parseFrontmatter(blogRecapRaw).body,
  'The framework'
) : null

// ─── Build excerpt ────────────────────────────────────────────────

const excerpt = `${title} — inside the room, the framework, and what attendees took away. Frank Riemer runs the ${format === 'sovereign-leadership' ? 'Sovereign Leadership' : format} workshop at ${hostOrg}${city ? `, ${city}` : ''}.`

// ─── Build framework body ─────────────────────────────────────────

const frameworkBody = blogFrameworkSection
  ? `## The framework\n\n${blogFrameworkSection}`
  : `## The framework\n\n[FILL IN: summarize the 3 pillars covered in the session — Strategy, Governance, Ethics — with the specific framing used in this delivery]`

// ─── Build debrief-sourced sections ──────────────────────────────

const momentSection = (() => {
  if (whatWorked) {
    return `## The moment that landed\n\n${whatWorked}`
  }
  if (!debriefRaw) {
    return `## The moment that landed\n\n[FILL IN: complete after running /workshop-debrief — what specific moment created the biggest shift in the room?]`
  }
  return `## The moment that landed\n\n[FILL IN: from debrief — the specific exercise or discussion where the framework clicked]`
})()

const attendeeChangeSection = (() => {
  if (feedbackSection) {
    return `## What changed for attendees\n\n${feedbackSection}`
  }
  if (!debriefRaw) {
    return `## What changed for attendees\n\n[FILL IN: complete after running /workshop-debrief — attendee feedback verbatim, what they committed to]`
  }
  return `## What changed for attendees\n\n[FILL IN: from debrief — specific commitments attendees made. Quote verbatim where possible, anonymize if sensitive]`
})()

// ─── Build next section ───────────────────────────────────────────

const nextSection = `## What's next

Run this workshop with your team. The Sovereign Leadership framework is available at [frankx.ai/workshops/sovereign-leadership](https://frankx.ai/workshops/sovereign-leadership).

If you were in the room and want to go deeper, [book a 1:1](https://frankx.ai/workshops/sovereign-leadership#book).`

// ─── Assemble MDX ─────────────────────────────────────────────────

const mdxContent = `---
title: "${title} — Workshop Recap"
date: "${date}"
slug: "${slug}-recap"
author: "Frank Riemer"
category: "Workshops"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
excerpt: "${excerpt}"
hero: null
status: "draft"
workshop_id: "${workshopId || ''}"
---

{/* Workshop recap — generated by scripts/workshops/debrief-to-blog.mjs */}
{/* Review all [FILL IN] markers before publishing */}

## TL;DR

${hookLine
  ? `"${hookLine}" That was the opening frame at ${hostOrg}. Two hours later, the room had their answers.`
  : `[FILL IN: 2-3 sentence summary of what happened in the room and what attendees left with]`
}

## Opening context

${audienceSection
  ? audienceSection.split('\n').slice(0, 3).join('\n')
  : `[FILL IN: set the scene — who was in the room, where, why this group at this moment]`
}

${city ? `${city}, ${briefMeta.country || ''}. ${date}.` : `${date}.`}

${frameworkBody}

${momentSection}

${attendeeChangeSection}

${nextSection}
`

// ─── Write output ─────────────────────────────────────────────────

const outputDir = resolve(ROOT, 'content', 'drafts')
mkdirSync(outputDir, { recursive: true })

const outputFilename = `${date}-${slug}-recap.mdx`
const outputPath = resolve(outputDir, outputFilename)

writeFileSync(outputPath, mdxContent, 'utf8')

// ─── Report ───────────────────────────────────────────────────────

const fillIns = findFillIns(mdxContent)

console.log('')
console.log(`Blog draft written to:`)
console.log(`  content/drafts/${outputFilename}`)
console.log('')

if (fillIns.length > 0) {
  console.log(`${fillIns.length} [FILL IN] marker(s) require human edits:`)
  for (const marker of fillIns) {
    console.log(`  ${marker}`)
  }
  console.log('')
  if (!debriefRaw) {
    console.log('Note: debrief.md not found. Run /workshop-debrief after delivery to fill in the qualitative sections.')
    console.log('')
  }
} else {
  console.log('No [FILL IN] markers — draft is ready for review.')
  console.log('')
}

console.log('Before publishing:')
console.log('  1. Fill in all [FILL IN] markers')
console.log('  2. Add a hero image path')
console.log('  3. Review for brand voice (no AI tells, one idea per paragraph)')
console.log('  4. Run through SEO checklist in CLAUDE.md')
