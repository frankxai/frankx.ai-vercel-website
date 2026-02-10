'use client'

import { useState } from 'react'
import PremiumCard from '@/components/ui/PremiumCard'
import { MagneticHover, FloatingElement } from '@/components/ui/AdvancedAnimations'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { CursorSpotlight } from '@/components/ui/CursorSpotlight'
import ShimmerButton from '@/components/ui/magic-ui/shimmer-button'
import {
  Sparkles, Zap, Target, Trophy, Clock, Star,
  ArrowRight, Check, Lock, Flame, Crown, Rocket,
  Code2, Palette, Layout, Monitor, Smartphone,
  Globe, Shield, Cpu, Bot, Wand2, Users,
  TrendingUp, BarChart3, ChevronRight, Eye,
  BookOpen, Layers, Diamond, Terminal, Play,
  Heart, MessageSquare, Download, Share2, Mail,
  FileCode, Boxes, Database, Activity, PenTool,
  Lightbulb, Compass, Map, Flag, Award,
  Calendar
} from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

type QuestDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'legendary'
type QuestStatus = 'locked' | 'available' | 'in-progress' | 'completed'
type QuestCategory = 'components' | 'templates' | 'animations' | 'systems' | 'products'

interface Quest {
  id: string
  title: string
  description: string
  difficulty: QuestDifficulty
  status: QuestStatus
  category: QuestCategory
  xp: number
  estimatedTime: string
  requirements: string[]
  deliverables: string[]
  tools: string[]
  completedDate?: string
}

// ============================================================================
// DATA
// ============================================================================

