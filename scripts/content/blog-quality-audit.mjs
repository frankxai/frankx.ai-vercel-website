#!/usr/bin/env node
/**
 * Deterministic editorial audit for content/blog.
 *
 * Enforces the mechanical rules in content/blog/CONTENT_SCHEMA.md and
 * content/blog/EDITORIAL_STANDARD.md (§3 anti-slop phrases, §5 ship checklist).
 * Judgement items (first-hand signal, whether claims are sourced) stay with a reviewer.
 *
 * Usage:
 *   node scripts/content/blog-quality-audit.mjs [--root <dir>] [--json <file>] [--fail-on-error]
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { basename, join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const args = process.argv.slice(2)
const flag = (name) => args.includes(name)
const option = (name) => {
  const i = args.indexOf(name)
  return i === -1 ? null : args[i + 1]
}

const ROOT = option('--root') ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const BLOG_DIR = join(ROOT, 'content', 'blog')
const JSON_OUT = option('--json')
const FAIL_ON_ERROR = flag('--fail-on-error')

const META_FILES = new Set(['CLAUDE.md', 'CONTENT_SCHEMA.md', 'EDITORIAL_STANDARD.md'])
const REQUIRED_KEYS = ['title', 'description', 'date', 'lastUpdated', 'author', 'category', 'tags', 'image', 'tldr', 'readingGoal', 'keywords']
const APPROVED_CATEGORIES = new Set([
  'AI Architecture',
  'Enterprise AI',
  'Creator Systems',
  'Music Intelligence',
  'Intelligence Dispatches',
  'Creativity',
  'Flagship',
  'Consciousness',
])
const ANTI_SLOP = [
  /\bdelve\b/i,
  /\btapestry\b/i,
  /\bin the realm of\b/i,
  /it'?s worth noting that/i,
  /in today'?s fast-paced world/i,
  /imagine a world where/i,
  /\bas an ai\b/i,
  /game-?changer/i,
  /🚀/u,
]
const ORACLE_PRESENT_TENSE = /\b(currently|now|today)\s+(at|with)\s+Oracle\b|\bworking\s+at\s+Oracle\b|\bmy\s+role\s+at\s+Oracle\b/i
const PLACEHOLDER = /\b(TODO|TBD|lorem ipsum)\b|\[insert\b/i
const QUESTION_HEADING = /\?\s*$|^(how|what|why|when|which|who|can|is|are|does|do|should)\b/i
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function listPosts(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      if (entry.startsWith('_hero')) continue
      out.push(...listPosts(full))
    } else if (/\.mdx?$/.test(entry) && !META_FILES.has(entry) && entry !== 'README.md') {
      out.push(full)
    }
  }
  return out
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return { data: null, body: raw }
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z][\w]*):\s*(.*)$/)
    if (!kv) continue
    data[kv[1]] = unquote(kv[2].trim())
  }
  return { data, body: raw.slice(match[0].length) }
}

function unquote(value) {
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => unquote(item.trim()))
      .filter(Boolean)
  }
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1)
  }
  return value
}

function stripCode(body) {
  return body.replace(/```[\s\S]*?```/g, '')
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function auditFile(file) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  const raw = readFileSync(file, 'utf8')
  const findings = []
  const add = (severity, check, message) => findings.push({ severity, check, message })

  const { data, body } = parseFrontmatter(raw)
  const name = basename(file)

  if (!data) {
    add('error', 'frontmatter', 'no YAML frontmatter block')
    return { file: rel, findings }
  }

  for (const key of REQUIRED_KEYS) {
    if (data[key] === undefined || data[key] === '' || (Array.isArray(data[key]) && data[key].length === 0)) {
      add('error', 'frontmatter-required', `missing "${key}"`)
    }
  }

  if (data.title && data.title.length > 60) add('warn', 'title-length', `title is ${data.title.length} chars (max 60)`)
  if (data.description) {
    const len = data.description.length
    if (len < 120 || len > 160) add('warn', 'description-length', `description is ${len} chars (target 120–160)`)
  }
  if (Array.isArray(data.tags) && (data.tags.length < 3 || data.tags.length > 5)) {
    add('warn', 'tag-count', `${data.tags.length} tags (target 3–5)`)
  }
  if (data.tldr) {
    const words = wordCount(data.tldr)
    if (words < 50 || words > 70) add('warn', 'tldr-length', `tldr is ${words} words (target 50–70)`)
  }
  if (data.category && !APPROVED_CATEGORIES.has(data.category)) {
    add('error', 'category', `"${data.category}" is not an approved category`)
  }
  for (const key of ['date', 'lastUpdated']) {
    if (data[key] && !ISO_DATE.test(data[key])) add('error', 'date-format', `${key} "${data[key]}" is not YYYY-MM-DD`)
  }
  if (data.image && !existsSync(join(ROOT, 'public', data.image))) {
    add('warn', 'image-missing', `hero image not on disk: public${data.image} (lib/blog.ts falls back at runtime)`)
  }
  if (/^\d+-/.test(name)) add('warn', 'filename', 'numbered prefix in filename (schema: no numbered prefixes)')

  const prose = stripCode(body)
  const lines = prose.split(/\r?\n/).filter((line) => !line.includes('ai-slop-allow'))
  const scanned = lines.join('\n')

  if (PLACEHOLDER.test(scanned)) add('error', 'placeholder', 'placeholder text left in body')

  for (const pattern of ANTI_SLOP) {
    const hit = scanned.match(pattern)
    if (hit) add('warn', 'anti-slop', `phrase "${hit[0]}" (EDITORIAL_STANDARD §3)`)
  }

  if (ORACLE_PRESENT_TENSE.test(scanned)) {
    add('warn', 'author-canon', 'present-tense Oracle employment wording (EDITORIAL_STANDARD §1), needs a reviewer')
  }

  const h2s = [...prose.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim())
  if (h2s.length > 0 && !h2s.some((h) => QUESTION_HEADING.test(h))) {
    add('warn', 'question-h2', 'no question-form H2 (EDITORIAL_STANDARD §4.5)')
  }
  if (!h2s.some((h) => /faq|frequently asked/i.test(h))) {
    add('warn', 'faq', 'no FAQ section (EDITORIAL_STANDARD §4.5)')
  }

  const internalLinks = [...prose.matchAll(/\]\((\/[^)\s]*)\)/g)].length
  if (internalLinks < 3) add('warn', 'internal-links', `${internalLinks} internal links (target 3+)`)

  const emDashes = (scanned.match(/—/g) || []).length
  if (emDashes > 0) add('info', 'em-dash', `${emDashes} em dash(es), humanizer rule applies to public prose`)

  add('info', 'words', `body ${wordCount(prose)} words`)

  return { file: rel, findings }
}

const files = listPosts(BLOG_DIR)
const results = files.map(auditFile)

const counts = { error: 0, warn: 0, info: 0 }
const byCheck = {}
for (const result of results) {
  for (const finding of result.findings) {
    counts[finding.severity] += 1
    const bucket = (byCheck[finding.check] ??= { error: 0, warn: 0, info: 0 })
    bucket[finding.severity] += 1
  }
}

const clean = results.filter((r) => r.findings.every((f) => f.severity === 'info')).length
const summary = {
  root: ROOT,
  posts: results.length,
  postsWithoutErrorsOrWarnings: clean,
  totals: counts,
  byCheck,
}

console.log(`blog-quality-audit: ${results.length} posts, ${clean} clean`)
console.log(`  errors ${counts.error} · warnings ${counts.warn} · info ${counts.info}`)
for (const [check, bucket] of Object.entries(byCheck).sort((a, b) => b[1].error + b[1].warn - (a[1].error + a[1].warn))) {
  if (bucket.error + bucket.warn === 0) continue
  console.log(`  ${check.padEnd(22)} error ${String(bucket.error).padStart(4)}  warn ${String(bucket.warn).padStart(4)}`)
}

if (JSON_OUT) {
  writeFileSync(JSON_OUT, JSON.stringify({ summary, results }, null, 2))
  console.log(`report written to ${JSON_OUT}`)
}

if (FAIL_ON_ERROR && counts.error > 0) {
  process.exit(1)
}
