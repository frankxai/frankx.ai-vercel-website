/**
 * Model routing for the Studio Crew chat.
 *
 * Default path routes through the Vercel AI Gateway using plain
 * "provider/model" strings — the same doctrine as lib/ai/gateway-client.ts.
 * The Gateway gives streaming, model fallback, and cost/latency observability
 * for free, and lets us swap models via env without touching code.
 *
 * BYOK path: when a visitor brings their own Google key (stored client-side in
 * localStorage, sent per-request via the x-studio-byok-key header), we call the
 * Google provider directly with that key — bypassing Frank's Gateway billing.
 * This is the one justified case for importing a provider package directly
 * (the Gateway can't use a third party's raw provider key).
 */

import { createGoogleGenerativeAI } from '@ai-sdk/google'
import type { Tier } from './usage'

// Gateway model strings (provider/model). Free tier = fast + cheap;
// signed-in / pro = frontier. Swap via env as new generations ship.
const FREE_MODEL = process.env.STUDIO_MODEL_FREE || 'google/gemini-2.5-flash'
const PRO_MODEL = process.env.STUDIO_MODEL_PRO || 'google/gemini-2.5-pro'

// BYOK uses the visitor's own Google key → bare Gemini model id (no Gateway prefix).
const BYOK_MODEL = process.env.STUDIO_MODEL_BYOK || 'gemini-2.5-pro'

/** The Gateway is wired by Vercel on deploy (or via `vercel env pull` locally). */
export function isGatewayAvailable(): boolean {
  return Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN)
}

export interface ModelChoice {
  modelId: string
  isPro: boolean
}

export function selectModelForTier(tier: Tier): ModelChoice {
  if (tier === 'anon') return { modelId: FREE_MODEL, isPro: false }
  // signedIn, pro, byok all get the frontier model.
  return { modelId: PRO_MODEL, isPro: true }
}

/**
 * Returns a model handle for streamText().
 *  - byokKey present → direct Google provider with the visitor's key.
 *  - otherwise       → a Gateway-routed "provider/model" string (AI SDK v6
 *                      resolves bare strings through the global Gateway).
 */
export function getLanguageModel(tier: Tier, byokKey?: string | null) {
  if (byokKey) {
    const provider = createGoogleGenerativeAI({ apiKey: byokKey })
    return provider(BYOK_MODEL)
  }
  return selectModelForTier(tier).modelId
}

export const STUDIO_MODELS = { FREE_MODEL, PRO_MODEL, BYOK_MODEL }
