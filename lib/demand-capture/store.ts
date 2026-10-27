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

/** Email is the identity, so a re-submit updates in place instead of double-counting. */
export async function claimPosition(productId: string, email: string): Promise<number> {
  const existing = await kv(['hget', key(productId, 'positions'), email])
  if (existing) return Number(existing)
  const position = Number(await kv(['incr', key(productId, 'count')]))
  await kv(['hset', key(productId, 'positions'), email, String(position)])
  return position
}

export async function getCount(productId: string): Promise<number> {
  const raw = await kv(['get', key(productId, 'count')])
  return raw ? Number(raw) : 0
}

export async function saveSignal(signal: DemandSignal): Promise<void> {
  await kv(['hset', key(signal.productId, 'signals'), signal.email, JSON.stringify(signal)])
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
