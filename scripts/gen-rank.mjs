#!/usr/bin/env node
/**
 * scripts/gen-rank.mjs
 *
 * The gen-layer learning loop. Reads the append-only judged-outcome log at
 * data/gen/outcomes.jsonl, aggregates win-rate + eval-count per pattern, and
 * rewrites data/gen/winrate.json. lib/gen/patterns.ts overlays that file so the
 * router (lib/gen/router.ts) biases toward patterns that actually won.
 *
 * Run after a batch of outputs has been judged (Council or hook-learn analytics):
 *   node scripts/gen-rank.mjs
 *
 * Outcome line schema (one JSON object per line):
 *   { "patternId": "...", "won": true, "surface": "...", "judge": "...", "ts": "..." }
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUTCOMES = resolve(ROOT, 'data/gen/outcomes.jsonl')
const WINRATE = resolve(ROOT, 'data/gen/winrate.json')

function main() {
  if (!existsSync(OUTCOMES)) {
    console.error(`No outcomes log at ${OUTCOMES} — nothing to rank.`)
    process.exit(0)
  }

  const lines = readFileSync(OUTCOMES, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  /** @type {Record<string, { wins: number, total: number }>} */
  const agg = {}
  let skipped = 0
  for (const line of lines) {
    let row
    try {
      row = JSON.parse(line)
    } catch {
      skipped++
      continue
    }
    if (!row.patternId || typeof row.won !== 'boolean') {
      skipped++
      continue
    }
    const a = (agg[row.patternId] ||= { wins: 0, total: 0 })
    a.total++
    if (row.won) a.wins++
  }

  const out = {
    _comment:
      'Win-rate overlay for lib/gen/patterns.ts. Rebuilt by scripts/gen-rank.mjs from data/gen/outcomes.jsonl. Do not hand-edit — append judged outcomes to outcomes.jsonl and re-run.',
  }
  const ranked = Object.entries(agg)
    .map(([id, { wins, total }]) => ({ id, winRate: Math.round((wins / total) * 100) / 100, evalCount: total }))
    .sort((a, b) => b.winRate - a.winRate || b.evalCount - a.evalCount)

  for (const r of ranked) out[r.id] = { winRate: r.winRate, evalCount: r.evalCount }

  writeFileSync(WINRATE, JSON.stringify(out, null, 2) + '\n')

  console.error(`✓ ranked ${ranked.length} patterns from ${lines.length} outcomes` + (skipped ? ` (${skipped} skipped)` : ''))
  for (const r of ranked) {
    console.error(`  ${String(Math.round(r.winRate * 100)).padStart(3)}%  (${r.evalCount})  ${r.id}`)
  }
}

main()
