/**
 * Shared substrate for the newsletter pipeline (validate → render → send).
 *
 * One canonical issue schema lives here. `lib/newsletter-issues.ts` (the site
 * loader) and `.claude/workflows/newsletter-friday.js` (the drafter) must both
 * agree with it — the 2026-06 breakage was a drafter writing `issueNumber`/
 * `title` while the loader required `issue`/`subject`, so every generated issue
 * was silently dropped from the archive.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const here = path.dirname(fileURLToPath(import.meta.url))
export const REPO_ROOT = path.resolve(here, '../..')
export const ISSUES_DIR = path.join(REPO_ROOT, 'content/newsletters/issues')
export const RENDER_DIR = path.join(REPO_ROOT, 'content/newsletters/rendered')

/** Frontmatter keys without which the site loader drops the issue entirely. */
export const REQUIRED_FIELDS = ['issue', 'slug', 'subject', 'preview', 'date', 'theme', 'status']

export const STATUSES = ['draft', 'staged', 'scheduled', 'sent', 'archived']

/**
 * Sending identity. The agent team is named because it did the work — but Frank's
 * name comes first and the address is the already-verified `frank@mail.frankx.ai`.
 *
 * Two reasons, both load-bearing: sender-name recognition is the largest single
 * open-rate factor and this list has been dormant for ~10 weeks, so an unfamiliar
 * From name is the worst possible re-engagement signal; and a personal brand's
 * accountability has to stay attached to a person. The brigade gets the credits,
 * the chef signs the menu.
 */
export const IDENTITY = {
  from: process.env.NEWSLETTER_FROM || 'Frank Riemer & the FrankX Agents <frank@mail.frankx.ai>',
  replyTo: process.env.NEWSLETTER_REPLY_TO || 'frank@frankx.ai',
  audienceId: process.env.RESEND_AUDIENCE_ID || '4d2e913e-6903-4dd4-8749-c02cdb844331',
}

/**
 * AI provenance line carried by every issue, per AI-DISCLOSURE-STANDARD.md.
 * States the actual division of labour rather than a generic "AI was used".
 */
export const DISCLOSURE =
  'Researched and drafted by the FrankX agentic team — a supervised set of AI research and ' +
  'writing agents. Every issue is reviewed, edited, and approved by Frank Riemer before it sends.'

/**
 * Per-issue colophon. The agent team's contribution belongs where a reader can
 * evaluate it — inside the issue, with numbers — not compressed into a From name.
 */
export function colophon({ streams = 5, signals, issue } = {}) {
  const counted = signals ? `${signals} signals surfaced, ` : ''
  return `How this issue was made: ${streams} parallel research streams, ${counted}drafted by the FrankX agent team, edited and approved by Frank before send. Issue ${issue}.`
}

export function issuePath(n) {
  return path.join(ISSUES_DIR, `issue-${n}.mdx`)
}

export function readIssue(file) {
  const full = path.isAbsolute(file) ? file : path.join(ISSUES_DIR, file)
  if (!fs.existsSync(full)) return null
  const { data, content } = matter(fs.readFileSync(full, 'utf8'))
  return { file: full, basename: path.basename(full), data, content }
}

export function readAllIssues() {
  if (!fs.existsSync(ISSUES_DIR)) return []
  return fs
    .readdirSync(ISSUES_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => readIssue(f))
    .filter(Boolean)
    .sort((a, b) => (Number(a.data.issue) || 0) - (Number(b.data.issue) || 0))
}

export function getIssue(n) {
  return readAllIssues().find((i) => Number(i.data.issue) === Number(n)) || null
}

/**
 * Highest issue number on disk + 1. The drafter must call this instead of
 * defaulting to 1 — the old `args?.issue ?? 1` clobbered issue-1.mdx on every
 * unattended cloud run.
 */
export function nextIssueNumber() {
  const nums = readAllIssues().map((i) => Number(i.data.issue) || 0)
  return nums.length ? Math.max(...nums) + 1 : 1
}

/** Rewrites frontmatter in place, preserving body. */
export function updateFrontmatter(n, patch) {
  const issue = getIssue(n)
  if (!issue) throw new Error(`issue ${n} not found`)
  const merged = { ...issue.data, ...patch }
  fs.writeFileSync(issue.file, matter.stringify(issue.content, merged), 'utf8')
  return issue.file
}

/**
 * Friday 11:00 Europe/Berlin, always in the future.
 *
 * The offset is derived, not hardcoded: Berlin is +01:00 from late October to
 * late March, so a fixed +02:00 schedules every winter issue an hour wrong. And
 * a run that happens ON a Friday must target the NEXT one, or it produces a
 * sendAt already in the past.
 */
export function nextFridayISO(from = new Date()) {
  const d = new Date(from)
  const delta = (5 - d.getUTCDay() + 7) % 7 || 7
  d.setUTCDate(d.getUTCDate() + delta)

  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  const date = `${yyyy}-${mm}-${dd}`

  // Ask the runtime what Berlin's UTC offset is on that specific date.
  const noon = new Date(`${date}T12:00:00Z`)
  const berlin = new Date(noon.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }))
  const utc = new Date(noon.toLocaleString('en-US', { timeZone: 'UTC' }))
  const offsetHours = Math.round((berlin - utc) / 3600000)
  const offset = `+${String(offsetHours).padStart(2, '0')}:00`

  return { date, sendAt: `${date}T11:00:00${offset}` }
}
