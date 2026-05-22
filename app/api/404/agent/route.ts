/**
 * /api/404/agent — daily backfill agent (Vercel cron at 04:00 UTC).
 *
 * Reads the last 24h of 404 log entries that have no existing alias, hands
 * them to the AI Gateway via lib/ai/gateway-client, and writes the model's
 * proposed aliases + stub-page outlines to private/404-agent-queue.jsonl
 * for operator review at /admin/404-radar.
 *
 * NEVER auto-applies. The operator clicks "Approve" in the radar UI which
 * calls /api/404/alias — same gate Phase 2 uses. This matches Frank's
 * content-ops anti-pattern doctrine: no auto-publish on any L4 output.
 *
 * Vercel cron headers: requests from cron carry `x-vercel-cron: 1` and
 * Authorization: Bearer ${CRON_SECRET}. Production requires CRON_SECRET;
 * local dev accepts unauthenticated manual invocation.
 *
 * Manual invocation:
 *   curl -X POST http://localhost:3000/api/404/agent
 *   (Authorization not required locally)
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import routeIndex from '@/data/route-index.json'
import { proposeAliasesAndStubs, isGatewayAvailable, type PathEvent } from '@/lib/ai/gateway-client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300 // up to 5min (current Vercel default per knowledge update)

const LOG_HOURS = 24

interface LogEntry {
  ts: string
  path: string
  referrer?: string
  topConfidence?: number
}

function getLogPath() {
  if (process.env.VERCEL) return '/tmp/404-log.jsonl'
  return path.join(process.cwd(), 'private', '404-log.jsonl')
}

function getQueuePath() {
  if (process.env.VERCEL) return '/tmp/404-agent-queue.jsonl'
  return path.join(process.cwd(), 'private', '404-agent-queue.jsonl')
}

async function readLog(): Promise<LogEntry[]> {
  try {
    const raw = await fs.readFile(getLogPath(), 'utf8')
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as LogEntry
        } catch {
          return null
        }
      })
      .filter((e): e is LogEntry => e !== null)
  } catch {
    return []
  }
}

function aggregateRecent(entries: LogEntry[], hours: number): PathEvent[] {
  const cutoff = new Date(Date.now() - hours * 3600 * 1000).toISOString()
  const byPath = new Map<string, { count: number; lastHit: string; referrers: Map<string, number> }>()
  for (const e of entries) {
    if (e.ts < cutoff) continue
    const cur = byPath.get(e.path) ?? { count: 0, lastHit: e.ts, referrers: new Map() }
    cur.count += 1
    if (e.ts > cur.lastHit) cur.lastHit = e.ts
    if (e.referrer) cur.referrers.set(e.referrer, (cur.referrers.get(e.referrer) ?? 0) + 1)
    byPath.set(e.path, cur)
  }
  return [...byPath.entries()]
    .map(([p, v]) => ({
      path: p,
      count: v.count,
      lastHit: v.lastHit,
      topReferrer: [...v.referrers.entries()].sort((a, b) => b[1] - a[1])[0]?.[0],
    }))
    .sort((a, b) => b.count - a.count)
}

async function handler(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const isProduction = process.env.NODE_ENV === 'production'

  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  if (isProduction && !process.env.CRON_SECRET) {
    return NextResponse.json({ ok: false, error: 'cron_secret_required' }, { status: 503 })
  }

  const idx = routeIndex as {
    routes: Array<{ href: string; title?: string; tags?: string[] }>
    aliases: Record<string, string>
  }
  const aliases = idx.aliases ?? {}

  const allEvents = aggregateRecent(await readLog(), LOG_HOURS)
  const unresolved = allEvents.filter((e) => !aliases[e.path])

  if (unresolved.length === 0) {
    return NextResponse.json({ ok: true, runId: new Date().toISOString(), proposals: 0, note: 'no unresolved 404s in window' })
  }

  if (!isGatewayAvailable()) {
    return NextResponse.json(
      {
        ok: true,
        runId: new Date().toISOString(),
        proposals: 0,
        note: 'AI Gateway not configured — set AI_GATEWAY_API_KEY to enable proposals',
        unresolvedCount: unresolved.length,
      },
      { status: 200 }
    )
  }

  const result = await proposeAliasesAndStubs({
    events: unresolved,
    knownRoutes: idx.routes,
    existingAliases: aliases,
  })

  if (!result) {
    return NextResponse.json({ ok: false, error: 'gateway_returned_null' }, { status: 502 })
  }

  // Persist to operator queue
  const runId = new Date().toISOString()
  const queueLines = result.proposals.map((p) =>
    JSON.stringify({ runId, status: 'pending', ...p }) + '\n'
  )

  const queuePath = getQueuePath()
  try {
    await fs.mkdir(path.dirname(queuePath), { recursive: true })
    await fs.appendFile(queuePath, queueLines.join(''), 'utf8')
  } catch (err) {
    console.error('[/api/404/agent] queue write failed:', (err as Error).message)
  }

  return NextResponse.json({
    ok: true,
    runId,
    proposals: result.proposals.length,
    unresolvedCount: unresolved.length,
    notes: result.notes,
  })
}

// Vercel cron invokes via GET; manual testing can use POST
export const GET = handler
export const POST = handler
