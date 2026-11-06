import type { DemandSignal, PriceBand, Stage, Urgency, WaitlistState } from './types.ts'
import { addToAudience, claimPosition, getCount, getSignal, saveSignal } from './store.ts'

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

const MAX_UTM = 8

/**
 * UTM from the request URL (a direct link to the API) and from the body (the form forwards
 * the landing page's params, because the API never sees that URL). The URL wins on a clash.
 * Only utm_* keys with string values, each clipped, at most eight.
 */
export function readUtm(url: URL, bodyUtm: unknown): Record<string, string> | undefined {
  const fromBody =
    bodyUtm && typeof bodyUtm === 'object' && !Array.isArray(bodyUtm) ? Object.entries(bodyUtm) : []
  const merged = new Map<string, string>()
  for (const [k, v] of [...fromBody, ...url.searchParams.entries()]) {
    if (!k.startsWith('utm_') || k.length > 40) continue
    const value = clip(v, MAX.source)
    if (value) merged.set(k, value)
  }
  const entries = [...merged.entries()].slice(0, MAX_UTM)
  return entries.length ? Object.fromEntries(entries) : undefined
}

function readEmail(body: Record<string, unknown>) {
  const email = clip(body.email, MAX.email)?.toLowerCase()
  return email && EMAIL_RE.test(email) ? email : undefined
}

export async function handleJoin(product: ProductConfig, body: Record<string, unknown>, req: Request) {
  if (!product.waitlist.enabled) return { status: 404 as const, body: { error: 'No waitlist for this product' } }

  const email = readEmail(body)
  if (!email) return { status: 400 as const, body: { error: 'Valid email required' } }
  if (body.consent !== true) return { status: 400 as const, body: { error: 'Consent required' } }

  const position = await claimPosition(product.id, email)
  const url = new URL(req.url)
  const utm = readUtm(url, body.utm)

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
    utm,
    position,
    createdAt: new Date().toISOString(),
    consent: true,
  }

  await saveSignal(signal)
  await addToAudience(email, signal.name, product.id)

  const count = await getCount(product.id)
  return { status: 200 as const, body: publicState(product, count, position) }
}

/**
 * Step 2. Adds answers to a signal step 1 already stored. It never claims a position, never
 * touches the count and never calls Resend, so it cannot be used to join without the join
 * step's rate limit, and a finished two-step signup adds the contact once.
 */
export async function handleRefine(product: ProductConfig, body: Record<string, unknown>) {
  if (!product.waitlist.enabled) return { status: 404 as const, body: { error: 'No waitlist for this product' } }

  const email = readEmail(body)
  if (!email) return { status: 400 as const, body: { error: 'Valid email required' } }

  const existing = await getSignal(product.id, email)
  if (!existing) return { status: 404 as const, body: { error: 'Join the list first.' } }

  await saveSignal({
    ...existing,
    name: clip(body.name, MAX.name),
    role: clip(body.role, MAX.name),
    pain: clip(body.pain, MAX.pain),
    urgency: oneOf(body.urgency, URGENCIES),
    priceBand: oneOf(body.priceBand, BANDS),
    alternative: clip(body.alternative, MAX.alternative),
  })

  const count = await getCount(product.id)
  return { status: 200 as const, body: publicState(product, count, existing.position) }
}

export async function handleState(product: ProductConfig) {
  const count = await getCount(product.id)
  return { status: 200 as const, body: publicState(product, count) }
}
