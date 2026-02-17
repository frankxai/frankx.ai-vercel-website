import { NextRequest, NextResponse } from 'next/server'
import {
  getAllSequences,
  getActiveSequences,
  getSequenceById,
  getSequenceAnalytics,
  getAllSequencesStats
} from '@/lib/email-sequences/sequences'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const activeOnly = searchParams.get('active') === 'true'
    const analytics = searchParams.get('analytics') === 'true'
    const period = (searchParams.get('period') || 'all') as 'day' | 'week' | 'month' | 'all'
    
    // Get specific sequence analytics
    if (id && analytics) {
      const sequenceAnalytics = getSequenceAnalytics(id, period)
      
      if (!sequenceAnalytics) {
        return NextResponse.json(
          { error: 'Sequence not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ analytics: sequenceAnalytics })
    }
    
    // Get specific sequence
    if (id) {
      const sequence = getSequenceById(id)
      
      if (!sequence) {
        return NextResponse.json(
          { error: 'Sequence not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ sequence })
    }
    
    // Get all sequences with stats
    if (analytics) {
      const stats = getAllSequencesStats()
      return NextResponse.json({ sequences: stats })
    }
    
    // Get all sequences
    const sequences = activeOnly ? getActiveSequences() : getAllSequences()
    return NextResponse.json({ sequences })
  } catch (error) {
    console.error('[API] Get sequences error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sequences' },
      { status: 500 }
    )
  }
}
