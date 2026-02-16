#!/usr/bin/env node

/**
 * Site Health Check — Static Analysis Quality Gate
 *
 * Cross-references NavigationMega links with app/ routes.
 * Catches broken nav links, placeholder hrefs, and orphan routes
 * without needing a running dev server.
 *
 * Usage:
 *   node scripts/site-health-check.mjs
 *   node scripts/site-health-check.mjs --strict   # exit 1 on warnings too
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const strict = process.argv.includes('--strict')

const errors = []
const warnings = []

// ── 1. Extract all href links from NavigationMega ───────────────────────────

function extractNavLinks() {
  const navPath = path.join(ROOT, 'components', 'NavigationMega.tsx')
  if (!fs.existsSync(navPath)) {
    errors.push({ type: 'missing-file', detail: 'NavigationMega.tsx not found' })
    return []
  }

  const content = fs.readFileSync(navPath, 'utf8')
  const links = new Set()

  // Match href="/..." patterns (both single and double quotes)
  const hrefRegex = /href[=:]\s*["'`](\/([\w\-/]*)?)["'`]/g
  let match
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1]
    // Skip anchors, external links, and dynamic routes like [slug]
    if (href && !href.includes('[') && !href.startsWith('http')) {
      links.add(href)
    }
  }

  return [...links]
}

// ── 2. Scan app/ for all route page.tsx files ───────────────────────────────

function getAppRoutes() {
  const appDir = path.join(ROOT, 'app')
  const routes = new Set()

  function scan(dir, routePath) {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue

      if (entry.isDirectory()) {
        // Skip route groups (parentheses) — they don't affect the URL
        const segment = entry.name.startsWith('(') ? '' : `/${entry.name}`
        scan(path.join(dir, entry.name), routePath + segment)
      } else if (
        entry.name === 'page.tsx' ||
        entry.name === 'page.ts' ||
        entry.name === 'page.jsx' ||
        entry.name === 'page.js'
      ) {
        routes.add(routePath || '/')
      }
    }
  }

  scan(appDir, '')
  return routes
}

// ── 3. Check for href="#" placeholders in production pages ──────────────────

function checkPlaceholderLinks() {
  const appDir = path.join(ROOT, 'app')
  const dataDir = path.join(ROOT, 'data')
  const results = []

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue

      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        scanDir(fullPath)
      } else if (entry.name.match(/\.(tsx?|jsx?|json)$/)) {
        const content = fs.readFileSync(fullPath, 'utf8')
        // Match href="#" or "href": "#" patterns
        const placeholderRegex = /href[=:"]\s*["']#["']/g
        let m
        while ((m = placeholderRegex.exec(content)) !== null) {
          const beforeMatch = content.substring(0, m.index)
          const lineNum = (beforeMatch.match(/\n/g) || []).length + 1
          results.push({
            file: path.relative(ROOT, fullPath),
            line: lineNum,
            match: m[0],
          })
        }
      }
    }
  }

  scanDir(appDir)
  scanDir(dataDir)
  return results
}

// ── 4. Run all checks ───────────────────────────────────────────────────────

console.log('Site Health Check')
console.log('='.repeat(60))
console.log()

// Step 1: Nav links vs routes
const navLinks = extractNavLinks()
const appRoutes = getAppRoutes()

console.log(`Navigation links found: ${navLinks.length}`)
console.log(`App routes found:       ${appRoutes.size}`)
console.log()

// Check each nav link has a matching route
const brokenNavLinks = []
const dynamicRoutes = [...appRoutes].filter((r) => r.includes('['))

for (const link of navLinks) {
  if (appRoutes.has(link)) continue

  // Check if a dynamic route could match
  const isDynamicMatch = dynamicRoutes.some((route) => {
    const routeBase = route.substring(0, route.indexOf('['))
    return link.startsWith(routeBase) && link !== routeBase.replace(/\/$/, '')
  })

  if (!isDynamicMatch) {
    brokenNavLinks.push(link)
  }
}

if (brokenNavLinks.length > 0) {
  console.log('BROKEN NAV LINKS (404 on click):')
  for (const link of brokenNavLinks) {
    console.log(`  ${link}`)
    errors.push({ type: 'broken-nav', detail: `Nav links to ${link} but no route exists` })
  }
  console.log()
} else {
  console.log('Nav links: All routes exist')
  console.log()
}

// Step 2: Placeholder links
const placeholders = checkPlaceholderLinks()
if (placeholders.length > 0) {
  console.log(`PLACEHOLDER LINKS (href="#"):`)
  for (const p of placeholders) {
    console.log(`  ${p.file}:${p.line}`)
    warnings.push({ type: 'placeholder', detail: `${p.file}:${p.line} has href="#"` })
  }
  console.log()
} else {
  console.log('Placeholder links: None found')
  console.log()
}

// Step 3: Summary
console.log('='.repeat(60))
console.log(`Errors:   ${errors.length}`)
console.log(`Warnings: ${warnings.length}`)
console.log()

if (errors.length > 0) {
  console.log('ERRORS (must fix):')
  for (const e of errors) {
    console.log(`  [${e.type}] ${e.detail}`)
  }
  console.log()
}

if (warnings.length > 0) {
  console.log('WARNINGS (should fix):')
  for (const w of warnings) {
    console.log(`  [${w.type}] ${w.detail}`)
  }
  console.log()
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('All checks passed.')
}

// Exit code
if (errors.length > 0) {
  process.exit(1)
} else if (strict && warnings.length > 0) {
  process.exit(1)
} else {
  process.exit(0)
}
