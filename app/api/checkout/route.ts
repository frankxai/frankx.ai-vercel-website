import { NextRequest, NextResponse } from 'next/server'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

// Product price mapping. Keys must match a real id in data/products.json so the
// webhook can resolve delivery through lib/delivery.ts.
const PRODUCTS: Record<string, { name: string; priceId: string; amount: number }> = {
  'creative-ai-toolkit': {
    name: 'Creative AI Toolkit',
    priceId: process.env.STRIPE_PRICE_TOOLKIT || '',
    amount: 4700,
  },
  'agentic-creator-os': {
    name: 'ACOS Creator Kit',
    priceId: process.env.STRIPE_PRICE_ACOS || '',
    amount: 4700,
  },
  'suno-prompt-library': {
    name: 'Suno Prompt Pack',
    priceId: process.env.STRIPE_PRICE_SUNO || '',
    amount: 2900,
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

    const { productId, email } = await request.json()
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

    const params = new URLSearchParams()
    params.append('mode', 'payment')
    params.append('success_url', `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`)
    params.append('cancel_url', `${request.nextUrl.origin}/challenge#offer`)
    params.append('line_items[0][price]', product.priceId)
    params.append('line_items[0][quantity]', '1')
    params.append('metadata[productSlug]', productId)
    params.append('payment_intent_data[metadata][productSlug]', productId)

    if (email) {
      params.append('customer_email', email)
    }

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
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

    const session = await response.json()
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
