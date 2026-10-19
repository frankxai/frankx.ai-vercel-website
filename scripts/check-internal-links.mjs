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

import { resolvesPublicHref } from './lib/public-file-resolution.mjs'

const ROOT = process.cwd()
const args = new Set(process.argv.slice(2))
const WARN_ONLY = args.has('--warn')
const JSON_OUT = args.has('--json')

// File globs we scan. lib/ and data/ carry the nav configs, product ladders and
// link registries that render as real <Link>s — they are not "just data".
const SCAN_DIRS = ['content', 'components', 'app', 'lib', 'data']
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
const ASSET_EXT_RE = /\.(png|jpg|jpeg|gif|svg|webp|avif|ico|pdf|zip|mp4|mp3|wav|json|xml|txt|html|css|js|woff|woff2|ttf|otf)$/i
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

const PUBLIC_DIR = path.join(ROOT, 'public')

/**
 * Files under public/ are served at the site root but are not routes, so they
 * never appear in route-index. Resolve exact files and exact directory indexes
 * against the filesystem instead of trusting a path-prefix allowlist.
 */
function isPublicAsset(href) {
  return resolvesPublicHref(PUBLIC_DIR, href)
}

const APP_DIR = path.join(ROOT, 'app')
const ROUTE_HANDLER_FILES = ['route.ts', 'route.tsx', 'route.js', 'route.mjs']

/**
 * Some paths that end in a file extension are not files at all — they are Next
 * route handlers. /rss.xml is app/rss.xml/route.ts; /journal/feed.xml is
 * app/journal/feed.xml/route.ts. They serve real content and are not all
 * present in route-index, so neither the public/ lookup nor the index finds
 * them. Resolve them against the app tree rather than reporting them broken.
 */
function isRouteHandler(href) {
  const rel = href.replace(/^\/+/, '')
  if (!rel) return false
  const dir = path.resolve(APP_DIR, rel)
  if (dir !== APP_DIR && !dir.startsWith(APP_DIR + path.sep)) return false
  return ROUTE_HANDLER_FILES.some((f) => fs.existsSync(path.join(dir, f)))
}

const PAGE_FILES = ['page.tsx', 'page.ts', 'page.js', 'page.jsx', 'page.mdx']

/**
 * Some real pages are pure redirect stubs — `app/consulting/page.tsx` is a
 * three-line `redirect('/work-with-me')`. They serve a working URL but the
 * route-index omits them, so widening the scan surfaced them as "broken".
 * They are not broken: resolve them against the app tree the same way route
 * handlers are, rather than adding names to an allowlist that goes stale.
 */
function isAppPage(href) {
  const rel = href.replace(/^\/+/, '')
  if (!rel) return false
  const dir = path.resolve(APP_DIR, rel)
  if (dir !== APP_DIR && !dir.startsWith(APP_DIR + path.sep)) return false
  return PAGE_FILES.some((f) => fs.existsSync(path.join(dir, f)))
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

// Object-literal form: `href: '/x'`. Nav config, product ladders, and the
// quoted keys in data/ai-os-workshop.ts are written this way, and the JSX
// attribute pattern above cannot see them. Quoted keys, a space before the
// colon, and a value on the next line are the same property. \s matches a
// newline, so this pattern runs on the whole file. Word boundaries keep a
// longer key such as myhref from matching.
const OBJECT_HREF = /(?:['"])?\bhref\b(?:['"])?\s*:\s*["']([^"']+)["']/g

function recordHref(file, line, href) {
  if (!href.startsWith('/')) return
  if (SKIP_PREFIXES.some((p) => href.startsWith(p))) return
  if (TEMPLATE_RE.test(href)) return

  const cleanHref = href.split('?')[0].split('#')[0]
  if (!cleanHref || cleanHref === '/') return
  if (validHrefs.has(cleanHref)) return
  if (validAliases.has(cleanHref)) return
  if (validHrefs.has(cleanHref.replace(/\/$/, ''))) return

  const finding = {
    file: path.relative(ROOT, file).replace(/\\/g, '/'),
    line,
    href: cleanHref,
  }

  // Anything ending in a file extension is an asset or a file-shaped route.
  // Resolve it. Skipping on the extension alone used to hide a missing file.
  if (ASSET_EXT_RE.test(cleanHref)) {
    if (isPublicAsset(cleanHref) || isRouteHandler(cleanHref)) return
    findings.push(finding)
    return
  }

  const seg = cleanHref.split('/')[1]
  if (validHrefs.has('/' + seg) && cleanHref.split('/').length === 3) return
  if (isPublicAsset(cleanHref)) return
  if (isAppPage(cleanHref)) return
  // Extensionless route handlers are real URLs. /rss.xml is caught above
  // because of its suffix; /courses/.../reliable-workflow is route.ts.
  if (isRouteHandler(cleanHref)) return

  findings.push(finding)
}

function scanFile(file) {
  scannedFiles++
  let src
  try {
    src = fs.readFileSync(file, 'utf8')
  } catch {
    return
  }

  OBJECT_HREF.lastIndex = 0
  let objectMatch
  while ((objectMatch = OBJECT_HREF.exec(src)) !== null) {
    const line = src.slice(0, objectMatch.index).split('\n').length
    recordHref(file, line, objectMatch[1])
  }

  const lines = src.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    for (const pattern of PATTERNS) {
      pattern.lastIndex = 0
      let match
      while ((match = pattern.exec(line)) !== null) {
        recordHref(file, i + 1, match[1])
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
