import type { DemandSignal } from './types.ts'

/**
 * Talks to Vercel KV and Resend over plain REST so this package installs into
 * any of the estate properties with zero new dependencies.
 */

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
const RESEND_KEY = process.env.RESEND_API_KEY

/**
 * The consent line promises the address stays with this list, which only holds with one
 * audience per product. There is deliberately no fallback to the shared RESEND_AUDIENCE_ID
 * (the newsletter): with no RESEND_AUDIENCE_ID__<PRODUCT_ID> set, the signal stays in KV only.
 * Same rule as #1018.
 */
const audienceFor = (productId: string) =>
  process.env['RESEND_AUDIENCE_ID__' + productId.toUpperCase().replace(/-/g, '_')] || undefined

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
  // Upstash answers a refused database (quota, rate limit, suspended) with HTTP 200 and a
  // single { error } object; see lib/redis-client.ts. Treating that as success would tell a
  // visitor they are on the list when nothing was written.
  const body = (await res.json()) as { result?: unknown; error?: unknown }
  if (body && typeof body === 'object' && 'error' in body && body.error) {
    throw new Error(`KV error: ${String(body.error)}`)
  }
  return body.result
}

// One script so Redis claims the position, bumps the count and writes the first signal as a
// single step. Two overlapping requests cannot both increment, and a signup can never be
// counted (or take a founding seat) without its signal: either all three land or none do.
// The signal arrives as JSON whose first key is "position":-1; the script splices the real
// position over that fixed prefix, so no JSON parsing runs inside Redis.
const PLACEHOLDER = '{"position":-1'
const CLAIM_WITH_SIGNAL = `
local position = redis.call('HGET', KEYS[1], ARGV[1])
local created = 0
if not position then
  position = redis.call('INCR', KEYS[2])
  redis.call('HSET', KEYS[1], ARGV[1], position)
  created = 1
end
if redis.call('HEXISTS', KEYS[3], ARGV[1]) == 0 then
  redis.call('HSET', KEYS[3], ARGV[1], '{"position":' .. position .. string.sub(ARGV[2], ${PLACEHOLDER.length + 1}))
end
return {tonumber(position), created}`

/**
 * Email is the identity, so a re-submit updates in place instead of double-counting.
 * `created` is false when the address already held a position; the caller then merges.
 */
export async function claimWithSignal(
  signal: Omit<DemandSignal, 'position'> & { position?: number },
): Promise<{ position: number; created: boolean }> {
  const { position: _ignored, ...rest } = signal
  const json = JSON.stringify({ position: -1, ...rest })
  if (!json.startsWith(PLACEHOLDER + ',')) throw new Error('signal JSON must start with the position placeholder')
  const out = (await kv([
    'eval',
    CLAIM_WITH_SIGNAL,
    '3',
    key(signal.productId, 'positions'),
    key(signal.productId, 'count'),
    key(signal.productId, 'signals'),
    signal.email,
    json,
  ])) as unknown
  const [position, created] = Array.isArray(out) ? out : [out, 0]
  return { position: Number(position), created: Number(created) === 1 }
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

// Compare-and-set: write only if the stored JSON is still the one the merge started from
// ('' meaning absent). Two overlapping saves for one address then cannot both win with stale
// reads; the loser re-reads and merges again.
const SAVE_IF_UNCHANGED = `
local current = redis.call('HGET', KEYS[1], ARGV[1]) or ''
if current ~= ARGV[2] then return 0 end
redis.call('HSET', KEYS[1], ARGV[1], ARGV[3])
return 1`

const SAVE_ATTEMPTS = 5

export async function saveSignal(signal: DemandSignal): Promise<void> {
  const signalsKey = key(signal.productId, 'signals')
  for (let attempt = 0; attempt < SAVE_ATTEMPTS; attempt++) {
    const raw = await kv(['hget', signalsKey, signal.email])
    const before = raw ? String(raw) : ''
    const merged = mergeSignal(before ? (JSON.parse(before) as DemandSignal) : null, signal)
    const written = await kv(['eval', SAVE_IF_UNCHANGED, '1', signalsKey, signal.email, before, JSON.stringify(merged)])
    if (Number(written) === 1) return
  }
  throw new Error('KV: signal kept changing during save')
}

/** SET NX: true the first time a marker is taken, false after. Kept for a year. */
export async function claimOnce(productId: string, marker: string): Promise<boolean> {
  return (await kv(['SET', key(productId, marker), '1', 'NX', 'EX', '31536000'])) === 'OK'
}

export async function hasMarker(productId: string, marker: string): Promise<boolean> {
  return (await kv(['GET', key(productId, marker)])) !== null
}

export async function releaseOnce(productId: string, marker: string): Promise<void> {
  await kv(['DEL', key(productId, marker)])
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
