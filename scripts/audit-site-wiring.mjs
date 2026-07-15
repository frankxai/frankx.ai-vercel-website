#!/usr/bin/env node
/**
 * Full public site wiring audit for frankx.ai.
 *
 * Static pass:
 *   - Scans app/, components/, content/, lib/, and data/ for internal links.
 *   - Resolves against lib/route-enumeration.mjs + redirect aliases.
 *
 * Live pass:
 *   - Crawls every discovered public route against a running Next server.
 *   - Extracts rendered anchors and validates internal destinations.
 *
 * Usage:
 *   node scripts/audit-site-wiring.mjs
 *   node scripts/audit-site-wiring.mjs --base http://localhost:3001 --strict
 *   node scripts/audit-site-wiring.mjs --skip-live
 */

import fs from 'node:fs'
import path from 'node:path'
import { enumerateRoutes, loadAliases } from '../lib/route-enumeration.mjs'

const ROOT = process.cwd()
const args = new Set(process.argv.slice(2))
const getArg = (name, fallback) => {
  const prefix = `${name}=`
  const direct = process.argv.find((arg) => arg.startsWith(prefix))
  if (direct) return direct.slice(prefix.length)
  const index = process.argv.indexOf(name)
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1]
  return fallback
}

const BASE_URL = getArg('--base', process.env.SITE_WIRING_BASE_URL || 'http://localhost:3000')
const STRICT = args.has('--strict')
const SKIP_LIVE = args.has('--skip-live')
const INCLUDE_PRIVATE = args.has('--include-private')
const ROUTE_TIMEOUT_MS = Number(getArg('--timeout', process.env.SITE_WIRING_TIMEOUT_MS || '45000'))
const LIVE_CONCURRENCY = Number(getArg('--concurrency', process.env.SITE_WIRING_CONCURRENCY || '4'))
const OUTPUT_JSON = path.join(ROOT, 'data', 'audit', 'site-wiring.json')
const OUTPUT_MD = path.join(ROOT, 'data', 'audit', 'site-wiring.md')
const SITE_LINKS_PATH = path.join(ROOT, 'data', 'site-links.json')

const SCAN_DIRS = ['app', 'components', 'content', 'lib', 'data']
const EXTENSIONS = new Set(['.mdx', '.md', '.tsx', '.ts', '.json'])
const SKIP_DIR_NAMES = new Set(['node_modules', '.next', '.git', 'audit'])
const SKIP_PREFIXES = [
  'mailto:',
  'tel:',
  '#',
  'data:',
  'javascript:',
  '/api/',
  '/_next/',
  '/images/',
  '/fonts/',
  '/videos/',
  '/audio/',
  '/icons/',
  '/og/',
]
const ASSET_EXT_RE = /\.(png|jpg|jpeg|gif|svg|webp|avif|ico|pdf|zip|mp4|mp3|wav|xml|txt|html|css|js|md|mdx|woff|woff2|ttf|otf)$/i
const TEMPLATE_RE = /\$\{|\{\{|\$\(|<%/
const SKIP_STATIC_FILES = new Set([
  'data/content-index.json',
  'data/progress-tracker.json',
])
const SOURCE_PATTERNS = [
  /\bhref=["']([^"']+)["']/g,
  /\bto=["']([^"']+)["']/g,
  /\burl:\s*["']([^"']+)["']/g,
  /"url"\s*:\s*"([^"]+)"/g,
  /"href"\s*:\s*"([^"]+)"/g,
  /\]\((\/[^)\s]+)\)/g,
]

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}

function normalizePathname(href) {
  if (!href || typeof href !== 'string') return null
  let value = href.trim()
  if (!value) return null
  try {
    if (value.startsWith('https://frankx.ai') || value.startsWith('http://frankx.ai')) {
      value = new URL(value).pathname
    } else if (value.startsWith(BASE_URL)) {
      value = new URL(value).pathname
    }
  } catch {
    return null
  }
  if (!value.startsWith('/')) return null
  return value.split('?')[0].split('#')[0].replace(/\/$/, '') || '/'
}

function isPrivateOrOwnerRoute(href) {
  return [
    '/admin',
    '/dashboard',
    '/auth',
    '/command-center',
    '/ops',
    '/frankx-investment-dashboard',
  ].some((prefix) => href === prefix || href.startsWith(`${prefix}/`))
}

function isExperimentalRoute(href) {
  return [
    '/design-lab',
    '/experiments',
    '/prototype',
    '/prototypes',
    '/lab',
    '/labs',
  ].some((prefix) => href === prefix || href.startsWith(`${prefix}/`))
}

