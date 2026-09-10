import { NextRequest, NextResponse } from 'next/server'
import {
  getObservabilitySummary,
  formatObservabilityMarkdownBrief,
} from '@/lib/observability/observability-summary'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '30', 10)
    const format = searchParams.get('format')

    const summary = await getObservabilitySummary(days)

    if (format === 'markdown') {
      const markdown = formatObservabilityMarkdownBrief(summary)
      return new NextResponse(markdown, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: summary,
    })
  } catch (error) {
    console.error('[API /observability/summary] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown observability error',
      },
      { status: 500 }
    )
  }
}
