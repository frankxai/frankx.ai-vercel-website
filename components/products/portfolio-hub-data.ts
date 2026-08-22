/**
 * Products hub data — bridges legacy hardcoded cards with portfolio-registry.
 * Prefer registry for new SKUs; keep proven live cards stable.
 */

import { getPublicSkus, type BrandId } from '@/data/portfolio-registry'
import {
  Music,
  BookOpen,
  Building2,
  Cpu,
  Sparkles,
  Package,
  Layers,
  Compass,
  type LucideIcon,
} from 'lucide-react'

export type HubProductStatus = 'active' | 'early-access' | 'preorder' | 'free'

export type HubProduct = {
  id: string
  icon: LucideIcon
  name: string
  tagline: string
  description: string
  status: HubProductStatus
  href: string
  color: 'emerald' | 'cyan' | 'amber' | 'violet'
  highlights: string[]
  featured?: boolean
  priceLabel?: string
  brand?: BrandId
  source: 'legacy' | 'registry'
}

const brandColor: Record<BrandId, HubProduct['color']> = {
  frankx: 'cyan',
  gencreator: 'emerald',
  arcanea: 'violet',
  starlight: 'amber',
}

const brandIcon: Record<BrandId, LucideIcon> = {
  frankx: Layers,
  gencreator: Cpu,
  arcanea: Sparkles,
  starlight: Building2,
}

/** Proven live / early-access cards currently on frankx.ai/products */
export const legacyHubProducts: HubProduct[] = [
  {
    id: 'vibe-os',
    icon: Music,
    name: 'Vibe OS',
    tagline: 'Suno Music Mastery',
    description: 'Prompt packs, emotion mapping, and production checklists for Suno creators.',
    status: 'active',
    href: '/products/vibe-os',
    color: 'emerald',
    highlights: [
      '50+ genre-specific prompts (electronic, hip-hop, ambient, cinematic)',
      'Emotion-to-sound mapping system',
      'Production enhancement and mastering guide',
    ],
    featured: true,
    source: 'legacy',
  },
  {
    id: 'creators-soulbook',
    icon: BookOpen,
    name: "The Creator's Soulbook",
    tagline: 'Life Architecture OS',
    description:
      'Life operating system with 7 pillars, frameworks, and AI coaching prompts. Complete Obsidian vault included.',
    status: 'free',
    href: '/soulbook',
    color: 'amber',
    highlights: [
      '7 Life Pillars framework with reflection exercises',
      '3 transformational perspectives (Life Symphony, Golden Path, 7 Pillars)',
      '25+ AI coaching prompts + ready-to-use Obsidian vault',
    ],
    featured: true,
    priceLabel: 'Free',
    source: 'legacy',
  },
  {
    id: 'suno-prompts-bundle',
    icon: Sparkles,
    name: '5 Suno Prompt Bundles',
    tagline: 'Genre-Specific Music Generation',
    description:
      'Five curated prompt bundles for specific genres: electronic, hip-hop, ambient, cinematic, and lo-fi.',
    status: 'active',
    href: '/products/suno-prompt-library',
    color: 'cyan',
    highlights: [
      '50+ battle-tested prompts across 5 genres',
      'Emotion and tempo mapping for each genre',
      'Production tips and remixing guides',
    ],
    source: 'legacy',
  },
  {
    id: 'creative-ai-toolkit',
    icon: Sparkles,
    name: 'Creative AI Toolkit',
    tagline: 'Prompt library + workflow rituals',
    description: 'A digital kit with prompts, templates, and rollout rituals for consistent output.',
    status: 'early-access',
    href: '/newsletter?ref=creative-ai-toolkit-early-access',
    color: 'emerald',
    highlights: [
      '100+ validated prompts across storytelling, marketing, and operations',
      '12 ready-to-deploy workflow automations',
      '30/60/90 day implementation roadmaps',
    ],
    source: 'legacy',
  },
  {
    id: 'creation-chronicles',
    icon: BookOpen,
    name: 'Creation Chronicles',
    tagline: 'Strategic Storytelling OS',
    description: 'Story frameworks, editorial calendars, and prompt stacks to build authority.',
    status: 'early-access',
    href: '/newsletter?ref=creation-chronicles-early-access',
    color: 'cyan',
    highlights: [
      'Strategic story architecture and messaging frameworks',
      'AI-assisted content creation workflows',
      'Omnichannel distribution templates',
    ],
    source: 'legacy',
  },
  {
    id: 'generative-creator-os',
    icon: Cpu,
    name: 'Generative Creator OS',
    tagline: 'Multi-modal AI Studio',
    description: 'Multi-modal templates, prompts, and guardrails for a reliable studio system.',
    status: 'early-access',
    href: '/newsletter?ref=generative-creator-os-early-access',
    color: 'emerald',
    highlights: [
      'Multi-modal asset generation pipelines',
      'Brand intelligence and compliance system',
      'Team enablement and performance analytics',
    ],
    source: 'legacy',
  },
  {
    id: 'agentic-creator-os',
    icon: Building2,
    name: 'Agentic Creator OS',
    tagline: 'Developer AI Mastery',
    description: 'Agentic playbooks, prompt stacks, and governance checklists for builders.',
    status: 'early-access',
    href: '/newsletter?ref=agentic-creator-os-early-access',
    color: 'cyan',
    highlights: [
      'Claude Code and Cursor mastery systems',
      'Agentic workflow and automation patterns',
      'Production-grade agent development',
    ],
    source: 'legacy',
  },
]

