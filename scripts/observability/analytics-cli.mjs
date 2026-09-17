#!/usr/bin/env node
/**
 * FrankX Agent Observability CLI
 *
 * Provides command-line access to Google Analytics 4, Google Search Console,
 * keyword opportunities, and real-time site telemetry for autonomous agents.
 *
 * Usage:
 *   node scripts/observability/analytics-cli.mjs [--summary] [--days=30]
 *   node scripts/observability/analytics-cli.mjs --gsc [--days=28] [--limit=20]
 *   node scripts/observability/analytics-cli.mjs --opportunities
 *   node scripts/observability/analytics-cli.mjs --ga4 [--days=30]
 *   node scripts/observability/analytics-cli.mjs --inspect=https://frankx.ai/blog/my-post
 *   node scripts/observability/analytics-cli.mjs --json
 */

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSign } from 'node:crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')

// ── Environment resolution ──────────────────────────────────────────────────
function resolveEnv() {
  const envPath = join(ROOT, '.env.local')
  if (existsSync(envPath)) {
    try {
      const content = readFileSync(envPath, 'utf8')
      content.split('\n').forEach((line) => {
        const trimmed = line.trim()
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const idx = trimmed.indexOf('=')
          const key = trimmed.slice(0, idx).trim()
          const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
          if (!process.env[key]) {
            process.env[key] = val
          }
        }
      })
    } catch {}
  }
}
resolveEnv()

// ── Google OAuth & Token Generation ─────────────────────────────────────────
function base64url(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, 'utf-8')
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function getCredentials() {
  if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    return {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }
  }

  const credPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    join(ROOT, 'private', 'google-credentials.json')

  if (existsSync(credPath)) {
    try {
      const parsed = JSON.parse(readFileSync(credPath, 'utf8'))
      if (parsed.client_email && parsed.private_key) {
        return parsed
      }
    } catch {}
  }

  return null
}

async function getAccessToken(scopes) {
  const creds = getCredentials()
  if (!creds) return null

  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const payload = base64url(
    JSON.stringify({
      iss: creds.client_email,
      scope: scopes.join(' '),
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    })
  )

  const signatureInput = `${header}.${payload}`
  const signer = createSign('RSA-SHA256')
  signer.update(signatureInput)
  signer.end()
  const sig = base64url(signer.sign(creds.private_key))

  const jwt = `${signatureInput}.${sig}`
  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.access_token
  } catch {
    return null
  }
}

// ── Search Console Service ──────────────────────────────────────────────────
async function fetchGSC(days = 28, rowLimit = 25) {
  const token = await getAccessToken(['https://www.googleapis.com/auth/webmasters.readonly'])
  const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || 'sc-domain:frankx.ai'

  if (!token) {
    // Simulated realistic FrankX search queries
    return {
      siteUrl,
      isSimulated: true,
      totalClicks: 1480,
      totalImpressions: 48900,
      averageCtr: 0.0302,
      averagePosition: 4.8,
      topQueries: [
        { query: 'agentic creator os', clicks: 284, impressions: 3420, ctr: 0.083, position: 2.8 },
        { query: 'multi-agent orchestration architecture', clicks: 195, impressions: 4890, ctr: 0.039, position: 4.1 },
        { query: 'frankx ai architect', clicks: 172, impressions: 1210, ctr: 0.142, position: 1.2 },
        { query: 'enterprise ai center of excellence', clicks: 148, impressions: 3950, ctr: 0.037, position: 6.4 },
        { query: 'suno ai music prompt engineering', clicks: 132, impressions: 5820, ctr: 0.022, position: 8.2 },
        { query: 'golden age of intelligence', clicks: 94, impressions: 2140, ctr: 0.043, position: 5.3 },
        { query: 'autonomous agent swarm patterns', clicks: 88, impressions: 4210, ctr: 0.020, position: 9.6 },
        { query: 'nextjs agent team blueprint', clicks: 76, impressions: 1840, ctr: 0.041, position: 4.8 },
        { query: 'starlight intelligence system', clicks: 65, impressions: 890, ctr: 0.073, position: 2.1 },
        { query: 'ai model comparison 2026', clicks: 58, impressions: 7200, ctr: 0.008, position: 14.5 },
      ],
      opportunities: [
        { query: 'ai model comparison 2026', position: 14.5, impressions: 7200, ctr: 0.008, rec: 'High impressions (7.2k), ranking page 2. Refresh title & add comparison table.' },
        { query: 'suno ai music prompt engineering', position: 8.2, impressions: 5820, ctr: 0.022, rec: 'High volume, position 8. Optimize meta description CTA to double CTR.' },
        { query: 'autonomous agent swarm patterns', position: 9.6, impressions: 4210, ctr: 0.020, rec: 'Bottom of Page 1. Add internal links from top authority posts.' },
      ],
    }
  }

  const endDate = new Date().toISOString().slice(0, 10)
  const startDate = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10)

  try {
    const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, endDate, dimensions: ['query'], rowLimit }),
    })
    if (!res.ok) throw new Error(await res.text())
    const data = await res.json()
    const rows = (data.rows || []).map((r) => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: Number(r.ctr.toFixed(4)),
      position: Number(r.position.toFixed(1)),
    }))

    const totalClicks = rows.reduce((acc, q) => acc + q.clicks, 0)
    const totalImpressions = rows.reduce((acc, q) => acc + q.impressions, 0)
    const averageCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0
    const averagePosition = rows.length > 0 ? rows.reduce((acc, q) => acc + q.position * q.impressions, 0) / totalImpressions : 0

    return {
      siteUrl,
      isSimulated: false,
      totalClicks,
      totalImpressions,
      averageCtr: Number(averageCtr.toFixed(4)),
      averagePosition: Number(averagePosition.toFixed(1)),
      topQueries: rows,
      opportunities: rows.filter((r) => r.impressions > 100 && r.position >= 5 && r.position <= 20).slice(0, 5),
    }
  } catch (err) {
    return { error: err.message }
  }
}

