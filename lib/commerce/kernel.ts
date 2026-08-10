/**
 * Commerce kernel — multi-MoR checkout resolution
 *
 * One primary Merchant of Record per SKU (see portfolio-registry).
 * Stripe remains the default owned rail; Polar / Lemon Squeezy for MoR SKUs.
 * Secrets stay in env — never hardcode keys.
 */

import {
  getSkuById,
  type MerchOfRecord,
  type PortfolioSku,
} from '@/data/portfolio-registry'
import { createCheckoutUrl as createLemonCheckout, buildDirectCheckoutUrl } from '@/lib/lemon-squeezy'

export type CommerceCheckoutRequest = {
  productId: string
  email?: string
  successUrl?: string
  cancelUrl?: string
}

export type CommerceCheckoutResult =
  | { ok: true; url: string; mor: MerchOfRecord; productId: string }
  | { ok: false; error: string; status: number; productId?: string }

function env(name: string | undefined): string {
  if (!name) return ''
  return process.env[name] || ''
}

function resolveStripePriceId(sku: PortfolioSku): string {
  return env(sku.checkout.stripePriceIdEnv)
}

/**
 * Create a hosted checkout URL for the SKU's primary MoR.
 * Free / none MoR SKUs return a direct success/download path.
 */
export async function createCommerceCheckout(
  req: CommerceCheckoutRequest,
  origin: string
): Promise<CommerceCheckoutResult> {
  const sku = getSkuById(req.productId)
  if (!sku) {
    return { ok: false, error: 'Product not found', status: 404, productId: req.productId }
  }

  if (sku.status === 'draft' || sku.status === 'sunset') {
    return { ok: false, error: 'Product is not available for purchase', status: 400, productId: sku.id }
  }

  if (sku.cadence === 'free' || sku.checkout.primaryMor === 'none') {
    const path = sku.checkout.successPath || sku.path
    return {
      ok: true,
      url: path.startsWith('http') ? path : `${origin}${path}`,
      mor: 'none',
      productId: sku.id,
    }
  }

  if (sku.status === 'waitlist' && !isCheckoutFullyConfigured(sku)) {
    const waitlist = `${origin}/newsletter?ref=${encodeURIComponent(sku.slug)}-waitlist`
    return { ok: true, url: waitlist, mor: sku.checkout.primaryMor, productId: sku.id }
  }

  const success =
    req.successUrl ||
    `${origin}${sku.checkout.successPath || '/checkout/success'}?product=${encodeURIComponent(sku.id)}`
  const cancel = req.cancelUrl || `${origin}/checkout/cancel?product=${encodeURIComponent(sku.id)}`

  switch (sku.checkout.primaryMor) {
    case 'stripe':
    case 'stripe_managed':
      return createStripeCheckout(sku, req.email, success, cancel)
    case 'lemon_squeezy':
      return createLemonSqueezyCheckout(sku, req.email, success)
    case 'polar':
      return createPolarCheckout(sku, req.email, success)
    case 'skool':
      if (sku.checkout.skoolCommunityUrl) {
        return {
          ok: true,
          url: sku.checkout.skoolCommunityUrl,
          mor: 'skool',
          productId: sku.id,
        }
      }
      return {
        ok: false,
        error: 'Skool community URL not configured',
        status: 503,
        productId: sku.id,
      }
    case 'whop':
    case 'gumroad':
      return {
        ok: false,
        error: `${sku.checkout.primaryMor} checkout is probe-only — configure product URL first`,
        status: 503,
        productId: sku.id,
      }
    default:
      return { ok: false, error: 'Unsupported merchant of record', status: 400, productId: sku.id }
  }
}

function isCheckoutFullyConfigured(sku: PortfolioSku): boolean {
  const c = sku.checkout
  if (c.primaryMor === 'stripe' || c.primaryMor === 'stripe_managed') {
    return Boolean(resolveStripePriceId(sku) && process.env.STRIPE_SECRET_KEY)
  }
  if (c.primaryMor === 'lemon_squeezy') {
    return Boolean(c.lemonSqueezyVariantId)
  }
  if (c.primaryMor === 'polar') {
    return Boolean(c.polarProductId && process.env.POLAR_ACCESS_TOKEN)
  }
  if (c.primaryMor === 'skool') {
    return Boolean(c.skoolCommunityUrl)
  }
  return false
}

