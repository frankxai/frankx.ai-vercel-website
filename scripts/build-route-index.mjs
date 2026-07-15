#!/usr/bin/env node
/**
 * Build-time generator for data/route-index.json.
 *
 * Runs as part of `prebuild` (see package.json). Calls enumerateRoutes() from
 * lib/route-enumeration.mjs to collect every public URL on frankx.ai, then
 * writes a deterministic JSON file consumed by:
 *
 *   - app/not-found.tsx          (server-side fuzzy match for soft 404)
 *   - lib/fuzzy-route-match.ts   (loads the JSON at module init)
 *   - scripts/check-internal-links.mjs (Phase 4 — validates internal hrefs)
 *
 * Deterministic output: routes sorted by href, aliases sorted by key. This means
 * route-index.json is committable without diff churn unless content actually changed.
 */

import fs from 'node:fs'
import path from 'node:path'
import { enumerateRoutes, loadAliases } from '../lib/route-enumeration.mjs'

const ROOT = process.cwd()
const OUTPUT = path.join(ROOT, 'data', 'route-index.json')
const HERO_MANIFEST_OUTPUT = path.join(ROOT, 'data', 'blog-hero-manifest.json')
const BLOG_IMAGES_DIR = path.join(ROOT, 'public', 'images', 'blog')

const routes = enumerateRoutes()
const aliases = loadAliases()

// Sort routes by href for stable diffs
routes.sort((a, b) => a.href.localeCompare(b.href))

// Sort aliases by key
const sortedAliases = Object.fromEntries(Object.entries(aliases).sort(([a], [b]) => a.localeCompare(b)))

const payload = {
  version: '1.0',
  stats: {
    total: routes.length,
    aliases: Object.keys(sortedAliases).length,
    byType: routes.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1
      return acc
    }, {}),
  },
  routes,
  aliases: sortedAliases,
}

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
fs.writeFileSync(OUTPUT, JSON.stringify(payload, null, 2) + '\n', 'utf8')

console.log(
  `[build-route-index] ${routes.length} routes + ${Object.keys(sortedAliases).length} aliases → ${path.relative(ROOT, OUTPUT)}`
)
console.log(`  by type: ${Object.entries(payload.stats.byType).map(([t, n]) => `${t}=${n}`).join(' · ')}`)

// Blog hero manifest — every file that exists under public/images/blog, as
// sorted URL paths. lib/blog.ts tests hero frontmatter paths against this
// instead of calling fs.existsSync with a dynamic public/ path at runtime:
// Next's output file tracing can't resolve dynamic paths, so it bundled the
// whole public/images subtree into every function importing lib/blog.ts
// (api/md blew the 250 MB Vercel function limit).
function walkBlogImages(dir, prefix) {
  /** @type {string[]} */
  const out = []
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      out.push(...walkBlogImages(path.join(dir, entry.name), `${prefix}/${entry.name}`))
    } else if (entry.isFile()) {
      out.push(`${prefix}/${entry.name}`)
    }
  }
  return out
}

const heroFiles = walkBlogImages(BLOG_IMAGES_DIR, '/images/blog').sort()
fs.writeFileSync(HERO_MANIFEST_OUTPUT, JSON.stringify(heroFiles, null, 2) + '\n', 'utf8')
console.log(`[build-route-index] ${heroFiles.length} blog hero files → ${path.relative(ROOT, HERO_MANIFEST_OUTPUT)}`)
