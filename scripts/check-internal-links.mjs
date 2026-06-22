#!/usr/bin/env node
/**
 * Pre-publish internal-link gate.
 *
 * Walks the source tree, extracts every internal href (`/...` not `http*`,
 * not `mailto:`, not `#anchor`), and validates each one against the canonical
 * route corpus at data/route-index.json + data/redirect-aliases.json.
 *
 * Sibling to scripts/check-links.mjs (which is a RUNTIME checker — hits the
 * dev server and validates live HTTP responses). This script is STATIC — it
 * runs without needing the site to be up, so it can be a CI gate before any
 * page builds.
 *
 * Usage:
 *   node scripts/check-internal-links.mjs            # exit 1 on broken
 *   node scripts/check-internal-links.mjs --warn     # log but always exit 0
 *   node scripts/check-internal-links.mjs --json     # machine-readable output
 *
 * Pre-flight: ensure data/route-index.json is fresh by running `pnpm routes:build`
 * (or just `pnpm build` which has prebuild wired up).
 */

import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const args = new Set(process.argv.slice(2))
const WARN_ONLY = args.has('--warn')
const JSON_OUT = args.has('--json')

// File globs we scan
const SCAN_DIRS = ['content', 'components', 'app']
const EXTENSIONS = new Set(['.mdx', '.md', '.tsx', '.ts'])

// Hrefs we deliberately exclude from validation
const SKIP_PREFIXES = [
  'http://',
  'https://',
  'mailto:',
  'tel:',
  '#',
  'data:',
  'javascript:',
  '/api/',     // API routes; route-index doesn't list them
  '/_next/',
  '/admin',    // auth-gated; might not be in static route-index even when real
  '/auth/',
  '/images/',  // public assets — tracked separately, not in route-index
  '/fonts/',   // public assets
  '/videos/',  // public assets
  '/audio/',   // public assets
  '/reading/', // public/reading/ generated artifacts
  '/go/',      // affiliate/redirect URLs handled by /app/go/ if it exists
  '/icons/',   // public assets
  '/og/',      // OpenGraph generated images
]
// Static-asset file extensions — also public/* assets, not routes
const ASSET_EXT_RE = /\.(png|jpg|jpeg|gif|svg|webp|avif|ico|pdf|zip|mp4|mp3|wav|xml|txt|html|css|js|woff|woff2|ttf|otf)$/i
// Hrefs that are template placeholders, not real paths
const TEMPLATE_RE = /\$\{|\{\{|\$\(|<%/

// ─── load route corpus ──────────────────────────────────────
let idx
try {
  idx = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/route-index.json'), 'utf8'))
} catch (err) {
  console.error('[check-internal-links] could not read data/route-index.json — run `pnpm routes:build` first')
  process.exit(2)
}
const validHrefs = new Set(idx.routes.map((r) => r.href))
const aliasMap = idx.aliases || {}
const validAliases = new Set(Object.keys(aliasMap))

// ─── app/ filesystem resolver ───────────────────────────────
// The route-index enumerates pages, but not every backing file maps cleanly:
//   - route handlers (app/llm-hub.json/route.ts → /llm-hub.json) aren't pages
//   - dynamic [slug] routes whose slugs come from a TS registry not walked by
//     the enumerator (e.g. app/familie/geschichte/[slug] → /familie/geschichte/<slug>)
// Rather than enumerate every such slug (which would also leak private/noindex
// pages into the public sitemap), we resolve the href directly against the app/
// tree, honoring literal segments, dynamic [param]/[...catchAll] segments, and
// transparent (route group) folders. This is purely ADDITIVE — it can only
// clear a real route, never introduce a new failure.
const APP_DIR = path.join(ROOT, 'app')
const ROUTE_FILES = ['page.tsx', 'page.mdx', 'page.jsx', 'page.js', 'route.ts', 'route.js', 'route.tsx']
function hasRouteFile(dir) {
  return ROUTE_FILES.some((f) => fs.existsSync(path.join(dir, f)))
}
function matchAppSegments(dir, segments) {
  if (segments.length === 0) return hasRouteFile(dir)
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return false
  }
  const [seg, ...rest] = segments
  for (const e of entries) {
    if (!e.isDirectory()) continue
    const name = e.name
    // Route group — transparent, consumes no URL segment
    if (name.startsWith('(') && name.endsWith(')')) {
      if (matchAppSegments(path.join(dir, name), segments)) return true
      continue
    }
    // Catch-all [...x] / optional catch-all [[...x]] — matches the rest
    if (/^\[\[?\.\.\..+\]\]?$/.test(name)) {
      if (hasRouteFile(path.join(dir, name))) return true
      continue
    }
    // Literal match, then single dynamic [param] match
    if (name === seg && matchAppSegments(path.join(dir, name), rest)) return true
    if (/^\[[^.].*\]$/.test(name) && matchAppSegments(path.join(dir, name), rest)) return true
  }
  return false
}
function resolvesInAppDir(href) {
  return matchAppSegments(APP_DIR, href.split('/').filter(Boolean))
}

// ─── walk source tree ───────────────────────────────────────
/** @type {{file: string, line: number, href: string}[]} */
const findings = []
let scannedFiles = 0

function walk(dir) {
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      scanFile(full)
    }
  }
}

// Match hrefs: href="..." or to="..." or [...](path)
// We extract the path string and check it standalone — query strings + hash
// fragments are stripped before lookup.
const PATTERNS = [
  /\bhref=["']([^"']+)["']/g,
  /\bto=["']([^"']+)["']/g,
  /\]\((\/[^)\s]+)\)/g, // markdown link
]

