import { NextResponse } from 'next/server'
import { getAllContent, getPipelineStats } from '@/lib/content-hub'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const content = getAllContent()
    const stats = getPipelineStats()

    return NextResponse.json({ content, stats })
  } catch (error) {
    console.error('Failed to load content inventory:', error)
    return NextResponse.json(
      { error: 'Failed to load content inventory' },
      { status: 500 }
    )
  }
}
