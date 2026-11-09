#!/usr/bin/env node
// Read first-party Google Search Console data (free, official API) and write the
// working lists the content calendar runs on: all query x page rows, striking
// distance, and CTR gaps. Credentials stay outside git; pass one of:
//   GSC_ACCESS_TOKEN=<oauth token with webmasters.readonly>
//   GSC_SERVICE_ACCOUNT_FILE=<path to service account JSON added as a user on the property>
//
//   node scripts/search/gsc.mjs                          # sc-domain:frankx.ai, last 28 days
//   node scripts/search/gsc.mjs --days 90 --site https://www.frankx.ai/
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { parseArgs } from 'node:util'
import {
  GSC_MAX_ROWS, GSC_SCOPE,
  buildServiceAccountAssertion, ctrGaps, isoDaysAgo, strikingDistance, toCsv,
} from './search-plane.mjs'

const { values: opt } = parseArgs({
  options: {
    site: { type: 'string', default: process.env.GSC_SITE || 'sc-domain:frankx.ai' },
    days: { type: 'string', default: '28' },
    dimensions: { type: 'string', default: 'query,page' },
    'max-rows': { type: 'string', default: '100000' },
    out: { type: 'string', default: join(homedir(), '.starlight', 'search-ops', 'gsc') },
  },
})

async function accessToken() {
  if (process.env.GSC_ACCESS_TOKEN) return process.env.GSC_ACCESS_TOKEN
  const file = process.env.GSC_SERVICE_ACCOUNT_FILE
  if (!file) throw new Error('set GSC_ACCESS_TOKEN or GSC_SERVICE_ACCOUNT_FILE (see header)')
  const { assertion, tokenUri } = buildServiceAccountAssertion(JSON.parse(readFileSync(file, 'utf8')), GSC_SCOPE)
  const res = await fetch(tokenUri, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  })
  const body = await res.json()
  if (!res.ok) throw new Error(`token exchange ${res.status}: ${body.error_description || body.error}`)
  return body.access_token
}

async function queryAll(token, body, maxRows) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(opt.site)}/searchAnalytics/query`
  const rows = []
  for (let startRow = 0; startRow < maxRows; startRow += GSC_MAX_ROWS) {
    const remaining = maxRows - startRow
    const rowLimit = Math.min(GSC_MAX_ROWS, remaining)
    const res = await fetch(url, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ ...body, rowLimit, startRow }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(`searchAnalytics ${res.status}: ${data.error?.message ?? 'unknown error'}`)
    const page = data.rows ?? []
    rows.push(...page.slice(0, rowLimit))
    if (page.length < rowLimit) break
  }
  return rows
}

async function main() {
  const dimensions = opt.dimensions.split(',').map((d) => d.trim())
  // GSC finalizes data about 2-3 days late; ending 3 days back keeps every day complete.
  const endDate = isoDaysAgo(3)
  const startDate = isoDaysAgo(3 + Number(opt.days) - 1)
  const raw = await queryAll(await accessToken(), { startDate, endDate, dimensions, type: 'web', dataState: 'final' }, Number(opt['max-rows']))
  const rows = raw.map((r) => ({
    ...Object.fromEntries(dimensions.map((d, i) => [d, r.keys[i]])),
    clicks: r.clicks, impressions: r.impressions, ctr: Number(r.ctr.toFixed(4)), position: Number(r.position.toFixed(1)),
  }))

  const siteSlug = opt.site.replace(/[^a-zA-Z0-9_.-]/g, '_')
  const dimSlug = dimensions.join('-')
  const dir = join(opt.out, siteSlug, `${endDate}-${opt.days}d-${dimSlug}`)
  mkdirSync(dir, { recursive: true })
  const columns = [...dimensions, 'clicks', 'impressions', 'ctr', 'position']
  writeFileSync(join(dir, 'rows.json'), JSON.stringify({ site: opt.site, startDate, endDate, dimensions, rows }, null, 2))
  writeFileSync(join(dir, 'rows.csv'), toCsv(rows, columns))
  writeFileSync(join(dir, 'striking-distance.csv'), toCsv(strikingDistance(rows), columns))
  writeFileSync(join(dir, 'ctr-gaps.csv'), toCsv(ctrGaps(rows), columns))
  writeFileSync(join(opt.out, 'latest.json'), JSON.stringify({ dir, site: opt.site, dimensions, startDate, endDate, rows: rows.length }, null, 2))
  console.log(`${rows.length} rows ${startDate}..${endDate} for ${opt.site} -> ${dir}`)
}

main().catch((err) => {
  console.error(`gsc: ${err.message}`)
  process.exitCode = 1
})
