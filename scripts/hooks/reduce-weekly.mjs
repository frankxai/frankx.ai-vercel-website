#!/usr/bin/env node
/**
 * scripts/hooks/reduce-weekly.mjs
 *
 * Weekly reducer that turns platform analytics into `content/hooks/learned.json`.
 *
 * v1 (today) — reads CSV exports from `content/hooks/inbox/*.csv`.
 * v2 (when installed) — reads directly from `dogfrogfog/youtube-analytics-mcp`
 *                       and `tiktok-insights-mcp` via the MCP CLI.
 *
 * CSV format (YouTube Studio export fields — columns auto-detected):
 *   Video title, Video publish time, Impressions click-through rate (%),
 *   Average view duration (sec), Views, ...
 *
 * The reducer extracts the TITLE (treated as the hook), groups similar titles
 * by stem, computes lift vs channel baseline, and emits patterns for the ones
 * beating baseline by ≥ 20% with n ≥ 3.
 *
 * Run:
 *   node scripts/hooks/reduce-weekly.mjs
 *   node scripts/hooks/reduce-weekly.mjs --dry-run
 *   node scripts/hooks/reduce-weekly.mjs --platform youtube-short
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..', '..')

const INBOX_DIR = path.join(ROOT, 'content', 'hooks', 'inbox')
const OUT_FILE = path.join(ROOT, 'content', 'hooks', 'learned.json')

const args = new Set(process.argv.slice(2))
const dryRun = args.has('--dry-run')

const MIN_SAMPLE = 3
const MIN_LIFT = 0.2

function today() {
  return new Date().toISOString().slice(0, 10)
}

function loadExisting() {
  try {
    const raw = fs.readFileSync(OUT_FILE, 'utf8')
    return JSON.parse(raw)
  } catch {
    return {
      $schema: './schema.json',
      version: 1,
      updated_at: today(),
      source: 'seed',
      note: 'Populated by scripts/hooks/reduce-weekly.mjs.',
      patterns: [],
    }
  }
}

/** Parse a CSV with a header row. Returns { headers, rows }. */
function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(Boolean)
  if (lines.length < 2) return { headers: [], rows: [] }
  const split = (line) => {
    // Minimal CSV splitter — YouTube export doesn't embed commas in titles (they're escaped).
    // If a future export does, swap in `csv-parse` then.
    const out = []
    let cur = ''
    let inQ = false
    for (const ch of line) {
      if (ch === '"') inQ = !inQ
      else if (ch === ',' && !inQ) {
        out.push(cur)
        cur = ''
      } else cur += ch
    }
    out.push(cur)
    return out
  }
  const headers = split(lines[0]).map((h) => h.trim())
  const rows = lines.slice(1).map((line) => {
    const cells = split(line)
    const row = {}
    headers.forEach((h, i) => {
      row[h] = cells[i] ?? ''
    })
    return row
  })
  return { headers, rows }
}

function toNumber(v) {
  const n = Number(String(v).replace(/[%,\s]/g, ''))
  return Number.isFinite(n) ? n : 0
}

/**
 * Very simple stemming: lowercase, drop punctuation, take first 4 tokens.
 * Intent is grouping "X hours to Y", "X minutes to Y", "X days to Y" together.
 * Good enough for v1; swap for a proper embedding in v2.
 */
function stem(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\b(\d+)\b/g, '{n}')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 5)
    .join(' ')
}

function slug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}

