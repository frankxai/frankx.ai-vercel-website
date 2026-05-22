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
