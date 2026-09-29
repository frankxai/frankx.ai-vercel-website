// Per-instance sliding window used only while the shared Redis limiter is
// unreachable. It is weaker than the shared limiter (each serverless instance
// counts on its own) but keeps signups working instead of refusing them all.
const MAX_TRACKED_KEYS = 10_000

export function createLocalLimiter(max: number, windowMs: number, now: () => number = Date.now) {
  const hits = new Map<string, number[]>()
  return function allow(key: string): boolean {
    const t = now()
    const recent = (hits.get(key) ?? []).filter(stamp => t - stamp < windowMs)
    if (recent.length >= max) {
      hits.set(key, recent)
      return false
    }
    recent.push(t)
    hits.delete(key)
    hits.set(key, recent)
    if (hits.size > MAX_TRACKED_KEYS) hits.delete(hits.keys().next().value as string)
    return true
  }
}
