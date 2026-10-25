import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import {
  CREDIT_PACK_CATALOG,
  creditTenantWallet,
  sanitizeTenantId,
} from '@/lib/infogenius/tenant-credits'

/**
 * app/api/webhooks/polar/route.ts
 *
 * Fail-closed Polar Webhook Handler for Multi-Tenant Credit Top-Ups & InfoGenius OS Provisioning.
 *
 * Security Invariants (Doctrine 0 & §10):
 *   1. Requires POLAR_WEBHOOK_SECRET in environment; fails closed (503) if unset.
 *   2. Verifies HMAC-SHA256 signature from `webhook-signature` / `x-polar-signature` header using timingSafeEqual.
 *   3. Only credits a tenant wallet on verified `order.paid` or `checkout.updated` (status === 'succeeded') events.
 */

function verifyWebhookSignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader || !secret) return false
  try {
    // Support standard hex or v1,<hex>/sha256=<hex> formats
    const candidate = signatureHeader
      .split(',')
      .map((part) => part.trim().replace(/^(sha256=|v1=)/i, ''))
      .filter(Boolean)
      .pop()
    if (!candidate) return false

    const expectedHex = createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex')
    const a = Buffer.from(candidate, 'hex')
    const b = Buffer.from(expectedHex, 'hex')
    if (a.length !== b.length || a.length === 0) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.POLAR_WEBHOOK_SECRET?.trim()
  if (!secret) {
    return NextResponse.json(
      { error: 'Webhook endpoint is not configured', refusal: 'webhook_unconfigured' },
      { status: 503 }
    )
  }

  const rawBody = await req.text()
  const sigHeader =
    req.headers.get('webhook-signature') ||
    req.headers.get('x-polar-signature') ||
    req.headers.get('polar-signature')

  if (!verifyWebhookSignature(rawBody, sigHeader, secret)) {
    return NextResponse.json(
      { error: 'Invalid webhook signature', refusal: 'invalid_signature' },
      { status: 401 }
    )
  }

  let event: {
    type?: string
    data?: {
      status?: string
      metadata?: Record<string, unknown>
      customer_email?: string
      user_email?: string
    }
  }
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }

  const eventType = event.type || ''
  const isPaidOrder =
    eventType === 'order.paid' ||
    eventType === 'order.created' ||
    (eventType === 'checkout.updated' && event.data?.status === 'succeeded')

  if (!isPaidOrder) {
    return NextResponse.json({ received: true, action: 'ignored', eventType })
  }

  const metadata = event.data?.metadata || {}
  const sku = String(metadata.sku || metadata.productId || 'infogenius-pro')
  const pack =
    CREDIT_PACK_CATALOG[sku as keyof typeof CREDIT_PACK_CATALOG] ||
    CREDIT_PACK_CATALOG['infogenius-pro']

  const rawTenant =
    metadata.tenantId ||
    metadata.tenant_id ||
    event.data?.customer_email ||
    event.data?.user_email ||
    'default-customer'
  const tenantId = sanitizeTenantId(rawTenant)

  const updatedWallet = await creditTenantWallet(tenantId, pack.credits, pack.planUpgrade)

  return NextResponse.json({
    received: true,
    action: 'credited',
    tenantId: updatedWallet.tenantId,
    sku: pack.id,
    creditsAdded: pack.credits,
    creditsRemaining: updatedWallet.creditsRemaining,
    plan: updatedWallet.plan,
  })
}
