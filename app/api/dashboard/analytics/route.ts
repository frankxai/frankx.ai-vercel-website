import { NextRequest, NextResponse } from 'next/server'
import { getAnalyticsSummary } from '@/lib/pdf-analytics'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '30')

    const summary = await getAnalyticsSummary(days)

    return NextResponse.json({ success: true, summary })
  } catch (error) {
    console.error('Get analytics summary error:', error)
    return NextResponse.json(
      { error: 'Failed to get analytics summary' },
      { status: 500 }
    )
  }
}
