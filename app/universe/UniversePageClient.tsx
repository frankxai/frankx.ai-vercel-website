'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ExternalLink, Globe, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Domain / brand registry ─────────────────────────────────────────────────

interface Brand {
  id: string
  name: string
  domain: string
  href: string
  external: boolean
  status: 'live' | 'building' | 'launching' | 'stealth'
  tagline: string
  description: string
  color: 'emerald' | 'cyan' | 'amber' | 'violet' | 'rose' | 'blue' | 'fuchsia' | 'orange'
  category: 'flagship' | 'intelligence' | 'income' | 'creative' | 'ecosystem'
  embed?: { type: 'suno' | 'youtube'; id: string }
}

const brands: Brand[] = [
  // ── Flagship ──────────────────────────────────────────────────────────────
  {
    id: 'frankx',
    name: 'FrankX.AI',
    domain: 'frankx.ai',
    href: 'https://frankx.ai',
    external: false,
    status: 'live',
    tagline: 'The origin. Everything documented.',
    description:
      'The public home of the Agentic Founder. Intelligence systems, music, blog, Creator OS, and the building-in-public chronicle. 200+ guides, 12,000+ songs, 630+ skills shipped.',
    color: 'emerald',
    category: 'flagship',
  },
  // ── Intelligence ──────────────────────────────────────────────────────────
  {
    id: 'starlight',
    name: 'Starlight Intelligence',
    domain: 'starlightintelligence.org',
    href: 'https://starlightintelligence.org',
    external: true,
    status: 'building',
    tagline: 'Enterprise agentic intelligence systems.',
    description:
      'The intelligence systems consultancy arm — enterprise-grade multi-agent orchestration, agentic architecture, and AI transformation programs. Formerly the Oracle practice, now independent.',
    color: 'blue',
    category: 'intelligence',
  },
  {
    id: 'reality-architect',
    name: 'Reality Architect',
    domain: 'realityarchitect.ai',
    href: 'https://realityarchitect.ai',
    external: true,
    status: 'building',
    tagline: 'Architect your reality with AI.',
    description:
      'Where consciousness meets systems thinking. Frameworks for designing your life, work, and identity using intelligence amplification — the personal OS layer of the ecosystem.',
    color: 'violet',
    category: 'intelligence',
  },
  // ── Creator & Income ──────────────────────────────────────────────────────
  {
    id: 'gencreator',
    name: 'GenCreator',
    domain: 'gencreator.ai',
    href: 'https://gencreator.ai',
    external: true,
    status: 'launching',
    tagline: 'The generative creator platform.',
    description:
      'AI-native creator tools and education — prompt libraries, production workflows, and the Creator OS in a standalone platform. Built for the generative era of creative work.',
    color: 'cyan',
    category: 'income',
  },
  {
    id: 'agentic-income',
    name: 'Agentic Income',
    domain: 'agenticincome.ai',
    href: 'https://agenticincome.ai',
    external: true,
    status: 'building',
    tagline: 'Build passive income with agentic systems.',
    description:
      'The playbook for agentic passive income — how to build autonomous systems that generate revenue while you sleep. Courses, frameworks, and real case studies from the build.',
    color: 'amber',
    category: 'income',
  },
  {
    id: 'agentic-passive',
    name: 'Agentic Passive Income',
    domain: 'agenticpassiveincome.com',
    href: 'https://agenticpassiveincome.com',
    external: true,
    status: 'building',
    tagline: 'Automate the income layer.',
    description:
      'The practical implementation hub for building agentic income streams — from n8n automations to Claude-powered content pipelines and autonomous affiliate systems.',
    color: 'orange',
    category: 'income',
  },
  {
    id: 'disruptive-passive',
    name: 'Disruptive Passive Income',
    domain: 'disruptivepassiveincome.com',
    href: 'https://disruptivepassiveincome.com',
    external: true,
    status: 'building',
    tagline: 'Disrupt. Automate. Compound.',
    description:
      'For entrepreneurs building income systems that challenge the status quo. AI-first passive income models, case studies, and the founder mindset behind compounding automation.',
    color: 'rose',
    category: 'income',
  },
  // ── Creative ──────────────────────────────────────────────────────────────
  {
    id: 'arcanea',
    name: 'Arcanea',
    domain: 'arcanea.ai',
    href: 'https://arcanea.ai',
    external: true,
    status: 'stealth',
    tagline: 'The mythology brand. Being built in public.',
    description:
      'An AI-native world and mythology brand — cinematic visuals, narrative systems, and a creative universe being built in public. The soul layer of the FrankX ecosystem.',
    color: 'fuchsia',
    category: 'creative',
  },
]