function routeCategory(href) {
  if (isPrivateOrOwnerRoute(href)) return 'private'
  if (isExperimentalRoute(href)) return 'experimental'
  if (href.startsWith('/products') || href === '/soulbook') return 'commerce'
  if (href.startsWith('/newsletter') || href === '/contact' || href === '/coaching' || href.startsWith('/workshops')) return 'conversion'
  if (href.startsWith('/blog') || href.startsWith('/guides') || href.startsWith('/research') || href.startsWith('/library')) return 'content'
  return 'public'
}

function shouldSkipHref(rawHref) {
  if (!rawHref || typeof rawHref !== 'string') return true
  if (TEMPLATE_RE.test(rawHref)) return true
  if (SKIP_PREFIXES.some((prefix) => rawHref.startsWith(prefix))) return true
  const normalized = normalizePathname(rawHref)
  if (!normalized) return true
  if (ASSET_EXT_RE.test(normalized)) return true
  return false
}

function buildRouteContext() {
  const routes = enumerateRoutes()
  const aliases = loadAliases()
  const outboundSlugs = loadOutboundSlugs()
  const validHrefs = new Set(routes.map((route) => route.href.replace(/\/$/, '') || '/'))
  const validAliases = new Set(Object.keys(aliases))
  const aliasTargets = new Map(Object.entries(aliases))
  return { routes, aliases, outboundSlugs, validHrefs, validAliases, aliasTargets }
}

function loadOutboundSlugs() {
  const slugs = new Set()
  try {
    const raw = fs.readFileSync(path.join(ROOT, 'data/outbound-links.ts'), 'utf8')
    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g
    let match
    while ((match = slugRegex.exec(raw)) !== null) {
      slugs.add(match[1])
    }
  } catch {
    /* optional */
  }
  return slugs
}

function resolveHref(rawHref, ctx) {
  const href = normalizePathname(rawHref)
  if (!href) return { ok: true, href: rawHref, status: 'external-or-skipped', kind: 'external' }
  if (shouldSkipHref(rawHref)) return { ok: true, href, status: 'skipped', kind: 'skipped' }
  if (ctx.validHrefs.has(href)) return { ok: true, href, status: 'resolved', kind: 'internal-route' }
  if (href.startsWith('/go/')) {
    const slug = href.split('/')[2]
    if (ctx.outboundSlugs.has(slug)) {
      return { ok: true, href, status: 'resolved', kind: 'go-redirect' }
    }
    return { ok: false, href, status: 'missing-go-slug', kind: 'go-redirect' }
  }
  if (ctx.validAliases.has(href)) {
    return {
      ok: true,
      href,
      status: 'alias',
      kind: 'internal-alias',
      canonicalTarget: ctx.aliasTargets.get(href),
    }
  }
  const parts = href.split('/').filter(Boolean)
  if (parts.length === 2 && ctx.validHrefs.has(`/${parts[0]}`)) {
    return { ok: true, href, status: 'dynamic-family', kind: 'internal-dynamic' }
  }
  return { ok: false, href, status: 'missing', kind: 'internal-route' }
}

function lineNumberForIndex(source, index) {
  return source.slice(0, index).split('\n').length
}

function walk(dir, files = []) {
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return files
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.') || SKIP_DIR_NAMES.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, files)
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      files.push(full)
    }
  }
  return files
}

function scanSourceLinks(ctx) {
  const findings = []
  let scannedFiles = 0
  for (const dir of SCAN_DIRS) {
    const files = walk(path.join(ROOT, dir))
    for (const file of files) {
      scannedFiles++
      const relative = path.relative(ROOT, file).replace(/\\/g, '/')
      if (SKIP_STATIC_FILES.has(relative)) continue
      let source
      try {
        source = fs.readFileSync(file, 'utf8')
      } catch {
        continue
      }
      for (const pattern of SOURCE_PATTERNS) {
        pattern.lastIndex = 0
        let match
        while ((match = pattern.exec(source)) !== null) {
          const rawHref = match[1]
          const resolved = resolveHref(rawHref, ctx)
          if (resolved.ok) continue
          findings.push({
            route: null,
            source: relative,
            line: lineNumberForIndex(source, match.index),
            href: resolved.href,
            kind: resolved.kind,
            status: resolved.status,
            canonicalTarget: null,
            severity: isPrivateOrOwnerRoute(resolved.href) ? 'info' : 'error',
            ownerAction: 'Fix source href or add a verified redirect alias.',
            suggestedFix: `Resolve ${resolved.href} against route enumeration or redirect aliases.`,
          })
        }
      }
    }
  }
  return { scannedFiles, findings }
}

