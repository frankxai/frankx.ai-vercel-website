import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import type { ProductEmailData } from '@/lib/delivery'
import { purchaseConfirmationEmail } from '@/lib/email-templates'
import { processCheckoutSessionDelivery } from '@/lib/stripe-delivery'

// Lazy initialization — Stripe SDK throws at module load if STRIPE_SECRET_KEY
// is missing, breaking `next build` in environments without the env var
// (CI, preview deploys, local dev without secrets). Defer until first request.
let stripeClient: Stripe | null = null
function getStripe(): Stripe {
  if (stripeClient) return stripeClient
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured. Cannot process webhook.')
  }
  stripeClient = new Stripe(key)
  return stripeClient
}

const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || '4d2e913e-6903-4dd4-8749-c02cdb844331'

async function sendEmailViaResend(
  apiKey: string,
  emailData: ProductEmailData,
  idempotencyKey: string
): Promise<{ providerMessageId: string }> {
  const email = purchaseConfirmationEmail({
    customerName: emailData.customerName,
    productName: emailData.productName,
    downloadLinks: emailData.downloadLinks,
    receiptUrl: undefined,
  })

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify({
      from: 'FrankX <frank@updates.frankx.ai>',
      to: [emailData.customerEmail],
      subject: email.subject,
      html: email.html,
    }),
  })

  const payload = await res.json().catch(() => null) as { id?: unknown } | null
  if (!res.ok || typeof payload?.id !== 'string') {
    throw new Error(`Resend delivery failed with status ${res.status}`)
  }

  return { providerMessageId: payload.id }
}

async function addToResendAudience(apiKey: string, email: string, name: string) {
  const response = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      first_name: name.split(' ')[0],
      last_name: name.split(' ').slice(1).join(' ') || undefined,
      unsubscribed: false,
    }),
  })

  if (!response.ok) {
    throw new Error(`Resend audience update failed with status ${response.status}`)
  }
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[Stripe] STRIPE_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Stripe] Webhook signature verification failed:', message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'checkout.session.async_payment_succeeded'
  ) {
    const session = event.data.object as Stripe.Checkout.Session

    const customerEmail = session.customer_details?.email || session.customer_email
    const customerName = session.customer_details?.name || 'Customer'
    const productSlug = session.metadata?.productSlug || session.metadata?.product_slug
    const resendApiKey = process.env.RESEND_API_KEY?.trim()

    const receipt = await processCheckoutSessionDelivery(
      {
        eventId: event.id,
        sessionId: session.id,
        paymentStatus: session.payment_status,
        productId: productSlug,
        customerEmail,
        customerName,
      },
      {
        sendEmail: resendApiKey
          ? (emailData, idempotencyKey) =>
              sendEmailViaResend(resendApiKey, emailData, idempotencyKey)
          : undefined,
      }
    )

    const logReceipt = receipt.status === 'delivered' ? console.info : console.error
    logReceipt('[Stripe] Delivery receipt', receipt)

    if (customerEmail && resendApiKey) {
      try {
        await addToResendAudience(resendApiKey, customerEmail, customerName)
      } catch (error) {
        console.error('[Stripe] Audience update failed', {
          eventId: event.id,
          sessionId: session.id,
          message: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    if (receipt.status === 'failed' && receipt.retryable) {
      return NextResponse.json(
        { received: false, delivery: 'failed', receiptId: receipt.receiptId },
        { status: 503 }
      )
    }

    return NextResponse.json({
      received: true,
      delivery: receipt.status,
      receiptId: receipt.receiptId,
    })
  }

  return NextResponse.json({ received: true })
}
