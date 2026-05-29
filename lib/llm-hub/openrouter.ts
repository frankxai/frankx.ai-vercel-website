/**
 * Live OpenRouter pricing enrichment.
 *
 * OpenRouter exposes a public, unauthenticated catalog at
 *   GET https://openrouter.ai/api/v1/models
 * with live per-token pricing for 300+ models. We use it to enrich our
 * curated registry with *live* economics — attributed, cached, and with
 * graceful degradation to static registry pricing if the API is unreachable.
 *
 * We never present this as our own measurement. The hub links back to
 * OpenRouter wherever live pricing is shown.
 */

import { MODEL_EDITORIAL } from './editorial'

const OPENROUTER_MODELS_URL = 'https://openrouter.ai/api/v1/models'

interface OpenRouterPricing {
  prompt?: string // USD per token, as string e.g. "0.000005"
  completion?: string
}

interface OpenRouterModel {
  id: string
  name?: string
  context_length?: number
  pricing?: OpenRouterPricing
  top_provider?: { max_completion_tokens?: number; context_length?: number }
}

export interface LivePricing {
  /** USD per 1M input tokens. */
  inputPer1m: number
  /** USD per 1M output tokens. */
  outputPer1m: number
  contextLength?: number
  source: 'openrouter'
  fetchedAt: string
}

/** Map of registry model id -> live pricing (when available). */
export type LivePricingMap = Record<string, LivePricing>

function toPer1m(perToken?: string): number | null {
  if (!perToken) return null
  const n = Number(perToken)
  if (!Number.isFinite(n) || n < 0) return null
  return Math.round(n * 1_000_000 * 100) / 100
}

/**
 * Fetch live pricing for every registry model that declares an openrouterId.
 * Returns an empty map (never throws) if the API is unreachable — callers
 * fall back to static registry pricing.
 */
export async function fetchLivePricing(): Promise<LivePricingMap> {
  // Build reverse lookup: openrouter slug -> registry id
  const slugToId: Record<string, string> = {}
  for (const [id, ed] of Object.entries(MODEL_EDITORIAL)) {
    if (ed.openrouterId) slugToId[ed.openrouterId] = id
  }
  if (Object.keys(slugToId).length === 0) return {}

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6000)
    const res = await fetch(OPENROUTER_MODELS_URL, {
      signal: controller.signal,
      // ISR: refresh hourly, matching the site's other external surfaces.
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    })
    clearTimeout(timeout)
    if (!res.ok) return {}

    const json = (await res.json()) as { data?: OpenRouterModel[] }
    const models = json.data ?? []
    const map: LivePricingMap = {}
    const fetchedAt = new Date().toISOString()

    for (const m of models) {
      const registryId = slugToId[m.id]
      if (!registryId) continue
      const input = toPer1m(m.pricing?.prompt)
      const output = toPer1m(m.pricing?.completion)
      if (input === null || output === null) continue
      map[registryId] = {
        inputPer1m: input,
        outputPer1m: output,
        contextLength: m.context_length ?? m.top_provider?.context_length,
        source: 'openrouter',
        fetchedAt,
      }
    }
    return map
  } catch {
    // Network restricted / API down / timeout — degrade gracefully.
    return {}
  }
}
