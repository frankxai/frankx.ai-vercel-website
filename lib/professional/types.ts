import type { GlowColor } from '@/components/ui/glow-card'

export interface AITool {
  name: string
  maker: string
  description: string
  useCases: string[]
  href: string
  color: GlowColor
  badge?: string
}

export interface WorkflowStep {
  step: number
  title: string
  description: string
  tools: string[]
  color: string
}

export interface ProfessionalResource {
  title: string
  description: string
  href: string
  type: 'blog' | 'tool' | 'research' | 'product' | 'external'
  badge?: string
}

export interface ProfessionalPageData {
  audience: string
  title: string
  subtitle: string
  description: string
  heroGradient: string
  accentColor: GlowColor
  credentialStrip: string[]
  workflows: WorkflowStep[]
  resources: ProfessionalResource[]
  blogArticles: ProfessionalResource[]
}
