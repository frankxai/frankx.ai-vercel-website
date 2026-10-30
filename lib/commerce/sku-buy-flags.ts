/**
 * Per-SKU buy switch.
 *
 * Every priced product starts on the waitlist. A product shows a buy button and
 * reaches a payment provider only when its `buyEnabled` flag below is `true`.
 * Flipping a flag is a reviewed code change, not an env var, so a product
 * cannot go live from the Vercel dashboard by accident.
 *
 * The flag is necessary, not sufficient. With the flag on:
 *   - the product page links to /checkout/<slug> instead of the waitlist,
 *   - /checkout/<slug> still renders a buy link only when the Lemon Squeezy
 *     store and that product's variant env var are configured,
 *   - POST /api/checkout (Stripe) still needs STRIPE_SECRET_KEY and the
 *     product's Price ID.
 * With the flag off, all three stay on the waitlist path whatever the env says.
 *
 * Before flipping a flag, confirm the `delivery` evidence below is `in-repo`
 * or has been checked in Blob, and run one test-mode purchase end to end.
 *
 * Keys are catalog ids from data/products.json (not slugs), matching the keys
 * of the Stripe PRODUCTS map in app/api/checkout/route.ts.
 */

export type DeliveryEvidence =
  /** The files buyers receive are committed in this repo. */
  | 'in-repo'
  /** The catalog names Blob keys, but nobody has confirmed the objects exist. */
  | 'blob-unverified'
  /** No deliverable file is named anywhere in the catalog. */
  | 'none'
  /** Not a file product (application or service). */
  | 'not-a-download'

export type SkuBuyFlag = {
  buyEnabled: boolean
  delivery: DeliveryEvidence
  note: string
}

export const SKU_BUY_FLAGS: Record<string, SkuBuyFlag> = {
  'creative-ai-toolkit': {
    buyEnabled: false,
    delivery: 'none',
    note: 'No catalog delivery block. lib/delivery.ts names creative-ai-toolkit-v1.pdf, which is not in the repo or the catalog.',
  },
  'creation-chronicles': {
    buyEnabled: false,
    delivery: 'none',
    note: 'No catalog delivery block. lib/delivery.ts names creation-chronicles-framework.pdf, which is not in the repo or the catalog.',
  },
  'suno-prompt-library': {
    buyEnabled: false,
    delivery: 'blob-unverified',
    note: 'Catalog names three Blob keys (guide PDF, Notion zip, cheatsheet PDF). Catalog $27 vs Stripe route amount 2900: confirm the Price ID before launch.',
  },
  'aurora-ui-kit': {
    buyEnabled: false,
    delivery: 'blob-unverified',
    note: 'Catalog names aurora-ui-kit.zip and aurora-ui-kit-docs.pdf in Blob.',
  },
  'agentic-content-engine': {
    buyEnabled: false,
    delivery: 'blob-unverified',
    note: 'Catalog names three Blob keys (platform zip, setup PDF, SEO scripts zip).',
  },
  'system-architect-starter-kit': {
    buyEnabled: false,
    delivery: 'blob-unverified',
    note: 'Catalog names products/starter-kit/starter-kit-v1.zip; lib/delivery.ts names a different file (fixed by #1075). Lemon variant env already wired.',
  },
  'command-center-template': {
    buyEnabled: false,
    delivery: 'blob-unverified',
    note: 'Catalog names products/command-center/command-center-v1.zip; lib/delivery.ts names a different file (fixed by #1075). Lemon variant env already wired.',
  },
  'founders-circle-guild': {
    buyEnabled: false,
    delivery: 'not-a-download',
    note: 'Membership sold through /founders-circle/apply. Keep on the application path.',
  },
  'visual-creation-loop': {
    buyEnabled: false,
    delivery: 'none',
    note: 'Catalog delivery block lists methods only, no files.',
  },
  'income-architecture-blueprint': {
    buyEnabled: false,
    delivery: 'none',
    note: 'Catalog delivery block lists methods only, no files.',
  },
  'dpi-field-kit': {
    buyEnabled: false,
    delivery: 'none',
    note: 'Catalog delivery block lists methods only, no files.',
  },
  'agent-fleet-pro': {
    buyEnabled: false,
    delivery: 'none',
    note: 'Catalog delivery block lists methods only, no files.',
  },
  'memory-palace-os': {
    buyEnabled: false,
    delivery: 'none',
    note: 'Catalog delivery block lists methods only, no files.',
  },
  'agentic-media-machine': {
    buyEnabled: false,
    delivery: 'none',
    note: 'Catalog delivery block lists methods only, no files.',
  },
  'starlight-operator-pack': {
    buyEnabled: false,
    delivery: 'none',
    note: 'Catalog delivery block lists methods only, no files.',
  },
  'agentic-creator-os': {
    buyEnabled: false,
    delivery: 'in-repo',
    note: 'PDFs are committed under public/products and the catalog lists it as free. The Stripe route still carries a 4700 amount: decide free or paid before flipping.',
  },
}

type BuyableProduct = {
  id: string
  slug: string
  offer?: { primaryPrice?: number } | null
}

export function isBuyEnabled(productId: string, flags: Record<string, SkuBuyFlag> = SKU_BUY_FLAGS): boolean {
  return Object.prototype.hasOwnProperty.call(flags, productId) && flags[productId].buyEnabled === true
}

/**
 * The on-site checkout route for a priced product whose flag is on, or null.
 * Null means: keep the current waitlist call to action.
 */
export function checkoutHrefFor(
  product: BuyableProduct,
  flags: Record<string, SkuBuyFlag> = SKU_BUY_FLAGS
): string | null {
  const price = product.offer?.primaryPrice ?? 0
  if (!(price > 0)) return null
  if (!isBuyEnabled(product.id, flags)) return null
  return `/checkout/${product.slug}`
}
