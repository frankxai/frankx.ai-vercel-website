/**
 * starlight-eval ingestion — reads first-party measured eval results from
 * data/evals/results/*.json per the contract in data/evals/README.md.
 *
 * The harness (starlight-eval, in the Starlight Intelligence System repo)
 * writes results; this loader reads them. No cross-imports — the contract
 * is the JSON files. Returns an empty set until the first result drop,
 * so every consumer can wire display unconditionally.
 */

import fs from 'fs'
import path from 'path'

export interface StarlightEvalModelResult {
  model_id: string
  registry: 'text' | 'multimodal'
  score: number // 0..1 normalized
  raw?: string
  notes?: string
}

export interface StarlightEvalRun {
  schema: string
  eval_id: string
  eval_name: string
  description?: string
  run_date: string
  runner?: string
  method_url?: string
  task_count?: number
  scoring?: string
  models: StarlightEvalModelResult[]
  caveats?: string[]
}

const RESULTS_DIR = path.join(process.cwd(), 'data/evals/results')

/** All runs, newest first. Safe in server components / route handlers only. */
export function getAllEvalRuns(): StarlightEvalRun[] {
  let files: string[] = []
  try {
    files = fs.readdirSync(RESULTS_DIR).filter((f) => f.endsWith('.json'))
  } catch {
    return [] // results dir absent — contract defined, no drops yet
  }
  const runs: StarlightEvalRun[] = []
  for (const f of files) {
    try {
      const raw = JSON.parse(fs.readFileSync(path.join(RESULTS_DIR, f), 'utf8')) as StarlightEvalRun
      if (!raw.schema?.startsWith('starlight-eval/')) continue
      if (!raw.eval_id || !Array.isArray(raw.models)) continue
      runs.push(raw)
    } catch (e) {
      console.warn(`[starlight-eval] skipping malformed result file ${f}:`, e)
    }
  }
  return runs.sort((a, b) => (b.run_date || '').localeCompare(a.run_date || ''))
}

/** Latest run per eval_id (append-only files; newest date wins). */
export function getLatestRuns(): StarlightEvalRun[] {
  const seen = new Set<string>()
  const latest: StarlightEvalRun[] = []
  for (const run of getAllEvalRuns()) {
    if (seen.has(run.eval_id)) continue
    seen.add(run.eval_id)
    latest.push(run)
  }
  return latest
}

/** Results for one model across all latest runs — for model pages + arena. */
export function getEvalsForModel(modelId: string): Array<{
  run: StarlightEvalRun
  result: StarlightEvalModelResult
}> {
  const out: Array<{ run: StarlightEvalRun; result: StarlightEvalModelResult }> = []
  for (const run of getLatestRuns()) {
    const result = run.models.find((m) => m.model_id === modelId)
    if (result) out.push({ run, result })
  }
  return out
}

/** True once any model has first-party measured results — gates display tiers. */
export function hasMeasuredResults(): boolean {
  return getLatestRuns().some((r) => r.models.length > 0)
}
