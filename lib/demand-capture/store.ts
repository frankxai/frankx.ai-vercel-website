import type { DemandSignal } from './types.ts'

/**
 * Talks to Vercel KV and Resend over plain REST so this package installs into
 * any of the estate properties with zero new dependencies.
 */

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
const RESEND_KEY = process.env.RESEND_API_KEY
const RESEND_AUDIENCE = process.env.RESEND_AUDIENCE_ID

/**
 * A product promises its list "nothing from any other list". That only holds
 * with one audience per product, so RESEND_AUDIENCE_ID__<PRODUCT_ID> wins
 * over the shared RESEND_AUDIENCE_ID when it is set.
 */
const audienceFor = (productId: string) =>
  process.env['RESEND_AUDIENCE_ID__' + productId.toUpperCase().replace(/-/g, '_')] ?? RESEND_AUDIENCE

const key = (productId: string, suffix: string) => `waitlist:${productId}:${suffix}`

async function kv(command: unknown[]): Promise<unknown> {
  if (!KV_URL || !KV_TOKEN) throw new Error('KV not configured')
  const res = await fetch(KV_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`KV ${res.status}`)
  return (await res.json()).result
}

// One script so Redis runs the read, increment and write as a single step: two overlapping
// requests for the same email could otherwise both miss the HGET and both increment the count.
const CLAIM_POSITION = `
local existing = redis.call('HGET', KEYS[1], ARGV[1])
if existing then return existing end
local position = redis.call('INCR', KEYS[2])
redis.call('HSET', KEYS[1], ARGV[1], position)
return position`

/** Email is the identity, so a re-submit updates in place instead of double-counting. */
export async function claimPosition(productId: string, email: string): Promise<number> {
  const position = await kv(['eval', CLAIM_POSITION, '2', key(productId, 'positions'), key(productId, 'count'), email])
  return Number(position)
}

/**
 * The second form step and later re-submits only carry answers. Keep the first-touch facts
 * (where they came from, when, their position) and let new answers fill or replace old ones,
 * so a skipped field never erases an answer given earlier.
 */
export function mergeSignal(existing: DemandSignal | null, incoming: DemandSignal): DemandSignal {
  if (!existing) return incoming
  const answers = Object.fromEntries(
    (['name', 'role', 'pain', 'urgency', 'priceBand', 'alternative'] as const)
      .filter((field) => incoming[field] !== undefined)
      .map((field) => [field, incoming[field]]),
  )
  return { ...existing, ...answers, position: existing.position, consent: true }
}

export async function getSignal(productId: string, email: string): Promise<DemandSignal | null> {
  const raw = await kv(['hget', key(productId, 'signals'), email])
  return raw ? (JSON.parse(String(raw)) as DemandSignal) : null
}

export async function getCount(productId: string): Promise<number> {
  const raw = await kv(['get', key(productId, 'count')])
  return raw ? Number(raw) : 0
}

export async function saveSignal(signal: DemandSignal): Promise<void> {
  const merged = mergeSignal(await getSignal(signal.productId, signal.email), signal)
  await kv(['hset', key(signal.productId, 'signals'), signal.email, JSON.stringify(merged)])
}

export async function allSignals(productId: string): Promise<DemandSignal[]> {
  const raw = (await kv(['hgetall', key(productId, 'signals')])) as unknown[] | null
  if (!raw) return []
  const values = Array.isArray(raw) ? raw.filter((_, i) => i % 2 === 1) : Object.values(raw)
  return values.map((v) => JSON.parse(String(v)) as DemandSignal)
}

/** Non-fatal: a Resend outage must not cost us the signal we already stored. */
export async function addToAudience(email: string, name: string | undefined, productId: string) {
  const audience = audienceFor(productId)
  if (!RESEND_KEY || !audience) return
  try {
    const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        first_name: name?.split(' ')[0],
        unsubscribed: false,
        properties: { waitlist: productId },
      }),
    })
    if (!res.ok) {
      console.error(`demand-capture: audience sync ${res.status} for ${productId}: ${await res.text()}`)
    }
  } catch (err) {
    // The signal is already in KV. Nothing reconciles this later, so the failure must be visible
    // in the logs or it is lost.
    console.error(`demand-capture: audience sync failed for ${productId}`, err)
  }
}
