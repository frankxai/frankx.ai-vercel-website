import type { ModelEntry } from './registry'
import type { LivePricing } from './openrouter'

/** The legacy registry encodes weight availability as 0/0, not an API offer. */
export function hasOpenWeights(model: ModelEntry): boolean {
  return model.open_weights === true ||
    (model.pricing?.input_per_1m === 0 && model.pricing?.output_per_1m === 0)
}

function price(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null
}

export function resolveModelPricing(model: ModelEntry, live?: LivePricing) {
  if (model.image_pricing) {
    return {
      input: null,
      output: null,
      currency: 'USD' as const,
      unit: 'per_million_tokens' as const,
      source: 'unknown' as const,
      sourceUrl: null,
      observedAt: null,
      verifiedAt: null,
      scope: 'Modality-specific token rates are in imagePricing. Generic text-token estimates do not apply; include image input, output, cache and retries.',
    }
  }
  const weightsOnly = model.pricing?.input_per_1m === 0 && model.pricing?.output_per_1m === 0
  const input = live ? price(live.inputPer1m) : weightsOnly ? null : price(model.pricing?.input_per_1m)
  const output = live ? price(live.outputPer1m) : weightsOnly ? null : price(model.pricing?.output_per_1m)
  return {
    input,
    output,
    currency: 'USD' as const,
    unit: 'per_million_tokens' as const,
    source: live ? 'openrouter' as const : input !== null || output !== null ? 'registry' as const : 'unknown' as const,
    sourceUrl: live ? 'https://openrouter.ai/api/v1/models' : null,
    // An HTTP response date survives the upstream cache; request time does not prove freshness.
    observedAt: live?.fetchedAt ?? null,
    verifiedAt: !live && typeof model.pricing?.verified_at === 'string' ? model.pricing.verified_at : null,
    scope: live
      ? 'OpenRouter catalog base token rates. Endpoint, context tier, tools, cache and retry charges may differ.'
      : weightsOnly
        ? 'Weights are listed in the registry. Hosted inference and self-hosting costs are unknown.'
        : typeof model.pricing?.scope === 'string'
          ? model.pricing.scope
          : 'Registry token rates; processing tier and verification date may be unspecified. Check the source before budgeting.',
  }
}

export function tokenCost(input: number | null, output: number | null, inputM: number, outputM: number): number | null {
  if (input === null || output === null || ![input, output, inputM, outputM].every(v => Number.isFinite(v) && v >= 0)) return null
  return input * inputM + output * outputM
}
