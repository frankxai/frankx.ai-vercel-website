/**
 * Gemini provider factory for the Studio Crew chat.
 *
 * Tier → model mapping is env-driven so we can swap models without code changes
 * (e.g. promote Gemini 3.5 Pro → next flagship, or fall back to Flash on cost spikes).
 *
 * BYOK path: instantiates a per-request provider with the visitor's own key.
 * Default path: uses GOOGLE_GENERATIVE_AI_API_KEY from server env.
 */

import { createGoogleGenerativeAI, google as defaultGoogle } from '@ai-sdk/google'
import type { Tier } from './usage'

const PRO_MODEL = process.env.AI_MODEL_PRO || 'gemini-2.5-pro'
const FREE_MODEL = process.env.AI_MODEL_FREE || 'gemini-2.5-flash'

export interface ModelChoice {
  modelId: string
  isPro: boolean
}

export function selectModelForTier(tier: Tier): ModelChoice {
  if (tier === 'pro' || tier === 'byok') {
    return { modelId: PRO_MODEL, isPro: true }
  }
  if (tier === 'signedIn') {
    return { modelId: PRO_MODEL, isPro: true }
  }
  return { modelId: FREE_MODEL, isPro: false }
}

/**
 * Returns a configured language model for a given tier and (optional) BYOK key.
 * When byokKey is provided, a fresh per-request provider is built so we never
 * mix keys across requests.
 */
export function getLanguageModel(tier: Tier, byokKey?: string | null) {
  const { modelId } = selectModelForTier(tier)

  if (byokKey) {
    const provider = createGoogleGenerativeAI({ apiKey: byokKey })
    return provider(modelId)
  }

  return defaultGoogle(modelId)
}

export const STUDIO_MODELS = {
  PRO_MODEL,
  FREE_MODEL,
}