// ── GA4 Analytics Service ───────────────────────────────────────────────────
async function fetchGA4(days = 30) {
  const token = await getAccessToken(['https://www.googleapis.com/auth/analytics.readonly'])
  const propertyId = (process.env.GA4_PROPERTY_ID || '13609240621').replace(/^properties\//, '')

  if (!token) {
    return {
      propertyId,
      isSimulated: true,
      totalUsers: 14820,
      activeUsers: 12150,
      sessions: 19400,
      pageviews: 41200,
      bounceRate: 0.442,
      topPages: [
        { path: '/', views: 4890, users: 2420 },
        { path: '/blog/08-golden-age-of-intelligence', views: 3120, users: 1840 },
        { path: '/products/agentic-creator-os', views: 2680, users: 1530 },
        { path: '/intelligence-atlas', views: 2310, users: 1290 },
        { path: '/prompt-library', views: 1940, users: 1120 },
      ],
      sources: [
        { source: 'Google Search', users: 4620, pct: '42.5%' },
        { source: 'Direct', users: 2780, pct: '25.6%' },
        { source: 'Perplexity AI', users: 1240, pct: '11.4%' },
        { source: 'X / Twitter', users: 950, pct: '8.7%' },
        { source: 'ChatGPT', users: 580, pct: '5.3%' },
      ],
    }
  }

  // Live call if token is valid
  try {
    const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        metrics: [{ name: 'totalUsers' }, { name: 'activeUsers' }, { name: 'screenPageViews' }, { name: 'bounceRate' }],
      }),
    })
    if (!res.ok) throw new Error(await res.text())
    const data = await res.json()
    const mv = data.rows?.[0]?.metricValues || []
    return {
      propertyId,
      isSimulated: false,
      totalUsers: parseInt(mv[0]?.value || '0', 10),
      activeUsers: parseInt(mv[1]?.value || '0', 10),
      pageviews: parseInt(mv[2]?.value || '0', 10),
      bounceRate: parseFloat(mv[3]?.value || '0.45'),
    }
  } catch (err) {
    return { error: err.message }
  }
}

// ── URL Inspection ──────────────────────────────────────────────────────────
async function inspectUrl(targetUrl) {
  const token = await getAccessToken(['https://www.googleapis.com/auth/webmasters.readonly'])
  const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || 'sc-domain:frankx.ai'

  if (!token) {
    return {
      url: targetUrl,
      verdict: 'PASS',
      indexingState: 'INDEXED',
      coverageState: 'Submitted and indexed',
      robotsTxtState: 'ALLOWED',
      pageFetchState: 'SUCCESSFUL',
      mobileUsabilityVerdict: 'PASS',
      isSimulated: true,
    }
  }

  try {
    const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inspectionUrl: targetUrl, siteUrl }),
    })
    if (!res.ok) throw new Error(await res.text())
    const data = await res.json()
    const idx = data.inspectionResult?.indexStatusResult || {}
    return {
      url: targetUrl,
      verdict: idx.verdict || 'NEUTRAL',
      indexingState: idx.verdict === 'PASS' ? 'INDEXED' : 'NEUTRAL',
      coverageState: idx.coverageState,
      isSimulated: false,
    }
  } catch (err) {
    return { error: err.message }
  }
}

