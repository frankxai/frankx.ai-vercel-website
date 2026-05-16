import type { Engagement } from './types'

/**
 * Work engagements registry.
 *
 * Add an engagement here only after:
 * 1. Client consent to public surface (or anonymized framing they ratified)
 * 2. Frank ratification of the substrate-provider / engagement positioning
 *
 * Private intake briefs (pre-public, pre-consent) live at:
 *   .frankx/private/work/requests/<client-slug>.md
 *
 * Workflow to register:
 *   1. Author the engagement file in this directory: <slug>.ts (default export)
 *   2. Import below and add to `registry`
 *   3. Confirm seo.title + seo.description ship the substrate-provider framing
 *   4. Move the private brief to `.frankx/private/work/archive/` for the record
 *
 * Trinity AI Coaching is currently in
 *   .frankx/private/work/requests/trinity-ai.md
 * until ratification of the substrate framing.
 *
 * See content/work/_examples/sample-template.ts for the schema shape.
 */
const registry: Record<string, Engagement> = {
  // [trinityAi.slug]: trinityAi, // pending ratification
}

export function getEngagement(slug: string): Engagement | undefined {
  return registry[slug]
}

export function listEngagements(): Engagement[] {
  return Object.values(registry)
}

export function listLive(): Engagement[] {
  return listEngagements().filter((e) => e.status === 'live')
}

export function listPast(): Engagement[] {
  return listEngagements().filter((e) => e.status === 'past')
}

/**
 * Helper for the hub — substrate-type engagements in any live state.
 * Surfaces sovereign-node framing on its own row.
 */
export function listLiveSubstrate(): Engagement[] {
  return listLive().filter((e) => e.engagementType === 'substrate')
}

/**
 * Helper for the hub — whitelabel + creator-build engagements in live state.
 */
export function listLiveWhitelabelOrCreator(): Engagement[] {
  return listLive().filter(
    (e) => e.engagementType === 'whitelabel' || e.engagementType === 'creator-build',
  )
}
