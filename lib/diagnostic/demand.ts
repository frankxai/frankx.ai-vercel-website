// Demand capture — the three questions, and the field names they travel under.
//
// AGENTS.md §5c / DEMAND-CAPTURE-STANDARD.md: no checkout until a product holds a fresh
// release-gate PASS, so until then every surface is a per-product waitlist that asks what
// the person would pay, who they are, and what they are trying to do. The price band is the
// load-bearing one: PRODUCT-RELEASE-GATE G5 needs price evidence and every row in
// starlight/graph/products.graph.json still reads "evidence": "none yet".
//
// The estate implementation is starlight/packages/demand-capture/, which stores signals in
// Vercel KV. frankx.ai has no KV binding provisioned, so rather than stand up a second
// bespoke form this file reuses that package's exact vocabulary — the PriceBand union, the
// urgency values, the question wording — and posts the answers onto the existing Resend
// contact as properties. When KV lands, the field names below map onto DemandSignal
// one-for-one and the answers can be replayed into it without a migration.
//
// Field names on the wire, /api/subscribe (step 1) and /api/demand (step 2):
//
//   intent      string     the product registry id the signup is attributed to
//   priceBand   PriceBand  what they would expect to pay
//   role        string     who they are, from rolesFor(intent)
//   pain        string     what they are trying to do, free text, <= 280 chars
//
// They are stored on the Resend contact as properties `intent`, `price_band`, `role` and
// `pain`, alongside the pre-existing `source` and `referrer`. Never rename one of these
// without changing report readers — the cross-brand read depends on one schema.

export type PriceBand =
  | 'free-only'
  | 'under-25'
  | '25-99'
  | '100-299'
  | '300-999'
  | 'over-1000'
  | 'company-pays'

export const PRICE_BANDS: { value: PriceBand; label: string }[] = [
  { value: 'free-only', label: 'Only if free' },
  { value: 'under-25', label: 'Under 25' },
  { value: '25-99', label: '25 to 99' },
  { value: '100-299', label: '100 to 299' },
  { value: '300-999', label: '300 to 999' },
  { value: 'over-1000', label: '1000 or more' },
  { value: 'company-pays', label: 'My company would pay' },
]

export const PRICE_PROMPT = 'What would you expect something like this to cost?'
export const ROLE_PROMPT = 'Who are you?'
export const PAIN_PROMPT = 'What are you trying to do that this would help with?'

/** Roles differ per product; a generic set is worse than none. */
const ROLES: Record<string, string[]> = {
  default: ['Founder or solo operator', 'Engineer', 'Creator', 'Consultant', 'Team lead', 'Student'],
  'creative-ai-toolkit': ['Creator', 'Solo operator', 'Engineer', 'Agency or studio', 'Exploring'],
  'creation-chronicles': ['Builder in public', 'Operator', 'Writer', 'Investor', 'Passing through'],
}

export const rolesFor = (intent: string | undefined) =>
  (intent && ROLES[intent]) || ROLES.default

export const MAX_PAIN_LENGTH = 280

export interface DemandAnswers {
  priceBand?: PriceBand
  role?: string
  pain?: string
}

const PRICE_BAND_VALUES = new Set<string>(PRICE_BANDS.map((band) => band.value))

export function isPriceBand(value: unknown): value is PriceBand {
  return typeof value === 'string' && PRICE_BAND_VALUES.has(value)
}

/** True when at least one question was answered — an all-skipped step 2 posts nothing. */
export function hasDemandAnswers(answers: DemandAnswers): boolean {
  return Boolean(answers.priceBand || answers.role || answers.pain?.trim())
}
