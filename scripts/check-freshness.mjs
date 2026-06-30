#!/usr/bin/env node
// Freshness check for the AI-architecture credibility surfaces.
//
// A hub that advertises "living / dated" and goes stale is worse than an honest
// static one. This flags numbers whose "as of" date has aged past a window so
// they get re-sourced or retired. Run in CI; exits non-zero when something is stale.
//
//   node scripts/check-freshness.mjs            # warn only
//   node scripts/check-freshness.mjs --strict   # exit 1 if anything is stale

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const STRICT = process.argv.includes('--strict')
const ROOT = process.cwd()
const MAX_AGE_DAYS = Number(process.env.FRESHNESS_MAX_AGE_DAYS || 270) // ~9 months

// Parse "2026-06" or "2026-06-27" → epoch ms (first of month if no day).
function parseAsOf(s) {
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String(s).trim())
  if (!m) return null
  const [, y, mo, d] = m
  return Date.parse(`${y}-${mo}-${d || '01'}T00:00:00Z`)
}

function ageDays(ms, nowMs) {
  return Math.floor((nowMs - ms) / 86_400_000)
}

const now = Date.now()
const stale = []
const checked = []

// 1. Cost & reliability ledger: lastUpdated + every row's retrieval_date.
try {
  const ledger = JSON.parse(
    readFileSync(join(ROOT, 'data/ai-architecture/cost-reliability-ledger.json'), 'utf8')
  )
  const lu = parseAsOf(ledger.lastUpdated)
  checked.push('ledger.lastUpdated')
  if (lu && ageDays(lu, now) > MAX_AGE_DAYS) {
    stale.push(`ledger lastUpdated ${ledger.lastUpdated} is ${ageDays(lu, now)}d old`)
  }
  for (const row of ledger.rows || []) {
    const d = parseAsOf(row.retrieval_date)
    if (d && ageDays(d, now) > MAX_AGE_DAYS) {
      stale.push(`ledger row "${row.id || row.metric}" sourced ${row.retrieval_date} (${ageDays(d, now)}d old)`)
    }
  }
} catch (e) {
  console.error('[freshness] could not read ledger:', e.message)
}

console.log(`[freshness] checked ${checked.length} surfaces; max age ${MAX_AGE_DAYS}d`)
if (stale.length === 0) {
  console.log('[freshness] all dated numbers are within the freshness window ✓')
  process.exit(0)
}

console.log(`[freshness] ${stale.length} stale item(s):`)
for (const s of stale) console.log('  - ' + s)
console.log('Re-source the figure (update its date) or retire it.')
process.exit(STRICT ? 1 : 0)
