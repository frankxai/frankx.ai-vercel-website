import type { ProductConfig } from './handler.ts'

/**
 * The waitlists this site accepts signups for. Each row is copied from
 * starlight/graph/products.graph.json, which stays the authority: change a row
 * there first, then here. Only the fields the handler reads are kept.
 */
export const WAITLIST_PRODUCTS: ProductConfig[] = [
  {
    id: 'starlight-academy-operator-lab',
    stage: 'concept',
    waitlist: { enabled: true, publicCountThreshold: 50, foundingCohort: 25 },
  },
]
