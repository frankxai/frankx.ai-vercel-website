import { NextRequest, NextResponse } from 'next/server'
import { reportToMarkdown, runStalenessAudit } from '@/lib/models-hub/staleness'

const CRON_SECRET = process.env.CRON_SECRET

/**
 * Weekly staleness audit over both model registries.
 *
 * Schedule (vercel.json): `0 8 * * 1` — every Monday at 08:00 UTC.
 * Auth: Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}`.
 *
 * Returns a structured report. The GitHub Action consumes this endpoint
 * and opens an issue with the markdown body when flags > 0.
 *
 * Manual access:
 *   curl -H "Authorization: Bearer $CRON_SECRET" https://frankx.ai/api/cron/model-hub-audit
 *   curl https://frankx.ai/api/cron/model-hub-audit?format=markdown   (no secret needed in dev)
 */
export async function GET(request: NextRequest) {
  // Auth mirrors /api/404/agent: the Bearer secret is always enforced when
  // set (Vercel cron sends it automatically; x-vercel-cron is spoofable and
  // is deliberately NOT an auth bypass), and production fails closed if the
  // secret is missing.
  const authHeader = request.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (process.env.NODE_ENV === 'production' && !CRON_SECRET) {
    return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 500 })
  }

  const report = runStalenessAudit()
  const format = new URL(request.url).searchParams.get('format')
  if (format === 'markdown') {
    return new NextResponse(reportToMarkdown(report), {
      headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'no-store' },
    })
  }
  return NextResponse.json(report, { headers: { 'Cache-Control': 'no-store' } })
}
