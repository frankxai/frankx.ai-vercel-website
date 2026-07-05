/**
 * Swarm run persistence — Vercel KV with graceful degrade.
 *
 * `@vercel/kv` is imported lazily and every op is wrapped in try/catch, so when
 * KV env (`KV_REST_API_URL` / `KV_REST_API_TOKEN`) is unset the council still
 * runs and returns results inline — only the history + daily counter are
 * disabled. The per-run cost cap is enforced statelessly regardless; the daily
 * cap is best-effort when KV is down.
 */

import type { RunRecord, Store } from './orchestrator'

const RUNS_KEY = 'swarm:runs'
const RUN_KEY = (id: string) => `swarm:run:${id}`
const PENDING_KEY = 'swarm:decisions:pending'
const COST_KEY = (day: string) => `swarm:cost:${day}`
const MAX_RUN_HISTORY = 50

async function kvClient() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null
  try {
    const { kv } = await import('@vercel/kv')
    return kv
  } catch {
    return null
  }
}

export function isKvAvailable(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

export const kvStore: Store = {
  async getDailySpend(day) {
    const kv = await kvClient()
    if (!kv) return 0
    try {
      return (await kv.get<number>(COST_KEY(day))) ?? 0
    } catch {
      return 0
    }
  },

  async addDailySpend(day, usd) {
    const kv = await kvClient()
    if (!kv) return
    try {
      await kv.incrbyfloat(COST_KEY(day), usd)
      await kv.expire(COST_KEY(day), 60 * 60 * 48)
    } catch {
      // best-effort
    }
  },

  async saveRun(record) {
    const kv = await kvClient()
    if (!kv) return
    try {
      await kv.set(RUN_KEY(record.id), record)
      await kv.lpush(RUNS_KEY, record.id)
      await kv.ltrim(RUNS_KEY, 0, MAX_RUN_HISTORY - 1)
      const pending = record.synthesis.portfolioManager?.output?.proposed_actions ?? []
      if (pending.length > 0) {
        await kv.lpush(PENDING_KEY, JSON.stringify({ runId: record.id, at: record.finishedAt, actions: pending }))
        await kv.ltrim(PENDING_KEY, 0, 99)
      }
    } catch {
      // best-effort
    }
  },
}

// ─── Read side for the dashboard ────────────────────────────

export async function listRuns(limit = 20): Promise<RunRecord[]> {
  const kv = await kvClient()
  if (!kv) return []
  try {
    const ids = (await kv.lrange<string>(RUNS_KEY, 0, limit - 1)) ?? []
    const runs = await Promise.all(ids.map((id) => kv.get<RunRecord>(RUN_KEY(id))))
    return runs.filter((r): r is RunRecord => r !== null)
  } catch {
    return []
  }
}

export interface PendingDecision {
  runId: string
  at: string
  actions: unknown[]
}

export async function listPendingDecisions(limit = 20): Promise<PendingDecision[]> {
  const kv = await kvClient()
  if (!kv) return []
  try {
    const raw = (await kv.lrange<string | PendingDecision>(PENDING_KEY, 0, limit - 1)) ?? []
    return raw
      .map((r) => {
        if (typeof r !== 'string') return r
        try {
          return JSON.parse(r) as PendingDecision
        } catch {
          return null
        }
      })
      .filter((r): r is PendingDecision => r !== null)
  } catch {
    return []
  }
}

export async function todaySpend(): Promise<number> {
  return kvStore.getDailySpend(new Date().toISOString().slice(0, 10))
}
