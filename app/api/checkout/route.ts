import { NextRequest, NextResponse } from 'next/server'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

// Product price mapping — add Stripe Price IDs when configured.
// Keys must match a real `id` in data/products.json so the webhook
// (app/api/webhooks/stripe/route.ts) can resolve delivery via
// lib/delivery.ts's getProductById()/getDeliveryConfig().
const PRODUCTS: Record<
  string,
  { name: string; priceId: string; amount: number; currency: 'usd' | 'eur'; cancelPath: string }
> = {
  'creative-ai-toolkit': {
    name: 'Creative AI Toolkit',
    priceId: process.env.STRIPE_PRICE_TOOLKIT || '',
    amount: 4700,
    currency: 'usd',
    cancelPath: '/checkout/cancel',
  },
  'agentic-creator-os': {
    name: 'ACOS Creator Kit',
    priceId: process.env.STRIPE_PRICE_ACOS_EUR_99 || '',
    amount: 9900,
    currency: 'eur',
    cancelPath: '/challenge#offer',
  },
  'suno-prompt-library': {
    name: 'Suno Prompt Pack',
    priceId: process.env.STRIPE_PRICE_SUNO || '',
    amount: 2900,
    currency: 'usd',
    cancelPath: '/checkout/cancel',
  },
}

export async function POST(request: NextRequest) {
  try {
    if (!STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment system is being configured. Please try again soon.' },
        { status: 503 }
      )
    }

    const body: { productId?: unknown; email?: unknown } = await request.json()
    const productId = typeof body.productId === 'string' ? body.productId : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''

    const product = PRODUCTS[productId]
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (!product.priceId) {
      console.error('Stripe price is not configured for product:', productId)
      return NextResponse.json(
        { error: 'This product is not available for checkout yet.' },
        { status: 503 }
      )
    }

    const stripeHeaders = {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
    }
    const priceResponse = await fetch(`https://api.stripe.com/v1/prices/${product.priceId}`, {
      headers: stripeHeaders,
    })

    if (!priceResponse.ok) {
      console.error('Configured Stripe price could not be verified for product:', productId)
      return NextResponse.json(
        { error: 'This product is not available for checkout yet.' },
        { status: 503 }
      )
    }

    const stripePrice: { active?: boolean; currency?: string; unit_amount?: number | null } = await priceResponse.json()
    if (
      stripePrice.active !== true ||
      stripePrice.currency !== product.currency ||
      stripePrice.unit_amount !== product.amount
    ) {
      console.error('Configured Stripe price does not match the checkout contract for product:', productId)
      return NextResponse.json(
        { error: 'This product is not available for checkout yet.' },
        { status: 503 }
      )
    }

    // Create Stripe Checkout Session via API
    const params = new URLSearchParams()
    params.append('mode', 'payment')
    params.append('success_url', `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`)
    params.append('cancel_url', `${request.nextUrl.origin}${product.cancelPath}`)
    params.append('line_items[0][price]', product.priceId)
    params.append('line_items[0][quantity]', '1')
    if (email) {
      params.append('customer_email', email)
    }
    // The webhook (app/api/webhooks/stripe/route.ts) keys ALL post-purchase
    // delivery off session.metadata.productSlug. Without this, buyers are
    // charged but never receive their product email.
    params.append('metadata[productSlug]', productId)
    params.append('payment_intent_data[metadata][productSlug]', productId)

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        ...stripeHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Stripe error:', error)
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      )
    }

    const session: { url?: unknown } = await response.json()

    if (typeof session.url !== 'string') {
      console.error('Stripe Checkout returned no redirect URL for product:', productId)
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
