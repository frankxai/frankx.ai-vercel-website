#!/usr/bin/env node
/**
 * Pull weekly Vercel Web Analytics data for frankx.ai science content.
 * Uses the working internal query API (authenticated via Vercel CLI token).
 *
 * Run: node scripts/pull-vercel-analytics.mjs [--days=7]
 * Stores: data/observability/vercel-analytics/YYYY-Www.json
 *
 * This replaces the "paste from dashboard" flow in analytics-journal.
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'data', 'observability', 'vercel-analytics')

const PROJECT_ID = 'prj_NHVIKZtglNidOE1FJiq6eYx5QjIL'
const TEAM_ID = 'team_q6LNT6rnFRlqlcjBJ2Wxz6PE'

function getToken() {
  // Try common Vercel CLI locations
  const candidates = [
    process.env.VERCEL_TOKEN,
    // Windows xdg location used by our CLI
    process.platform === 'win32' && `${process.env.APPDATA}/Roaming/xdg.data/com.vercel.cli/auth.json`,
  ].filter(Boolean)

  for (const c of candidates) {
    if (!c) continue
    try {
      if (c.includes('.json')) {
        const d = JSON.parse(require('fs').readFileSync(c, 'utf8'))
        if (d.token) return d.token
      } else {
        return c
      }
    } catch {}
  }
  console.error('No Vercel token found. Run `vercel whoami` first or set VERCEL_TOKEN.')
  process.exit(1)
}

async function fetchJson(url, token) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  return res.json()
}

async function main() {
  const args = process.argv.slice(2)
  const days = Number(args.find(a => a.startsWith('--days='))?.split('=')[1] || 7)

  const now = new Date()
  const until = now.toISOString().slice(0, 10)
  const sinceDate = new Date(now.getTime() - days * 86400000)
  const since = sinceDate.toISOString().slice(0, 10)

  const token = getToken()

  const base = `https://api.vercel.com/v1/query/web-analytics`

  const countUrl = `${base}/visits/count?projectId=${PROJECT_ID}&teamId=${TEAM_ID}&since=${since}&until=${until}`
  const count = await fetchJson(countUrl, token)

  // Top paths
  const pathsUrl = `${base}/visits/aggregate?projectId=${PROJECT_ID}&teamId=${TEAM_ID}&since=${since}&until=${until}&by=requestPath&limit=50`
  let paths = []
  try {
    const p = await fetchJson(pathsUrl, token)
    paths = p.data || []
  } catch (e) {
    console.warn('paths aggregate failed (may be empty window):', e.message)
  }

  // Referrers (good for AI chat sources)
  const refUrl = `${base}/visits/aggregate?projectId=${PROJECT_ID}&teamId=${TEAM_ID}&since=${since}&until=${until}&by=referrerHostname&limit=30`
  let referrers = []
  try {
    const r = await fetchJson(refUrl, token)
    referrers = r.data || []
  } catch {}

  const week = `${now.getUTCFullYear()}-W${String(Math.ceil((((now.getTime() - new Date(now.getUTCFullYear(), 0, 1).getTime()) / 86400000) + 1) / 7)).padStart(2, '0')}`

  const payload = {
    generatedAt: new Date().toISOString(),
    window: { since, until, days },
    visitors: count.data?.visitors ?? 0,
    pageviews: count.data?.pageviews ?? 0,
    topPaths: paths,
    topReferrers: referrers,
  }

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })
  const outFile = join(OUT_DIR, `${week}.json`)
  writeFileSync(outFile, JSON.stringify(payload, null, 2))
  console.log('Wrote', outFile)
  console.log(payload)
}

main().catch(err => { console.error(err); process.exit(1) })
