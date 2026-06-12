#!/usr/bin/env node
// Auto-pull weekly traffic from the GA4 Data API and fill the journal's §2.
//
// Why GA4 and not Vercel: Vercel Web Analytics has no stable public REST API for
// page-view aggregates (dashboard + client SDK only). GA4 has a proper Data API,
// so that's the real auto-pull source for "visitors per hub + where from".
//
// DORMANT UNTIL CREDENTIALS EXIST. With no creds it prints the setup steps and
// exits 0 (so it never breaks a Sunday run). The moment these two env vars are
// set it pulls real numbers — no code change:
//   GA4_PROPERTY_ID            e.g. properties/123456789  (or just 123456789)
//   GOOGLE_APPLICATION_CREDENTIALS  path to a service-account JSON with the
//                              Analytics Data API enabled + Viewer on the property
//
// The value-add: every page path is mapped to its HUB TYPE via the production
// route index, so the output answers "which TYPE of hub gets traffic", not just
// raw page paths.
//
// Usage: node scripts/analytics-pull.mjs [--week=YYYY-Www]

import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSign } from 'node:crypto'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'docs', 'ops', 'analytics')
const PROD_REPO = process.env.FRANKX_PROD_REPO || join(ROOT, '..', 'frankx.ai-vercel-website')
const ROUTE_INDEX = join(PROD_REPO, 'data', 'route-index.json')

const PROPERTY = (process.env.GA4_PROPERTY_ID || '').replace(/^properties\//, '')
const CREDS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS

function setupGuide(reason) {
  console.log(`\n[analytics-pull] ${reason}\n`)
  console.log('To enable auto-pull (one-time):')
  console.log('  1. Create a GA4 property for frankx.ai (or confirm the existing one).')
  console.log('  2. In Google Cloud: enable "Google Analytics Data API", create a')
  console.log('     service account, download its JSON key.')
  console.log('  3. In GA4 Admin → Property Access, add the service-account email as Viewer.')
  console.log('  4. Set env: GA4_PROPERTY_ID=123456789 and')
  console.log('     GOOGLE_APPLICATION_CREDENTIALS=C:\\path\\to\\key.json')
  console.log('  5. Re-run: node scripts/analytics-pull.mjs')
  console.log('\nUntil then, fill §2 of the weekly journal by pasting from the Vercel')
  console.log('Analytics tab (see docs/ops/analytics/README.md).\n')
}

if (!PROPERTY || !CREDS_PATH || !existsSync(CREDS_PATH)) {
  setupGuide('No GA4 credentials found — running in dormant mode.')
  process.exit(0)
}

// ── Mint a Google OAuth access token from the service-account key (no deps) ──
function base64url(input) {
  return Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

async function getAccessToken(creds) {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = base64url(JSON.stringify({
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }))
  const signer = createSign('RSA-SHA256')
  signer.update(`${header}.${claim}`)
  const signature = signer.sign(creds.private_key).toString('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const jwt = `${header}.${claim}.${signature}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  if (!res.ok) throw new Error(`token exchange failed: ${res.status} ${await res.text()}`)
  return (await res.json()).access_token
}

async function runReport(token, body) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) throw new Error(`runReport failed: ${res.status} ${await res.text()}`)
  return res.json()
}

// ── Map a page path to its hub type via the production route index ──
function buildTypeLookup() {
  if (!existsSync(ROUTE_INDEX)) return () => 'unknown'
  const idx = JSON.parse(readFileSync(ROUTE_INDEX, 'utf8'))
  const byHref = new Map((idx.routes || []).map((r) => [r.href, r.type || 'unknown']))
  return (path) => {
    const clean = path.split('?')[0].replace(/\/$/, '') || '/'
    if (byHref.has(clean)) return byHref.get(clean)
    // longest-prefix match for nested routes (e.g. /blog/<slug> → blog)
    const seg = '/' + (clean.split('/')[1] || '')
    return byHref.get(seg) || 'unknown'
  }
}

function isoWeekRange(weekArg) {
  // default: trailing 7 days; explicit --week handled by the journal generator
  const until = new Date()
  const since = new Date(until.getTime() - 7 * 86400000)
  const fmt = (d) => d.toISOString().slice(0, 10)
  return { since: fmt(since), until: fmt(until), tag: weekArg }
}

async function main() {
  const creds = JSON.parse(readFileSync(CREDS_PATH, 'utf8'))
  const token = await getAccessToken(creds)
  const weekArg = process.argv.find((a) => a.startsWith('--week='))?.split('=')[1]
  const { since, until } = isoWeekRange(weekArg)
  const typeOf = buildTypeLookup()

  const pages = await runReport(token, {
    dateRanges: [{ startDate: since, endDate: until }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 250,
  })

  const sources = await runReport(token, {
    dateRanges: [{ startDate: since, endDate: until }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
    limit: 15,
  })

  const byType = new Map()
  let totalViews = 0
  const topPages = []
  for (const row of pages.rows || []) {
    const path = row.dimensionValues[0].value
    const views = Number(row.metricValues[0].value)
    totalViews += views
    const t = typeOf(path)
    byType.set(t, (byType.get(t) || 0) + views)
    if (topPages.length < 15) topPages.push({ path, views, users: Number(row.metricValues[1].value), type: t })
  }

  const hubTable = [...byType.entries()].sort((a, b) => b[1] - a[1])
    .map(([t, v]) => `| ${t} | ${v} | ${((v / totalViews) * 100).toFixed(1)}% |`).join('\n')
  const pageTable = topPages
    .map((p, i) => `| ${i + 1} | ${p.path} | ${p.type} | ${p.views} | ${p.users} |`).join('\n')
  const srcTable = (sources.rows || [])
    .map((r) => `| ${r.dimensionValues[0].value} | ${r.metricValues[0].value} |`).join('\n')

  const block = `<!-- AUTO-PULLED from GA4 ${since} → ${until} -->

**Views by hub type:**
| Hub type | Views | Share |
|---|---|---|
${hubTable}

**Top pages:**
| # | Path | Hub type | Views | Users |
|---|------|----------|-------|-------|
${pageTable}

**Where from (channel):**
| Channel | Users |
|---------|-------|
${srcTable}
`

  console.log(block)
  // If a journal file for the week exists, splice into §2; else just print.
  if (weekArg) {
    const f = join(OUT_DIR, `WEEK-${weekArg}.md`)
    if (existsSync(f)) {
      const md = readFileSync(f, 'utf8').replace(
        /(## 2\. Traffic[^\n]*\n)/,
        `$1\n${block}\n`
      )
      writeFileSync(f, md)
      console.log(`\n[analytics-pull] spliced into ${f}`)
    }
  }
}

main().catch((e) => {
  console.error(`[analytics-pull] failed: ${e.message}`)
  setupGuide('GA4 pull errored — check the property ID, service-account access, and that the Data API is enabled.')
  process.exit(0) // never break a Sunday run
})
