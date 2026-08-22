import { NextRequest, NextResponse } from 'next/server'
import { createCommerceCheckout, listLegacyStripeProductMap } from '@/lib/commerce/kernel'

/**
 * Unified checkout entry.
 * Prefer portfolio-registry SKUs via createCommerceCheckout.
 * Falls back to legacy three-SKU Stripe map for older callers.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const productId = body.productId as string | undefined
    const email = body.email as string | undefined

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 })
    }

    const origin = request.nextUrl.origin
    const result = await createCommerceCheckout({ productId, email }, origin)

    if (result.ok) {
      return NextResponse.json({
        url: result.url,
        mor: result.mor,
        productId: result.productId,
      })
    }

    // Legacy fallback for pre-registry product IDs still used by older pages
    if (result.status === 404) {
      const legacy = listLegacyStripeProductMap()[productId]
      if (!legacy) {
        return NextResponse.json({ error: result.error }, { status: result.status })
      }
      if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json(
          { error: 'Payment system is being configured. Please try again soon.' },
          { status: 503 }
        )
      }
      if (!legacy.priceId) {
        return NextResponse.json(
          { error: 'Stripe price is not linked for this product yet' },
          { status: 503 }
        )
      }

      const params = new URLSearchParams()
      params.append('mode', 'payment')
      params.append(
        'success_url',
        `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&product=${encodeURIComponent(productId)}`
      )
      params.append('cancel_url', `${origin}/checkout/cancel?product=${encodeURIComponent(productId)}`)
      params.append('line_items[0][price]', legacy.priceId)
      params.append('line_items[0][quantity]', '1')
      params.append('metadata[productSlug]', productId)
      params.append('payment_intent_data[metadata][productSlug]', productId)
      if (email) params.append('customer_email', email)

      const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })

      if (!response.ok) {
        console.error('Stripe error:', await response.text())
        return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
      }

      const session = await response.json()
      return NextResponse.json({ url: session.url, mor: 'stripe', productId })
    }

    return NextResponse.json({ error: result.error }, { status: result.status })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