async function createStripeCheckout(
  sku: PortfolioSku,
  email: string | undefined,
  successUrl: string,
  cancelUrl: string
): Promise<CommerceCheckoutResult> {
  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    return {
      ok: false,
      error: 'Payment system is being configured. Please try again soon.',
      status: 503,
      productId: sku.id,
    }
  }

  const priceId = resolveStripePriceId(sku)
  if (!priceId) {
    return {
      ok: false,
      error: 'Stripe price is not linked for this product yet',
      status: 503,
      productId: sku.id,
    }
  }

  const params = new URLSearchParams()
  const mode = sku.cadence === 'subscription' ? 'subscription' : 'payment'
  params.append('mode', mode)
  params.append('success_url', successUrl.includes('{CHECKOUT_SESSION_ID}')
    ? successUrl
    : `${successUrl}${successUrl.includes('?') ? '&' : '?'}session_id={CHECKOUT_SESSION_ID}`)
  params.append('cancel_url', cancelUrl)
  params.append('line_items[0][price]', priceId)
  params.append('line_items[0][quantity]', '1')
  params.append('metadata[productSlug]', sku.id)
  params.append('metadata[productId]', sku.id)
  params.append('metadata[brand]', sku.brand)
  params.append('payment_intent_data[metadata][productSlug]', sku.id)
  if (email) params.append('customer_email', email)

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  if (!response.ok) {
    console.error('Stripe checkout error', await response.text())
    return { ok: false, error: 'Failed to create checkout session', status: 500, productId: sku.id }
  }

  const session = (await response.json()) as { url?: string }
  if (!session.url) {
    return { ok: false, error: 'Stripe session missing URL', status: 500, productId: sku.id }
  }

  return { ok: true, url: session.url, mor: sku.checkout.primaryMor, productId: sku.id }
}

async function createLemonSqueezyCheckout(
  sku: PortfolioSku,
  email: string | undefined,
  redirectUrl: string
): Promise<CommerceCheckoutResult> {
  const variantId = sku.checkout.lemonSqueezyVariantId
  if (!variantId) {
    return {
      ok: false,
      error: 'Lemon Squeezy variant is not linked for this product yet',
      status: 503,
      productId: sku.id,
    }
  }

  try {
    const url = await createLemonCheckout({
      variantId,
      email,
      customData: { productId: sku.id, brand: sku.brand },
      redirectUrl,
    })
    if (url) {
      return { ok: true, url, mor: 'lemon_squeezy', productId: sku.id }
    }
    // Overlay API not configured — fall back to direct buy link
    return {
      ok: true,
      url: buildDirectCheckoutUrl(variantId),
      mor: 'lemon_squeezy',
      productId: sku.id,
    }
  } catch (err) {
    console.error('Lemon Squeezy checkout error', err)
    return { ok: false, error: 'Failed to create Lemon Squeezy checkout', status: 500, productId: sku.id }
  }
}

async function createPolarCheckout(
  sku: PortfolioSku,
  email: string | undefined,
  successUrl: string
): Promise<CommerceCheckoutResult> {
  const token = process.env.POLAR_ACCESS_TOKEN
  const productId = sku.checkout.polarProductId
  if (!token || !productId) {
    return {
      ok: false,
      error: 'Polar checkout is not configured for this product yet',
      status: 503,
      productId: sku.id,
    }
  }

  // Polar checkout sessions API (server-side). Env-gated; safe no-op when unset.
  try {
    const res = await fetch('https://api.polar.sh/v1/checkouts/custom/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: productId,
        success_url: successUrl,
        customer_email: email,
        metadata: { productId: sku.id, brand: sku.brand },
      }),
    })
    if (!res.ok) {
      console.error('Polar checkout error', await res.text())
      return { ok: false, error: 'Failed to create Polar checkout', status: 500, productId: sku.id }
    }
    const data = (await res.json()) as { url?: string }
    if (!data.url) {
      return { ok: false, error: 'Polar session missing URL', status: 500, productId: sku.id }
    }
    return { ok: true, url: data.url, mor: 'polar', productId: sku.id }
  } catch (err) {
    console.error('Polar checkout exception', err)
    return { ok: false, error: 'Polar checkout failed', status: 500, productId: sku.id }
  }
}

export function listLegacyStripeProductMap(): Record<string, { name: string; priceId: string; amount: number }> {
  // Compatibility map for older three-SKU route while migrating callers to createCommerceCheckout
  return {
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
    'vibe-os': {
      name: 'Vibe OS',
      priceId: process.env.STRIPE_PRICE_VIBE_OS || '',
      amount: 4700,
    },
    'six-primitives-toolkit': {
      name: 'Six Primitives Toolkit',
      priceId: process.env.STRIPE_PRICE_SIX_PRIMITIVES_TOOLKIT || '',
      amount: 19700,
    },
    'six-primitives-pack': {
      name: 'Six Primitives Pack',
      priceId: process.env.STRIPE_PRICE_SIX_PRIMITIVES_PACK || '',
      amount: 700,
    },
  }
}
