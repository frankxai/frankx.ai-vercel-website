/**
 * Model routing for the hosted investment-intelligence council.
 *
 * Maps the catalog's `recommended_model` ids to Vercel AI Gateway
 * `"provider/model"` strings (per lib/ai/gateway-client.ts convention — plain
 * strings, no @ai-sdk/anthropic import). Per-agent override via
 * `SWARM_MODEL_<AGENT_ID_UPPER_SNAKE>` env, per the IIS AI-engineering spec.
 *
 * Pricing (USD per 1M tokens, verified 2026-07) powers the pre-flight cost gate
 * and post-run accounting.
 */

export type CatalogModel =
  | 'claude-sonnet-4-6'
  | 'claude-opus-4-7'
  | 'claude-haiku-4-5'

const GATEWAY_STRING: Record<CatalogModel, string> = {
  'claude-sonnet-4-6': 'anthropic/claude-sonnet-4-6',
  'claude-opus-4-7': 'anthropic/claude-opus-4-7',
  'claude-haiku-4-5': 'anthropic/claude-haiku-4-5',
}

/** USD per 1M tokens: [input, output]. */
export const PRICING: Record<CatalogModel, { input: number; output: number }> = {
  'claude-sonnet-4-6': { input: 3, output: 15 },
  'claude-opus-4-7': { input: 5, output: 25 },
  'claude-haiku-4-5': { input: 1, output: 5 },
}

const DEFAULT_MODEL: CatalogModel = 'claude-sonnet-4-6'

function envOverride(agentId: string): string | undefined {
  const key = `SWARM_MODEL_${agentId.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}`
  const v = process.env[key]
  return v && v.length > 0 ? v : undefined
}

/** The gateway model string for an agent (env override wins). */
export function gatewayModelFor(agentId: string, recommended?: string): string {
  const override = envOverride(agentId)
  if (override) return override
  const model = (recommended as CatalogModel) ?? DEFAULT_MODEL
  return GATEWAY_STRING[model] ?? GATEWAY_STRING[DEFAULT_MODEL]
}

/** Pricing for an agent's model (falls back to the default tier). */
export function pricingFor(recommended?: string): { input: number; output: number } {
  const model = (recommended as CatalogModel) ?? DEFAULT_MODEL
  return PRICING[model] ?? PRICING[DEFAULT_MODEL]
}

/** USD cost of a completed call given token usage. */
export function usdOf(
  recommended: string | undefined,
  usage: { inputTokens?: number; outputTokens?: number },
): number {
  const p = pricingFor(recommended)
  const inTok = usage.inputTokens ?? 0
  const outTok = usage.outputTokens ?? 0
  return (inTok / 1_000_000) * p.input + (outTok / 1_000_000) * p.output
}
