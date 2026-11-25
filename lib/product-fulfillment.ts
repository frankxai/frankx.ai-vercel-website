import type { ProductRecord } from '@/types/products'

/** A catalog ID and its public slug must resolve to one and the same record. */
export function canonicalProduct(products: readonly ProductRecord[], identity: unknown) {
  if (typeof identity !== 'string' || !identity) return undefined
  const matches = products.filter(product => product.id === identity || product.slug === identity)
  return matches.length === 1 ? matches[0] : undefined
}
