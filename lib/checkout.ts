import { isProductDeliveryReady } from './delivery'

type CheckoutEnvironment = Record<string, string | undefined>

type CheckoutProductDefinition = {
  name: string
  priceEnvironmentKey: string
}

export const CHECKOUT_PRODUCTS = {
  'creative-ai-toolkit': {
    name: 'Creative AI Toolkit',
    priceEnvironmentKey: 'STRIPE_PRICE_TOOLKIT',
  },
  'agentic-creator-os': {
    name: 'ACOS Creator Kit',
    priceEnvironmentKey: 'STRIPE_PRICE_ACOS',
  },
  'suno-prompt-library': {
    name: 'Suno Prompt Pack',
    priceEnvironmentKey: 'STRIPE_PRICE_SUNO',
  },
} as const satisfies Record<string, CheckoutProductDefinition>

export type CheckoutProductId = keyof typeof CHECKOUT_PRODUCTS

export type ResolvedCheckoutProduct = CheckoutProductDefinition & {
  id: CheckoutProductId
  priceId: string
}

export type CheckoutProductResolution =
  | { ok: true; product: ResolvedCheckoutProduct }
  | {
      ok: false
      code:
        | 'invalid_product_id'
        | 'product_not_found'
        | 'price_not_configured'
        | 'invalid_price_id'
        | 'delivery_not_configured'
      productId?: string
      configurationKey?: string
    }

const STRIPE_PRICE_ID_PATTERN = /^price_[A-Za-z0-9]+$/

export function resolveCheckoutProduct(
  productId: unknown,
  environment: CheckoutEnvironment = process.env
): CheckoutProductResolution {
  if (typeof productId !== 'string' || !productId.trim()) {
    return { ok: false, code: 'invalid_product_id' }
  }

  const normalizedProductId = productId.trim()
  if (!(normalizedProductId in CHECKOUT_PRODUCTS)) {
    return { ok: false, code: 'product_not_found', productId: normalizedProductId }
  }

  const id = normalizedProductId as CheckoutProductId
  const definition = CHECKOUT_PRODUCTS[id]
  const priceId = environment[definition.priceEnvironmentKey]?.trim()

  if (!priceId) {
    return {
      ok: false,
      code: 'price_not_configured',
      productId: id,
      configurationKey: definition.priceEnvironmentKey,
    }
  }

  if (!STRIPE_PRICE_ID_PATTERN.test(priceId)) {
    return {
      ok: false,
      code: 'invalid_price_id',
      productId: id,
      configurationKey: definition.priceEnvironmentKey,
    }
  }

  if (!isProductDeliveryReady(id)) {
    return { ok: false, code: 'delivery_not_configured', productId: id }
  }

  return {
    ok: true,
    product: {
      id,
      name: definition.name,
      priceEnvironmentKey: definition.priceEnvironmentKey,
      priceId,
    },
  }
}

type CheckoutSessionParamsInput = {
  product: ResolvedCheckoutProduct
  origin: string
  email?: unknown
}

export function buildCheckoutSessionParams({
  product,
  origin,
  email,
}: CheckoutSessionParamsInput): URLSearchParams {
  const params = new URLSearchParams()
  params.append('mode', 'payment')
  params.append('success_url', `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`)
  params.append('cancel_url', `${origin}/checkout/cancel`)
  params.append('line_items[0][price]', product.priceId)
  params.append('line_items[0][quantity]', '1')
  params.append('metadata[productSlug]', product.id)
  params.append('payment_intent_data[metadata][productSlug]', product.id)

  if (typeof email === 'string' && email.trim()) {
    params.append('customer_email', email.trim())
  }

  return params
}
