import { NextRequest, NextResponse } from 'next/server'
import { musicPromptsEmail, newsletterWelcomeEmail } from '@/lib/email-templates'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'

// Resend topic IDs
const TOPICS = {
  newsletter: 'b613f6ff-9c56-4b4c-86df-9217843c5d78',
  'music-suno': '018a5159-10c8-4595-8ecc-63d7a2c6b442',
  'product-updates': '811064ed-7444-45db-9a2a-fd8c83a21053',
} as const

// Map list types to topics
const LIST_CONFIG: Record<string, { topics: string[] }> = {
  newsletter: {
    topics: [TOPICS.newsletter],
  },
  'creation-chronicles': {
    topics: [TOPICS.newsletter],
  },
  'inner-circle': {
    topics: [TOPICS.newsletter, TOPICS['product-updates']],
  },
  'music-lab': {
    topics: [TOPICS['music-suno'], TOPICS.newsletter],
  },
  'courses-waitlist': {
    topics: [TOPICS.newsletter],
  },
}

async function sendWelcomeEmail(email: string, name: string, listType: string) {
  if (!RESEND_API_KEY) return

  let template
  if (listType === 'music-lab') {
    template = musicPromptsEmail({
      recipientName: name || 'Creator',
      downloadUrl: 'https://frankx.ai/api/download?product=5-suno-prompts',
    })
  } else {
    template = newsletterWelcomeEmail({
      recipientName: name || 'Creator',
    })
  }

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Frank <frank@mail.frankx.ai>',
      to: email,
      subject: template.subject,
      html: template.html,
    }),
  })
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, listType = 'newsletter', source } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      )
    }

    const config = LIST_CONFIG[listType] || LIST_CONFIG.newsletter

    // Create contact in Resend audience
    const resendResponse = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name: name || undefined,
        unsubscribed: false,
      }),
    })

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json()
      console.error('Resend API error:', errorData)

      if (resendResponse.status === 409) {
        return NextResponse.json(
          { error: 'This email is already subscribed!' },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    const data = await resendResponse.json()

    // Send welcome/delivery email (non-blocking)
    sendWelcomeEmail(email, name, listType).catch((err) =>
      console.error('Welcome email error:', err)
    )

    return NextResponse.json({
      success: true,
      message: listType === 'music-lab'
        ? 'Check your email for your free prompts!'
        : 'Successfully subscribed!',
      subscriber: data.id,
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
