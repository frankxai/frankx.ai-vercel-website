import type { DemandSignal, PriceBand, Stage, Urgency, WaitlistState } from './types'
import { addToAudience, claimPosition, getCount, saveSignal } from './store'

export interface ProductConfig {
  id: string
  stage: Stage
  waitlist: { enabled: boolean; publicCountThreshold: number; foundingCohort: number }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX = { email: 320, name: 100, pain: 400, alternative: 200, source: 160 }

const clip = (v: unknown, n: number) => (typeof v === 'string' ? v.trim().slice(0, n) : undefined)

const URGENCIES: Urgency[] = ['now', 'this-quarter', 'exploring']
const BANDS: PriceBand[] = ['free-only', 'under-25', '25-99', '100-299', '300-999', 'over-1000', 'company-pays']
const oneOf = <T extends string>(v: unknown, allowed: T[]) =>
  typeof v === 'string' && (allowed as string[]).includes(v) ? (v as T) : undefined

/**
 * A count below the product's threshold is withheld, never rounded up or
 * estimated. Publishing "join 12 others" reads worse than publishing nothing,
 * and inventing a number is the one thing that would cost us the brand.
 */
export function publicState(product: ProductConfig, count: number, position?: number): WaitlistState {
  const { publicCountThreshold, foundingCohort } = product.waitlist
  return {
    productId: product.id,
    count,
    position,
    publicCount: count >= publicCountThreshold ? count : null,
    foundingCohort,
    foundingSeatsLeft: count < foundingCohort ? foundingCohort - count : 0,
    stage: product.stage,
  }
}

export async function handleJoin(product: ProductConfig, body: Record<string, unknown>, req: Request) {
  if (!product.waitlist.enabled) return { status: 404 as const, body: { error: 'No waitlist for this product' } }

  const email = clip(body.email, MAX.email)?.toLowerCase()
  if (!email || !EMAIL_RE.test(email)) return { status: 400 as const, body: { error: 'Valid email required' } }
  if (body.consent !== true) return { status: 400 as const, body: { error: 'Consent required' } }

  const position = await claimPosition(product.id, email)
  const url = new URL(req.url)
  const utm = Object.fromEntries(
    [...url.searchParams.entries()].filter(([k]) => k.startsWith('utm_')).slice(0, 8),
  )

  const signal: DemandSignal = {
    productId: product.id,
    email,
    name: clip(body.name, MAX.name),
    role: clip(body.role, MAX.name),
    pain: clip(body.pain, MAX.pain),
    urgency: oneOf(body.urgency, URGENCIES),
    priceBand: oneOf(body.priceBand, BANDS),
    alternative: clip(body.alternative, MAX.alternative),
    source: clip(body.source, MAX.source) ?? url.pathname,
    referrer: clip(req.headers.get('referer'), MAX.source),
    utm: Object.keys(utm).length ? utm : undefined,
    position,
    createdAt: new Date().toISOString(),
    consent: true,
  }

  await saveSignal(signal)
  await addToAudience(email, signal.name, product.id)

  const count = await getCount(product.id)
  return { status: 200 as const, body: publicState(product, count, position) }
}

export async function handleState(product: ProductConfig) {
  const count = await getCount(product.id)
  return { status: 200 as const, body: publicState(product, count) }
}
