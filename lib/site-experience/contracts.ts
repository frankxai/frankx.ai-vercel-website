export type SiteKey = 'frankx.ai' | 'gencreator.ai'

export type PageRole =
  | 'hub'
  | 'guide'
  | 'research'
  | 'proof'
  | 'story'
  | 'reference'
  | 'offer'
  | 'partner'
  | 'experiment'
  | 'archive'

export type AudienceKey =
  | 'mariah_founder'
  | 'technical_founder'
  | 'ai_lead'
  | 'ai_native_creator'
  | 'learner'
  | 'researcher_partner'
  | 'personal_development_reader'
  | 'general_explorer'

export type ReviewState = 'current' | 'review_due' | 'review_required' | 'historical'
export type EvidenceState =
  | 'primary_sourced'
  | 'documented'
  | 'editorial'
  | 'experiential'
  | 'unreviewed'

export interface HubExperienceContract {
  whoItIsFor: string
  situation: string
  whatYouWillFind: string
  startHere: string
  relatedWorlds: string[]
}

export interface PageExperienceRecord {
  site: SiteKey
  route: string
  hub: string
  pageRole: PageRole
  primaryAudience: AudienceKey
  secondaryAudiences: AudienceKey[]
  lifecycle: 'published' | 'unlisted' | 'archived' | 'redirected'
  freshness: ReviewState
  evidence: EvidenceState
  copyScore: number | null
  assetStatus: 'verified' | 'fallback' | 'missing' | 'review_required' | 'not_applicable'
  ctaStatus: 'verified' | 'broken' | 'review_required' | 'not_applicable'
  owner: string
  lastReview: string | null
  experienceContract?: HubExperienceContract
}

export interface OfferRecord {
  id: string
  site: SiteKey
  route: string
  publicState: 'free' | 'available' | 'waitlist' | 'application' | 'custom_quote' | 'retired'
  verifiedPrice: { amount: number; currency: string } | null
  checkoutDestination: string | null
  deliverable: string
  fulfillmentState: 'self_serve' | 'manual' | 'application_review' | 'retired'
  evidence: string
  lastVerification: string
}

export interface GuideSource {
  title: string
  url: string
  sourceType: 'primary' | 'community_implementation' | 'context'
}

export interface GuideRecord {
  site: SiteKey
  route: string
  title: string
  reviewedDate: string | null
  nextReview: string | null
  primarySources: GuideSource[]
  evidenceLevel: 'primary_sourced' | 'mixed_sources' | 'review_required'
  supportedAudience: AudienceKey[]
  relatedGuides: string[]
  maintenanceOwner: string
}

export interface AssetRecord {
  canonicalSource: string
  storage: { type: 'local' | 'vercel_blob'; location: string }
  contentHash: string | null
  provenance: string
  rights: 'owned' | 'licensed' | 'third_party' | 'review_required'
  dimensions: { width: number; height: number } | null
  fallback: string | null
  renderStatus: 'verified' | 'fallback' | 'missing' | 'review_required'
}

export interface CrossSiteRouteRecord {
  sourceDomain: SiteKey
  sourceRoute: string
  destinationDomain: SiteKey
  destinationRoute: string
  relationship: string
  audienceReason: string
  reciprocalLink: string
  healthStatus: 'healthy' | 'planned' | 'broken' | 'review_required'
}
