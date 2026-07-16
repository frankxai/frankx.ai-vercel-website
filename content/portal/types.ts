/**
 * Partner Portal content schema.
 *
 * Unifies the /allies relationship model with the /partnerships registry
 * pattern, adding a project plan, a year plan, and a curated recommendation
 * set that deep-links into the real content surfaces (research, library,
 * blog, products, downloads) instead of duplicating them.
 *
 * Economics (affiliate splits, private-repo revenue) are NOT modeled here —
 * they live in docs/strategy/PARTNER_PORTAL_ECONOMICS.md (private, not
 * synced to prod). This schema only carries the public, value-framed
 * `sharedUpside`.
 */

export type PortalRelationship = 'friend' | 'ally' | 'partner' | 'enterprise'

export type PortalStatus = 'active' | 'building' | 'draft'

export type PortalAccent = 'tech' | 'soul' | 'bridge'

export type ProvidesItem = {
  title: string
  detail: string
}

export type ProjectPlanPhase = {
  phase: string
  window: string
  outcome: string
  status: 'done' | 'in-progress' | 'next'
}

export type YearPlanQuarter = {
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4'
  theme: string
  milestones: string[]
}

export type RecommendationKind =
  | 'research'
  | 'library'
  | 'blog'
  | 'download'
  | 'product'

export type Recommendation = {
  kind: RecommendationKind
  /** Slug/id in the source registry (lib/research/domains.ts, data/book-reviews.ts, etc). */
  slug: string
  /** Why this is recommended to this specific partner — one sentence. */
  why: string
}

export type CompoundingNode = {
  month: 0 | 3 | 6 | 12
  title: string
  body: string
}

export type TeamMember = {
  role: string
  howFrankHelps: string
}

export type PortalCrossLinkSurface =
  | 'ai-coe'
  | 'ai-architecture'
  | 'ai-architect-academy'
  | 'research'
  | 'downloads'
  | 'library'
  | 'blog'

export type PortalCrossLink = {
  surface: PortalCrossLinkSurface
  label: string
  href: string
  rationale: string
}

export type PortalPartner = {
  slug: string
  name: string
  org?: string
  relationship: PortalRelationship
  status: PortalStatus
  accent: PortalAccent
  /** When true, page renders but is excluded from search indexing. */
  noindex?: boolean
  lastUpdated: string

  // Hero
  title: string
  tagline: string

  // What Frank provides
  provides: ProvidesItem[]

  // The active build
  projectPlan: ProjectPlanPhase[]

  // The roadmap
  yearPlan: YearPlanQuarter[]

  // Curated, resolved + link-checked at build time by lib/portal/recommend.ts
  recommendations: Recommendation[]

  // Compounding relationship + public-only value framing
  compounding: CompoundingNode[]
  sharedUpside: string[]

  // Who this also serves
  team: TeamMember[]

  crossLinks: PortalCrossLink[]

  // Related existing pages — never duplicate content, only point to it
  alliesHref?: string
  friendsHref?: string
  partnershipsHref?: string
  downloadHref?: string

  cta: { label: string; href: string }

  seo: { title: string; description: string }
}
