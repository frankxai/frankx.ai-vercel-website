/**
 * Newsletter Stats API
 * GET /api/newsletter/stats
 *
 * Returns newsletter statistics
 */

import { NextRequest, NextResponse } from 'next/server'
import { getNewsletterStats, getContacts } from '@/lib/newsletter'

// Simple API key auth
const ADMIN_API_KEY = process.env.NEWSLETTER_BROADCAST_API_KEY

export async function GET(req: NextRequest) {
  try {
    // Check API key for full data
    const apiKey = req.headers.get('x-api-key')
    const isAdmin = ADMIN_API_KEY && apiKey === ADMIN_API_KEY

    const statsResult = await getNewsletterStats()

    if (!statsResult.success) {
      return NextResponse.json(
        { error: statsResult.error || 'Failed to get stats' },
        { status: 500 }
      )
    }

    // If admin, also return contacts
    if (isAdmin) {
      const contactsResult = await getContacts()
      return NextResponse.json({
        stats: statsResult.stats,
        contacts: contactsResult.contacts || [],
      })
    }

    // Public stats only
    return NextResponse.json({
      stats: {
        totalContacts: statsResult.stats?.activeContacts || 0,
      },
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
