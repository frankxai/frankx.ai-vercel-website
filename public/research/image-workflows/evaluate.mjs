/**
 * Local evaluator for user-supplied image task attempts. No network or model calls.
 * Usage: node evaluate.mjs attempts.json
 * Each attempt describes a complete task result, not an individual edit request.
 * Output is unverified analysis; it never writes to the FrankX arena.
 */
import { readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const TASKS = new Set(['campaign-scene', 'background-edit', 'exact-copy', 'revision-sequence', 'character-continuity', 'portrait-derivative'])

function finiteNonnegative(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

export function evaluateAttempts(attempts) {
  if (!Array.isArray(attempts) || attempts.length === 0 || attempts.length > 10000) {
    throw new Error('Provide between 1 and 10000 task-attempt records.')
  }
  const ids = new Set()
  const groups = new Map()
  const jobs = new Map()
  for (const [index, a] of attempts.entries()) {
    const fail = (message) => { throw new Error(`Attempt ${index + 1}: ${message}`) }
    if (!a || typeof a !== 'object') fail('expected an object')
    for (const key of ['attempt_id', 'run_id', 'provider_model_id', 'fixture_set_id']) {
      if (typeof a[key] !== 'string' || !a[key].trim()) fail(`${key} is required`)
    }
    if (ids.has(a.attempt_id)) fail('duplicate attempt_id')
    ids.add(a.attempt_id)
    if (!TASKS.has(a.task_id)) fail('unknown task_id')
    if (!['shared_fixtures', 'end_to_end'].includes(a.comparison_mode)) fail('invalid comparison_mode')
    if (typeof a.approved !== 'boolean' || typeof a.mandatory_checks_passed !== 'boolean') fail('approval and mandatory checks must be booleans')
    if (a.approved && !a.mandatory_checks_passed) fail('a failed mandatory check cannot be approved')
    for (const key of ['api_cost_usd', 'elapsed_ms', 'manual_correction_minutes']) {
      if (a[key] !== null && !finiteNonnegative(a[key])) fail(`${key} must be a nonnegative number or null`)
    }
    const groupKey = JSON.stringify([a.provider_model_id, a.comparison_mode, a.fixture_set_id])
    const jobKey = JSON.stringify([groupKey, a.run_id])
    const existingJob = jobs.get(jobKey)
    if (existingJob && existingJob.task !== a.task_id) fail('run_id cannot refer to different tasks')
    if (existingJob?.approved && a.approved) fail('a run can have only one approved final result')
    jobs.set(jobKey, { task: a.task_id, approved: Boolean(existingJob?.approved || a.approved) })
    if (!groups.has(groupKey)) groups.set(groupKey, [])
    groups.get(groupKey).push(a)
  }
  return {
    schema: 'frankx/image-workflow-summary@1',
    evidenceStatus: 'user_supplied_unverified',
    warning: 'Descriptive task-attempt summary only. These records are not verified FrankX measurements or a model ranking. Compare matching fixture sets and task coverage.',
    groups: [...groups.values()].map((rows) => {
      const approved = rows.filter((a) => a.approved).length
      const knownSpend = rows.reduce((total, a) => total + (a.api_cost_usd ?? 0), 0)
      const unknownCosts = rows.filter((a) => a.api_cost_usd === null).length
      const latencies = rows.map((a) => a.elapsed_ms).filter((v) => v !== null).sort((a, b) => a - b)
      const middle = Math.floor(latencies.length / 2)
      const median = latencies.length === 0 ? null : latencies.length % 2 ? latencies[middle] : (latencies[middle - 1] + latencies[middle]) / 2
      const correctionKnown = rows.every((a) => a.manual_correction_minutes !== null)
      return {
        providerModelId: rows[0].provider_model_id,
        comparisonMode: rows[0].comparison_mode,
        fixtureSetId: rows[0].fixture_set_id,
        taskCoverage: [...new Set(rows.map((a) => a.task_id))].sort(),
        taskRuns: new Set(rows.map((a) => a.run_id)).size,
        attempts: rows.length,
        approvedAssets: approved,
        rejectedAttempts: rows.length - approved,
        attemptAcceptanceRate: approved / rows.length,
        knownApiSpendUsd: knownSpend,
        unknownCostAttempts: unknownCosts,
        costPerApprovedAssetUsd: approved > 0 && unknownCosts === 0 ? knownSpend / approved : null,
        medianElapsedMs: median,
        latencySampleCount: latencies.length,
        totalCorrectionMinutes: correctionKnown ? rows.reduce((total, a) => total + a.manual_correction_minutes, 0) : null,
      }
    }),
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 3) throw new Error('Usage: node evaluate.mjs attempts.json')
    const contents = await readFile(process.argv[2], 'utf8')
    if (Buffer.byteLength(contents) > 10_000_000) throw new Error('Input exceeds 10 MB')
    process.stdout.write(`${JSON.stringify(evaluateAttempts(JSON.parse(contents)), null, 2)}\n`)
  } catch (error) {
    process.stderr.write(`${error.message}\n`)
    process.exitCode = 1
  }
}