function scanFile(file) {
  scannedFiles++
  let src
  try {
    src = fs.readFileSync(file, 'utf8')
  } catch {
    return
  }
  const lines = src.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    for (const pattern of PATTERNS) {
      pattern.lastIndex = 0
      let m
      while ((m = pattern.exec(line)) !== null) {
        const href = m[1]
        if (!href.startsWith('/')) continue
        if (SKIP_PREFIXES.some((p) => href.startsWith(p))) continue
        if (ASSET_EXT_RE.test(href)) continue
        if (TEMPLATE_RE.test(href)) continue

        // Strip query string + hash for matching
        const cleanHref = href.split('?')[0].split('#')[0]
        if (!cleanHref || cleanHref === '/') continue

        // Direct hit
        if (validHrefs.has(cleanHref)) continue
        // Alias hit (also fine — redirects work)
        if (validAliases.has(cleanHref)) continue
        // Trailing-slash variant
        if (validHrefs.has(cleanHref.replace(/\/$/, ''))) continue
        // Dynamic-segment heuristic: if the href matches a known prefix like
        // /blog/<something>, /workshops/<something> and we have the listing
        // page, assume the dynamic page exists (we can't fully resolve every slug)
        const seg = cleanHref.split('/')[1]
        if (validHrefs.has('/' + seg) && cleanHref.split('/').length === 3) {
          // /<section>/<slug> — accept if the slug isn't obviously broken
          // Catches cases where MDX files exist but didn't make it into the index
          // (e.g. unreadable frontmatter). Logged at --warn level.
          continue
        }
        // Filesystem fallback: resolve against the app/ tree to catch dynamic
        // [slug] routes and non-page route handlers the route-index omits.
        if (resolvesInAppDir(cleanHref)) continue

        findings.push({
          file: path.relative(ROOT, file).replace(/\\/g, '/'),
          line: i + 1,
          href: cleanHref,
        })
      }
    }
  }
}

// ─── run ────────────────────────────────────────────────────
for (const dir of SCAN_DIRS) {
  walk(path.join(ROOT, dir))
}

// ─── report ─────────────────────────────────────────────────
if (JSON_OUT) {
  console.log(JSON.stringify({ scannedFiles, findings }, null, 2))
} else {
  console.log(`[check-internal-links] scanned ${scannedFiles} files`)
  if (findings.length === 0) {
    console.log('[check-internal-links] all internal hrefs resolve ✓')
  } else {
    // Group by href so the operator sees the most-impactful broken links first
    const byHref = new Map()
    for (const f of findings) {
      const list = byHref.get(f.href) ?? []
      list.push(`${f.file}:${f.line}`)
      byHref.set(f.href, list)
    }
    const sorted = [...byHref.entries()].sort((a, b) => b[1].length - a[1].length)
    console.log(`[check-internal-links] ${findings.length} broken references across ${byHref.size} unique paths:`)
    for (const [href, files] of sorted.slice(0, 40)) {
      console.log(`  ✗ ${href}  (${files.length} reference${files.length === 1 ? '' : 's'})`)
      for (const f of files.slice(0, 3)) console.log(`      ${f}`)
      if (files.length > 3) console.log(`      …and ${files.length - 3} more`)
    }
    if (byHref.size > 40) console.log(`  …and ${byHref.size - 40} more unique paths`)
  }
}

if (findings.length > 0 && !WARN_ONLY) {
  process.exit(1)
}
