import type { PortalPartner } from './types'
import { estefania } from './estefania'
import { ahmad } from './ahmad'
import { jojo } from './jojo'
import { arrow } from './arrow'
import { anthropic } from './anthropic'

/**
 * The full Partner Portal registry.
 *
 * Add a new partner: drop a config file in this directory satisfying
 * `PortalPartner` (content/portal/types.ts), import + register here. No
 * layout code needs to change — mirrors content/partnerships/index.ts.
 */
const registry: Record<string, PortalPartner> = {
  [estefania.slug]: estefania,
  [ahmad.slug]: ahmad,
  [jojo.slug]: jojo,
  [arrow.slug]: arrow,
  [anthropic.slug]: anthropic,
}

export function getPortalPartner(slug: string): PortalPartner | undefined {
  return registry[slug]
}

export function getAllPortalPartners(): PortalPartner[] {
  return Object.values(registry)
}

export function getAllPortalSlugs(): string[] {
  return Object.keys(registry)
}

export function getPublishedPortalPartners(): PortalPartner[] {
  return getAllPortalPartners().filter((p) => p.status !== 'draft')
}
