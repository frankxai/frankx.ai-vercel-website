import { NextRequest, NextResponse } from 'next/server'
import {
  getGA4Overview,
  getGA4TopPages,
  getGA4TrafficSources,
  getGA4Realtime,
  getGA4PropertyId,
} from '@/lib/observability/google-analytics'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '30', 10)
    const view = searchParams.get('view') || 'all'

    if (view === 'realtime') {
      const realtime = await getGA4Realtime()
      return NextResponse.json({ success: true, data: realtime })
    }

    if (view === 'pages') {
      const topPages = await getGA4TopPages(days, 25)
      return NextResponse.json({ success: true, data: topPages })
    }

    if (view === 'sources') {
      const sources = await getGA4TrafficSources(days)
      return NextResponse.json({ success: true, data: sources })
    }

    const [overview, topPages, sources, realtime] = await Promise.all([
      getGA4Overview(days),
      getGA4TopPages(days, 15),
      getGA4TrafficSources(days),
      getGA4Realtime(),
    ])

    return NextResponse.json({
      success: true,
      propertyId: getGA4PropertyId(),
      data: {
        overview,
        topPages,
        sources,
        realtime,
      },
    })
  } catch (error) {
    console.error('[API /observability/analytics] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown GA4 Analytics error',
      },
      { status: 500 }
    )
  }
}
