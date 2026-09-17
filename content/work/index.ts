import type { Engagement, PublicEngagement } from './types'

/**
 * Work engagements registry.
 *
 * Add a live or past engagement here only after:
 * 1. Client consent to public surface (or anonymized framing they ratified)
 * 2. Frank ratification of the substrate-provider / engagement positioning
 *
 * A draft may be registered for build review only when it contains no private
 * client material. Draft and private statuses are fail-closed by the public
 * route policy below.
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

/**
 * Publication is an allowlist. Adding another lifecycle status must never make
 * an engagement public by accident.
 */
export function isPublicEngagement(
  engagement: Engagement,
): engagement is PublicEngagement {
  return engagement.status === 'live' || engagement.status === 'past'
}

export function findPublicEngagement(
  engagements: readonly Engagement[],
  slug: string,
): PublicEngagement | undefined {
  const engagement = engagements.find((candidate) => candidate.slug === slug)
  return engagement && isPublicEngagement(engagement) ? engagement : undefined
}

export function getPublicEngagement(
  slug: string,
): PublicEngagement | undefined {
  return findPublicEngagement(listEngagements(), slug)
}

export function listPublicEngagements(
  engagements: readonly Engagement[] = listEngagements(),
): PublicEngagement[] {
  return engagements.filter(isPublicEngagement)
}

export function listLive(): PublicEngagement[] {
  return listPublicEngagements().filter(
    (engagement) => engagement.status === 'live',
  )
}

export function listPast(): PublicEngagement[] {
  return listPublicEngagements().filter(
    (engagement) => engagement.status === 'past',
  )
}

/**
 * Helper for the hub — substrate-type engagements in any live state.
 * Surfaces sovereign-node framing on its own row.
 */
export function listLiveSubstrate(): PublicEngagement[] {
  return listLive().filter((e) => e.engagementType === 'substrate')
}

/**
 * Helper for the hub — whitelabel + creator-build engagements in live state.
 */
export function listLiveWhitelabelOrCreator(): PublicEngagement[] {
  return listLive().filter(
    (e) =>
      e.engagementType === 'whitelabel' ||
      e.engagementType === 'creator-build',
  )
}
