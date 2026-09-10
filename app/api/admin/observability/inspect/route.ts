import { NextRequest, NextResponse } from 'next/server'
import { inspectUrlIndexStatus } from '@/lib/observability/google-search-console'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Target URL is required in request body' },
        { status: 400 }
      )
    }

    const inspection = await inspectUrlIndexStatus(url)

    return NextResponse.json({
      success: true,
      data: inspection,
    })
  } catch (error) {
    console.error('[API /observability/inspect] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'URL inspection error',
      },
      { status: 500 }
    )
  }
}
