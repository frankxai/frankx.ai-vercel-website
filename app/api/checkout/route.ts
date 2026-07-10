import { NextRequest, NextResponse } from 'next/server'
import { buildCheckoutSessionParams, resolveCheckoutProduct } from '@/lib/checkout'

function configurationErrorMessage(code: string): string {
  if (code === 'delivery_not_configured') {
    return 'Product delivery is not configured. Checkout is temporarily unavailable.'
  }
  return 'Product pricing is not configured. Checkout is temporarily unavailable.'
}

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.trim()
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Payment system is being configured. Please try again soon.' },
        { status: 503 }
      )
    }

    let payload: unknown
    try {
      payload = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid checkout request' }, { status: 400 })
    }

    const body = payload && typeof payload === 'object'
      ? payload as { productId?: unknown; email?: unknown }
      : {}
    const resolution = resolveCheckoutProduct(body.productId)

    if (!resolution.ok && resolution.code === 'invalid_product_id') {
      return NextResponse.json({ error: 'A product ID is required' }, { status: 400 })
    }

    if (!resolution.ok && resolution.code === 'product_not_found') {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (!resolution.ok) {
      console.error('[Checkout] Configuration blocked checkout', {
        code: resolution.code,
        productId: resolution.productId,
        configurationKey: resolution.configurationKey,
      })
      return NextResponse.json(
        { error: configurationErrorMessage(resolution.code) },
        { status: 503 }
      )
    }

    const params = buildCheckoutSessionParams({
      product: resolution.product,
      origin: request.nextUrl.origin,
      email: body.email,
    })

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!response.ok) {
      console.error('[Checkout] Stripe session creation failed', {
        productId: resolution.product.id,
        status: response.status,
      })
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 502 }
      )
    }

    const session = await response.json() as { id?: unknown; url?: unknown }
    if (typeof session.id !== 'string' || typeof session.url !== 'string') {
      console.error('[Checkout] Stripe returned an invalid session response', {
        productId: resolution.product.id,
      })
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 502 })
    }

    console.info('[Checkout] Session receipt', {
      schemaVersion: 'starlight.checkout_receipt.v1',
      event: 'checkout.session.created',
      sessionId: session.id,
      productId: resolution.product.id,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[Checkout] Unexpected error', {
      message: error instanceof Error ? error.message : 'Unknown error',
    })
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
