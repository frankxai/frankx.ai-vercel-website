import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PaidDownloadConfigError } from '@/lib/paid-download'
import { fulfilCheckoutSession, type FulfilmentResult } from '@/lib/purchase-fulfilment'

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
  } catch {
    console.error('[Stripe] Webhook signature verification failed')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session

    // A completed session can still have an outstanding asynchronous payment.
    if (process.env.VERCEL_ENV !== 'production' || !/^(?:sk|rk)_live_/.test(process.env.STRIPE_SECRET_KEY ?? '') ||
        event.livemode !== true || session.livemode !== true || event.account ||
        session.mode !== 'payment' || session.payment_status !== 'paid') {
      return NextResponse.json({ received: true })
    }

    const productSlug = session.metadata?.productSlug || session.metadata?.product_slug

    let result: FulfilmentResult
    try {
      result = await fulfilCheckoutSession(
        {
          id: session.id,
          created: session.created,
          email: session.customer_details?.email || session.customer_email || null,
          name: session.customer_details?.name || 'Customer',
          productSlug,
        },
        { resendApiKey: process.env.RESEND_API_KEY, fetch },
      )
    } catch (error) {
      if (!(error instanceof PaidDownloadConfigError)) throw error
      console.error('[Stripe]', error.message)
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    const amount = session.amount_total ? `${(session.amount_total / 100).toFixed(2)} ${session.currency?.toUpperCase()}` : 'unknown'
    if (result.status === 500) {
      console.error('[Stripe] Paid session not delivered:', { sessionId: session.id, product: productSlug, amount, failure: result.failure })
      return NextResponse.json({ error: 'Delivery failed', failure: result.failure }, { status: 500 })
    }
    console.log('[Stripe] Checkout completed:', { sessionId: session.id, product: productSlug, amount, emailSent: result.delivered })
  }

  return NextResponse.json({ received: true })
}
