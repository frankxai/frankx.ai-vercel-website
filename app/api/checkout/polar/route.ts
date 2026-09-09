import { NextRequest, NextResponse } from 'next/server';

/**
 * Fail-closed Polar checkout, ported from agenticincome/lib/polar.ts.
 * Three independent gates must all pass before Polar is ever called:
 *
 *   1. the catalog entry's `status` must start with "for sale" — flipping a
 *      status is a deliberate go-live edit, not an env change,
 *   2. the product must be mapped in PRODUCT_ID_ENV_KEYS,
 *   3. that env var and POLAR_ACCESS_TOKEN must both be set.
 *
 * Every other state returns an honest machine-readable refusal. There is no
 * free-access fallback and no caller-controlled redirect: success_url comes
 * only from POLAR_SUCCESS_URL (https enforced), never from the request body.
 */

const POLAR_CHECKOUT_ENDPOINT = 'https://api.polar.sh/v1/checkouts/';
const REQUEST_TIMEOUT_MS = 10_000;
const PURCHASABLE_STATUS_PREFIX = 'for sale';

const CATALOG: Record<string, { name: string; status: string }> = {
  'prompt-matrix-pro': {
    name: 'FrankX AI Prompt & Agent Chaining Matrix (Pro Web Edition)',
    status: 'pre-stage (not for sale)',
  },
  'prompt-matrix-pro-bundle': {
    name: 'Prompt & Agent Chaining Matrix (Pro + Agent Chaining Masterclass Bundle)',
    status: 'pre-stage (not for sale)',
  },
  'book-of-light-digital': {
    name: 'The Book of Light — Interactive Digital Edition',
    status: 'pre-stage (not for sale)',
  },
  'book-of-light-deluxe': {
    name: 'The Book of Light — Deluxe Master Edition (with Lossless Ambient Stems)',
    status: 'pre-stage (not for sale)',
  },
};

// Explicit map rather than a derived string: an unmapped or misspelled id
// fails closed instead of resolving to some other product's checkout.
const PRODUCT_ID_ENV_KEYS: Record<string, string> = {
  'prompt-matrix-pro': 'POLAR_PRODUCT_PROMPT_MATRIX_PRO',
  'prompt-matrix-pro-bundle': 'POLAR_PRODUCT_PROMPT_MATRIX_BUNDLE',
  'book-of-light-digital': 'POLAR_PRODUCT_BOOK_OF_LIGHT_DIGITAL',
  'book-of-light-deluxe': 'POLAR_PRODUCT_BOOK_OF_LIGHT_DELUXE',
};

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function refusal(status: number, error: string, code: string) {
  return NextResponse.json({ error, refusal: code }, { status });
}

function successUrl(): string | null {
  const base = process.env.POLAR_SUCCESS_URL?.trim();
  if (!base) return null;
  try {
    const url = new URL('/checkout/success', base);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  let body: { productId?: unknown; email?: unknown };
  try {
    body = await request.json();
  } catch {
    return refusal(400, 'Invalid request body', 'invalid_request');
  }

  const productId = typeof body.productId === 'string' ? body.productId : '';
  const product = CATALOG[productId];
  if (!product) {
    return refusal(400, 'Unknown product', 'unknown_product');
  }

  if (!product.status.trim().toLowerCase().startsWith(PURCHASABLE_STATUS_PREFIX)) {
    return refusal(503, 'Checkout is not open for this product', 'checkout_gated');
  }

  const token = process.env.POLAR_ACCESS_TOKEN?.trim();
  const envKey = PRODUCT_ID_ENV_KEYS[productId];
  const polarProductId = envKey ? process.env[envKey]?.trim() : undefined;
  if (!token || !polarProductId) {
    return refusal(503, 'Checkout is not configured for this product', 'checkout_unconfigured');
  }

  const email =
    typeof body.email === 'string' && EMAIL_SHAPE.test(body.email) ? body.email : undefined;
  const success = successUrl();

  const response = await fetch(POLAR_CHECKOUT_ENDPOINT, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    // `products` (array) is the current field; the singular `product_id` and
    // the /v1/checkouts/custom/ endpoint are both deprecated.
    body: JSON.stringify({
      products: [polarProductId],
      ...(email ? { customer_email: email } : {}),
      ...(success ? { success_url: success } : {}),
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  }).catch(() => null);

  if (!response || !response.ok) {
    return refusal(502, 'Checkout provider unavailable', 'checkout_upstream_failed');
  }

  const session = (await response.json().catch(() => null)) as { url?: unknown } | null;
  if (!session || typeof session.url !== 'string') {
    return refusal(502, 'Checkout provider returned no usable session', 'checkout_upstream_failed');
  }

  try {
    const url = new URL(session.url);
    if (url.protocol !== 'https:') {
      return refusal(502, 'Checkout provider returned no usable session', 'checkout_upstream_failed');
    }
    return NextResponse.json({ url: url.toString() });
  } catch {
    return refusal(502, 'Checkout provider returned no usable session', 'checkout_upstream_failed');
  }
}