const quests: Quest[] = [
  // COMPLETED
  {
    id: 'q-001',
    title: 'PremiumCard v2 — Unified Card System',
    description: 'Consolidate GlassmorphicCard, InteractiveCard, and TiltCard into a single PremiumCard component with gradient, glass, tilt, glow, and shine effects.',
    difficulty: 'advanced',
    status: 'completed',
    category: 'components',
    xp: 500,
    estimatedTime: '4 hours',
    requirements: ['Audit all card components', 'Design unified API', 'Migrate 39 files'],
    deliverables: ['PremiumCard.tsx', 'All pages migrated', 'Design Lab v2 showcase'],
    tools: ['Claude Code', 'TypeScript', 'Framer Motion'],
    completedDate: '2026-02-07',
  },
  {
    id: 'q-002',
    title: 'Design Lab v2 — Component Playground',
    description: 'Create an interactive visual playground for the entire PremiumCard design system with 11 sections.',
    difficulty: 'advanced',
    status: 'completed',
    category: 'templates',
    xp: 750,
    estimatedTime: '3 hours',
    requirements: ['Card Matrix (5×4 grid)', 'Interactive playground', 'Aurora gallery'],
    deliverables: ['1047-line design-lab page', 'Live code generation', 'All effects showcased'],
    tools: ['Claude Code', 'PremiumCard', 'AuroraGradient', 'AnimatedBackground'],
    completedDate: '2026-02-07',
  },
  {
    id: 'q-003',
    title: 'Design Lab v3 — Product Templates',
    description: 'Replicate 6 world-class design systems (Vercel, Linear, Stripe, Canva, Gemini, SaaS Dashboard) as standalone sellable templates.',
    difficulty: 'legendary',
    status: 'completed',
    category: 'templates',
    xp: 1500,
    estimatedTime: '6 hours',
    requirements: ['6 distinct design languages', 'Marketplace strategy', 'Capability matrix'],
    deliverables: ['Vercel dev platform template', 'Linear issue board', 'Stripe API platform', 'Canva gallery', 'Gemini chat UI', 'SaaS dashboard'],
    tools: ['Claude Code', 'PremiumCard', 'Framer Motion', 'Tailwind CSS'],
    completedDate: '2026-02-07',
  },

  // AVAILABLE
  {
    id: 'q-004',
    title: 'E-commerce Storefront Template',
    description: 'Build a Shopify-grade e-commerce template with product grid, cart, checkout flow, and dynamic filtering.',
    difficulty: 'advanced',
    status: 'available',
    category: 'templates',
    xp: 1000,
    estimatedTime: '5 hours',
    requirements: ['Product grid with filters', 'Cart sidebar', 'Checkout form', 'Mobile-optimized'],
    deliverables: ['Storefront page template', 'Product detail page', 'Cart component'],
    tools: ['Claude Code', 'PremiumCard', 'Tailwind CSS'],
  },
  {
    id: 'q-005',
    title: 'Blog Theme — Magazine Edition',
    description: 'Create a premium magazine-style blog theme with hero articles, category pages, and reading progress.',
    difficulty: 'intermediate',
    status: 'available',
    category: 'templates',
    xp: 600,
    estimatedTime: '3 hours',
    requirements: ['Magazine hero layout', 'Article grid', 'Reading progress bar', 'Category filters'],
    deliverables: ['Blog index template', 'Article page template', 'Category page'],
    tools: ['Claude Code', 'PremiumCard', 'MDX'],
  },
  {
    id: 'q-006',
    title: 'Micro-interaction Library',
    description: 'Build 20+ micro-interactions: hover reveals, scroll triggers, magnetic elements, elastic buttons, morphing shapes.',
    difficulty: 'advanced',
    status: 'available',
    category: 'animations',
    xp: 800,
    estimatedTime: '4 hours',
    requirements: ['20+ distinct interactions', 'Code examples for each', 'Performance budget'],
    deliverables: ['Interaction showcase page', 'Reusable hooks', 'Performance audit'],
    tools: ['Claude Code', 'Framer Motion', 'CSS Animations'],
  },
  {
    id: 'q-007',
    title: 'Design Token System',
    description: 'Create a comprehensive design token system with CSS variables, TypeScript types, and documentation.',
    difficulty: 'intermediate',
    status: 'available',
    category: 'systems',
    xp: 500,
    estimatedTime: '2 hours',
    requirements: ['Color tokens', 'Spacing scale', 'Typography system', 'Shadow tokens'],
    deliverables: ['tokens.css', 'tokens.ts', 'Token documentation page'],
    tools: ['Claude Code', 'CSS Variables', 'TypeScript'],
  },
  {
    id: 'q-008',
    title: 'Portfolio Template — Creative Agency',
    description: 'Agency portfolio with project showcases, team grid, testimonials, and contact form.',
    difficulty: 'intermediate',
    status: 'available',
    category: 'templates',
    xp: 700,
    estimatedTime: '4 hours',
    requirements: ['Project showcase grid', 'Team section', 'Testimonial carousel', 'Contact form'],
    deliverables: ['Portfolio page', 'Project detail page', 'Team page'],
    tools: ['Claude Code', 'PremiumCard', 'Framer Motion'],
  },
  {
    id: 'q-009',
    title: 'Email Template Collection (React Email)',
    description: 'Build 10 production-ready email templates using React Email — welcome, receipt, newsletter, etc.',
    difficulty: 'intermediate',
    status: 'available',
    category: 'products',
    xp: 600,
    estimatedTime: '3 hours',
    requirements: ['10 email templates', 'Mobile responsive', 'Dark mode support', 'Preview system'],
    deliverables: ['Email templates', 'Preview page', 'Inline CSS generation'],
    tools: ['Claude Code', 'React Email', 'Tailwind CSS'],
  },
  {
    id: 'q-010',
    title: 'Component Library Package',
    description: 'Package the PremiumCard system as an installable npm library with docs, types, and tree-shaking.',
    difficulty: 'legendary',
    status: 'available',
    category: 'products',
    xp: 2000,
    estimatedTime: '8 hours',
    requirements: ['npm package structure', 'TypeScript types', 'Tree-shaking support', 'Documentation site'],
    deliverables: ['npm package', 'Storybook', 'API documentation', 'Installation guide'],
    tools: ['Claude Code', 'TypeScript', 'tsup/Rollup', 'Storybook'],
  },

  // LOCKED (future)
  {
    id: 'q-011',
    title: 'AI Image Generation Showcase',
    description: 'Create a gallery page showcasing AI-generated images via Nano Banana MCP with live generation.',
    difficulty: 'advanced',
    status: 'locked',
    category: 'products',
    xp: 1000,
    estimatedTime: '4 hours',
    requirements: ['Nano Banana MCP integration', 'Gallery layout', 'Generation UI'],
    deliverables: ['AI gallery page', 'Image generation form', 'Style presets'],
    tools: ['Claude Code', 'Nano Banana MCP', 'Gemini'],
  },
  {
    id: 'q-012',
    title: 'Real-time Collaboration Dashboard',
    description: 'Build a collaborative dashboard with live cursors, presence indicators, and shared state.',
    difficulty: 'legendary',
    status: 'locked',
    category: 'systems',
    xp: 2500,
    estimatedTime: '10 hours',
    requirements: ['WebSocket integration', 'Cursor sharing', 'Conflict resolution', 'Presence system'],
    deliverables: ['Collaborative editor', 'Presence indicators', 'Real-time sync'],
    tools: ['Claude Code', 'Liveblocks/Yjs', 'WebSockets'],
  },
]

