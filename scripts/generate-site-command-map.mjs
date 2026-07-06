#!/usr/bin/env node
/**
 * Generate docs/FRANKX_SITE_COMMAND_MAP.md from the site wiring registry and
 * the latest site-wiring audit report when available.
 */

import fs from 'node:fs'
import path from 'node:path'
import { enumerateRoutes, loadAliases } from '../lib/route-enumeration.mjs'

const ROOT = process.cwd()
const OUTPUT = path.join(ROOT, 'docs', 'FRANKX_SITE_COMMAND_MAP.md')
const SITE_LINKS_PATH = path.join(ROOT, 'data', 'site-links.json')
const AUDIT_PATH = path.join(ROOT, 'data', 'audit', 'site-wiring.json')

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}

function table(rows) {
  return rows.join('\n')
}

function countBy(routes, fn) {
  return routes.reduce((acc, route) => {
    const key = fn(route)
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})
}

const hubs = [
  {
    command: 'Discover',
    route: '/',
    role: 'Primary arrival and personal brand promise',
    surface: 'homepage, schema',
    status: 'canonical',
  },
  {
    command: 'Start',
    route: '/start',
    role: 'First intentional path after discovery',
    surface: 'nav CTA, homepage CTAs, footer',
    status: 'canonical',
  },
  {
    command: 'Create Music',
    route: '/music',
    role: 'AI music portfolio and Suno proof',
    surface: 'nav: Music, footer',
    status: 'canonical',
  },
  {
    command: 'Practice Music',
    route: '/music/learn',
    role: 'Music School curriculum surface',
    surface: 'nav: Music, command palette',
    status: 'canonical',
  },
  {
    command: 'Run Vibe OS',
    route: '/products/vibe-os',
    role: 'Creative state management product and app entry',
    surface: 'nav: Music, products',
    status: 'canonical',
  },
  {
    command: 'Become a GenCreator',
    route: '/gencreator',
    role: 'Framework for generative creators',
    surface: 'nav: GenCreators',
    status: 'canonical',
  },
  {
    command: 'Learn',
    route: '/learn',
    role: 'Learning OS for courses, guides, books, assessment, watch',
    surface: 'nav: Learn',
    status: 'canonical',
  },
  {
    command: 'Build',
    route: '/ai-architecture',
    role: 'Blueprints, prototypes, templates, and enterprise architecture',
    surface: 'nav: Build, homepage',
    status: 'canonical',
  },
  {
    command: 'Explore',
    route: '/resources',
    role: 'Resource hub and ecosystem index',
    surface: 'nav: Explore',
    status: 'canonical',
  },
  {
    command: 'Work with Frank',
    route: '/work-with-me',
    role: 'Commercial studio, coaching, and collaboration path',
    surface: 'footer, about, studio CTAs',
    status: 'canonical',
  },
  {
    command: 'Subscribe',
    route: '/newsletter',
    role: 'Primary email capture and relationship loop',
    surface: 'footer, homepage, product fallbacks',
    status: 'canonical',
  },
]

