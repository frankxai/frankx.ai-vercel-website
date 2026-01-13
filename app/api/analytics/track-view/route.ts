import { NextRequest, NextResponse } from 'next/server'
import { trackPDFView } from '@/lib/pdf-analytics'

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

    // Get metadata
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer') || ''

    // Track view
    const view = await trackPDFView({
      guideSlug: data.guideSlug,
      guideTitle: data.guideTitle,
      sessionId: data.sessionId,
      completionRate: data.completionRate || 0,
      pagesViewed: data.pagesViewed || [],
      timeSpent: data.timeSpent || 0,
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
