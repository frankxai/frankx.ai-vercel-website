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
  originalPrice?: number
  highlights: string[]
  testimonial?: {
    text: string
    author: string
    role?: string
  }
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
  return products.map((product) => {
    const firstQuote = product.socialProof?.quotes?.[0]
    const legacy = product as ProductRecord & {
      title?: string
      description?: string
      price?: number
      cta?: { label: string; href: string }
    }

    const price = product.offer?.primaryPrice ?? legacy.price ?? 0
    const priceDisplay =
      product.offer?.primaryPriceDisplay ??
      (price === 0 ? 'Free' : `$${price}`)

    const primaryCtaHref =
      product.offer?.ctaPrimaryHref ??
      legacy.cta?.href ??
      (price === 0 && product.delivery?.files?.[0]?.blobKey
        ? `/api/download?product=${product.slug}&file=${product.delivery.files[0].name}`
        : `/products/${product.slug}`)

    const primaryCtaLabel =
      product.offer?.ctaPrimary ??
      legacy.cta?.label ??
      (price === 0 ? 'Free Access' : 'Acquire')

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
