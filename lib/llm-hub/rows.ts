/**
 * Builds the serializable ModelRow[] consumed by the client Model Explorer
 * and the agent-facing /llm-hub.json endpoint. Pure — takes the live pricing
 * map as input so it can run in both server components and route handlers.
 */

import type { Capability } from './capabilities'
import { getEditorial } from './editorial'
import type { LivePricingMap } from './openrouter'
import { getProviders, type ModelEntry, type OrganizationEntry } from './registry'

export interface ModelRow {
  id: string
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
}

function staticInput(m: ModelEntry): number | null {
  const v = m.pricing?.input_per_1m
  return typeof v === 'number' ? v : null
}
function staticOutput(m: ModelEntry): number | null {
  const v = m.pricing?.output_per_1m
  return typeof v === 'number' ? v : null
}

export function buildModelRows(live: LivePricingMap = {}): ModelRow[] {
  const rows: ModelRow[] = []
  for (const { org, models } of getProviders()) {
    const o = org as OrganizationEntry
    for (const m of models) {
      const livePrice = live[m.id]
      rows.push({
        id: m.id,
        name: m.name,
        org: o.name,
        orgSlug: o.slug,
        accent: o.accent_color || '#a855f7',
        released: m.released || '',
        status: m.status || '',
        contextTokens: livePrice?.contextLength ?? m.context_window_beta ?? m.context_window ?? null,
        input: livePrice?.inputPer1m ?? staticInput(m),
        output: livePrice?.outputPer1m ?? staticOutput(m),
        live: Boolean(livePrice),
        modalities: m.modalities || [],
        capabilities: (o.capability_focus || []) as Capability[],
        tagline: getEditorial(m.id)?.tagline,
      })
    }
  }
  return rows
}
