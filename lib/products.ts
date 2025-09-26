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
  price: number
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

export function getProductCards(): ProductCard[] {
  return products.map((product) => {
    const firstQuote = product.socialProof.quotes[0]

    return {
      id: product.id,
      name: product.name,
      headline: product.headline,
      summary: product.summary ?? product.promise,
      badge: product.badge,
      category: product.category,
      href: `/products/${product.slug}`,
      price: product.offer.primaryPrice,
      originalPrice: product.offer.originalPrice,
      highlights: product.transformation.slice(0, 3),
      testimonial: firstQuote
        ? {
            text: firstQuote.quote,
            author: firstQuote.author,
            role: firstQuote.role
          }
        : undefined
    }
  })
}
