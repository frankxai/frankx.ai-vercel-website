import { NextRequest, NextResponse } from 'next/server'
import { processPendingDeliveries } from '@/lib/email-sequences/scheduler'

/**
 * Process pending email deliveries
 * Should be called by Vercel Cron or external scheduler
 * 
 * Vercel Cron config (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/email-sequences/process",
 *     "schedule": "* /15 * * * *"
 *   }]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret (optional but recommended)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const result = await processPendingDeliveries()
    
    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[API] Process deliveries error:', error)
    return NextResponse.json(
      { error: 'Failed to process deliveries', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Allow GET for manual triggering in development
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'GET method not allowed in production' },
      { status: 405 }
    )
  }
  
  return POST(request)
}
