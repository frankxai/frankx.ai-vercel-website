#!/usr/bin/env node
/**
 * Schema gate for newsletter issues. Runs in `pnpm merge:gate` so a draft that
 * the site loader would silently drop can never reach main.
 *
 * Usage: node scripts/newsletter/validate.mjs [issueNumber]
 */

import { readAllIssues, getIssue, REQUIRED_FIELDS, STATUSES } from './lib.mjs'

const AI_SLOP = ['delve', 'dive into', "it's worth noting", 'in today’s fast-paced', 'unlock the power', 'game-changer']

function validate(issue) {
  const errors = []
  const warnings = []
  const { data, content, basename } = issue

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === '') errors.push(`missing frontmatter: ${field}`)
  }

  if (data.title && !data.subject) errors.push('uses `title` — the site loader reads `subject`')
  if (data.issueNumber && data.issue === undefined) errors.push('uses `issueNumber` — the site loader reads `issue`')

  if (typeof data.issue !== 'number') errors.push('`issue` must be a number')
  if (data.status && !STATUSES.includes(data.status)) {
    errors.push(`status "${data.status}" not one of ${STATUSES.join('|')}`)
  }
  const ext = basename.slice(basename.lastIndexOf('.'))
  if (typeof data.issue === 'number' && basename !== `issue-${data.issue}${ext}`) {
    errors.push(`filename ${basename} does not match issue ${data.issue}`)
  }

  // Dates were only checked for presence, so `date: "next Friday sometime"`
  // passed and shipped verbatim into the email header.
  for (const key of ['date', 'sendAt', 'sentAt']) {
    if (data[key] !== undefined && Number.isNaN(new Date(data[key]).getTime())) {
      errors.push(`\`${key}\` is not a parseable date: ${JSON.stringify(String(data[key]))}`)
    }
  }

  // `status: sent` is a claim that an email reached people. Require the receipt,
  // not the schedule — otherwise a hand-edited draft appears on the public
  // archive as a delivered issue.
  if (data.status === 'sent') {
    if (!data.sentAt) errors.push('`status: sent` requires `sentAt` (the receipt, not `sendAt`)')
    if (!data.broadcastId) errors.push('`status: sent` requires `broadcastId` — no evidence it was delivered')
  }

  if (data.gateStatus === 'fail') {
    errors.push('gateStatus is `fail` — the integrity gate rejected this issue')
  }
  if (['staged', 'scheduled', 'sent'].includes(data.status) && data.gateStatus !== 'pass') {
    errors.push(`status "${data.status}" requires gateStatus: pass (currently ${data.gateStatus || 'unset'})`)
  }
  if (data.slug && !/^issue-\d+-[a-z0-9-]+$/.test(data.slug)) {
    warnings.push(`slug "${data.slug}" is off-convention (issue-N-kebab-title)`)
  }
  if (data.subject && String(data.subject).length > 72) {
    warnings.push(`subject is ${String(data.subject).length} chars — inbox truncates past ~60`)
  }
  if (data.preview && String(data.preview).length > 140) {
    warnings.push(`preview is ${String(data.preview).length} chars — preheader truncates past ~100`)
  }
  if ((data.status === 'scheduled' || data.status === 'sent') && !data.sendAt) {
    errors.push('`sendAt` required once status is scheduled or sent')
  }

  const ctas = [...content.matchAll(/\]\((https?:\/\/(?:www\.)?frankx\.ai)?\/(inner-circle|acos|gencreator|products?)[^)]*\)/g)]
  if (ctas.length > 3) warnings.push(`${ctas.length} product CTAs — cadence spec allows one primary, one secondary`)
  if (ctas.length === 0) warnings.push('no primary CTA found in body')

  const lower = content.toLowerCase()
  for (const phrase of AI_SLOP) {
    if (lower.includes(phrase)) warnings.push(`AI-slop phrase: "${phrase}"`)
  }

  if (content.trim().length < 800) warnings.push('body under 800 chars — likely a stub')

  return { errors, warnings }
}

const arg = process.argv[2]
const issues = arg ? [getIssue(arg)].filter(Boolean) : readAllIssues()

if (!issues.length) {
  console.error(arg ? `No issue ${arg} found.` : 'No issues found.')
  process.exit(1)
}

const seen = new Map()
// Slugs, not numbers, route the archive URLs — and numbers are already unique by
// construction via the filename check, so guarding only numbers guarded nothing.
// A duplicate slug makes /newsletter/archive/<slug> resolve to the wrong issue.
const slugs = new Map()
for (const i of readAllIssues()) {
  if (!i.data.slug) continue
  if (slugs.has(i.data.slug)) slugs.set(i.data.slug, `${slugs.get(i.data.slug)}, ${i.basename}`)
  else slugs.set(i.data.slug, i.basename)
}

let failed = 0

for (const issue of issues) {
  const { errors, warnings } = validate(issue)
  const n = issue.data.issue
  if (seen.has(n)) errors.push(`duplicate issue number ${n} (also ${seen.get(n)})`)
  else seen.set(n, issue.basename)

  const owners = slugs.get(issue.data.slug)
  if (owners && owners.includes(',')) {
    errors.push(`slug "${issue.data.slug}" collides across: ${owners}`)
  }

  const label = `${issue.basename} (${issue.data.status || 'no status'})`
  if (errors.length) {
    failed++
    console.log(`\nFAIL ${label}`)
    errors.forEach((e) => console.log(`   x ${e}`))
    warnings.forEach((w) => console.log(`   ! ${w}`))
  } else if (warnings.length) {
    console.log(`\nWARN ${label}`)
    warnings.forEach((w) => console.log(`   ! ${w}`))
  } else {
    console.log(`PASS ${label}`)
  }
}

console.log(`\n${issues.length} issue(s) checked · ${failed} failing`)
process.exit(failed ? 1 : 0)
