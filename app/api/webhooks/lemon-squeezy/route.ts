import { NextResponse } from 'next/server'
import { LEMON_SQUEEZY_VARIANT_ENV_KEYS, verifyWebhookSignature, type LemonSqueezyWebhookEvent } from '@/lib/lemon-squeezy'
import { products } from '@/lib/products'
import { canonicalProduct } from '@/lib/product-fulfillment'
import { fulfilCheckoutSession } from '@/lib/purchase-fulfilment'

export async function POST(request: Request) {
  const body = await request.text()
  if (!verifyWebhookSignature(body, request.headers.get('x-signature') || '')) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }
  const event: LemonSqueezyWebhookEvent = JSON.parse(body)
  if (event.meta.event_name !== 'order_created') return NextResponse.json({ received: true })
  const order = event.data.attributes
  if (process.env.VERCEL_ENV !== 'production' || event.data.type !== 'orders' || order.test_mode !== false || order.status !== 'paid') {
    return NextResponse.json({ received: true })
  }

  // Reuse the two configured checkout variants. Display names can change.
  const variant = order.first_order_item?.variant_id
  const matches = Number.isSafeInteger(variant) && variant > 0
    ? Object.entries(LEMON_SQUEEZY_VARIANT_ENV_KEYS).filter(([, env]) => process.env[env] === String(variant))
    : []
  const product = matches.length === 1 ? canonicalProduct(products, matches[0][0]) : undefined
  const created = Date.parse(order.created_at)
  if (!product || !event.data.id || !Number.isFinite(created)) {
    return NextResponse.json({ error: 'Unresolved paid order' }, { status: 500 })
  }

  try {
    const result = await fulfilCheckoutSession({
      id: 'lemon-order-' + event.data.id, created: Math.floor(created / 1000),
      productSlug: product.id, email: order.user_email, name: order.user_name || 'Customer',
      receiptUrl: order.urls?.receipt,
    }, { resendApiKey: process.env.RESEND_API_KEY, fetch })
    if (result.status === 500) {
      return NextResponse.json({ error: 'Delivery failed', failure: result.failure }, { status: 500 })
    }
    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json({ error: 'Delivery unavailable' }, { status: 500 })
  }
}
