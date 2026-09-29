import { NextRequest, NextResponse } from 'next/server'
import { TRACKED_GUIDES, trackPDFDownload } from '@/lib/pdf-analytics'
import { analyticsRatelimit, getClientIdentifier } from '@/lib/ratelimit'

const DOWNLOAD_METHODS = ['direct', 'email', 'combo']

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

    // Track download
    const download = await trackPDFDownload({
      guideSlug: data.guideSlug,
      guideTitle: String(data.guideTitle).slice(0, 200),
      sessionId: String(data.sessionId).slice(0, 100),
      downloadMethod: DOWNLOAD_METHODS.includes(data.downloadMethod) ? data.downloadMethod : 'direct',
      userAgent
    })

    return NextResponse.json({ success: true, download })
  } catch (error) {
    console.error('Track download error:', error)
    return NextResponse.json(
      { error: 'Failed to track download' },
      { status: 500 }
    )
  }
}
