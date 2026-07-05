/**
 * POST /api/swarm/run — run the investment-intelligence council on demand.
 *
 * Admin-gated (x-admin-secret via requireAdmin). Runs the 3-phase Sonnet+Opus
 * council through the Vercel AI Gateway and persists the run to KV. Graceful
 * no-op (200 + note) when the Gateway is unconfigured, mirroring the 404 agent.
 *
 * Boundary: returns analysis + a synthesis with proposed actions that ALL carry
 * requires_human_approval: true. There is no execution path here — trades happen
 * only through the local trade-gate MCP + a human token.
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { catalog } from '@/lib/swarm/catalog'
import { gatewayExecutor, isGatewayAvailable } from '@/lib/swarm/executor'
import { kvStore, isKvAvailable } from '@/lib/swarm/store'
import { runHostedCouncil } from '@/lib/swarm/orchestrator'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  let body: { context?: string; agents?: string[]; includeChiefOfStaff?: boolean } = {}
  try {
    body = await request.json()
  } catch {
    // empty body is fine — a canned context is used below
  }

  const context =
    (body.context && body.context.trim()) ||
    'Ad-hoc strategy session — no live data feeds attached; flag data integrity accordingly.'

  if (!isGatewayAvailable()) {
    return NextResponse.json({
      ok: true,
      note: 'AI Gateway not configured — set AI_GATEWAY_API_KEY to enable the council.',
      kv: isKvAvailable(),
      team: catalog.team,
    })
  }

  const record = await runHostedCouncil(
    { executor: gatewayExecutor, store: kvStore, now: () => new Date(), catalog },
    { context, only: body.agents, includeChiefOfStaff: body.includeChiefOfStaff === true },
  )

  // Cost gate refusal → 429 with the estimate.
  if (!record.ok && record.note) {
    return NextResponse.json({ ok: false, refused: record.note, estimateUsd: record.estimateUsd }, { status: 429 })
  }

  return NextResponse.json({
    ok: true,
    runId: record.id,
    costUsd: record.costUsd,
    kvPersisted: isKvAvailable(),
    proposedActions: record.synthesis.portfolioManager?.output?.proposed_actions ?? [],
    summary: record.synthesis.portfolioManager?.output?.summary ?? null,
  })
}
