import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'
import type { DemandSignal, PriceBand, Stage, Urgency, WaitlistState } from './types.ts'
import { addToAudience, claimWithSignal, getCount, getSignal, saveSignal } from './store.ts'

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

// Reject an over-long address rather than clipping it: clipping can turn it into a different
// address that still passes the pattern. Same rule as app/api/subscribe and app/api/newsletter.
function readEmail(body: Record<string, unknown>) {
  if (typeof body.email !== 'string') return undefined
  const email = body.email.trim().toLowerCase()
  return email.length <= MAX.email && EMAIL_RE.test(email) ? email : undefined
}

/**
 * Changing a stored signal needs proof of the signup that created it. A new join gets a random
 * token, returned once; only its SHA-256 is stored. Refine must present the token. The token is
 * never reissued for an address already on the list, because the join step cannot verify that
 * the caller owns that address.
 */
const TOKEN_BYTES = 32
const MAX_TOKEN_LENGTH = 128
export const REFINE_FORBIDDEN = 'This signup cannot be changed from here.'

const hashToken = (token: string) => createHash('sha256').update(token, 'utf8').digest('hex')

export function newEditToken(): { token: string; hash: string } {
  const token = randomBytes(TOKEN_BYTES).toString('base64url')
  return { token, hash: hashToken(token) }
}

export function tokenMatches(token: unknown, storedHash: unknown): boolean {
  if (typeof token !== 'string' || !token || token.length > MAX_TOKEN_LENGTH) return false
  if (typeof storedHash !== 'string' || !/^[0-9a-f]{64}$/.test(storedHash)) return false
  return timingSafeEqual(Buffer.from(hashToken(token), 'hex'), Buffer.from(storedHash, 'hex'))
}

export async function handleJoin(product: ProductConfig, body: Record<string, unknown>, req: Request) {
  if (!product.waitlist.enabled) return { status: 404 as const, body: { error: 'No waitlist for this product' } }

  const email = readEmail(body)
  if (!email) return { status: 400 as const, body: { error: 'Valid email required' } }
  if (body.consent !== true) return { status: 400 as const, body: { error: 'Consent required' } }

  const url = new URL(req.url)
  const utm = readUtm(url, body.utm)

  const edit = newEditToken()
  const signal: Omit<DemandSignal, 'position'> = {
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
    createdAt: new Date().toISOString(),
    consent: true,
    editTokenHash: edit.hash,
  }

  // A first join is whole after this one call. A repeat join for an address already on the list
  // changes nothing: anyone can type someone else's address, so it must not overwrite answers,
  // re-subscribe a contact or hand out an editing token. It gets the same success shape, minus
  // the token, so the reply does not confirm whether the address was new.
  const { position, created } = await claimWithSignal(signal)
  if (created) await addToAudience(email, signal.name, product.id)

  const count = await getCount(product.id)
  const state = publicState(product, count, position)
  return { status: 200 as const, body: created ? { ...state, editToken: edit.token } : state }
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

  // Unknown address, missing or wrong token, and a legacy record with no token hash all get the
  // same 403, so the reply does not reveal who is on the list.
  const forbidden = { status: 403 as const, body: { error: REFINE_FORBIDDEN } }
  if (typeof body.editToken !== 'string' || !body.editToken) return forbidden
  const existing = await getSignal(product.id, email)
  if (!existing || !tokenMatches(body.editToken, existing.editTokenHash)) return forbidden

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
