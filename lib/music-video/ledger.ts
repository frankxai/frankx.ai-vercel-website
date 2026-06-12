import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import type { CostEstimate, EngineId, StackLayer } from './types'

// The cost ledger turns the pre-flight ESTIMATE into reconciled ACTUALS. Hosted
// gen APIs (fal, Higgsfield) don't return a dollar amount — fal returns
// `metrics.inference_time`; we map that × the engine rate and persist it. Over
// time the ledger lets the pre-flight quote from real history, not a static card.

export interface LedgerEntry {
  ts: string // ISO
  jobId: string
  songId: string
  layer: StackLayer
  engine: EngineId
  unit: string
  quantity: number
  estimatedUsd: number
  actualUsd: number | null // null until reconciled
  inferenceTimeSec: number | null // from fal metrics, when available
  higgsfieldCredits: number
}

const LEDGER_PATH = path.join(process.cwd(), 'data', 'music', 'cost-ledger.jsonl')

export function recordEstimate(estimate: CostEstimate, jobId: string): void {
  ensureDir()
  for (const li of estimate.lineItems) {
    const entry: LedgerEntry = {
      ts: new Date().toISOString(),
      jobId,
      songId: estimate.songId,
      layer: li.layer,
      engine: li.engine,
      unit: li.unit,
      quantity: li.quantity,
      estimatedUsd: li.usd,
      actualUsd: null,
      inferenceTimeSec: null,
      higgsfieldCredits: li.higgsfieldCredits,
    }
    appendFileSync(LEDGER_PATH, JSON.stringify(entry) + '\n')
  }
}

// Record an actual after a gen job returns. usdPerSecond maps inference time to
// cost when the engine bills by compute (fal). For credit/flat engines pass usd.
export function recordActual(args: {
  jobId: string
  songId: string
  layer: StackLayer
  engine: EngineId
  actualUsd: number
  inferenceTimeSec?: number
  higgsfieldCredits?: number
}): void {
  ensureDir()
  const entry: LedgerEntry = {
    ts: new Date().toISOString(),
    jobId: args.jobId,
    songId: args.songId,
    layer: args.layer,
    engine: args.engine,
    unit: 'actual',
    quantity: 1,
    estimatedUsd: 0,
    actualUsd: args.actualUsd,
    inferenceTimeSec: args.inferenceTimeSec ?? null,
    higgsfieldCredits: args.higgsfieldCredits ?? 0,
  }
  appendFileSync(LEDGER_PATH, JSON.stringify(entry) + '\n')
}

export interface LedgerSummary {
  jobId: string
  songId: string
  estimatedUsd: number
  actualUsd: number
  variancePct: number | null
}

export function summarize(jobId: string): LedgerSummary | null {
  if (!existsSync(LEDGER_PATH)) return null
  const entries = readLedger().filter((e) => e.jobId === jobId)
  if (entries.length === 0) return null
  const estimatedUsd = round(entries.reduce((a, e) => a + e.estimatedUsd, 0))
  const actualUsd = round(entries.reduce((a, e) => a + (e.actualUsd ?? 0), 0))
  return {
    jobId,
    songId: entries[0].songId,
    estimatedUsd,
    actualUsd,
    variancePct: estimatedUsd > 0 ? round(((actualUsd - estimatedUsd) / estimatedUsd) * 100) : null,
  }
}

export function readLedger(): LedgerEntry[] {
  if (!existsSync(LEDGER_PATH)) return []
  return readFileSync(LEDGER_PATH, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((l) => JSON.parse(l) as LedgerEntry)
}

function ensureDir(): void {
  const dir = path.dirname(LEDGER_PATH)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}
function round(n: number): number {
  return Math.round(n * 100) / 100
}
