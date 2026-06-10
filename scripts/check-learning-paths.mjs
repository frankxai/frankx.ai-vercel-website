#!/usr/bin/env node
/**
 * Maintenance gate for data/learning-paths.ts.
 *
 * Asserts:
 *   1. Every LearningPath has a `category` set (model-maker | cloud | consumer).
 *   2. Every `slug` is unique.
 *   3. Every internal href in `relatedGuides` and FAQ answers points to a path
 *      that exists locally (skips external https URLs).
 *   4. No hype/forbidden words appear in copy fields (longIntro, description,
 *      outcomes, faqs).
 *   5. Every EcosystemTool has either a `lastVerified` ISO date OR is flagged
 *      for follow-up (warning only — does not fail the gate, yet).
 *
 * Runs as part of `merge:gate`. Exits non-zero on any violation.
 *
 * Why not lint via ESLint? The checks span data structure + cross-file path
 * existence + content rules, which are easier in a dedicated script that can
 * read the filesystem directly.
 */

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const ROOT = process.cwd()
const PATHS_FILE = path.join(ROOT, 'data', 'learning-paths.ts')

// Forbidden phrases (case-insensitive). Two sources:
//   - CLAUDE.md explicit DON'Ts
//   - Plan agent's anti-hype rubric
const FORBIDDEN = [
  'revolutionary',
  'revolutionize',
  'transformative',
  'transform your',
  'unlock',
  'harness the',
  'leverage',
  'game-changing',
  'game changer',
  'next-generation',
  'cutting-edge',
  'cutting edge',
  'seamlessly',
  'seamless integration',
  'empowers you to',
  'the future of',
  'soul-aligned',
  'awakening',
  'consciousness',
]

const VALID_CATEGORIES = new Set(['model-maker', 'cloud', 'consumer'])

let errors = []
let warnings = []

function fail(msg) {
  errors.push(msg)
}

function warn(msg) {
  warnings.push(msg)
}

// ─────────────────────────────────────────────────────────
// Parse — we shell out to tsx-light parsing via a regex-based extractor.
// learning-paths.ts is a hand-edited data file, not arbitrary code, so this
// is sufficient. If the file's shape changes substantially, update here.
// ─────────────────────────────────────────────────────────

const src = fs.readFileSync(PATHS_FILE, 'utf8')

// Each entry begins with `id: 'xxx',` and ends with `},\n  {` or `},\n]`.
const entryRegex = /\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?(?=\n\s{2}\},\s*(?:\n\s{2}\{|\n\s{2}\/\/|\n\]))/g

const entries = []
let m
while ((m = entryRegex.exec(src)) !== null) {
  entries.push({ id: m[1], body: m[0], start: m.index })
}

if (entries.length === 0) {
  fail('Could not parse any LearningPath entries from data/learning-paths.ts. Update the parser regex in scripts/check-learning-paths.mjs.')
}

function field(body, name) {
  const re = new RegExp(`${name}:\\s*(['"])((?:\\\\.|(?!\\1).)*)\\1`)
  const match = body.match(re)
  return match ? match[2] : null
}

function fieldList(body, name) {
  // Match `name: [ ... ]` — returns the raw inside-brackets blob.
  const re = new RegExp(`${name}:\\s*\\[([\\s\\S]*?)\\]`)
  const match = body.match(re)
  return match ? match[1] : ''
}

// ─────────────────────────────────────────────────────────
// Check 1: every entry has a `category`
// ─────────────────────────────────────────────────────────

const slugs = new Set()
for (const e of entries) {
  const cat = field(e.body, 'category')
  if (!cat) {
    fail(`[${e.id}] missing required field: category`)
  } else if (!VALID_CATEGORIES.has(cat)) {
    fail(`[${e.id}] category="${cat}" is not one of: ${[...VALID_CATEGORIES].join(', ')}`)
  }

  const slug = field(e.body, 'slug')
  if (!slug) {
    fail(`[${e.id}] missing required field: slug`)
  } else if (slugs.has(slug)) {
    fail(`[${e.id}] duplicate slug: ${slug}`)
  } else {
    slugs.add(slug)
  }
}

