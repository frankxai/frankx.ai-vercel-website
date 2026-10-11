import { NextRequest, NextResponse } from 'next/server'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

// Product price mapping — add Stripe Price IDs when configured.
// Keys must match a real `id` in data/products.json so the webhook
// (app/api/webhooks/stripe/route.ts) can resolve delivery via
// lib/delivery.ts's getProductById()/getDeliveryConfig().
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
  'system-architect-starter-kit': {
    name: 'System Architect Starter Kit',
    priceId: process.env.STRIPE_PRICE_SYSTEM_ARCHITECT || '',
    amount: 9700,
  },
  'visual-creation-loop': {
    name: 'Visual Creation Loop',
    priceId: process.env.STRIPE_PRICE_VISUAL_LOOP || '',
    amount: 14700,
  },
  'income-architecture-blueprint': {
    name: 'Income Architecture Blueprint',
    priceId: process.env.STRIPE_PRICE_INCOME_ARCH || '',
    amount: 6700,
  },
  'dpi-field-kit': {
    name: 'DPI Field Kit: Wealth Substrate Pro',
    priceId: process.env.STRIPE_PRICE_DPI_KIT || '',
    amount: 9700,
  },
  'agent-fleet-pro': {
    name: 'Agent Fleet Pro',
    priceId: process.env.STRIPE_PRICE_FLEET_PRO || '',
    amount: 14700,
  },
  'memory-palace-os': {
    name: 'The Sovereign Memory Palace OS',
    priceId: process.env.STRIPE_PRICE_MEMORY_PALACE || '',
    amount: 9700,
  },
  'agentic-media-machine': {
    name: 'The Agentic Media Machine',
    priceId: process.env.STRIPE_PRICE_MEDIA_MACHINE || '',
    amount: 9700,
  },
  'agentic-content-engine': {
    name: 'Agentic Content Engine',
    priceId: process.env.STRIPE_PRICE_AGENTIC_CONTENT || '',
    amount: 9700,
  },
  'starlight-operator-pack': {
    name: 'Starlight Operator Field Kit',
    priceId: process.env.STRIPE_PRICE_OPERATOR_PACK || '',
    amount: 9700,
  },
  'aurora-ui-kit': {
    name: 'Aurora UI Kit',
    priceId: process.env.STRIPE_PRICE_AURORA || '',
    amount: 1900,
  },
  'founders-circle-guild': {
    name: 'Founders Circle Guild',
    priceId: process.env.STRIPE_PRICE_FOUNDERS_GUILD || '',
    amount: 299700,
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

    // Create Stripe Checkout Session via API
    const params = new URLSearchParams()
    params.append('mode', 'payment')
    params.append('success_url', `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`)
    params.append('cancel_url', `${request.nextUrl.origin}/checkout/cancel`)
    params.append('line_items[0][price]', product.priceId)
    params.append('line_items[0][quantity]', '1')
    params.append('metadata[productSlug]', productId)
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
