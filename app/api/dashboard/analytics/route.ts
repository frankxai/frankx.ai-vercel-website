import { NextRequest, NextResponse } from 'next/server'
import { getAnalyticsSummary } from '@/lib/pdf-analytics'

import { describeStoreFailure } from '@/lib/store-failure'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '30')

    const summary = await getAnalyticsSummary(days)

    return NextResponse.json({ success: true, summary })
  } catch (error) {
    console.error('Get analytics summary error:', describeStoreFailure(error, 'read'))
    return NextResponse.json(
      { error: 'Failed to get analytics summary' },
      { status: 500 }
    )
  }
}
