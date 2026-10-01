import { NextRequest, NextResponse } from 'next/server'
import { TRACKED_GUIDES, trackPDFView } from '@/lib/pdf-analytics'
import { analyticsRatelimit, getClientIdentifier } from '@/lib/ratelimit'

// Distinguishes a missing or malformed Redis URL from an unreachable host without
// echoing the message, which can contain the host name.
function failureKind(error: unknown): string {
  if (!(error instanceof Error)) return 'other'
  const code = (error.cause as { code?: unknown } | undefined)?.code
  if (typeof code === 'string' && /^[A-Z_]{3,20}$/.test(code)) return `network:${code}`
  if (/fetch failed/i.test(error.message)) return 'network'
  if (/url/i.test(error.message)) return 'config'
  return 'other'
}

// The message with anything URL-, host- or token-shaped removed.
function redactedDetail(error: unknown): string {
  if (!(error instanceof Error)) return ''
  return error.message
    .replace(/https?:\/\/\S+/gi, '<url>')
    .replace(/[\w.-]+\.upstash\.io/gi, '<host>')
    .replace(/[A-Za-z0-9_\-+/=]{20,}/g, '<redacted>')
    .slice(0, 120)
}

export async function POST(request: NextRequest) {
  // Reported on failure so an outage is diagnosable from the response alone:
  // runtime console output is not visible through the log tooling in use.
  let stage = 'request'
  try {
    const data = await request.json()

    // Validation
    if (!data.guideSlug || !data.guideTitle || !data.sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    if (!TRACKED_GUIDES.has(data.guideSlug)) {
      return NextResponse.json({ error: 'Unknown guide' }, { status: 400 })
    }

    stage = 'ratelimit'
    const { success } = await analyticsRatelimit.limit(getClientIdentifier(request))
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    // Get metadata
    const userAgent = (request.headers.get('user-agent') || 'unknown').slice(0, 300)
    const referrer = (request.headers.get('referer') || '').slice(0, 300)

    // Track view
    stage = 'store'
    const view = await trackPDFView({
      guideSlug: data.guideSlug,
      guideTitle: String(data.guideTitle).slice(0, 200),
      sessionId: String(data.sessionId).slice(0, 100),
      completionRate: Number(data.completionRate) || 0,
      pagesViewed: Array.isArray(data.pagesViewed) ? data.pagesViewed.slice(0, 500) : [],
      timeSpent: Number(data.timeSpent) || 0,
      userAgent,
      referrer
    })

    return NextResponse.json({ success: true, view })
  } catch (error) {
    console.error('Track view error:', error)
    return NextResponse.json(
      {
        error: 'Failed to track view',
        stage,
        cause: error instanceof Error ? error.name : 'unknown',
        kind: failureKind(error),
        detail: redactedDetail(error),
      },
      { status: 500 }
    )
  }
}
