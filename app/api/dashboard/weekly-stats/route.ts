import { NextRequest, NextResponse } from 'next/server'
import { getWeeklyStats } from '@/lib/pdf-analytics'

import { describeStoreFailure } from '@/lib/store-failure'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const weeks = parseInt(searchParams.get('weeks') || '12')

    const stats = await getWeeklyStats(weeks)

    return NextResponse.json({ success: true, stats })
  } catch (error) {
    console.error('Get weekly stats error:', describeStoreFailure(error, 'read'))
    return NextResponse.json(
      { error: 'Failed to get weekly stats' },
      { status: 500 }
    )
  }
}
