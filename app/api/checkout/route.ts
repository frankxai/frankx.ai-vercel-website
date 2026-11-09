import { NextRequest, NextResponse } from 'next/server'
import { stripeCheckoutGate } from '@/lib/checkout-gate'
import { CHECKOUT_PRODUCTS } from '@/lib/checkout-products'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

// Keys must match a real `id` in data/products.json so the webhook
// (app/api/webhooks/stripe/route.ts) can resolve delivery via
// lib/delivery.ts's getProductById()/getDeliveryConfig().
export async function POST(request: NextRequest) {
  try {
    const { productId, email } = await request.json()

    const product = CHECKOUT_PRODUCTS[productId]
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const gate = stripeCheckoutGate(
      {
        status: product.status,
        priceId: process.env[product.priceEnv] || '',
      },
      STRIPE_SECRET_KEY,
    )
    if (!gate.ok) {
      return NextResponse.json({ error: gate.error, refusal: gate.refusal }, { status: gate.status })
    }

    // Create Stripe Checkout Session via API
    const params = new URLSearchParams()
    params.append('mode', 'payment')
    params.append('success_url', `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`)
    params.append('cancel_url', `${request.nextUrl.origin}/checkout/cancel`)
    params.append('line_items[0][price]', gate.priceId)
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
        Authorization: `Bearer ${gate.secretKey}`,
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