const difficultyConfig = {
  beginner: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Beginner' },
  intermediate: { color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', label: 'Intermediate' },
  advanced: { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', label: 'Advanced' },
  legendary: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Legendary' },
}

const statusConfig = {
  locked: { color: 'text-white/20', icon: Lock, label: 'Locked' },
  available: { color: 'text-cyan-400', icon: Play, label: 'Available' },
  'in-progress': { color: 'text-amber-400', icon: Clock, label: 'In Progress' },
  completed: { color: 'text-emerald-400', icon: Check, label: 'Completed' },
}

const categoryConfig: Record<QuestCategory, { icon: typeof Code2; label: string }> = {
  components: { icon: Boxes, label: 'Components' },
  templates: { icon: Layout, label: 'Templates' },
  animations: { icon: Sparkles, label: 'Animations' },
  systems: { icon: Cpu, label: 'Systems' },
  products: { icon: Rocket, label: 'Products' },
}

// ============================================================================
// COMPONENTS
// ============================================================================

function QuestCard({ quest }: { quest: Quest }) {
  const [expanded, setExpanded] = useState(false)
  const diff = difficultyConfig[quest.difficulty]
  const stat = statusConfig[quest.status]
  const cat = categoryConfig[quest.category]
  const StatIcon = stat.icon
  const CatIcon = cat.icon

  const gradient = quest.status === 'completed' ? 'emerald' as const :
                   quest.status === 'locked' ? 'slate' as const :
                   quest.difficulty === 'legendary' ? 'gold' as const : 'cyan' as const

  return (
    <PremiumCard
      gradient={gradient}
      mouseGlow={quest.status !== 'locked'}
      glass={quest.status === 'locked' ? 'none' : 'subtle'}
      padding="p-0"
      className={`overflow-hidden ${quest.status === 'locked' ? 'opacity-50' : ''}`}
    >
      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${diff.bg} ${diff.border} border`}>
              <StatIcon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-white/20">{quest.id.toUpperCase()}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold ${diff.bg} ${diff.color}`}>
                  {diff.label}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">{quest.title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber-400 flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="text-sm font-bold">{quest.xp}</span>
            <span className="text-[9px] text-amber-400/50 uppercase">xp</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/40 leading-relaxed mb-4">{quest.description}</p>

        {/* Meta row */}
        <div className="flex items-center gap-4 flex-wrap mb-4">
          <div className="flex items-center gap-1.5 text-xs text-white/25">
            <Clock className="w-3 h-3" />
            {quest.estimatedTime}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/25">
            <CatIcon className="w-3 h-3" />
            {cat.label}
          </div>
          {quest.completedDate && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400/50">
              <Calendar className="w-3 h-3" />
              {quest.completedDate}
            </div>
          )}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1"
        >
          {expanded ? 'Less details' : 'More details'}
          <ChevronRight className={`w-3 h-3 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>

        {/* Expanded details */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-4">
            {/* Requirements */}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/20 font-bold mb-2">Requirements</div>
              <div className="space-y-1">
                {quest.requirements.map(req => (
                  <div key={req} className="flex items-center gap-2 text-xs text-white/40">
                    <Target className="w-3 h-3 text-white/15 flex-shrink-0" />
                    {req}
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/20 font-bold mb-2">Deliverables</div>
              <div className="space-y-1">
                {quest.deliverables.map(del => (
                  <div key={del} className="flex items-center gap-2 text-xs text-white/40">
                    <FileCode className="w-3 h-3 text-white/15 flex-shrink-0" />
                    {del}
                  </div>
                ))}
              </div>
            </div>

            {/* Tools used */}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/20 font-bold mb-2">Tools</div>
              <div className="flex flex-wrap gap-1.5">
                {quest.tools.map(tool => (
                  <span key={tool} className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] text-white/30 font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PremiumCard>
  )
}

// ============================================================================
// PAGE
// ============================================================================

export default function QuestsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | QuestStatus>('all')
  const [activeCategory, setActiveCategory] = useState<'all' | QuestCategory>('all')

  const filtered = quests.filter(q => {
    if (activeFilter !== 'all' && q.status !== activeFilter) return false
    if (activeCategory !== 'all' && q.category !== activeCategory) return false
    return true
  })

  const totalXP = quests.filter(q => q.status === 'completed').reduce((sum, q) => sum + q.xp, 0)
  const completedCount = quests.filter(q => q.status === 'completed').length
  const availableCount = quests.filter(q => q.status === 'available').length

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/20">
      <CursorSpotlight />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <FloatingElement duration={10} offset={20}>
            <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
          </FloatingElement>
          <FloatingElement duration={14} offset={25}>
            <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
          </FloatingElement>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-semibold uppercase tracking-[0.2em] mb-8">
            <Trophy className="w-3.5 h-3.5" />
            Design Lab Quests
          </div>

          <SplitTextReveal
            text="Build. Ship. Document."
            as="h1"
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-6"
            staggerDelay={0.06}
          />

          <p className="text-lg text-white/30 max-w-2xl mx-auto mb-12">
            A transparent log of every design challenge completed by Claude Code.
            Each quest documents capabilities, tools used, and deliverables shipped.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{totalXP.toLocaleString()}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/20 mt-1">Total XP</div>
            </div>
            <div className="w-px h-12 bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">{completedCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/20 mt-1">Completed</div>
            </div>
            <div className="w-px h-12 bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{availableCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/20 mt-1">Available</div>
            </div>
            <div className="w-px h-12 bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/50">{quests.length}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/20 mt-1">Total Quests</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 sticky top-0 z-20 bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-6">
            {/* Status filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-white/20 font-bold mr-2">Status</span>
              {(['all', 'completed', 'available', 'in-progress', 'locked'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeFilter === status
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-white/[0.02] text-white/30 border border-white/[0.06] hover:bg-white/[0.04]'
                  }`}
                >
                  {status === 'all' ? 'All' : status === 'in-progress' ? 'Active' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-white/[0.06] hidden sm:block" />

            {/* Category filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-white/20 font-bold mr-2">Category</span>
              {(['all', 'components', 'templates', 'animations', 'systems', 'products'] as const).map(cat => {
                const config = cat !== 'all' ? categoryConfig[cat] : null
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      activeCategory === cat
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'bg-white/[0.02] text-white/30 border border-white/[0.06] hover:bg-white/[0.04]'
                    }`}
                  >
                    {config && <config.icon className="w-3 h-3" />}
                    {cat === 'all' ? 'All' : config?.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quest grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-white/10 text-lg">No quests match your filters</div>
            </div>
          )}
        </div>
      </section>

      {/* Vision section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <PremiumCard gradient="gold" glass="medium" mouseGlow shine tilt tiltIntensity={2} padding="p-10 sm:p-14">
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold mb-4">The Vision</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
                AI-Generated Design Products
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto mb-8 leading-relaxed">
                Every quest on this page documents a real Claude Code session.
                The goal: prove that AI can produce sellable, production-grade design templates
                and build a transparent pipeline from ideation to marketplace.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 text-left mb-10">
                <div>
                  <Lightbulb className="w-5 h-5 text-amber-400 mb-2" />
                  <h3 className="text-sm font-bold text-white mb-1">Ideate</h3>
                  <p className="text-xs text-white/25">Research what sells, analyze top sites, identify opportunities.</p>
                </div>
                <div>
                  <Code2 className="w-5 h-5 text-cyan-400 mb-2" />
                  <h3 className="text-sm font-bold text-white mb-1">Build</h3>
                  <p className="text-xs text-white/25">Claude Code generates production-grade templates in minutes.</p>
                </div>
                <div>
                  <Rocket className="w-5 h-5 text-emerald-400 mb-2" />
                  <h3 className="text-sm font-bold text-white mb-1">Ship</h3>
                  <p className="text-xs text-white/25">Deploy to frankx.ai, package for v0.dev, Gumroad, and marketplaces.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <MagneticHover intensity={0.12}>
                  <ShimmerButton
                    shimmerColor="#F59E0B"
                    shimmerSize="0.08em"
                    background="rgba(245, 158, 11, 0.1)"
                    className="!border-amber-500/30 !text-amber-300 !text-sm !font-semibold !px-8 !py-3.5"
                  >
                    <Star className="w-4 h-4 mr-2 fill-amber-400" />
                    View Templates
                  </ShimmerButton>
                </MagneticHover>
                <MagneticHover intensity={0.12}>
                  <ShimmerButton
                    shimmerColor="#06B6D4"
                    shimmerSize="0.05em"
                    background="rgba(6, 182, 212, 0.06)"
                    className="!border-cyan-500/20 !text-white/50 !text-sm !font-medium !px-8 !py-3.5"
                  >
                    Back to Design Lab
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </ShimmerButton>
                </MagneticHover>
              </div>
            </div>
          </PremiumCard>
        </div>
      </section>

      <div className="h-20" />
    </div>
  )
}
