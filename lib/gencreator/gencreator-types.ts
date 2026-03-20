import type { LucideIcon } from 'lucide-react'

export interface Principle {
  number: number
  title: string
  tagline: string
  description: string
  example: string
  icon: LucideIcon
}

export interface HandbookChapter {
  number: number
  title: string
  subtitle: string
  description: string
  readTime: string
  topics: string[]
  icon: LucideIcon
  color: string
}

export type BlueprintCategory = 'Content' | 'Music' | 'Product' | 'System' | 'Growth'
export type BlueprintDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Blueprint {
  title: string
  description: string
  category: BlueprintCategory
  difficulty: BlueprintDifficulty
  timeEstimate: string
  tools: string[]
  icon: LucideIcon
}

export interface SoulDimension {
  number: number
  name: string
  symbol: string
  tagline: string
  description: string
  questions: string[]
  color: string
  glowColor: string
}

export interface ManifestoLine {
  text: string
  emphasis?: boolean
}

// ── Product & Community Types ────────────────────────────

export interface ProductTier {
  name: string
  slug: string
  price: string
  priceDetail: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
  badge?: string
}

export interface CommunitySpace {
  name: string
  description: string
  icon: LucideIcon
  members?: string
}

export interface CommunityEvent {
  name: string
  frequency: string
  description: string
  icon: LucideIcon
}

export interface LearningTrack {
  number: number
  name: string
  tagline: string
  weeks: string
  description: string
  modules: LearningModule[]
  color: string
  icon: LucideIcon
}

export interface LearningModule {
  title: string
  description: string
  deliverable: string
}

export interface ToolkitItem {
  name: string
  description: string
  category: ToolkitCategory
  url?: string
  icon: LucideIcon
  tag: string
}

export type ToolkitCategory = 'AI' | 'Automation' | 'Publishing' | 'Design' | 'Audio' | 'Analytics'

// ── Product Suite Types ─────────────────────────────────

export type ProductSuiteTier = 'free' | 'starter' | 'builder' | 'scale'

export interface GenCreatorProduct {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  price: string
  priceNote: string
  tier: ProductSuiteTier
  category: 'tools' | 'systems' | 'community' | 'services'
  icon: LucideIcon
  color: string
  features: string[]
  cta: string
  ctaHref: string
  badge?: string
  comingSoon?: boolean
}
