import { NextRequest, NextResponse } from 'next/server'
import { TRACKED_GUIDES, trackPDFView } from '@/lib/pdf-analytics'
import { analyticsRatelimit, getClientIdentifier } from '@/lib/ratelimit'

export async function POST(request: NextRequest) {
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

    const { success } = await analyticsRatelimit.limit(getClientIdentifier(request))
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    // Get metadata
    const userAgent = (request.headers.get('user-agent') || 'unknown').slice(0, 300)
    const referrer = (request.headers.get('referer') || '').slice(0, 300)

    // Track view
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
      { error: 'Failed to track view' },
      { status: 500 }
    )
  }
}
