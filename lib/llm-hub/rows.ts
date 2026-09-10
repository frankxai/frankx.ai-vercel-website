/**
 * Builds the serializable ModelRow[] consumed by the client Model Explorer
 * and the agent-facing /llm-hub.json endpoint. Pure — takes the live pricing
 * map as input so it can run in both server components and route handlers.
 */

import type { Capability } from './capabilities'
import { getEditorial } from './editorial'
import type { LivePricingMap } from './openrouter'
import { getProviders, type ModelEntry, type OrganizationEntry } from './registry'
import { hasOpenWeights, resolveModelPricing } from './pricing'

export interface ModelRow {
  id: string
  apiId: string | null
  identifierStatus: 'unverified_registry_identifier'
  capabilitySource: 'model_registry' | 'organization_inference' | 'unspecified'
  canonicalUrl: string
  openWeights: boolean
  sources: string[]
  pricing: ReturnType<typeof resolveModelPricing>
  evaluation: { status: string; measuredCases: number | null; productionReady: boolean | null }
  name: string
  org: string
  orgSlug: string
  accent: string
  released: string
  status: string
  contextTokens: number | null
  input: number | null
  output: number | null
  live: boolean
  modalities: string[]
  capabilities: Capability[]
  tagline?: string
  imagePricing?: ModelEntry['image_pricing']
  workflow?: ModelEntry['workflow']
}

export function buildModelRows(live: LivePricingMap = {}): ModelRow[] {
  const rows: ModelRow[] = []
  for (const { org, models } of getProviders()) {
    const o = org as OrganizationEntry
    for (const m of models) {
      // Image token prices are not comparable to the text-token calculator.
      const livePrice = m.image_pricing ? undefined : live[m.id]
      const pricing = resolveModelPricing(m, livePrice)
      rows.push({
        id: m.id,
        apiId: m.apiId ?? null,
        identifierStatus: 'unverified_registry_identifier',
        capabilitySource: m.capabilities?.length ? 'model_registry' : o.capability_focus?.length ? 'organization_inference' : 'unspecified',
        canonicalUrl: `https://www.frankx.ai/llm-hub/${m.id}`,
        openWeights: hasOpenWeights(m),
        sources: m.sources || [],
        pricing,
        evaluation: {
          status: m.evaluation?.status ?? 'not_attested_in_registry',
          measuredCases: m.evaluation?.measured_cases ?? null,
          productionReady: m.evaluation?.production_ready ?? null,
        },
        name: m.name,
        org: o.name,
        orgSlug: o.slug,
        accent: o.accent_color || '#a855f7',
        released: m.released || '',
        status: m.status || '',
        contextTokens: livePrice?.contextLength ?? m.context_window_beta ?? m.context_window ?? null,
        input: pricing.input,
        output: pricing.output,
        live: Boolean(livePrice),
        modalities: m.modalities || [],
        capabilities: ((m.capabilities && m.capabilities.length > 0)
          ? m.capabilities
          : o.capability_focus || []) as Capability[],
        tagline: getEditorial(m.id)?.tagline,
        imagePricing: m.image_pricing,
        workflow: m.workflow,
      })
    }
  }
  return rows
}
