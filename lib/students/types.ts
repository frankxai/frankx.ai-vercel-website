import type { GlowColor } from '@/components/ui/glow-card'

export interface StudentTool {
  slug: string
  title: string
  description: string
  icon: string
  color: GlowColor
  category: 'workshop' | 'assessment' | 'reference' | 'builder' | 'briefing'
  duration: string
  badge?: string
  outcomes: string[]
  nextSteps: string[]
}

export interface LearningJourney {
  id: string
  title: string
  description: string
  targetAudience: string
  estimatedTime: string
  color: GlowColor
  steps: { toolSlug: string; label: string }[]
}

export interface EcosystemNode {
  name: string
  href: string
  description: string
  icon: string
  color: GlowColor
  ring: 'tools' | 'platform' | 'content' | 'growth'
  badge?: string
}
