import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { generateProductEmailData } from '@/lib/delivery'
import { purchaseConfirmationEmail } from '@/lib/email-templates'
import { products } from '@/lib/products'
import { productFromCheckoutMetadata, productFulfillmentConfigured, stripePriceForProduct, stripeExpectedLiveMode } from '@/lib/product-fulfillment'

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

const RESEND_API_KEY = process.env.RESEND_API_KEY

async function sendEmailViaResend(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'FrankX <frank@mail.frankx.ai>',
      to: [to],
      subject,
      html,
    }),
  })
  if (!res.ok) throw new Error('Product email delivery failed')
  return res.json()
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

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const expectedLiveMode = stripeExpectedLiveMode(process.env)
    if (expectedLiveMode === undefined) return NextResponse.json({ error: 'Payment mode is not configured' }, { status: 503 })
    if (event.livemode !== expectedLiveMode) return NextResponse.json({ error: 'Payment mode does not match environment' }, { status: 422 })
    if (!expectedLiveMode) return NextResponse.json({ received: true, testMode: true })
    const session = event.data.object as Stripe.Checkout.Session
    if (session.payment_status !== 'paid') return NextResponse.json({ received: true })

    const customerEmail = session.customer_details?.email || session.customer_email
    const customerName = session.customer_details?.name || 'Customer'

    if (!customerEmail) {
      console.error('[Stripe] No customer email in session:', session.id)
      return NextResponse.json({ error: 'Product delivery recipient missing' }, { status: 422 })
    }

    // Extract product slug from metadata (set during checkout session creation)
    const product = productFromCheckoutMetadata(products, session.metadata)
    if (!product) return NextResponse.json({ error: 'Product identity is not configured' }, { status: 422 })
    const priceId = stripePriceForProduct(product.id, process.env)
    if (!priceId || !productFulfillmentConfigured(product, 'stripe', process.env)) {
      return NextResponse.json({ error: 'Product delivery is not configured' }, { status: 503 })
    }
    const currency = product.offer.currency.toLowerCase()
    if (session.mode !== 'payment' || session.currency !== currency || !(session.amount_total && session.amount_total > 0)) {
      return NextResponse.json({ error: 'Payment does not match product' }, { status: 422 })
    }
    // Metadata names the product; authoritative line items prove which Price was charged.
    // Reject bundles, quantities, currency mismatches and unavailable provider reads.
    let lineItems: Stripe.ApiList<Stripe.LineItem>
    try {
      lineItems = await getStripe().checkout.sessions.listLineItems(session.id, { limit: 2 })
    } catch {
      return NextResponse.json({ error: 'Payment verification unavailable' }, { status: 502 })
    }
    const lineItem = lineItems.data[0]
    if (lineItems.has_more || lineItems.data.length !== 1 || lineItem.quantity !== 1 || lineItem.price?.id !== priceId
      || lineItem.currency !== currency || lineItem.price.currency !== currency || !(lineItem.amount_total > 0)) {
      return NextResponse.json({ error: 'Payment does not match product' }, { status: 422 })
    }
    const productSlug = product.id

    if (productSlug) {
      const emailData = generateProductEmailData(
        productSlug,
        customerName,
        customerEmail
      )

      if (!emailData || !RESEND_API_KEY) return NextResponse.json({ error: 'Product delivery is not configured' }, { status: 503 })
      {
        const email = purchaseConfirmationEmail({
          customerName: emailData.customerName,
          productName: emailData.productName,
          downloadLinks: emailData.downloadLinks,
          receiptUrl: undefined,
        })

        try {
          await sendEmailViaResend(customerEmail, email.subject, email.html)
        } catch {
          return NextResponse.json({ error: 'Product email delivery failed' }, { status: 502 })
        }
      }
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
