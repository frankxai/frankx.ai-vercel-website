#!/usr/bin/env node
// Runaway-loop benchmark — first-party, reproducible.
//
// Measures the mechanism behind AGENT LOOP RUNAWAY: an agent that keeps
// calling tools without converging pays a cost that scales with step count,
// not task complexity. Two policies are compared per scenario:
//   1. uncapped  — no external stop condition; a non-convergent trap runs
//                  until a simulation horizon (not a claim about real
//                  agents — see README scope)
//   2. capped    — stepCountIs(N) bounds the run at a fixed multiple of the
//                  scenario's known-optimal step count
//
// The number is computed on the INCLUDED fixed scenario set (see data/). It
// is reproducible: same scenarios + same simulator => same step counts and
// same costs, every run.
//
// Optional live leg: set OPENAI_API_KEY to also run one real small agent
// loop and print its actual step count next to the simulated numbers. Never
// persisted or logged.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { simulateScenario, DEFAULT_CAP_MULTIPLIER, UNCAPPED_HORIZON } from './simulate.mjs'
import { PRICE_PER_M, stepCostUsd } from './pricing.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function load(name) {
  return JSON.parse(readFileSync(join(ROOT, 'data', name), 'utf8'))
}

async function main() {
  const scenarios = load('scenarios.json')
  const apiKey = process.env.OPENAI_API_KEY

  console.error(`[bench] scenarios=${scenarios.length}  cap_multiplier=${DEFAULT_CAP_MULTIPLIER}  uncapped_horizon=${UNCAPPED_HORIZON}`)

  const perScenario = []
  let sumUncappedCost = 0
  let sumCappedCost = 0
  let sumOptimalCost = 0

  for (const scenario of scenarios) {
    const sim = simulateScenario(scenario)
    const uncappedCost = stepCostUsd(sim.uncapped.steps * scenario.avg_tokens_per_step)
    const cappedCost = stepCostUsd(sim.capped.steps * scenario.avg_tokens_per_step)
    const optimalCost = stepCostUsd(scenario.optimal_steps * scenario.avg_tokens_per_step)

    sumUncappedCost += uncappedCost
    sumCappedCost += cappedCost
    sumOptimalCost += optimalCost

    perScenario.push({
      id: scenario.id,
      name: scenario.name,
      trap: scenario.trap,
      optimal_steps: scenario.optimal_steps,
      avg_tokens_per_step: scenario.avg_tokens_per_step,
      cap_steps: sim.cap,
      uncapped: { steps: sim.uncapped.steps, converged: sim.uncapped.converged, cost_usd: Number(uncappedCost.toFixed(4)) },
      capped: { steps: sim.capped.steps, converged: sim.capped.converged, cost_usd: Number(cappedCost.toFixed(4)) },
      optimal_cost_usd: Number(optimalCost.toFixed(4)),
      cost_ratio_uncapped_to_optimal: Number((uncappedCost / optimalCost).toFixed(2)),
      cost_ratio_capped_to_optimal: Number((cappedCost / optimalCost).toFixed(2)),
    })
  }

  const results = {
    metric: 'agent loop cost under uncapped vs stepCountIs(N)-capped policy, per scenario and summed',
    n_scenarios: scenarios.length,
    cap_multiplier: DEFAULT_CAP_MULTIPLIER,
    uncapped_horizon_steps: UNCAPPED_HORIZON,
    price_per_million_tokens_usd: PRICE_PER_M,
    totals: {
      uncapped_cost_usd: Number(sumUncappedCost.toFixed(4)),
      capped_cost_usd: Number(sumCappedCost.toFixed(4)),
      optimal_cost_usd: Number(sumOptimalCost.toFixed(4)),
      uncapped_to_optimal_ratio: Number((sumUncappedCost / sumOptimalCost).toFixed(2)),
      capped_to_optimal_ratio: Number((sumCappedCost / sumOptimalCost).toFixed(2)),
      cost_contained_by_cap_usd: Number((sumUncappedCost - sumCappedCost).toFixed(4)),
    },
    live: null,
  }

  if (apiKey) {
    console.error('[bench] OPENAI_API_KEY set — running the live leg (one real agent loop)...')
    const { runLive } = await import('./live.mjs')
    const model = process.env.LIVE_MODEL || 'gpt-4o-mini'
    const cap = 6
    const live = await runLive(apiKey, { cap, model })
    results.live = { model, cap, ...live }
    console.error(`[bench] live: ${live.steps} steps, stopped by ${live.stoppedBy}, ${live.totalTokens} tokens`)
  } else {
    console.error('[bench] OPENAI_API_KEY not set — offline simulation only. Set it to also run the live leg.')
  }

  mkdirSync(join(ROOT, 'results'), { recursive: true })
  writeFileSync(join(ROOT, 'results', 'results.json'), JSON.stringify(results, null, 2) + '\n')
  writeFileSync(join(ROOT, 'results', 'per-scenario.json'), JSON.stringify(perScenario, null, 2) + '\n')

  // ---- human-readable summary ----
  console.log(`\nAgent loop cost, uncapped vs capped — N=${scenarios.length} scenarios`)
  console.log(['scenario', 'trap', 'optimal', 'uncapped', 'capped', 'uncapped $', 'capped $'].join('\t'))
  for (const row of perScenario) {
    console.log(
      [
        row.name,
        row.trap,
        row.optimal_steps,
        row.uncapped.steps,
        row.capped.steps,
        '$' + row.uncapped.cost_usd,
        '$' + row.capped.cost_usd,
      ].join('\t')
    )
  }
  console.log(
    `\ntotals: uncapped $${results.totals.uncapped_cost_usd} (${results.totals.uncapped_to_optimal_ratio}x optimal) ` +
      `vs capped $${results.totals.capped_cost_usd} (${results.totals.capped_to_optimal_ratio}x optimal) ` +
      `— the cap contains $${results.totals.cost_contained_by_cap_usd} across ${scenarios.length} scenarios`
  )
  console.log('\nraw artifacts: results/results.json, results/per-scenario.json')
}

main().catch((e) => {
  console.error('[bench] failed:', e.message)
  process.exit(1)
})