// ── CLI Main Routine ────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2)
  const isJson = args.includes('--json')

  const daysArg = args.find((a) => a.startsWith('--days='))
  const days = daysArg ? parseInt(daysArg.split('=')[1], 10) : 28

  const limitArg = args.find((a) => a.startsWith('--limit='))
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 20

  const inspectArg = args.find((a) => a.startsWith('--inspect='))
  const targetInspectUrl = inspectArg ? inspectArg.split('=')[1] : null

  // 1. Inspect URL Command
  if (targetInspectUrl) {
    const result = await inspectUrl(targetInspectUrl)
    if (isJson) {
      console.log(JSON.stringify(result, null, 2))
    } else {
      console.log(`\n🔍 URL Inspection: ${result.url}`)
      console.log(`Status: ${result.indexingState} (${result.verdict})`)
      console.log(`Coverage: ${result.coverageState || 'N/A'}`)
      console.log(`Simulated: ${result.isSimulated ? 'Yes' : 'No (Live GSC)'}\n`)
    }
    return
  }

  // 2. Opportunities Command
  if (args.includes('--opportunities')) {
    const gsc = await fetchGSC(days, 50)
    if (isJson) {
      console.log(JSON.stringify(gsc.opportunities || [], null, 2))
    } else {
      console.log(`\n🎯 High-Leverage Keyword Opportunities (${days} Days)`)
      console.log('='.repeat(65))
      ;(gsc.opportunities || []).forEach((opp, i) => {
        console.log(`${i + 1}. "${opp.query}"`)
        console.log(`   Position: ${opp.position} | Impressions: ${opp.impressions} | CTR: ${(opp.ctr * 100).toFixed(1)}%`)
        if (opp.rec) console.log(`   Action: ${opp.rec}`)
        console.log()
      })
    }
    return
  }

  // 3. Search Console Queries Command
  if (args.includes('--gsc')) {
    const gsc = await fetchGSC(days, limit)
    if (isJson) {
      console.log(JSON.stringify(gsc, null, 2))
    } else {
      console.log(`\n📊 Google Search Console Queries (${days} Days · ${gsc.isSimulated ? 'Simulated' : 'Live'})`)
      console.log(`Clicks: ${gsc.totalClicks} | Impressions: ${gsc.totalImpressions} | Avg Pos: ${gsc.averagePosition}`)
      console.log('-'.repeat(65))
      console.log(
        'Query'.padEnd(35) +
          'Clicks'.padStart(8) +
          'Impr'.padStart(10) +
          'CTR'.padStart(8) +
          'Pos'.padStart(6)
      )
      console.log('-'.repeat(65))
      ;(gsc.topQueries || []).forEach((q) => {
        console.log(
          q.query.slice(0, 33).padEnd(35) +
            String(q.clicks).padStart(8) +
            String(q.impressions).padStart(10) +
            `${(q.ctr * 100).toFixed(1)}%`.padStart(8) +
            String(q.position).padStart(6)
        )
      })
      console.log()
    }
    return
  }

  // 4. GA4 Analytics Command
  if (args.includes('--ga4')) {
    const ga4 = await fetchGA4(days)
    if (isJson) {
      console.log(JSON.stringify(ga4, null, 2))
    } else {
      console.log(`\n📈 Google Analytics 4 Overview (${days} Days · ${ga4.isSimulated ? 'Simulated' : 'Live'})`)
      console.log(`Visitors: ${ga4.totalUsers.toLocaleString()} | Pageviews: ${ga4.pageviews.toLocaleString()} | Bounce: ${(ga4.bounceRate * 100).toFixed(1)}%`)
      if (ga4.topPages) {
        console.log('\nTop Pages:')
        ga4.topPages.forEach((p) => console.log(`  ${p.path.padEnd(35)} ${p.views} views`))
      }
      if (ga4.sources) {
        console.log('\nTop Sources:')
        ga4.sources.forEach((s) => console.log(`  ${s.source.padEnd(25)} ${s.users} users (${s.pct})`))
      }
      console.log()
    }
    return
  }

  // 5. Default: Full Markdown Summary Brief
  const [gsc, ga4] = await Promise.all([fetchGSC(days, 15), fetchGA4(days)])

  if (isJson) {
    console.log(JSON.stringify({ gsc, ga4 }, null, 2))
    return
  }

  const statusNote = gsc.isSimulated
    ? '🟡 High-Fidelity Simulation Mode (Set GCP credentials to switch to live)'
    : '🟢 Live Connected'

  console.log(`
# FrankX Site & SEO Observability Brief (${days} Days)
*Status: ${statusNote}*

## 1. Core KPIs
- **Monthly Visitors**: ${ga4.totalUsers.toLocaleString()}
- **Total Pageviews**: ${ga4.pageviews.toLocaleString()}
- **Search Clicks**: ${gsc.totalClicks.toLocaleString()}
- **Search Impressions**: ${gsc.totalImpressions.toLocaleString()}
- **Average Ranking Position**: ${gsc.averagePosition}
- **Average Search CTR**: ${(gsc.averageCtr * 100).toFixed(1)}%

## 2. Top Search Queries (GSC)
${(gsc.topQueries || [])
  .slice(0, 8)
  .map(
    (q) =>
      `- **"${q.query}"**: ${q.clicks} clicks, ${q.impressions.toLocaleString()} impr, ${(q.ctr * 100).toFixed(1)}% CTR, pos ${q.position}`
  )
  .join('\n')}

## 3. High-Leverage Keyword Opportunities
${(gsc.opportunities || [])
  .slice(0, 4)
  .map(
    (opp, i) =>
      `${i + 1}. **"${opp.query}"** (Pos ${opp.position} · ${opp.impressions} impr · ${(opp.ctr * 100).toFixed(1)}% CTR)\n   Action: ${opp.rec || 'Target query in upcoming content update'}`
  )
  .join('\n')}
`)
}

main().catch((err) => {
  console.error('[analytics-cli] Error:', err)
  process.exit(1)
})
