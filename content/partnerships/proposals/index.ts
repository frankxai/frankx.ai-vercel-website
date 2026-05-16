import type { PartnerProposal } from './types'
import { anthropic2026q2 } from './anthropic-2026q2'

/**
 * Unlisted proposal registry.
 *
 * Each entry corresponds to one /partnerships/proposal/<slug> route.
 * These routes are NOT in sitemap.ts, ARE disallowed in robots.ts, and
 * carry noindex metadata via the segment layout. The URL is shared by
 * Frank directly with the recipient — never linked from public surfaces.
 *
 * Add a new proposal: drop a config file in this directory, import +
 * register here. No layout code needs to change.
 */
const registry: Record<string, PartnerProposal> = {
  [anthropic2026q2.slug]: anthropic2026q2,
}

export function getProposal(slug: string): PartnerProposal | undefined {
  return registry[slug]
}

export function listProposals(): PartnerProposal[] {
  return Object.values(registry)
}
