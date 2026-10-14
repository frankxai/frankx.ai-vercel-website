export type Stage = 'concept' | 'building' | 'gated' | 'live'

export type PriceBand =
  | 'free-only'
  | 'under-25'
  | '25-99'
  | '100-299'
  | '300-999'
  | 'over-1000'
  | 'company-pays'

export type Urgency = 'now' | 'this-quarter' | 'exploring'

/**
 * Captured in two steps on purpose. Step 1 is email alone so a hesitant visitor
 * still becomes a signal; everything below `email` is step 2, asked after they
 * have already joined and therefore costs no conversions when skipped.
 */
export interface DemandSignal {
  productId: string
  email: string
  name?: string

  role?: string
  pain?: string
  urgency?: Urgency
  priceBand?: PriceBand
  alternative?: string

  source: string
  referrer?: string
  utm?: Record<string, string>
  position: number
  createdAt: string
  consent: true
}

export interface WaitlistState {
  productId: string
  count: number
  position?: number
  /** Withheld below the product's publicCountThreshold. Never estimate it. */
  publicCount: number | null
  foundingCohort: number
  foundingSeatsLeft: number | null
  stage: Stage
}
