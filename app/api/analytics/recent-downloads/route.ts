import { NextRequest, NextResponse } from 'next/server'
import { getRecentDownloadCount } from '@/lib/pdf-analytics'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const guideSlug = searchParams.get('guideSlug')

    if (!guideSlug) {
      return NextResponse.json(
        { error: 'Missing guideSlug parameter' },
        { status: 400 }
      )
    }

    const count = await getRecentDownloadCount(guideSlug)

    return NextResponse.json({ success: true, count })
  } catch (error) {
    console.error('Get recent downloads error:', error)
    return NextResponse.json(
      { error: 'Failed to get download count' },
      { status: 500 }
    )
  }
}