function statusFromRegistry(
  status: string,
  cadence: string
): HubProductStatus {
  if (cadence === 'free') return 'free'
  if (status === 'active') return 'active'
  if (status === 'preorder') return 'preorder'
  return 'early-access'
}

function priceLabel(eur: number, cadence: string): string | undefined {
  if (eur === 0) return 'Free'
  if (cadence === 'subscription') return `€${eur}/mo`
  return `€${eur}`
}

/** Registry SKUs not already represented by a legacy card id/slug */
export function getRegistryHubProducts(): HubProduct[] {
  const legacyIds = new Set(legacyHubProducts.map((p) => p.id))
  return getPublicSkus()
    .filter((s) => !legacyIds.has(s.id) && !legacyIds.has(s.slug))
    .filter((s) => s.id !== 'creators-soulbook' && s.id !== 'vibe-os')
    .map((s) => ({
      id: s.id,
      icon: brandIcon[s.brand] || Package,
      name: s.title,
      tagline: s.subtitle,
      description: s.hook,
      status: statusFromRegistry(s.status, s.cadence),
      href:
        s.status === 'waitlist' || s.status === 'preorder'
          ? s.path.startsWith('/newsletter')
            ? s.path
            : `/newsletter?ref=${encodeURIComponent(s.slug)}-waitlist`
          : s.path,
      color: brandColor[s.brand],
      highlights: s.outcomes.slice(0, 3),
      featured: Boolean(s.featured),
      priceLabel: priceLabel(s.price.eur, s.cadence),
      brand: s.brand,
      source: 'registry' as const,
    }))
}

export function getHubProducts(): HubProduct[] {
  const merged = [...legacyHubProducts, ...getRegistryHubProducts()]
  // Featured first, then active/free, then preorder/early-access
  const rank = (p: HubProduct) => {
    if (p.featured) return 0
    if (p.status === 'active' || p.status === 'free') return 1
    if (p.status === 'preorder') return 2
    return 3
  }
  return merged.sort((a, b) => rank(a) - rank(b))
}

export const doorCopy = [
  {
    id: 'builder',
    title: 'Builder',
    body: 'Ship agents and systems with packs, toolkits, and production patterns.',
    icon: Layers,
  },
  {
    id: 'architect',
    title: 'Architect',
    body: 'CoE frameworks, governance, and evidence-gated architecture education.',
    icon: Building2,
  },
  {
    id: 'creator-operator',
    title: 'Creator-Operator',
    body: 'Music, content, and GenCreator loops that turn tools into output.',
    icon: Music,
  },
  {
    id: 'reader-ip',
    title: 'Reader / IP',
    body: 'Books, Soulbook, and creative seeds you can own and grow.',
    icon: BookOpen,
  },
] as const

export const compassCta = {
  title: 'Not sure where to start?',
  body: 'Start free. The Primer and Soulbook route you to the right system without a sales call.',
  primary: { label: 'Get the free Primer path', href: '/newsletter?ref=creator-compass' },
  secondary: { label: 'Open the Soulbook', href: '/soulbook' },
  icon: Compass,
}
