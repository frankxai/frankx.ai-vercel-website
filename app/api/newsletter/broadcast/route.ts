/**
 * Newsletter Broadcast API
 * POST /api/newsletter/broadcast
 *
 * Sends a newsletter to all subscribers
 * Protected by API key
 */

import { NextRequest, NextResponse } from 'next/server'
import { sendAndTriggerBroadcast, generateNewsletterHTML } from '@/lib/newsletter'

// Simple API key auth for broadcast endpoint
const BROADCAST_API_KEY = process.env.NEWSLETTER_BROADCAST_API_KEY

export async function POST(req: NextRequest) {
  try {
    // Check API key
    const apiKey = req.headers.get('x-api-key')
    if (!BROADCAST_API_KEY || apiKey !== BROADCAST_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { subject, title, preheader, greeting, sections, html: rawHtml } = body

    if (!subject) {
      return NextResponse.json(
        { error: 'Subject is required' },
        { status: 400 }
      )
    }

    // Either use raw HTML or generate from sections
    let html: string
    if (rawHtml) {
      html = rawHtml
    } else if (sections && sections.length > 0) {
      html = generateNewsletterHTML({
        title: title || subject,
        preheader: preheader || subject,
        greeting,
        sections,
      })
    } else {
      return NextResponse.json(
        { error: 'Either html or sections is required' },
        { status: 400 }
      )
    }

    const result = await sendAndTriggerBroadcast({
      subject,
      html,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send broadcast' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Newsletter sent successfully!',
      broadcastId: result.broadcastId,
    })
  } catch (error) {
    console.error('Broadcast error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
