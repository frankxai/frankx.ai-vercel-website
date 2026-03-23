import productsData from '@/data/investor-products.json'

export type InvestorCategory = 'agents' | 'workflows' | 'architectures' | 'tools'
export type InvestorTrack = 'institutional' | 'individual' | 'both'
export type InvestorComplexity = 'starter' | 'professional' | 'enterprise'

export interface InvestorProduct {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  category: InvestorCategory
  track: InvestorTrack
  price: number
  priceLabel: string
  badge: string | null
  complexity: InvestorComplexity
  icon: string
  useCases: string[]
  techStack: string[]
  integrations: string[]
  highlights: string[]
  cta: { label: string; href: string }
  status: 'published' | 'draft'
}

const products = productsData as InvestorProduct[]

export function getInvestorProducts(): InvestorProduct[] {
  return products.filter((p) => p.status === 'published')
}

export function getByCategory(category: InvestorCategory): InvestorProduct[] {
  return getInvestorProducts().filter((p) => p.category === category)
}

export function getByTrack(track: InvestorTrack): InvestorProduct[] {
  return getInvestorProducts().filter((p) => p.track === track || p.track === 'both')
}

export function getBySlug(slug: string): InvestorProduct | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProducts(): InvestorProduct[] {
  return getInvestorProducts().filter((p) => p.badge !== null)
}

export const INVESTOR_CATEGORIES: Record<
  InvestorCategory,
  { name: string; description: string; badge: string; stat: string; href: string; color: string }
> = {
  agents: {
    name: 'AI Agent Packs',
    description:
      'Autonomous agents for due diligence, deal sourcing, market research, and competitive intelligence.',
    badge: '$47+',
    stat: '5+ agents',
    href: '/investor/agents',
    color: 'cyan',
  },
  workflows: {
    name: 'Workflow Templates',
    description:
      'n8n automation templates for deal pipelines, portfolio monitoring, and alert systems.',
    badge: '$37+',
    stat: 'Plug & play',
    href: '/investor/workflows',
    color: 'violet',
  },
  architectures: {
    name: 'System Architectures',
    description:
      'Full-stack intelligence system blueprints with data pipelines, dashboards, and AI layers.',
    badge: '$297+',
    stat: 'Production-ready',
    href: '/investor/architectures',
    color: 'emerald',
  },
  tools: {
    name: 'Tools & Templates',
    description:
      'Notion CRMs, Obsidian vaults, Claude Code configs, and research workspace setups.',
    badge: '$0+',
    stat: 'Instant setup',
    href: '/investor/tools',
    color: 'amber',
  },
}

export const COMPLEXITY_META: Record<InvestorComplexity, { name: string; color: string }> = {
  starter: { name: 'Starter', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  professional: {
    name: 'Professional',
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  enterprise: { name: 'Enterprise', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
}
