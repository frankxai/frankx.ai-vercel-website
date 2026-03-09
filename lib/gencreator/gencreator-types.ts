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
