import { type LucideIcon } from 'lucide-react'
import {
  Music,
  Sparkles,
  Bot,
  BookOpen,
  Zap,
  Lightbulb,
  Code2,
  Workflow
} from 'lucide-react'

/**
 * FrankX.AI V2 Hub Content
 * Creator-First Intelligence Systems
 * Golden Age of Intelligence
 */

export type QuickWin = {
  title: string
  description: string
  href: string
  icon: LucideIcon
  type: 'vault' | 'tool' | 'guide' | 'template'
}

export type Product = {
  id: string
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  href: string
  cta: string
  keyFeatures: string[]
}

export type BlogPost = {
  title: string
  excerpt: string
  date: string
  href: string
  category: 'explorations' | 'chronicles' | 'golden-age' | 'tutorial'
}

// Hero Content
export const heroContent = {
  eyebrow: 'Golden Age of Intelligence',
  headline: 'Build Your Personal AI Center of Excellence',
  subheadline: 'The operating systems, intelligence frameworks, and resources to turn AI into your creative advantage—not a replacement.',
  stats: [
    { value: '500+', label: 'Songs Created' },
    { value: '200+', label: 'AI Systems Built' },
    { value: '100+', label: 'Creation Chronicles' }
  ],
  primaryCTA: { label: 'Explore Prompt Vault', href: '/prompts' },
  secondaryCTA: { label: 'Start with Vibe OS', href: '/products/vibe-os' }
}

// Quick Wins Section
export const quickWins: QuickWin[] = [
  {
    title: 'Prompt Vault',
    description: '1000+ AI prompts for creators',
    href: '/prompts',
    icon: Lightbulb,
    type: 'vault'
  },
  {
    title: 'Creator Tools',
    description: 'Free AI toolkit & frameworks',
    href: '/tools',
    icon: Zap,
    type: 'tool'
  },
  {
    title: 'Latest Guide',
    description: 'Intelligence Atlas Vol. I',
    href: '/intelligence-atlas',
    icon: BookOpen,
    type: 'guide'
  },
  {
    title: 'Suno Starter Pack',
    description: 'Music creation templates',
    href: '/templates',
    icon: Music,
    type: 'template'
  }
]

// Products - The OS/IS Stack
export const products: Product[] = [
  {
    id: 'vibe-os',
    name: 'Vibe OS',
    tagline: 'Music & Audio Intelligence System',
    description: 'Create cinematic music and audio with AI. Built on Suno, designed for creators who won\'t compromise their sound.',
    icon: Music,
    href: '/products/vibe-os',
    cta: 'Start Creating Music',
    keyFeatures: [
      '500+ Suno prompt templates',
      'Genre-specific workflows',
      'Licensing & rights clarity',
      'Audio engineering guides'
    ]
  },
  {
    id: 'generative-creator-os',
    name: 'Generative Creator OS',
    tagline: 'Content Intelligence System',
    description: 'Multiply your content without losing your voice. Templates, workflows, and systems for AI-assisted creation.',
    icon: Sparkles,
    href: '/products/generative-creator-os',
    cta: 'Explore System',
    keyFeatures: [
      'Content multiplication frameworks',
      'Brand voice preservation',
      'Multi-format templates',
      'Distribution automation'
    ]
  },
  {
    id: 'agentic-creator-os',
    name: 'Agentic Creator OS',
    tagline: 'Automation Intelligence System',
    description: 'Build your AI team. Governance, orchestration, and management systems for creator workflows.',
    icon: Bot,
    href: '/products/agentic-creator-os',
    cta: 'Build Your AI Team',
    keyFeatures: [
      'Agent orchestration frameworks',
      'Workflow automation templates',
      'Quality control systems',
      'Team management dashboards'
    ]
  }
]

// Blog/Content Categories
export const contentCategories = [
  { id: 'explorations', label: 'AI Explorations', icon: Code2 },
  { id: 'chronicles', label: 'Creation Chronicles', icon: BookOpen },
  { id: 'golden-age', label: 'Golden Age', icon: Sparkles },
  { id: 'tutorial', label: 'How-To Guides', icon: Workflow }
]

// Featured/Latest Blog Posts (Dynamic - will come from actual blog)
export const featuredPosts: BlogPost[] = [
  {
    title: 'Intelligence Atlas Vol. I',
    excerpt: '10,000-word field report on 2025 frontier models, agentic systems, and the creator playbook.',
    date: '2025-01-21',
    href: '/blog/frankx-intelligence-atlas-volume-1',
    category: 'golden-age'
  },
  {
    title: 'Building Vibe OS: 500 Songs Later',
    excerpt: 'What I learned creating 500+ AI songs and building a music intelligence system.',
    date: '2025-01-15',
    href: '/creation-chronicles/vibe-os-500-songs',
    category: 'chronicles'
  },
  {
    title: 'Agentic Creator OS Roadmap 2025',
    excerpt: 'Master plan for deploying agentic systems across creator workflows.',
    date: '2025-01-22',
    href: '/blog/10-agentic-ai-roadmap-2025',
    category: 'explorations'
  }
]

// Community/Newsletter CTA
export const communityCTA = {
  title: 'Join the Creator Intelligence Community',
  description: 'Get weekly prompts, tools, and insights from Frank\'s AI studio. No fluff, just what works.',
  newsletterPlaceholder: 'your@email.com',
  submitLabel: 'Get Weekly Intelligence',
  socialLinks: [
    { platform: 'Twitter', href: 'https://twitter.com/frankxai' },
    { platform: 'YouTube', href: 'https://youtube.com/@frankxai' },
    { platform: 'Discord', href: '/discord' }
  ]
}

// About/Expertise Snippet
export const expertiseSnippet = {
  title: 'Built by a Creator Who Gets It',
  description: 'Oracle AI Architect turned music creator. 500+ AI songs, 200+ intelligence systems, and a mission to help creators build their personal AI center of excellence.',
  cta: { label: 'Read Frank\'s Story', href: '/about' }
}

// Navigation Structure
export const navigation = {
  primary: [
    {
      label: 'Intelligence Hub',
      items: [
        { label: 'Prompt Vault', href: '/prompts', featured: true },
        { label: 'Tools & Frameworks', href: '/tools' },
        { label: 'Creation Chronicles', href: '/creation-chronicles' },
        { label: 'Intelligence Atlas', href: '/intelligence-atlas' }
      ]
    },
    {
      label: 'Products',
      items: [
        { label: 'Vibe OS', href: '/products/vibe-os' },
        { label: 'Generative Creator OS', href: '/products/generative-creator-os' },
        { label: 'Agentic Creator OS', href: '/products/agentic-creator-os' }
      ]
    },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' }
  ],
  cta: { label: 'Get Started', href: '/start' }
}
