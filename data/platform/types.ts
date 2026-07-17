export type ContentStatus =
  | 'live'
  | 'draft'
  | 'concept'
  | 'active'
  | 'canonical'
  | 'coming-soon'
  | 'research-note'

export type ResearchType =
  | 'signal'
  | 'note'
  | 'framework'
  | 'playbook'
  | 'experiment'
  | 'canonical'

export type ProductLevel =
  | 'free'
  | 'low-ticket'
  | 'mid-ticket'
  | 'high-ticket'
  | 'retainer'

export type BookStatus =
  | 'concept'
  | 'outlining'
  | 'drafting'
  | 'editing'
  | 'publishing'
  | 'living-book'

export interface BaseContentItem {
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string[]
  status: ContentStatus
  audience?: string[]
  ctaLabel?: string
  ctaHref?: string
}

export interface ResearchItem extends BaseContentItem {
  researchType: ResearchType
  readingTime?: string
}

export interface BlogSeed extends BaseContentItem {
  date?: string
  readingTime?: string
}

export interface ProductItem extends BaseContentItem {
  format: string
  outcome: string
  price?: string
  level: ProductLevel
}

export interface BookItem extends BaseContentItem {
  subtitle: string
  bookStatus: BookStatus
  linkedHrefs?: string[]
}

export interface PlatformArea {
  title: string
  excerpt: string
  tags: string[]
  href: string
}

export interface FlowStep {
  title: string
  description: string
}

export interface CloudPage {
  slug: string
  title: string
  eyebrow: string
  coreLine: string
  description: string
  sections: {
    title: string
    body: string
    points?: string[]
  }[]
  architecture?: FlowStep[]
  ctaLabel: string
  ctaHref: string
  metadataDescription: string
}

export interface OfferLadderTier {
  tier: string
  role: string
  items: string[]
}
