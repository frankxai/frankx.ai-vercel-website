#!/usr/bin/env node
/**
 * AEO regression gate for blog MDX.
 *
 * Fails if a public post still carries the factory TL;DR template that
 * made every article look identical to AI crawlers.
 *
 * Usage: node scripts/aeo-blog-audit.mjs
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BLOG_DIR = join(ROOT, 'content', 'blog')
const TEMPLATE = /examines core production patterns/i
const SKIP = new Set([
  'CONTENT_SCHEMA.md',
  'CONTENT_SCHEMA.mdx',
  'CLAUDE.md',
  'CLAUDE.mdx',
  'EDITORIAL_STANDARD.md',
  'EDITORIAL_STANDARD.mdx',
])

const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
const hits = []

for (const file of files) {
  if (SKIP.has(file)) continue
  const raw = readFileSync(join(BLOG_DIR, file), 'utf8')
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!fm) continue
  if (TEMPLATE.test(fm[1])) {
    hits.push(file)
  }
}

if (hits.length) {
  console.error(`aeo-blog-audit: ${hits.length} post(s) still use the factory TL;DR template:`)
  for (const file of hits.slice(0, 30)) console.error(`  - ${file}`)
  if (hits.length > 30) console.error(`  …and ${hits.length - 30} more`)
  process.exit(1)
}

console.log(`aeo-blog-audit: ${files.length} content files, 0 factory TL;DR templates`)
