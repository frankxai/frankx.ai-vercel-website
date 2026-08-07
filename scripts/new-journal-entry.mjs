#!/usr/bin/env node

/**
 * Journal entry scaffold.
 *
 * Writing a daily note should be one command, not "copy the template, rename
 * it, fix the date, hope the frontmatter is right". Creates today's entry in
 * content/journal/ with valid frontmatter and opens nothing — you write in
 * whatever editor you already have open.
 *
 *   pnpm journal:new "What broke in the build today"
 *   pnpm journal:new "Shipped the split" --kind log
 *   pnpm journal:new "Half-formed thought" --private
 *   pnpm journal:new "Backfill" --date 2026-07-24
 *
 * The frontmatter contract lives in lib/journal.ts. Keep this in sync with it.
 */

import { writeFile, mkdir, access } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const JOURNAL_DIR = join(__dirname, '..', 'content', 'journal')

const KINDS = ['daily', 'note', 'log']

function parseArgs(argv) {
  const args = { title: '', kind: 'daily', visibility: 'public', date: '' }
  const rest = []

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--kind') args.kind = argv[++i] ?? ''
    else if (arg === '--date') args.date = argv[++i] ?? ''
    else if (arg === '--private') args.visibility = 'private'
    else if (arg.startsWith('--')) throw new Error(`Unknown flag: ${arg}`)
    else rest.push(arg)
  }

  args.title = rest.join(' ').trim()
  return args
}

/** Today in the local timezone — not UTC, so a late-night note is not filed tomorrow. */
function today() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function slugify(title) {
  return title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '')
}

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

function fail(message) {
  console.error(`journal:new — ${message}`)
  process.exit(1)
}

// parseArgs throws on an unknown flag. Catch it so a typo gets the same clean
// one-line error as every other bad input, rather than a Node stack trace.
let args
try {
  args = parseArgs(process.argv.slice(2))
} catch (error) {
  fail(error instanceof Error ? error.message : String(error))
}

if (!args.title) {
  fail(
    'a title is required.\n\n' +
      '  pnpm journal:new "What broke in the build today"\n' +
      '  pnpm journal:new "Shipped the split" --kind log\n' +
      '  pnpm journal:new "Half-formed thought" --private\n' +
      '  pnpm journal:new "Backfill" --date 2026-07-24\n\n' +
      `  --kind     ${KINDS.join(' | ')}   (default: daily)\n` +
      '  --private  keep it out of the index, feed, sitemap, and its own URL\n' +
      '  --date     YYYY-MM-DD             (default: today)',
  )
}

if (!KINDS.includes(args.kind)) {
  fail(`--kind must be one of: ${KINDS.join(', ')} (got "${args.kind}")`)
}

const date = args.date || today()
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  fail(`--date must be YYYY-MM-DD (got "${date}")`)
}
// Reject a date that looks right but is not a real day — "2026-02-30" would
// otherwise be silently rolled forward by the loader and land under "Undated".
const parsed = new Date(date)
if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
  fail(`"${date}" is not a real calendar date`)
}

const slug = slugify(args.title)
if (!slug) fail(`could not build a slug from "${args.title}" — try plainer words`)

const filename = `${date}-${slug}.md`
const filepath = join(JOURNAL_DIR, filename)

if (await exists(filepath)) {
  fail(`${filename} already exists — edit it instead of overwriting it`)
}

// The date is quoted so it stays a string. Unquoted, YAML parses it into a
// Date; lib/journal.ts normalizes that, but writing it correctly is clearer.
const body = `---
title: "${args.title.replace(/"/g, '\\"')}"
date: "${date}"
kind: "${args.kind}"
summary: ""
tags: []
visibility: "${args.visibility}"
published: true
---

`

await mkdir(JOURNAL_DIR, { recursive: true })
await writeFile(filepath, body, 'utf8')

console.log(`content/journal/${filename}`)

if (args.visibility === 'private') {
  // No URL to print — a private entry has no route. Saying so plainly beats
  // printing an address that 404s.
  console.log('  private — no URL. Kept out of the index, feed, sitemap, and its own route.')
  console.log(
    '\nThis is not access control. Committing the file publishes its text to this\n' +
      'public repo on GitHub; it just never reaches frankx.ai. Anything you would\n' +
      'not show a stranger belongs outside the repo entirely.',
  )
} else {
  console.log(`  /journal/${date}-${slug}`)
  console.log('\nFill in the summary line, write the note, commit. That publishes it.')
}
