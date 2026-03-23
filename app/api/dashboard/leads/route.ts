import { NextRequest, NextResponse } from 'next/server'
import { getAllLeads } from '@/lib/pdf-analytics'

export async function GET(request: NextRequest) {
  try {
    const leads = await getAllLeads()

    // Sort by timestamp descending
    const sortedLeads = leads.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    return NextResponse.json({ success: true, leads: sortedLeads })
  } catch (error) {
    console.error('Get leads error:', error)
    return NextResponse.json(
      { error: 'Failed to get leads' },
      { status: 500 }
    )
  }
}
