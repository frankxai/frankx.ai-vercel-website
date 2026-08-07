/**
 * Hosted mirror of the investment-intelligence agent catalog.
 *
 * Source of truth: Starlight-Intelligence-System/verticals/investment-intelligence/
 * engine/agents/catalog.json. `catalog.json` here is a generated mirror (see its
 * `source_sha`) with the cross-cutting `researcher` excluded from the hosted
 * roster. Do NOT hand-edit — port changes from SIS and regenerate.
 */

import raw from './catalog.json'

export type CouncilLayer = 'analysis' | 'risk' | 'synthesis'

export interface CatalogAgent {
  id: string
  layer: CouncilLayer
  domain: string
  persona: string
  system_prompt_summary: string
  output_schema: string[]
  recommended_model?: string
}

export interface HostedCatalog {
  team: string
  source_sha: string
  agents: CatalogAgent[]
}

export const catalog: HostedCatalog = raw as HostedCatalog

export function agentsByLayer(layer: CouncilLayer): CatalogAgent[] {
  return catalog.agents.filter((a) => a.layer === layer)
}
