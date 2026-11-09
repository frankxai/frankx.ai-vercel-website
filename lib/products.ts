import registry from '@/data/products.json'
import type { ProductRecord } from '@/types/products'

export const products = registry as ProductRecord[]

export type ProductCard = {
  id: string
  name: string
  headline: string
  summary: string
  badge?: string
  category?: string
  href: string
  primaryCtaHref?: string
  primaryCtaLabel?: string
  price: number
  priceDisplay?: string
  currency?: string
  isWaitlist?: boolean
  originalPrice?: number
  highlights: string[]
  testimonial?: {
    text: string
    author: string
    role?: string
  }
}

/**
 * /products/<slug> paths that next.config.mjs redirects elsewhere. Machine-readable
 * maps (llms.txt) link the destination so they never point at a redirect.
 * Kept in sync with next.config.mjs by scripts/tests/owned-canon-contract.test.mjs.
 */
export const PRODUCT_PATH_REDIRECTS: Record<string, string> = {
  '/products/agentic-creator-os': '/acos',
  '/products/soulbook': '/soulbook',
}

/** Final public path for a product page, after any configured redirect. */
export function productPublicPath(slug: string): string {
  const path = `/products/${slug}`
  return PRODUCT_PATH_REDIRECTS[path] ?? path
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

/**
 * Get products with downloadable files
 */
export function getDownloadableProducts() {
  return products.filter((product) => product.delivery?.files?.length)
}

/**
 * Check if product requires email for download
 */
export function requiresEmailCapture(product: ProductRecord): boolean {
  return product.delivery?.requiresEmail === true
}

/**
 * Get delivery methods for a product
 */
export function getDeliveryMethods(product: ProductRecord) {
  return product.delivery?.methods ?? []
}

export function getProductCards(): ProductCard[] {
  return products
    .filter((product) => !product.id.includes('arcanea') && !product.slug?.includes('arcanea'))
    .map((product) => {
      const firstQuote = product.socialProof?.quotes?.[0]
      const legacy = product as ProductRecord & {
        title?: string
        description?: string
        price?: number
        cta?: { label: string; href: string }
      }

      const price = product.offer?.primaryPrice ?? legacy.price ?? 0
      const currency = product.offer?.currency ?? 'USD'
      const priceDisplay =
        product.offer?.primaryPriceDisplay ??
        (price === 0 ? 'Free' : currency === 'EUR' ? `€${price}` : `$${price}`)

      const isWaitlist = Boolean(
        product.offer?.ctaPrimary?.toLowerCase().includes('waitlist') ||
        product.offer?.ctaPrimaryHref?.startsWith('/waitlist') ||
        legacy.cta?.label?.toLowerCase().includes('waitlist')
      )

      const primaryCtaHref = isWaitlist
        ? (product.offer?.ctaPrimaryHref ?? `/waitlist?intent=${product.slug}`)
        : (price === 0
            ? (product.offer?.ctaPrimaryHref ?? legacy.cta?.href ?? `/products/${product.slug}`)
            : (product.offer?.ctaPrimaryHref ?? `/checkout/${product.slug}`))

      const primaryCtaLabel =
        product.offer?.ctaPrimary ??
        legacy.cta?.label ??
        (isWaitlist ? 'Join Waitlist' : (price === 0 ? 'Free Access' : 'Acquire'))

      return {
        id: product.id,
        name: product.name ?? legacy.title ?? product.slug,
        headline: product.headline ?? legacy.description ?? '',
        summary: product.summary ?? product.promise ?? legacy.description ?? '',
        badge: product.badge,
        category: product.category,
        href: `/products/${product.slug}`,
        primaryCtaHref,
        primaryCtaLabel,
        price,
        priceDisplay,
        currency,
        isWaitlist,
        originalPrice: product.offer?.originalPrice,
        highlights: product.transformation?.slice(0, 3) ?? [],
        testimonial: firstQuote
          ? {
              text: firstQuote.quote,
              author: firstQuote.author,
              role: firstQuote.role,
            }
          : undefined,
      }
    })
}
