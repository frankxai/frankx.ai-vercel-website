/**
 * GET/POST /api/swarm/cron — weekly Sunday council run (Vercel cron 06:00 UTC).
 *
 * CRON_SECRET-gated with the same fail-closed block as the 404 agent. Runs a
 * canned weekly session; persists to KV. Never executes trades.
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { catalog } from '@/lib/swarm/catalog'
import { gatewayExecutor, isGatewayAvailable } from '@/lib/swarm/executor'
import { kvStore } from '@/lib/swarm/store'
import { runHostedCouncil } from '@/lib/swarm/orchestrator'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

async function handler(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const isProduction = process.env.NODE_ENV === 'production'

  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }
  if (isProduction && !process.env.CRON_SECRET) {
    return NextResponse.json({ ok: false, error: 'cron_secret_required' }, { status: 503 })
  }

  if (!isGatewayAvailable()) {
    return NextResponse.json({ ok: true, note: 'AI Gateway not configured — skipping weekly council.' })
  }

  const record = await runHostedCouncil(
    { executor: gatewayExecutor, store: kvStore, now: () => new Date(), catalog },
    {
      context:
        'Weekly Sunday strategy session — no live data feeds attached; treat all quantitative claims as assumptions and flag data-integrity gaps explicitly.',
    },
  )

  return NextResponse.json({
    ok: record.ok,
    runId: record.id,
    costUsd: record.costUsd,
    note: record.note,
    proposals: record.synthesis.portfolioManager?.output?.proposed_actions?.length ?? 0,
  })
}

export const GET = handler
export const POST = handler
