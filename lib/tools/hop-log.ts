export type HopDevice = 'mobile' | 'desktop' | 'unknown'

export type HopEvent = {
  slug: string
  destination: string
  device: HopDevice
  sponsored: boolean
  at: string
  referrer: string | null
}

const HOPS_KEY = 'hops:events'

export async function recordHop(
  event: HopEvent,
  write: (event: HopEvent) => Promise<void> = writeHopToKv,
) {
  try {
    await write(event)
  } catch {
    /* A missed click is acceptable. A failed redirect is not. */
  }
}

export async function writeHopToKv(event: HopEvent, fetchImpl: typeof fetch = fetch) {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return
  const response = await fetchImpl(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['lpush', HOPS_KEY, JSON.stringify(event)]),
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`KV ${response.status}`)
}
