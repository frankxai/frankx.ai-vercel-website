// Production carries the Upstash integration's UPSTASH_REDIS_REST_* names, which
// @vercel/kv does not read on its own. Without this fallback every rate-limit
// call threw and the signup routes answered 503 to every real visitor.
export function redisRestConfig(env: Record<string, string | undefined> = process.env) {
  return {
    url: env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL || '',
    token: env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN || '',
  }
}
