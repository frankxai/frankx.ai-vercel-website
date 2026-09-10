#!/usr/bin/env node
/**
 * Editorial signal audit for public FrankX articles.
 *
 * This is a prioritisation instrument, not an authorship detector. It surfaces
 * sentence habits and evidence gaps that a human editor should inspect. It is
 * deliberately non-blocking by default because an isolated match can be the
 * right sentence; repetition across a page or portfolio is the problem.
 *
 * Usage:
 *   node scripts/audit-editorial-signals.mjs
 *   node scripts/audit-editorial-signals.mjs --json
 *   node scripts/audit-editorial-signals.mjs --file content/blog/example.mdx
 *   node scripts/audit-editorial-signals.mjs --strict --file content/blog/example.mdx
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { isCanonicalBlogSlug } from '../lib/blog-redirects.mjs'

const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'content', 'blog')
const JSON_OUTPUT = process.argv.includes('--json')
const STRICT = process.argv.includes('--strict')
const fileArgIndex = process.argv.indexOf('--file')
const ONE_FILE = fileArgIndex >= 0 ? process.argv[fileArgIndex + 1] : null

const SIGNALS = [
  {
    id: 'negative_parallelism',
    label: 'synthetic negative parallelism',
    weight: 4,
    regex: /\b(?:not\s+(?:just|only|merely)|isn['’]t\s+(?:just|only|merely))\b[^.!?\n]{0,180}\bbut\b/gi,
  },
  {
    id: 'binary_reframe',
    label: 'binary reframe',
    weight: 3,
    regex: /\b(?:the\s+(?:goal|question|answer|result|point|risk|move|opportunity|difference)|this|it)\s+(?:is|was)\s+not\b[^.!?\n]{0,180}[.!?]/gi,
  },
  {
    id: 'copula_avoidance',
    label: 'inflated copula',
    weight: 2,
    regex: /\b(?:serves|stands|functions|acts)\s+as\b/gi,
  },
  {
    id: 'superficial_participle',
    label: 'superficial -ing clause',
    weight: 2,
    regex: /,\s+(?:highlighting|underscoring|showcasing|reflecting|ensuring|fostering|cultivating|contributing)\b/gi,
  },
  {
    id: 'vague_authority',
    label: 'vague authority',
    weight: 4,
    regex: /\b(?:experts|observers|industry reports|some critics|many believe)\s+(?:say|argue|believe|suggest|show|have)\b/gi,
  },
  {
    id: 'promotional_vocabulary',
    label: 'promotional or model-default vocabulary',
    weight: 1,
    regex: /\b(?:pivotal|crucial|vibrant|groundbreaking|intricate|tapestry|landscape|showcase|seamless|transformative|profound|powerful)\b/gi,
  },
  {
    id: 'inline_header_list',
    label: 'mechanical bold-label list',
    weight: 1,
    regex: /^\s*[-*]\s+\*\*[^*\n]+\*\*:/gm,
  },
  {
    id: 'generic_intro',
    label: 'generic opening',
    weight: 6,
    firstWords: 140,
    regex: /\b(?:in today['’]s|imagine a world|the (?:world|landscape) of .{0,35} is (?:changing|evolving)|welcome to|in an era where)\b/gi,
  },
]

function bodyWithoutFrontmatter(raw) {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
}

function proseWithoutCode(raw) {
  return bodyWithoutFrontmatter(raw)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`\n]+`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
}

function countMatches(text, regex) {
  regex.lastIndex = 0
  return [...text.matchAll(regex)].length
}

function firstWords(text, limit) {
  return text.split(/\s+/).filter(Boolean).slice(0, limit).join(' ')
}

function firstMatchLine(raw, regex) {
  regex.lastIndex = 0
  const match = regex.exec(raw)
  if (!match) return null
  return raw.slice(0, match.index).split(/\r?\n/).length
}

async function collectFiles() {
  if (ONE_FILE) return [path.resolve(ROOT, ONE_FILE)]
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
    .filter((entry) => isCanonicalBlogSlug(entry.name.replace(/\.mdx$/, '')))
    .map((entry) => path.join(BLOG_DIR, entry.name))
}

async function audit(file) {
  const raw = await fs.readFile(file, 'utf8')
  const prose = proseWithoutCode(raw)
  const wordCount = prose.split(/\s+/).filter(Boolean).length
  const opening = firstWords(prose, 140)
  const results = SIGNALS.map((signal) => {
    const scope = signal.firstWords ? opening : prose
    const count = countMatches(scope, signal.regex)
    return {
      id: signal.id,
      label: signal.label,
      count,
      weight: signal.weight,
      firstLine: count ? firstMatchLine(raw, signal.regex) : null,
    }
  }).filter((signal) => signal.count > 0)

  const emDashes = (prose.match(/—/g) || []).length
  const outboundLinks = (prose.match(/\]\(https?:\/\//g) || []).length
  const firstPerson = countMatches(prose, /\b(?:I|I['’]m|I['’]ve|my|mine)\b/g)
  const readerAddress = countMatches(prose, /\b(?:you|your|you['’]re|you['’]ve)\b/gi)
  const score = results.reduce((sum, signal) => sum + signal.count * signal.weight, 0)
    + Math.max(0, emDashes - Math.ceil(wordCount / 350))

  return {
    file: path.relative(ROOT, file).replace(/\\/g, '/'),
    words: wordCount,
    score,
    emDashes,
    emDashesPerThousand: wordCount ? Number((emDashes * 1000 / wordCount).toFixed(1)) : 0,
    outboundLinks,
    firstPerson,
    readerAddress,
    signals: results,
  }
}

const files = await collectFiles()
const reports = []
for (const file of files) reports.push(await audit(file))
reports.sort((a, b) => b.score - a.score || b.words - a.words)

if (JSON_OUTPUT) {
  console.log(JSON.stringify({ scanned: reports.length, reports }, null, 2))
} else {
  console.log(`editorial-signals: ${reports.length} public article files scanned`)
  console.log('score  words  —/1k  links  I/me  you  file')
  for (const report of reports.slice(0, ONE_FILE ? 1 : 30)) {
    console.log([
      String(report.score).padStart(5),
      String(report.words).padStart(5),
      String(report.emDashesPerThousand).padStart(5),
      String(report.outboundLinks).padStart(5),
      String(report.firstPerson).padStart(4),
      String(report.readerAddress).padStart(4),
      report.file,
    ].join('  '))
    for (const signal of report.signals) {
      console.log(`       ${signal.count}× ${signal.label}${signal.firstLine ? ` (first L${signal.firstLine})` : ''}`)
    }
  }
}

if (STRICT && reports.some((report) => report.score > 0)) process.exit(1)
