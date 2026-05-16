/**
 * Work engagements schema.
 *
 * Three tiers per engagement.status:
 * - 'live'    — actively building / coaching / supporting (public hub card)
 * - 'past'    — shipped + done (public hub card + case study)
 * - 'private' — under NDA or operator-only (NOT rendered on public hub)
 *
 * engagementType differentiates the shape:
 * - 'substrate'      — Frank builds open-source substrate, client builds business on top (e.g., Trinity AI Coaching). Sovereign-node framing.
 * - 'whitelabel'     — Frank's tech under client's brand
 * - 'consulting'     — Specific deliverable engagement, Frank's brand visible
 * - 'creator-build'  — Single-creator hub/site build
 * - 'advisory'       — Strategic guidance, retainer-style, no IP build
 */

export type EngagementStatus = 'live' | 'past' | 'private'

export type EngagementType =
  | 'substrate'
  | 'whitelabel'
  | 'consulting'
  | 'creator-build'
  | 'advisory'

export type EngagementAccent = 'tech' | 'soul' | 'bridge'

export type ShippedItem = {
  label: string
  detail: string
  /** Public artifact link when permission granted (open-source repo, public page, etc.). */
  url?: string
}

export type StackItem = {
  category:
    | 'agent-harness'
    | 'cloud'
    | 'frontend'
    | 'models'
    | 'data'
    | 'substrate'
  /** Tool / framework / substrate names. Plain strings, no marketing copy. */
  items: string[]
}

export type Engagement = {
  slug: string
  /** Public name (or anonymized label if private — e.g., "Boutique coaching company"). */
  name: string
  /** Client display name (or anonymized form when NDA partial). */
  client: string
  engagementType: EngagementType
  status: EngagementStatus
  ndaStatus: 'public' | 'partial' | 'private'

  // Hero
  /** Frank's role on the engagement (e.g., "Substrate provider"). */
  title: string
  /** One peer-architect sentence — the hero statement. */
  tagline: string
  /** Optional second line with context. */
  subTagline?: string

  /**
   * Substrate-specific positioning. Renders SubstratePositioningStrip
   * when engagementType === 'substrate'. Example:
   * "Not employee. Not on the deck. Substrate provider."
   */
  substratePositioning?: string

  // Body
  /** ~150 words. Sets up the engagement — context, not pitch. */
  contextWindow: string
  /** 3–6 verifiable items the engagement has shipped. */
  shipped: ShippedItem[]
  /** 3–5 categories of stack used on this engagement. */
  stack: StackItem[]
  /** 100–200 words. What the engagement produced, in operator terms. */
  outcome: string

  // Anti-positioning — what this engagement is NOT
  whatThisIsNot: string[]

  // CTA
  cta: { label: string; href: string }

  // Visual
  clientLogoUrl?: string
  accent?: EngagementAccent
  ogImagePath?: string

  // SEO
  seo: { title: string; description: string }
}