function extractAnchors(html) {
  const anchors = []
  const linkRegex = /<a\s+([^>]*?)>/gi
  let match
  while ((match = linkRegex.exec(html)) !== null) {
    const attrs = match[1]
    const href = /href=["']([^"']+)["']/i.exec(attrs)?.[1]
    if (!href) continue
    const target = /target=["']([^"']+)["']/i.exec(attrs)?.[1] || null
    const rel = /rel=["']([^"']+)["']/i.exec(attrs)?.[1] || null
    anchors.push({ href, target, rel })
  }
  return anchors
}

async function fetchWithTimeout(url, timeoutMs = 15000) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': 'FrankX-Site-Wiring-Audit/1.0' },
      signal: controller.signal,
    })
    const contentType = response.headers.get('content-type') || ''
    const text = contentType.includes('text/html') && response.ok ? await response.text() : ''
    return {
      ok: response.ok,
      status: response.status,
      location: response.headers.get('location'),
      contentType,
      text,
    }
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : String(err),
      location: null,
      contentType: '',
      text: '',
    }
  } finally {
    clearTimeout(timeout)
  }
}

async function mapLimit(items, limit, worker) {
  const results = []
  let index = 0
  async function run() {
    while (index < items.length) {
      const current = index++
      results[current] = await worker(items[current], current)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run))
  return results
}

async function runLiveAudit(ctx) {
  const serverCheck = await fetchWithTimeout(BASE_URL, 8000)
  if (!serverCheck.ok && serverCheck.status !== 307 && serverCheck.status !== 308) {
    return {
      available: false,
      baseUrl: BASE_URL,
      findings: [
        {
          route: '/',
          source: 'live-crawl',
          href: BASE_URL,
          kind: 'server',
          status: serverCheck.status || 'unavailable',
          canonicalTarget: null,
          severity: STRICT ? 'error' : 'warning',
          ownerAction: 'Start the Next.js dev server or pass --base to a running deployment.',
          suggestedFix: 'Run npm run dev, then rerun npm run site:wiring:audit.',
        },
      ],
    }
  }

  if (
    serverCheck.ok &&
    serverCheck.text &&
    !/\bFrankX\b|frankx\.ai|FrankX\.AI/i.test(serverCheck.text)
  ) {
    return {
      available: false,
      baseUrl: BASE_URL,
      findings: [
        {
          route: '/',
          source: 'live-crawl',
          href: BASE_URL,
          kind: 'server',
          status: 'base-mismatch',
          canonicalTarget: null,
          severity: STRICT ? 'error' : 'warning',
          ownerAction: 'Point the audit at the FrankX Next.js app before trusting live findings.',
          suggestedFix: `The homepage at ${BASE_URL} does not look like frankx.ai; pass --base to the correct dev server or deployment.`,
        },
      ],
    }
  }

  const routes = ctx.routes
    .filter((route) => INCLUDE_PRIVATE || !isPrivateOrOwnerRoute(route.href))
    .sort((a, b) => a.href.localeCompare(b.href))

  const findings = []
  await mapLimit(routes, LIVE_CONCURRENCY, async (route) => {
    const category = routeCategory(route.href)
    const url = new URL(route.href, BASE_URL).toString()
    const result = await fetchWithTimeout(url, ROUTE_TIMEOUT_MS)
    const routeSeverity = category === 'private' || category === 'experimental' ? 'info' : 'error'

    if (result.status >= 400 || result.status === 0) {
      findings.push({
        route: route.href,
        source: 'live-crawl',
        href: route.href,
        kind: 'route',
        status: result.status || 'fetch-error',
        canonicalTarget: null,
        severity: routeSeverity,
        ownerAction: category === 'public' || category === 'conversion' || category === 'commerce'
          ? 'Public route must load successfully.'
          : 'Review whether this route should stay public.',
        suggestedFix: result.error || `Fix route response for ${route.href}.`,
      })
      return
    }

    if (result.status >= 300 && result.status < 400 && result.location) {
      findings.push({
        route: route.href,
        source: 'live-crawl',
        href: route.href,
        kind: 'route',
        status: result.status,
        canonicalTarget: result.location,
        severity: 'info',
        ownerAction: 'Confirm this redirect is intentional.',
        suggestedFix: `Route redirects to ${result.location}.`,
      })
      return
    }

    if (!result.text) return

    for (const anchor of extractAnchors(result.text)) {
      const resolved = resolveHref(anchor.href, ctx)
      if (!resolved.ok) {
        findings.push({
          route: route.href,
          source: 'rendered-html',
          href: resolved.href,
          kind: resolved.kind,
          status: resolved.status,
          canonicalTarget: null,
          severity: routeSeverity,
          ownerAction: 'Fix rendered link or add a verified redirect alias.',
          suggestedFix: `${route.href} renders missing href ${resolved.href}.`,
        })
      }

      if (
        /^https?:\/\//.test(anchor.href) &&
        !anchor.href.startsWith('https://frankx.ai') &&
        anchor.target === '_blank' &&
        (!anchor.rel || !anchor.rel.includes('noopener'))
      ) {
        findings.push({
          route: route.href,
          source: 'rendered-html',
          href: anchor.href,
          kind: 'external-link',
          status: 'missing-noopener',
          canonicalTarget: null,
          severity: 'warning',
          ownerAction: 'Add rel=\"noopener noreferrer\" to external target blank links.',
          suggestedFix: `External link on ${route.href} opens a new tab without noopener.`,
        })
      }
    }
  })

  return { available: true, baseUrl: BASE_URL, routesChecked: routes.length, findings }
}

