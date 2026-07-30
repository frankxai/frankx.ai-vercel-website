/**
 * Public release registry for the Six Primitives learning path.
 *
 * Internal concepts do not belong here. A record is present only when its
 * public route can prove the release status shown to the reader.
 */

export type ProductTier =
  | 'free'
  | 'pack'
  | 'toolkit'
  | 'mastery'
  | 'architect'
  | 'founders'

export interface ProductInclusion {
  label: string
  description: string
}

export interface ProductPricing {
  eur: number
  plannedEur?: number
  usd?: number
  cadence: 'public' | 'unavailable' | 'one-time' | 'subscription' | 'application'
  lemonSqueezyVariantId?: string
}

export interface Product {
  slug: string
  canonicalPath: `/${string}`
  tier: ProductTier
  title: string
  subtitle: string
  pricing: ProductPricing
  releaseStatus: 'public' | 'unavailable'
  outcomes: string[]
  includes: ProductInclusion[]
  featured: boolean
  color: 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose' | 'zinc'
  seatsPerQuarter?: number
}

export const products: Product[] = [
  {
    slug: 'six-primitives-primer',
    canonicalPath: '/start-here',
    tier: 'free',
    title: 'Six Primitives public path',
    subtitle: 'A public essay and inline build guide',
    pricing: { eur: 0, cadence: 'public' },
    releaseStatus: 'public',
    outcomes: [
      'Name the six parts of a small agent system',
      'Trace the loop from request to tool call to response',
      'Work through an inline implementation before choosing a larger framework',
    ],
    includes: [
      {
        label: 'The Six Primitives essay',
        description: 'The public argument for model, tool, memory, loop, spec, and deploy.',
      },
      {
        label: 'First-agent build guide',
        description: 'A public TypeScript walkthrough with explicit boundaries and eval cases.',
      },
    ],
    featured: false,
    color: 'zinc',
  },
  {
    slug: 'six-primitives-toolkit',
    canonicalPath: '/build/six-primitives-toolkit',
    tier: 'toolkit',
    title: 'Six Primitives Toolkit',
    subtitle:
      'A planned production-pattern release. Checkout remains closed while the offer is verified.',
    pricing: { eur: 197, plannedEur: 197, cadence: 'unavailable' },
    releaseStatus: 'unavailable',
    outcomes: [],
    includes: [],
    featured: false,
    color: 'cyan',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function productsByStage(): Product[] {
  return [...products]
}

export function paidProducts(): Product[] {
  return products.filter((product) => product.tier !== 'free')
}

export function getUpsellTier(currentSlug: string): Product | undefined {
  if (currentSlug !== 'six-primitives-primer') return undefined
  return getProductBySlug('six-primitives-toolkit')
}
