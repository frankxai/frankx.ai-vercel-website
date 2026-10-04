import type { ProductRecord } from '@/types/products'

// These guides are public even though their legacy catalog records have no
// offer. Adding another entry requires an explicit delivery review.
const OFFERLESS_PUBLIC_GUIDES = new Set(['golden-age-book'])

export function isPublicDownloadProduct(product: ProductRecord): boolean {
  if (product.offer) return product.offer.primaryPrice === 0
  return OFFERLESS_PUBLIC_GUIDES.has(product.id)
}