function render() {
  const routes = enumerateRoutes()
  const aliases = loadAliases()
  const registry = readJson(SITE_LINKS_PATH, {})
  const audit = readJson(AUDIT_PATH, null)
  const byType = countBy(routes, (route) => route.type || 'unknown')
  const blocking = audit?.findings?.filter((finding) => finding.severity === 'error') || []
  const warnings = audit?.findings?.filter((finding) => finding.severity === 'warning') || []

  const lines = []
  lines.push('# FrankX Site Command Map')
  lines.push('')
  lines.push('This is the repo-native source of truth for how frankx.ai should be wired. It connects route enumeration, public navigation, footer links, homepage shortcuts, funnel paths, commerce verification, aliases, and the FigJam mirror.')
  lines.push('')
  lines.push('Sources: `lib/route-enumeration.mjs`, `data/site-links.json`, `data/gencreator-launch-readiness.ts`, `components/NavigationMega.tsx`, `components/Footer.tsx`, `components/home/HomePageElite.tsx`, `docs/HUB_REGISTRY.md`, `docs/GENCREATOR_LAUNCH_SYSTEM.md`, and the latest `data/audit/site-wiring.json` when present.')
  lines.push('')
  lines.push('## Current Health')
  lines.push('')
  lines.push(`- Routes discovered: ${routes.length}`)
  lines.push(`- Redirect aliases: ${Object.keys(aliases).length}`)
  lines.push(`- Latest audit: ${audit ? audit.timestamp : 'not generated yet'}`)
  lines.push(`- Blocking findings: ${blocking.length}`)
  lines.push(`- Warnings: ${warnings.length}`)
  lines.push(`- Route types: ${Object.entries(byType).map(([type, count]) => `${type}=${count}`).join(', ')}`)
  lines.push('')
  lines.push('## Source Map')
  lines.push('')
  lines.push('```mermaid')
  lines.push('flowchart LR')
  lines.push('  Registry["docs/HUB_REGISTRY.md"] --> Map["FRANKX_SITE_COMMAND_MAP.md"]')
  lines.push('  Inventory["docs/PAGE_INVENTORY.md"] --> Map')
  lines.push('  Routes["lib/route-enumeration.mjs"] --> Map')
  lines.push('  Links["data/site-links.json"] --> Map')
  lines.push('  Launch["GENCREATOR_LAUNCH_SYSTEM.md + data/gencreator-launch-readiness.ts"] --> Map')
  lines.push('  Nav["components/NavigationMega.tsx"] --> Map')
  lines.push('  Footer["components/Footer.tsx"] --> Map')
  lines.push('  Home["components/home/HomePageElite.tsx + app/page.tsx"] --> Map')
  lines.push('  Audit["data/audit/site-wiring.json"] --> Map')
  lines.push('  Map --> Agents["Editors and agents"]')
  lines.push('  Map --> FigJam["FigJam mirror"]')
  lines.push('```')
  lines.push('')
  lines.push('## Public Hub Map')
  lines.push('')
  lines.push('```mermaid')
  lines.push('flowchart TD')
  lines.push('  Home["/ - FrankX"] --> Start["/start"]')
  lines.push('  Home --> Music["Music /music"]')
  lines.push('  Home --> GenCreators["GenCreators /gencreator"]')
  lines.push('  Home --> Learn["Learn /learn"]')
  lines.push('  Home --> Build["Build /ai-architecture"]')
  lines.push('  Home --> Explore["Explore /resources"]')
  lines.push('  Start --> Newsletter["Newsletter /newsletter"]')
  lines.push('  Start --> Products["Products /products"]')
  lines.push('  Start --> Work["Work with Frank /work-with-me"]')
  lines.push('  Music --> Vibe["Vibe OS /products/vibe-os"]')
  lines.push('  Music --> School["Music School /music/learn"]')
  lines.push('  Learn --> Guides["Guides /guides"]')
  lines.push('  Learn --> Books["Books /books"]')
  lines.push('  Build --> Blueprints["Blueprints /ai-architecture/blueprints"]')
  lines.push('  Build --> Templates["Templates /ai-architecture/templates"]')
  lines.push('  Explore --> Research["Research /research"]')
  lines.push('  Explore --> ACOS["ACOS /acos"]')
  lines.push('```')
  lines.push('')
  lines.push('## Funnel Map')
  lines.push('')
  lines.push('```mermaid')
  lines.push('flowchart LR')
  lines.push('  Discovery["Discovery: home, search, social, blog"] --> Orientation["Orientation: /start, /learn, /resources"]')
  lines.push('  Orientation --> Trust["Trust: /about, /research, /library, /watch"]')
  lines.push('  Trust --> Capture["Capture: /newsletter, downloads, assessments"]')
  lines.push('  Capture --> Offer["Offer: products, workshops, coaching, work-with-me"]')
  lines.push('  Offer --> Delivery["Delivery: downloads, email, checkout, booking"]')
  lines.push('  Delivery --> Loop["Loop: newsletter, updates, community, product docs"]')
  lines.push('```')
  lines.push('')
  lines.push('## Canonical Commands')
  lines.push('')
  lines.push('| Command | Route | Role | Surface | Status |')
  lines.push('| --- | --- | --- | --- | --- |')
  for (const hub of hubs) {
    lines.push(`| ${hub.command} | ${hub.route} | ${hub.role} | ${hub.surface} | ${hub.status} |`)
  }
  lines.push('')
  lines.push('## Commerce Map')
  lines.push('')
  lines.push('Commerce links follow the verify-before-changing rule: paid-product CTAs are only migrated when a checkout destination and delivery path are confirmed.')
  lines.push('')
  lines.push('| ID | Label | Kind | URL | Status | Owner action |')
  lines.push('| --- | --- | --- | --- | --- | --- |')
  for (const item of registry.commerce || []) {
    lines.push(`| ${item.id} | ${item.label} | ${item.kind} | ${item.url} | ${item.status} | ${item.ownerAction || ''} |`)
  }
  lines.push('')
  lines.push('## Alias And Duplicate Triage')
  lines.push('')
  lines.push('| From | Canonical | Status | Reason |')
  lines.push('| --- | --- | --- | --- |')
  for (const item of registry.internalCanonicals || []) {
    lines.push(`| ${item.from} | ${item.to} | ${item.status} | ${item.reason || ''} |`)
  }
  lines.push('')
  lines.push('## Latest Action Table')
  lines.push('')
  if (!audit) {
    lines.push('Run `npm run site:wiring:audit -- --skip-live` or start the dev server and run `npm run site:wiring:audit` to populate live findings.')
  } else if (blocking.length === 0 && warnings.length === 0) {
    lines.push('No blocking or warning findings in the latest site-wiring audit.')
  } else {
    lines.push('| Severity | Route | Source | Href | Status | Suggested fix |')
    lines.push('| --- | --- | --- | --- | --- | --- |')
    for (const finding of [...blocking, ...warnings].slice(0, 50)) {
      lines.push(`| ${finding.severity} | ${finding.route || ''} | ${finding.source}${finding.line ? `:${finding.line}` : ''} | ${finding.href} | ${finding.status} | ${finding.suggestedFix} |`)
    }
  }
  lines.push('')
  lines.push('## FigJam Mirror')
  lines.push('')
  lines.push('The Markdown map is canonical. The FigJam mirror is a presentation layer for whiteboarding and stakeholder review.')
  lines.push('')
  lines.push('| Source | Target | Status | Notes |')
  lines.push('| --- | --- | --- | --- |')
  const mirrorName = registry.figjamMirror?.diagramName || 'FrankX Site Wiring Overview'
  const mirrorTarget = registry.figjamMirror?.url ? `[${mirrorName}](${registry.figjamMirror.url})` : mirrorName
  lines.push(`| docs/FRANKX_SITE_COMMAND_MAP.md | ${mirrorTarget} | ${registry.figjamMirror?.status || 'prepared'} | ${registry.figjamMirror?.ownerAction || 'Generate after source map is accepted.'} |`)
  lines.push('')
  lines.push('## Operating Rule')
  lines.push('')
  lines.push('When a page or link is ambiguous, prefer: verify destination -> add registry entry -> add redirect/canonical -> update nav/footer/homepage -> rerun audit -> regenerate this map.')
  lines.push('')
  return lines.join('\n')
}

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
fs.writeFileSync(OUTPUT, `${render()}\n`, 'utf8')
console.log(`[site-command-map] wrote ${path.relative(ROOT, OUTPUT)}`)
