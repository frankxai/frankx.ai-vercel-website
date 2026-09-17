import { NextRequest, NextResponse } from 'next/server'
import {
  getSearchPerformance,
  getSearchConsoleSiteUrl,
} from '@/lib/observability/google-search-console'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '28', 10)
    const rowLimit = parseInt(searchParams.get('limit') || '50', 10)

    const gscData = await getSearchPerformance({ days, rowLimit })

    return NextResponse.json({
      success: true,
      data: gscData,
      siteUrl: getSearchConsoleSiteUrl(),
    })
  } catch (error) {
    console.error('[API /observability/search-console] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown Search Console error',
      },
      { status: 500 }
    )
  }
}