function reduceRows(rows) {
  const titleKey = ['Video title', 'Title', 'title', 'Content title'].find((k) => k in rows[0])
  const ctrKey = ['Impressions click-through rate (%)', 'CTR (%)', 'CTR'].find((k) => k in rows[0])
  const viewsKey = ['Views', 'views', 'View count'].find((k) => k in rows[0])
  const durKey = ['Average view duration (sec)', 'Avg view duration', 'Avg view duration (sec)'].find(
    (k) => k in rows[0],
  )

  if (!titleKey || (!ctrKey && !viewsKey)) {
    console.warn('⚠️  Missing expected columns. Titles required; CTR or Views required.')
    return []
  }

  const normalized = rows
    .filter((r) => r[titleKey])
    .map((r) => ({
      title: String(r[titleKey]),
      ctr: ctrKey ? toNumber(r[ctrKey]) / 100 : 0,
      views: viewsKey ? toNumber(r[viewsKey]) : 0,
      avg_duration_s: durKey ? toNumber(r[durKey]) : 0,
    }))

  if (normalized.length === 0) return []

  const baselineCtr = avg(normalized.map((r) => r.ctr).filter(Boolean))
  const baselineDuration = avg(normalized.map((r) => r.avg_duration_s).filter(Boolean))

  // Group by stem
  const groups = new Map()
  for (const r of normalized) {
    const s = stem(r.title)
    if (!groups.has(s)) groups.set(s, [])
    groups.get(s).push(r)
  }

  const patterns = []
  for (const [stemKey, members] of groups) {
    if (members.length < MIN_SAMPLE) continue
    const memberCtr = avg(members.map((m) => m.ctr).filter(Boolean))
    const memberDur = avg(members.map((m) => m.avg_duration_s).filter(Boolean))
    const ctrLift = baselineCtr > 0 ? memberCtr / baselineCtr - 1 : 0
    const durLift = baselineDuration > 0 ? memberDur / baselineDuration - 1 : 0

    if (ctrLift < MIN_LIFT && durLift < MIN_LIFT) continue

    const best = [...members].sort((a, b) => (b.ctr || 0) - (a.ctr || 0))[0]
    patterns.push({
      id: slug(stemKey),
      pattern: stemKey,
      example: best.title,
      platform: 'youtube-short',
      score: Math.min(1, Math.max(ctrLift, durLift)),
      lift: {
        ctr: round(ctrLift, 3),
        retention_pct: round(durLift, 3),
      },
      sample_size: members.length,
      first_observed: today(),
      last_observed: today(),
      tags: [],
    })
  }

  patterns.sort((a, b) => b.score - a.score)
  return patterns
}

function avg(xs) {
  if (xs.length === 0) return 0
  return xs.reduce((a, b) => a + b, 0) / xs.length
}

function round(n, d = 2) {
  const p = 10 ** d
  return Math.round(n * p) / p
}

function merge(existing, fresh) {
  const byId = new Map(existing.map((p) => [p.id, p]))
  for (const p of fresh) {
    const prev = byId.get(p.id)
    if (!prev) {
      byId.set(p.id, p)
      continue
    }
    // Decay score on re-observation — small 0.1 boost for recency, average for stability.
    byId.set(p.id, {
      ...prev,
      ...p,
      sample_size: prev.sample_size + p.sample_size,
      score: round((prev.score + p.score) / 2 + 0.05, 3),
      first_observed: prev.first_observed ?? p.first_observed,
      last_observed: p.last_observed,
    })
  }
  return [...byId.values()].sort((a, b) => b.score - a.score)
}

function main() {
  if (!fs.existsSync(INBOX_DIR)) {
    fs.mkdirSync(INBOX_DIR, { recursive: true })
    console.log(`📁 Created ${INBOX_DIR}`)
  }
  const files = fs
    .readdirSync(INBOX_DIR)
    .filter((f) => f.endsWith('.csv'))
    .map((f) => path.join(INBOX_DIR, f))

  if (files.length === 0) {
    console.log('ℹ️  No CSVs in content/hooks/inbox/. Drop analytics exports there and re-run.')
    console.log(
      '   YouTube Studio → Analytics → Content → Advanced mode → Export (CSV).\n' +
        '   Also works with TikTok Analytics CSV export once columns are normalized.',
    )
    return
  }

  const existing = loadExisting()
  const allRows = []
  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8')
    const { rows } = parseCsv(text)
    allRows.push(...rows)
    console.log(`  · ingested ${rows.length} rows from ${path.basename(f)}`)
  }

  const fresh = reduceRows(allRows)
  console.log(`\n🎯 Detected ${fresh.length} winning patterns (sample ≥ ${MIN_SAMPLE}, lift ≥ ${MIN_LIFT * 100}%)`)
  for (const p of fresh.slice(0, 5)) {
    console.log(`   · [${p.score.toFixed(2)}] ${p.pattern}  (n=${p.sample_size})`)
  }

  const merged = merge(existing.patterns, fresh)
  const snapshot = {
    ...existing,
    updated_at: today(),
    source: 'csv-manual',
    patterns: merged,
  }

  if (dryRun) {
    console.log('\n--dry-run set; not writing learned.json')
    return
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(snapshot, null, 2))
  console.log(`\n✅ Wrote ${OUT_FILE} — ${merged.length} total patterns.`)
}

main()
