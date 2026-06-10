import { NextRequest, NextResponse } from 'next/server'
import { fetchLivePricing } from '@/lib/llm-hub/openrouter'

const CRON_SECRET = process.env.CRON_SECRET
const REDEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK_MODELS

/**
 * Daily pricing-freshness probe.
 *
 * Schedule (vercel.json): `0 7 * * *` — every day at 07:00 UTC.
 * Auth: Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}`.
 *
 * What it does (lightweight, no writes to the repo):
 *  1. Fetches the live OpenRouter pricing for every LLM mapped via editorial.openrouterId.
 *  2. Compares the live numbers to the static registry values; flags drift > 5%.
 *  3. If VERCEL_DEPLOY_HOOK_MODELS is set, fires the redeploy hook to refresh
 *     ISR pages with the new live pricing. (No-op if unset.)
 *
 * Returns the drift report. The GitHub Action surfaces large drifts.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const cronHeader = request.headers.get('x-vercel-cron')
  const isVercelCron = Boolean(cronHeader)
  const isAuthorized = CRON_SECRET ? authHeader === `Bearer ${CRON_SECRET}` : true

  if (!isVercelCron && !isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const live = await fetchLivePricing()
  const liveCount = Object.keys(live).length

  // Lazy-import the static registry so we don't pull it into edge bundles unnecessarily.
  const registry = (await import('@/data/model-registry.json')).default as {
    models: Record<string, { name: string; pricing?: { input_per_1m?: number; output_per_1m?: number } }>
  }
  const editorial = (await import('@/lib/llm-hub/editorial')).MODEL_EDITORIAL

  interface Drift {
    id: string
    name: string
    field: 'input_per_1m' | 'output_per_1m'
    registry: number | null
    live: number
    pct: number
  }
  const drifts: Drift[] = []

  for (const [id, ed] of Object.entries(editorial)) {
    if (!ed.openrouterId) continue
    const lp = live[id]
    if (!lp) continue
    const m = registry.models[id]
    if (!m) continue
    const checks: { field: 'input_per_1m' | 'output_per_1m'; reg: number | undefined; liveV: number }[] = [
      { field: 'input_per_1m', reg: m.pricing?.input_per_1m, liveV: lp.inputPer1m },
      { field: 'output_per_1m', reg: m.pricing?.output_per_1m, liveV: lp.outputPer1m },
    ]
    for (const { field, reg, liveV } of checks) {
      if (typeof reg !== 'number') continue
      if (reg === 0 && liveV === 0) continue
      const denom = Math.max(reg, 0.0001)
      const pct = Math.abs((liveV - reg) / denom) * 100
      if (pct > 5) {
        drifts.push({ id, name: m.name, field, registry: reg, live: liveV, pct: Math.round(pct * 10) / 10 })
      }
    }
  }

  let redeployTriggered: 'fired' | 'skipped' | 'unset' = 'unset'
  if (REDEPLOY_HOOK && (drifts.length > 0 || liveCount > 0)) {
    try {
      const res = await fetch(REDEPLOY_HOOK, { method: 'POST' })
      redeployTriggered = res.ok ? 'fired' : 'skipped'
    } catch {
      redeployTriggered = 'skipped'
    }
  }

  return NextResponse.json(
    {
      generated_at: new Date().toISOString(),
      live_pricing_count: liveCount,
      drift_count: drifts.length,
      drifts,
      redeploy: redeployTriggered,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