function summarize(findings) {
  const bySeverity = findings.reduce((acc, finding) => {
    acc[finding.severity] = (acc[finding.severity] || 0) + 1
    return acc
  }, {})
  const blocking = findings.filter((finding) => finding.severity === 'error')
  return {
    totalFindings: findings.length,
    blockingFindings: blocking.length,
    bySeverity,
  }
}

function renderMarkdown(payload) {
  const lines = []
  lines.push('# FrankX Site Wiring Audit')
  lines.push('')
  lines.push(`Generated: ${payload.timestamp}`)
  lines.push(`Base URL: ${payload.baseUrl}`)
  lines.push('')
  lines.push('## Summary')
  lines.push('')
  lines.push(`- Routes discovered: ${payload.routes.total}`)
  lines.push(`- Public routes checked live: ${payload.live.available ? payload.live.routesChecked : 0}`)
  lines.push(`- Source files scanned: ${payload.static.scannedFiles}`)
  lines.push(`- Total findings: ${payload.summary.totalFindings}`)
  lines.push(`- Blocking findings: ${payload.summary.blockingFindings}`)
  lines.push('')
  lines.push('## Blocking Findings')
  lines.push('')
  const blocking = payload.findings.filter((finding) => finding.severity === 'error')
  if (blocking.length === 0) {
    lines.push('No blocking public wiring findings.')
  } else {
    lines.push('| Route | Source | Href | Status | Suggested fix |')
    lines.push('| --- | --- | --- | --- | --- |')
    for (const finding of blocking.slice(0, 80)) {
      lines.push(`| ${finding.route || ''} | ${finding.source}${finding.line ? `:${finding.line}` : ''} | ${finding.href} | ${finding.status} | ${finding.suggestedFix} |`)
    }
  }
  lines.push('')
  lines.push('## Commerce Verification')
  lines.push('')
  lines.push('| ID | Kind | URL | Status | Owner action |')
  lines.push('| --- | --- | --- | --- | --- |')
  for (const item of payload.registry.commerce || []) {
    lines.push(`| ${item.id} | ${item.kind} | ${item.url} | ${item.status} | ${item.ownerAction || ''} |`)
  }
  lines.push('')
  lines.push('## Canonical Aliases')
  lines.push('')
  lines.push('| From | To | Status | Reason |')
  lines.push('| --- | --- | --- | --- |')
  for (const item of payload.registry.internalCanonicals || []) {
    lines.push(`| ${item.from} | ${item.to} | ${item.status} | ${item.reason || ''} |`)
  }
  lines.push('')
  return lines.join('\n')
}

async function main() {
  const ctx = buildRouteContext()
  const registry = readJson(SITE_LINKS_PATH, { commerce: [], internalCanonicals: [] })
  const staticResult = scanSourceLinks(ctx)
  const liveResult = SKIP_LIVE
    ? { available: false, skipped: true, baseUrl: BASE_URL, routesChecked: 0, findings: [] }
    : await runLiveAudit(ctx)

  const findings = [...staticResult.findings, ...(liveResult.findings || [])]
  const payload = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    routes: {
      total: ctx.routes.length,
      aliases: Object.keys(ctx.aliases).length,
      public: ctx.routes.filter((route) => !isPrivateOrOwnerRoute(route.href)).length,
      privateOrOwner: ctx.routes.filter((route) => isPrivateOrOwnerRoute(route.href)).length,
    },
    static: staticResult,
    live: liveResult,
    registry,
    summary: summarize(findings),
    findings,
  }

  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true })
  fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  fs.writeFileSync(OUTPUT_MD, `${renderMarkdown(payload)}\n`, 'utf8')

  console.log(`[site-wiring] routes=${payload.routes.total} scannedFiles=${payload.static.scannedFiles} findings=${payload.summary.totalFindings} blocking=${payload.summary.blockingFindings}`)
  console.log(`[site-wiring] wrote ${path.relative(ROOT, OUTPUT_JSON)} and ${path.relative(ROOT, OUTPUT_MD)}`)

  if (STRICT && payload.summary.blockingFindings > 0) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('[site-wiring] fatal:', err)
  process.exit(1)
})
