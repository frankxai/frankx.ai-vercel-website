// Fail-closed gate for the Stripe checkout route. A product opens only when its
// status starts with "for sale" (a reviewed go-live edit, never an env change)
// and the secret key and price id both exist. Setting STRIPE_SECRET_KEY alone
// must not open checkout (waitlist-first rule, AGENTS.md §5c).

export const PURCHASABLE_STATUS_PREFIX = 'for sale'

export type CheckoutGateResult =
  | { ok: true; secretKey: string; priceId: string }
  | { ok: false; status: 503; refusal: 'checkout_gated' | 'checkout_unconfigured'; error: string }

export function stripeCheckoutGate(
  product: { status: string; priceId: string },
  secretKey: string | undefined,
): CheckoutGateResult {
  if (!product.status.trim().toLowerCase().startsWith(PURCHASABLE_STATUS_PREFIX)) {
    return { ok: false, status: 503, refusal: 'checkout_gated', error: 'Checkout is not open for this product' }
  }
  const key = secretKey?.trim()
  const priceId = product.priceId.trim()
  if (!key || !priceId) {
    return { ok: false, status: 503, refusal: 'checkout_unconfigured', error: 'Checkout is not configured for this product' }
  }
  return { ok: true, secretKey: key, priceId }
}