const statusConfig = {
  live: { label: 'Live', class: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  building: { label: 'Building', class: 'bg-amber-500/15 text-amber-300 border-amber-500/25' },
  launching: { label: 'Launching soon', class: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25' },
  stealth: { label: 'Stealth', class: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25' },
}

const colorMap: Record<Brand['color'], { glow: string; border: string; text: string; dot: string }> = {
  emerald: { glow: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  cyan: { glow: 'bg-cyan-500/5', border: 'border-cyan-500/20', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  amber: { glow: 'bg-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400' },
  violet: { glow: 'bg-violet-500/5', border: 'border-violet-500/20', text: 'text-violet-400', dot: 'bg-violet-400' },
  rose: { glow: 'bg-rose-500/5', border: 'border-rose-500/20', text: 'text-rose-400', dot: 'bg-rose-400' },
  blue: { glow: 'bg-blue-500/5', border: 'border-blue-500/20', text: 'text-blue-400', dot: 'bg-blue-400' },
  fuchsia: { glow: 'bg-fuchsia-500/5', border: 'border-fuchsia-500/20', text: 'text-fuchsia-400', dot: 'bg-fuchsia-400' },
  orange: { glow: 'bg-orange-500/5', border: 'border-orange-500/20', text: 'text-orange-400', dot: 'bg-orange-400' },
}

const categoryLabels: Record<Brand['category'], string> = {
  flagship: 'Flagship',
  intelligence: 'Intelligence',
  income: 'Income Systems',
  creative: 'Creative',
  ecosystem: 'Ecosystem',
}

// ─── Suno embed ───────────────────────────────────────────────────────────────

function SunoEmbed() {
  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-orange-400/60 font-medium mb-3">
            Music Lab · Now playing
          </p>
          <h2 className="font-display text-2xl font-bold text-white mb-6">
            The soundtrack of the build
          </h2>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src="https://suno.com/embed/9cbad174-9276-427f-9aed-1ba00c7db3db"
              className="w-full h-[180px]"
              style={{ border: 'none' }}
              allow="autoplay; clipboard-write"
              loading="lazy"
              title="Vibe OS — Featured Track by FrankX"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-white/35">12,000+ tracks produced with Suno</p>
            <Link href="/music" className="inline-flex items-center gap-1.5 text-sm text-orange-400 hover:text-orange-300 transition-colors">
              Browse all tracks <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Brand card ───────────────────────────────────────────────────────────────

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  const shouldReduce = useReducedMotion()
  const colors = colorMap[brand.color]
  const status = statusConfig[brand.status]
  const isExternal = brand.external

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className={cn(
        'group relative flex flex-col rounded-2xl border p-5 sm:p-6 transition-all duration-300',
        colors.glow,
        colors.border,
        'hover:border-opacity-60'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className={cn('w-2 h-2 rounded-full flex-shrink-0', colors.dot)} />
          <h3 className="text-base font-semibold text-white">{brand.name}</h3>
        </div>
        <span className={cn('flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium border', status.class)}>
          {status.label}
        </span>
      </div>

      {/* Domain */}
      <p className={cn('text-xs font-mono mb-3', colors.text)}>{brand.domain}</p>

      {/* Tagline */}
      <p className="text-sm font-medium text-white/70 mb-2 leading-snug">{brand.tagline}</p>

      {/* Description */}
      <p className="text-xs text-white/40 leading-relaxed flex-1 mb-5">{brand.description}</p>

      {/* CTA */}
      {isExternal ? (
        <a
          href={brand.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center gap-1.5 text-xs font-medium transition-colors',
            colors.text,
            'hover:opacity-80'
          )}
        >
          Visit {brand.domain}
          <ExternalLink className="w-3 h-3" />
        </a>
      ) : (
        <Link
          href={brand.href}
          className={cn(
            'inline-flex items-center gap-1.5 text-xs font-medium transition-colors',
            colors.text,
            'hover:opacity-80'
          )}
        >
          Explore
          <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </motion.div>
  )
}

// ─── Category section ─────────────────────────────────────────────────────────

function CategorySection({ category, brands: catBrands }: { category: Brand['category']; brands: Brand[] }) {
  if (catBrands.length === 0) return null
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <p className="text-[11px] tracking-[0.25em] uppercase text-white/30 font-medium">
          {categoryLabels[category]}
        </p>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {catBrands.map((b, i) => (
          <BrandCard key={b.id} brand={b} index={i} />
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const categoryOrder: Brand['category'][] = ['flagship', 'intelligence', 'income', 'creative', 'ecosystem']

export default function UniversePageClient() {
  const shouldReduce = useReducedMotion()

  const brandsByCategory = categoryOrder.reduce<Record<Brand['category'], Brand[]>>(
    (acc, cat) => {
      acc[cat] = brands.filter((b) => b.category === cat)
      return acc
    },
    { flagship: [], intelligence: [], income: [], creative: [], ecosystem: [] }
  )

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', filter: 'blur(120px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)', filter: 'blur(120px)' }} />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
      </div>

      <div className="relative z-10 pt-28 pb-24">
        {/* Hero */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <Globe className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white/60">The Universe — all brands &amp; domains</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] text-white mb-6">
              Everything being<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
                built in public.
              </span>
            </h1>

            <p className="text-lg text-white/45 max-w-2xl leading-relaxed mb-8">
              An ecosystem of brands, intelligence systems, and income engines — all documented as they are built.
              One founder. Multiple domains. One compounding intelligence stack.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {[
                { n: '7', l: 'domains' },
                { n: '25+', l: 'live systems' },
                { n: '4', l: 'brand tiers' },
                { n: '100%', l: 'building in public' },
              ].map(({ n, l }) => (
                <div key={l} className="flex items-baseline gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <span className="text-sm font-semibold text-white">{n}</span>
                  <span className="text-xs text-white/35">{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Brand categories */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {categoryOrder.map((cat) => (
            <CategorySection key={cat} category={cat} brands={brandsByCategory[cat]} />
          ))}
        </div>

        {/* Suno embed — the soundtrack */}
        <SunoEmbed />

        {/* Ecosystem link */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6"
          >
            <div>
              <p className="text-sm font-medium text-white mb-1">Want the technical layer?</p>
              <p className="text-xs text-white/40">The /ecosystem page maps every live system, repo, and agent in the stack.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/ecosystem"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white/70 hover:text-white transition-colors"
              >
                View Ecosystem Map
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white/70 hover:text-white transition-colors"
              >
                GitHub
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