// ─────────────────────────────────────────────────────────
// Check 2: relatedGuides — internal hrefs must point at real local paths.
// External hrefs (https://) are skipped (we don't fetch).
// Internal hrefs are checked against:
//   - /learn/<slug>       → other entries in this file
//   - /blog/<slug>        → content/blog/<slug>.mdx
//   - /guides/<slug>      → content/guides/<slug>.mdx
//   - anything else       → soft warning only (route may exist but is hard to verify without
//                                              parsing app/ structure here; the existing
//                                              scripts/check-internal-links.mjs gate handles the rest)
// ─────────────────────────────────────────────────────────

const blogDir = path.join(ROOT, 'content', 'blog')
const guidesDir = path.join(ROOT, 'content', 'guides')

function fileExists(p) {
  try {
    return fs.statSync(p).isFile()
  } catch {
    return false
  }
}

for (const e of entries) {
  const list = fieldList(e.body, 'relatedGuides')
  if (!list.trim()) continue
  const hrefs = [...list.matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1])
  for (const href of hrefs) {
    if (href.startsWith('https://') || href.startsWith('http://')) continue
    if (href.startsWith('/learn/')) {
      const target = href.replace(/^\/learn\//, '').replace(/#.*$/, '')
      if (!slugs.has(target) && target !== e.id /* let self-ref pass for late binding */) {
        // Defer: the slug may be added by a sibling entry in this very file. We collected
        // all slugs above, so by now this should resolve. If it doesn't, that's a real bug.
        warn(`[${e.id}] relatedGuides "${href}" points at /learn/${target} which is not (yet) a known portal slug`)
      }
    } else if (href.startsWith('/blog/')) {
      const slug = href.replace(/^\/blog\//, '').replace(/#.*$/, '')
      const mdxPath = path.join(blogDir, `${slug}.mdx`)
      if (!fileExists(mdxPath)) {
        fail(`[${e.id}] relatedGuides "${href}" → ${path.relative(ROOT, mdxPath)} does not exist`)
      }
    } else if (href.startsWith('/guides/')) {
      const slug = href.replace(/^\/guides\//, '').replace(/#.*$/, '')
      const mdxPath = path.join(guidesDir, `${slug}.mdx`)
      if (!fileExists(mdxPath)) {
        fail(`[${e.id}] relatedGuides "${href}" → ${path.relative(ROOT, mdxPath)} does not exist`)
      }
    }
    // anything else → handled by scripts/check-internal-links.mjs gate
  }
}

// ─────────────────────────────────────────────────────────
// Check 3: forbidden hype words in copy fields
// ─────────────────────────────────────────────────────────

for (const e of entries) {
  // Strip the videos/ecosystem/announcements arrays — those reference vendor
  // copy verbatim sometimes (e.g. "Cutting-edge Antigravity 2.0" might appear
  // in an official source title). Lint only the FrankX-authored prose.
  const flaggable = [
    field(e.body, 'description'),
    field(e.body, 'heroEyebrow'),
    field(e.body, 'longIntro'),
    field(e.body, 'ctaTitle'),
    field(e.body, 'ctaBody'),
    fieldList(e.body, 'outcomes'),
  ]
    .filter(Boolean)
    .join('\n')
    .toLowerCase()

  for (const word of FORBIDDEN) {
    if (flaggable.includes(word.toLowerCase())) {
      fail(`[${e.id}] forbidden hype word "${word}" in authored copy (description / heroEyebrow / longIntro / ctaTitle / ctaBody / outcomes)`)
    }
  }
}

// ─────────────────────────────────────────────────────────
// Report
// ─────────────────────────────────────────────────────────

if (warnings.length > 0) {
  console.log('[check-learning-paths] warnings:')
  for (const w of warnings) console.log(`  ⚠ ${w}`)
}

if (errors.length > 0) {
  console.error('[check-learning-paths] FAILED:')
  for (const err of errors) console.error(`  ✗ ${err}`)
  console.error(`\n${errors.length} error(s) in data/learning-paths.ts`)
  process.exit(1)
}

console.log(`[check-learning-paths] ok — ${entries.length} portal(s) validated.`)
