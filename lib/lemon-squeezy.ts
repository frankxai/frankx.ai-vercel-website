/**
 * Lemon Squeezy Integration
 * Handles checkout creation, webhook verification, and order fulfillment
 */

import crypto from 'crypto'
import { PURCHASABLE_STATUS_PREFIX } from './checkout-gate'
import { CHECKOUT_PRODUCTS, type CheckoutProduct } from './checkout-products'

// Environment variables (set in .env.local)
const API_KEY = process.env.LEMON_SQUEEZY_API_KEY || ''
const STORE_ID = process.env.LEMON_SQUEEZY_STORE_ID || ''
const WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || ''

const API_BASE = 'https://api.lemonsqueezy.com/v1'

// ── Types ───────────────────────────────────────────────────────────────────

export interface LemonSqueezyCheckoutOptions {
  variantId: string
  email?: string
  name?: string
  customData?: Record<string, string>
  redirectUrl?: string
}

export interface LemonSqueezyProduct {
  id: string
  name: string
  price: number
  status: string
  variants: Array<{
    id: string
    name: string
    price: number
  }>
}

export interface LemonSqueezyWebhookEvent {
  meta: {
    event_name: string
    custom_data?: Record<string, string>
  }
  data: {
    id: string
    type: string
    attributes: {
      user_email: string
      user_name: string
      first_order_item: {
        product_id: number
        variant_id: number
        product_name: string
        variant_name: string
      }
      total: number
      total_formatted: string
      currency: string
      status: string
      urls: {
        receipt: string
      }
    }
  }
}

// ── API Helpers ─────────────────────────────────────────────────────────────

async function lemonFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${API_KEY}`,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Lemon Squeezy API error: ${response.status} ${error}`)
  }

  return response.json()
}

// ── Checkout ────────────────────────────────────────────────────────────────

/**
 * Create a Lemon Squeezy checkout URL for the overlay
 */
export async function createCheckoutUrl(options: LemonSqueezyCheckoutOptions): Promise<string> {
  if (!API_KEY || !STORE_ID) {
    // Return empty string when not configured (placeholder mode)
    return ''
  }

  const body = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_data: {
          email: options.email,
          name: options.name,
          custom: options.customData,
        },
        product_options: {
          redirect_url: options.redirectUrl || 'https://frankx.ai/shop/thank-you',
        },
      },
      relationships: {
        store: { data: { type: 'stores', id: STORE_ID } },
        variant: { data: { type: 'variants', id: options.variantId } },
      },
    },
  }

  const result = await lemonFetch('/checkouts', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  return result.data.attributes.url
}

// ── Webhook Verification ────────────────────────────────────────────────────

/**
 * Verify Lemon Squeezy webhook signature
 */
export function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET || !signature) return false

  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET)
  const digest = hmac.update(payload).digest('hex')
  const digestBuffer = Buffer.from(digest)
  const signatureBuffer = Buffer.from(signature)
  // timingSafeEqual throws on unequal-length buffers instead of returning
  // false — a missing/malformed header must not crash the webhook.
  if (signatureBuffer.length !== digestBuffer.length) return false
  return crypto.timingSafeEqual(signatureBuffer, digestBuffer)
}

// ── Product Helpers ─────────────────────────────────────────────────────────

/**
 * Get the Lemon Squeezy checkout overlay script URL
 */
export function getCheckoutScriptUrl(): string {
  return 'https://app.lemonsqueezy.com/js/lemon.js'
}

/**
 * Check if Lemon Squeezy is configured
 */
export function isConfigured(): boolean {
  return Boolean(API_KEY && STORE_ID)
}

/**
 * Build a direct checkout URL (for when JS overlay isn't available)
 */
export function buildDirectCheckoutUrl(variantId: string): string {
  return `https://${STORE_ID}.lemonsqueezy.com/checkout/buy/${variantId}`
}

// ── Buy-page gate ───────────────────────────────────────────────────────────

/**
 * Only slugs listed here can ever render a live buy button. The value is the
 * env var that must hold the Lemon Squeezy variant ID for that product.
 */
export const LEMON_SQUEEZY_VARIANT_ENV_KEYS: Record<string, string> = {
  'starter-kit': 'LEMON_SQUEEZY_VARIANT_STARTER_KIT',
  'command-center-template': 'LEMON_SQUEEZY_VARIANT_COMMAND_CENTER_TEMPLATE',
}

export interface BuyPageProduct {
  id: string
  slug: string
  primaryPrice: number | undefined
}

/**
 * Hosted-checkout URL for a product, or null. Every gate must pass:
 * (a) the product has a price above zero,
 * (b) the for-sale registry marks it "for sale", which is a reviewed edit,
 * (c) its slug is wired in LEMON_SQUEEZY_VARIANT_ENV_KEYS,
 * (d) the store config and that product's variant ID are both set.
 * Gate (b) is why setting env vars alone cannot open a checkout: the same
 * rule lib/checkout-gate.ts applies to Stripe. Fail closed.
 */
export function lemonSqueezyCheckoutUrl(
  product: BuyPageProduct,
  registry: Record<string, CheckoutProduct> = CHECKOUT_PRODUCTS,
): string | null {
  if (!product.primaryPrice || product.primaryPrice <= 0) return null
  const status = registry[product.id]?.status ?? ''
  if (!status.trim().toLowerCase().startsWith(PURCHASABLE_STATUS_PREFIX)) return null
  const envKey = LEMON_SQUEEZY_VARIANT_ENV_KEYS[product.slug]
  if (!envKey) return null
  const variantId = process.env[envKey]
  if (!variantId || !isConfigured()) return null
  return buildDirectCheckoutUrl(variantId)
}
