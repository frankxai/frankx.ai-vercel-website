#!/usr/bin/env node
// Context-rot benchmark — first-party, reproducible.
//
// Measures the STRUCTURAL PRECONDITION for context rot: as a conversation
// grows past a fixed token budget, does a fact planted earlier in the
// conversation still exist in what gets sent to the model at all? Three
// context-management strategies are compared per scenario, at three needle
// depths (10% / 50% / 90% into the conversation):
//   1. fifo                 — naive sliding window, oldest turns evicted first
//   2. keep-first-and-last  — anchor the earliest turns, fill the rest with
//                             the most recent turns
//   3. retrieval-augmented  — content addressed by lookup, not recency
//
// This does NOT measure whether an LLM correctly recalls the fact — that is
// a real, non-deterministic, model-dependent question, and it's answered
// (optionally, cheaply) by the live leg in live.mjs, not by this simulation.
// See the README's scope section.
//
// Optional live leg: set OPENAI_API_KEY to also run a small needle-in-haystack
// grid against a real model. Never persisted or logged.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { simulateScenario, NEEDLE_DEPTHS, ANCHOR_TURNS, STRATEGIES } from './simulate.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function load(name) {
  return JSON.parse(readFileSync(join(ROOT, 'data', name), 'utf8'))
}

async function main() {
  const scenarios = load('scenarios.json')
  const apiKey = process.env.OPENAI_API_KEY

  console.error(`[bench] scenarios=${scenarios.length}  needle_depths=${NEEDLE_DEPTHS.join(',')}  anchor_turns=${ANCHOR_TURNS}`)

  const perScenario = scenarios.map(simulateScenario)

  // Aggregate survival rate per strategy, across every (scenario, depth) cell.
  const totals = {}
  for (const strategy of STRATEGIES) {
    let survived = 0
    let n = 0
    for (const s of perScenario) {
      for (const d of s.per_depth) {
        n++
        if (d[strategy]) survived++
      }
    }
    totals[strategy] = { survived, n, survival_rate: Number((survived / n).toFixed(4)) }
  }

  // Same breakdown, split by needle depth, so the "lost in the middle" shape
  // is visible strategy-by-strategy rather than only as one blended number.
  const byDepth = {}
  for (const depth of NEEDLE_DEPTHS) {
    byDepth[depth] = {}
    for (const strategy of STRATEGIES) {
      let survived = 0
      let n = 0
      for (const s of perScenario) {
        const cell = s.per_depth.find((d) => d.depth === depth)
        n++
        if (cell[strategy]) survived++
      }
      byDepth[depth][strategy] = Number((survived / n).toFixed(4))
    }
  }

  const results = {
    metric: 'needle-survival rate: fraction of (scenario, needle-depth) pairs where a fact planted earlier in a growing conversation is still present in the context sent to the model, per eviction strategy',
    n_scenarios: scenarios.length,
    needle_depths: NEEDLE_DEPTHS,
    anchor_turns: ANCHOR_TURNS,
    strategies: STRATEGIES,
    totals,
    survival_rate_by_depth: byDepth,
    live: null,
  }

  if (apiKey) {
    console.error('[bench] OPENAI_API_KEY set — running the live leg (needle-in-haystack grid)...')
    const { runLive } = await import('./live.mjs')
    const model = process.env.LIVE_MODEL || 'gpt-4o-mini'
    const live = await runLive(apiKey, { model })
    results.live = { model, ...live }
    console.error(`[bench] live: ${live.hits}/${live.n} hits (${(live.hit_rate * 100).toFixed(1)}%), ${live.totalTokens} tokens`)
  } else {
    console.error('[bench] OPENAI_API_KEY not set — offline simulation only. Set it to also run the live leg.')
  }

  mkdirSync(join(ROOT, 'results'), { recursive: true })
  writeFileSync(join(ROOT, 'results', 'results.json'), JSON.stringify(results, null, 2) + '\n')
  writeFileSync(join(ROOT, 'results', 'per-scenario.json'), JSON.stringify(perScenario, null, 2) + '\n')

  // ---- human-readable summary ----
  console.log(`\nNeedle survival under context eviction — N=${scenarios.length} scenarios x ${NEEDLE_DEPTHS.length} depths`)
  console.log(['strategy', ...NEEDLE_DEPTHS.map((d) => `survival@${d * 100}%`), 'overall'].join('\t'))
  for (const strategy of STRATEGIES) {
    console.log(
      [
        strategy,
        ...NEEDLE_DEPTHS.map((d) => `${(byDepth[d][strategy] * 100).toFixed(1)}%`),
        `${(totals[strategy].survival_rate * 100).toFixed(1)}%`,
      ].join('\t')
    )
  }
  console.log('\nraw artifacts: results/results.json, results/per-scenario.json')
}

main().catch((e) => {
  console.error('[bench] failed:', e.message)
  process.exit(1)
})
