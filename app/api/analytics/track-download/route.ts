import { NextRequest, NextResponse } from 'next/server'
import { trackPDFDownload } from '@/lib/pdf-analytics'

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

    // Track download
    const download = await trackPDFDownload({
      guideSlug: data.guideSlug,
      guideTitle: data.guideTitle,
      sessionId: data.sessionId,
      downloadMethod: data.downloadMethod || 'direct',
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
