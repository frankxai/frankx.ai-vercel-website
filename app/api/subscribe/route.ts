import { NextRequest, NextResponse } from 'next/server'
import { musicPromptsEmail, newsletterConfirmationEmail } from '@/lib/email-templates'
import { ikigaiBrandingEmail } from '@/lib/email-templates-ikigai'
import { innerCircleWaitlistEmail } from '@/lib/email-templates-inner-circle'
import { notifyAdmin } from '@/lib/notify-admin'
import { confirmUrl, FROM_ADDRESS } from '@/lib/email-config'

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
  'ai-architect': {
    topics: [TOPICS.newsletter],
  },
  'inner-circle': {
    topics: [TOPICS.newsletter, TOPICS['product-updates']],
  },
  'music-lab': {
    topics: [TOPICS['music-suno'], TOPICS.newsletter],
  },
  arcanea: {
    topics: [TOPICS.newsletter],
  },
  investor: {
    topics: [TOPICS.newsletter],
  },
  'courses-waitlist': {
    topics: [TOPICS.newsletter],
  },
  'ikigai-branding': {
    topics: [TOPICS.newsletter],
  },
  'agentic-builder-lab': {
    topics: [TOPICS.newsletter, TOPICS['product-updates']],
  },
  all: {
    topics: [TOPICS.newsletter, TOPICS['music-suno'], TOPICS['product-updates']],
  },
}

// Double-opt-in: the confirmation email with the HMAC-signed confirm link.
// Marketing sends are gated on the user clicking this; the contact is created
// with unsubscribed:true and flipped by /api/subscribe/confirm.
async function sendConfirmationEmail(email: string, name: string) {
  if (!RESEND_API_KEY) return

  const template = newsletterConfirmationEmail({
    recipientName: name || 'Creator',
    email,
    confirmUrl: confirmUrl(email),
  })

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: email,
      subject: template.subject,
      html: template.html,
    }),
  })
}

// Transactional deliveries: the user explicitly requested these assets
// (lead magnet download, waitlist acknowledgement), so they send immediately
// regardless of DOI state. Marketing welcome flows do NOT — those wait for
// the confirm click.
async function sendTransactionalEmail(email: string, name: string, listType: string) {
  if (!RESEND_API_KEY) return

  // Inner Circle waitlist gets a plain-text confirmation that matches the
  // Lenny/Ben-Thompson aesthetic — no HTML wrapper, no marketing chrome.
  if (listType === 'inner-circle') {
    const innerCircle = innerCircleWaitlistEmail({
      email,
      name,
      joinedAt: new Date().toISOString(),
    })

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: email,
        subject: innerCircle.subject,
        text: innerCircle.plainText,
      }),
    })
    return
  }

  let template
  if (listType === 'music-lab') {
    template = musicPromptsEmail({
      recipientName: name || 'Creator',
      downloadUrl: 'https://frankx.ai/api/download?product=5-suno-prompts',
    })
  } else if (listType === 'ikigai-branding') {
    template = ikigaiBrandingEmail({
      recipientName: name || 'Creator',
    })
  } else {
    // Generic lists get no immediate marketing email — the welcome flow
    // runs after the confirm click (see /api/subscribe/confirm).
    return
  }

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
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
    void config // topics applied via Resend audience segmentation

    // Create contact in Resend audience.
    // DOI: contact starts unconfirmed (unsubscribed: true) and is flipped to
    // subscribed by /api/subscribe/confirm when the user clicks the link.
    const resendResponse = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name: name || undefined,
        unsubscribed: true,
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

    // DOI confirmation email (non-blocking)
    sendConfirmationEmail(email, name).catch((err) =>
      console.error('Confirmation email error:', err)
    )

    // Transactional asset delivery for lead magnets / waitlists (non-blocking)
    sendTransactionalEmail(email, name, listType).catch((err) =>
      console.error('Transactional email error:', err)
    )

    // Notify admin (non-blocking)
    notifyAdmin({
      formType: 'newsletter',
      email,
      name,
      details: { 'List Type': listType, ...(source ? { Source: source } : {}) },
    }).catch(console.error)

    return NextResponse.json({
      success: true,
      message:
        listType === 'music-lab'
          ? 'Check your email — your prompts are on the way, plus a one-click confirm link.'
          : 'Check your inbox for a one-click confirmation link.',
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
