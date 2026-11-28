import type { ProductFile, ProductRecord } from '@/types/products'

// These guides are public even though their legacy catalog records have no
// offer. Adding another entry requires an explicit delivery review.
const OFFERLESS_PUBLIC_GUIDES = new Set(['golden-age-book'])

export function isPublicDownloadProduct(product: ProductRecord): boolean {
  if (product.offer) return product.offer.primaryPrice === 0
  return OFFERLESS_PUBLIC_GUIDES.has(product.id)
}

const BLOB_BASE_URL = 'https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com'

/** Resolve a file already selected by the public catalog access checks. */
export function publicDownloadUrl(file: ProductFile, requestUrl: string): string {
  if (file.publicPath) return new URL(`${file.publicPath}?download=1`, requestUrl).href
  return `${BLOB_BASE_URL}/${file.blobKey}?download=1`
}
