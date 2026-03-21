import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { generateProductEmailData } from '@/lib/delivery'
import { purchaseConfirmationEmail } from '@/lib/email-templates'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

function getWebhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET!
}

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || '4d2e913e-6903-4dd4-8749-c02cdb844331'

async function sendEmailViaResend(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'FrankX <frank@updates.frankx.ai>',
      to: [to],
      subject,
      html,
    }),
  })
  return res.json()
}

async function addToResendAudience(email: string, name: string) {
  await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      first_name: name.split(' ')[0],
      last_name: name.split(' ').slice(1).join(' ') || undefined,
      unsubscribed: false,
    }),
  })
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(body, signature, getWebhookSecret())
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Stripe] Webhook signature verification failed:', message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const customerEmail = session.customer_details?.email || session.customer_email
    const customerName = session.customer_details?.name || 'Customer'

    if (!customerEmail) {
      console.error('[Stripe] No customer email in session:', session.id)
      return NextResponse.json({ received: true })
    }

    // Extract product slug from metadata (set during checkout session creation)
    const productSlug = session.metadata?.productSlug || session.metadata?.product_slug

    if (productSlug) {
      const emailData = generateProductEmailData(
        productSlug,
        customerName,
        customerEmail
      )

      if (emailData && RESEND_API_KEY) {
        const email = purchaseConfirmationEmail({
          customerName: emailData.customerName,
          productName: emailData.productName,
          downloadLinks: emailData.downloadLinks,
          receiptUrl: undefined,
        })

        await sendEmailViaResend(customerEmail, email.subject, email.html)
      }
    }

    // Add customer to Resend audience
    if (RESEND_API_KEY) {
      await addToResendAudience(customerEmail, customerName)
    }

    console.log('[Stripe] Checkout completed:', {
      sessionId: session.id,
      product: productSlug,
      email: customerEmail,
      amount: session.amount_total ? `${(session.amount_total / 100).toFixed(2)} ${session.currency?.toUpperCase()}` : 'unknown',
      emailSent: Boolean(RESEND_API_KEY && productSlug),
    })
  }

  return NextResponse.json({ received: true })
}
