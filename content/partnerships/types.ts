/**
 * Partnerships content schema.
 *
 * Two-tier model per partner:
 * - Tier 1: working reality (verifiable today, top of page)
 * - Tier 2: proposal (clearly labeled, bottom of page)
 *
 * See docs/superpowers/specs/2026-05-07-partnerships-arrow-design.md
 * for content rules, tone-correction patches, and the public/private split.
 */

export type PartnerStatus =
  | 'active'
  | 'strategic-alignment'
  | 'in-conversation'
  | 'placeholder'

export type PartnerTier =
  | 'distribution'
  | 'cloud'
  | 'model-provider'
  | 'tooling'
  | 'silicon'

export type PartnerAccent = 'tech' | 'soul' | 'bridge'

export type WorkingRealityBlock = {
  label: string
  detail: string
  evidence?: { label: string; href: string }
}

export type ValueBlock = {
  title: string
  body: string
  metric?: string
}

export type ProofPoint = {
  label: string
  href: string
  metric?: string
}

export type Program = {
  number: 1 | 2 | 3 | 4 | 5 | 6
  name: string
  cadence: string
  whatItIs: string
  whatItProduces: string[]
  pricingPosture: string
}

export type CompoundingNode = {
  month: 0 | 3 | 6 | 12
  title: string
  body: string
}

export type CrossLinkSurface =
  | 'ai-coe'
  | 'ai-architecture'
  | 'ai-architect-academy'
  | 'research'
  | 'workshops'
  | 'blog'
  | 'os'
  | 'learn-gemini'
  | 'learn-claude'
  | 'connect'

export type CrossLink = {
  surface: CrossLinkSurface
  label: string
  href: string
  rationale: string
}

export type Partner = {
  slug: string
  name: string
  shortName: string
  tier: PartnerTier
  status: PartnerStatus

  // Hero
  title: string
  tagline: string
  subTagline: string

  // Tier 1 — working reality (top of page)
  contextWindow: string
  workingReality: WorkingRealityBlock[]
  proofPoints: ProofPoint[]

  // Tier 2 — proposal (bottom of page, labeled)
  proposalIntro: string
  asymmetricValue: ValueBlock[]
  programs: Program[]
  compoundingModel: CompoundingNode[]
  crossLinks: CrossLink[]
  whatThisIsNot: string[]
  cta: { label: string; href: string }

  /**
   * Optional program-pursuit status (for strategic-alignment tier).
   * Examples: 'Vercel Partner Program — application in flight',
   * 'NVIDIA Inception nominee pathway', 'Anthropic Claude for Work — pursuing'.
   * Rendered as a quiet status badge on the hub card.
   */
  programStatus?: string

  /**
   * Optional one-line dispatch from where this partner page is authored.
   * Used by SovereignNodeBand on the hub when set on the operator profile.
   */
  operatesFrom?: string

  /**
   * For strategic-alignment tier — explicit list of touchpoints already
   * shared with the partner today. Renders as "What we already share today"
   * section between hero and working-reality, biased toward conversion via
   * factual already-true reciprocal alignment.
   */
  alreadyShared?: string[]
  /**
   * For strategic-alignment tier — closing band before CTA. Articulates that
   * the work is in motion and only the formal program lane remains.
   */
  formalizationAsk?: string

  // Visual
  partnerLogoUrl?: string
  accent?: PartnerAccent
  ogImagePath?: string
  /**
   * Optional infographic that summarises the partnership shape — embedded
   * between the proposal divider and the asymmetric-value grid. Should be
   * 1200x630 or similar, 16:9-ish aspect, SVG preferred for crispness.
   */
  visualSummaryUrl?: string
  visualSummaryAlt?: string

  // SEO
  seo: { title: string; description: string }
}
