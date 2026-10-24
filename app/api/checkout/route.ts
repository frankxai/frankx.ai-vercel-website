import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/lib/products'
import { canonicalProduct, productFulfillmentConfigured, stripePriceForProduct } from '@/lib/product-fulfillment'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

// Product price mapping — add Stripe Price IDs when configured.
// Keys must match a real `id` in data/products.json so the webhook
// (app/api/webhooks/stripe/route.ts) can resolve delivery via
// lib/delivery.ts's getProductById()/getDeliveryConfig().
const PRODUCTS: Record<string, { name: string; amount: number }> = {
  'creative-ai-toolkit': {
    name: 'Creative AI Toolkit',
    amount: 4700,
  },
  'agentic-creator-os': {
    name: 'ACOS Creator Kit',
    amount: 4700,
  },
  'suno-prompt-library': {
    name: 'Suno Prompt Pack',
    amount: 2900,
  },
  'system-architect-starter-kit': {
    name: 'System Architect Starter Kit',
    amount: 9700,
  },
  'visual-creation-loop': {
    name: 'Visual Creation Loop',
    amount: 14700,
  },
  'income-architecture-blueprint': {
    name: 'Income Architecture Blueprint',
    amount: 6700,
  },
  'dpi-field-kit': {
    name: 'DPI Field Kit: Wealth Substrate Pro',
    amount: 9700,
  },
  'agent-fleet-pro': {
    name: 'Agent Fleet Pro',
    amount: 14700,
  },
  'memory-palace-os': {
    name: 'The Sovereign Memory Palace OS',
    amount: 9700,
  },
  'agentic-media-machine': {
    name: 'The Agentic Media Machine',
    amount: 9700,
  },
  'agentic-content-engine': {
    name: 'Agentic Content Engine',
    amount: 9700,
  },
  'starlight-operator-pack': {
    name: 'Starlight Operator Field Kit',
    amount: 9700,
  },
  'aurora-ui-kit': {
    name: 'Aurora UI Kit',
    amount: 1900,
  },
  'founders-circle-guild': {
    name: 'Founders Circle Guild',
    amount: 299700,
  },
  'creation-chronicles': {
    name: 'Creation Chronicles',
    amount: 49700,
  },
  'command-center-template': {
    name: 'The Command Center Template',
    amount: 49700,
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

    const catalogProduct = canonicalProduct(products, productId)
    const product = catalogProduct && Object.hasOwn(PRODUCTS, catalogProduct.id) ? PRODUCTS[catalogProduct.id] : undefined
    if (!product || !catalogProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    const priceId = stripePriceForProduct(catalogProduct.id, process.env)
    if (!priceId) {
      return NextResponse.json({ error: 'Checkout is not configured for this product' }, { status: 503 })
    }
    if (!productFulfillmentConfigured(catalogProduct, 'stripe', process.env)) {
      return NextResponse.json({ error: 'Product delivery is not configured' }, { status: 503 })
    }

    // Create Stripe Checkout Session via API
    const params = new URLSearchParams()
    params.append('mode', 'payment')
    params.append('success_url', `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`)
    params.append('cancel_url', `${request.nextUrl.origin}/checkout/cancel`)
    params.append('line_items[0][price]', priceId)
    params.append('line_items[0][quantity]', '1')
    if (email) {
      params.append('customer_email', email)
    }
    // The webhook (app/api/webhooks/stripe/route.ts) keys ALL post-purchase
    // delivery off session.metadata.productSlug. Without this, buyers are
    // charged but never receive their product email.
    params.append('metadata[productId]', catalogProduct.id)
    params.append('metadata[productSlug]', catalogProduct.id)
    params.append('payment_intent_data[metadata][productId]', catalogProduct.id)
    params.append('payment_intent_data[metadata][productSlug]', catalogProduct.id)

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
