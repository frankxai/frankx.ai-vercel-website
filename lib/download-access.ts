import type { ProductRecord } from '@/types/products'

// These guides are public even though their legacy catalog records have no
// offer. Adding another entry requires an explicit delivery review.
const OFFERLESS_PUBLIC_GUIDES = new Set(['golden-age-book', 'vibe-os'])

export function isPublicDownloadProduct(product: ProductRecord): boolean {
  return product.offer?.primaryPrice === 0 || OFFERLESS_PUBLIC_GUIDES.has(product.id)
}
