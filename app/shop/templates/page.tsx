'use client'

import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Filter,
  Search,
  Sparkles,
  Check,
  Star,
  Download,
  Code2,
  Github,
  Play,
  Shield,
  Zap,
  Train,
  Triangle,
  Workflow,
  ExternalLink,
} from 'lucide-react'
import CheckoutButton from '@/components/commerce/CheckoutButton'
import SparkBorder from '@/components/ui/SparkBorder'
import { GlowButton } from '@/components/ui/GlowButton'
import templates from '@/data/templates.json'

// ── Category Config ─────────────────────────────────────────────────────────

const categories = ['All', 'skill-pack', 'workflow', 'starter-kit', 'config', 'blueprint']
const categoryLabels: Record<string, string> = {
  All: 'All Templates',
  'skill-pack': 'Skill Packs',
  workflow: 'n8n Workflows',
  'starter-kit': 'Starter Kits',
  config: 'MCP Configs',
  blueprint: 'Blueprints',
}
const categoryColors: Record<string, string> = {
  'skill-pack': 'cyan',
  workflow: 'amber',
  'starter-kit': 'emerald',
  config: 'violet',
  blueprint: 'purple',
}

// ── Tier Config ─────────────────────────────────────────────────────────────

const tiers = [
  {
    name: 'Starter',
    range: '$19 – $47',
    description: 'Individual skills and configs. Perfect for adding one capability.',
    color: 'cyan',
    filter: (t: { price: number }) => t.price <= 47,
  },
  {
    name: 'Professional',
    range: '$47 – $97',
    description: 'Multi-component workflows and chat apps. Ship features in hours.',
    color: 'emerald',
    filter: (t: { price: number }) => t.price > 47 && t.price <= 97,
  },
  {
    name: 'Enterprise',
    range: '$197 – $297',
    description: 'Full production systems. RAG platforms, SaaS boilerplates, agent frameworks.',
    color: 'purple',
    filter: (t: { price: number }) => t.price > 97,
  },
]

// ── Stats ───────────────────────────────────────────────────────────────────

const stats = [
  { value: '15', label: 'Templates' },
  { value: '5', label: 'Categories' },
  { value: '$27', label: 'Starting at' },
  { value: '100%', label: 'Source code' },
]

// ── Deploy Platform Badges ──────────────────────────────────────────────────

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  railway: Train,
  vercel: Triangle,
  n8n: Workflow,
}

function DeployBadges({ techStack }: { techStack: string[] }) {
  const platforms = ['railway', 'vercel', 'n8n'].filter(
    (p) =>
      techStack.some((t) => t.toLowerCase().includes(p)) ||
      (p === 'vercel' && techStack.some((t) => t.toLowerCase().includes('next'))) ||
      (p === 'railway' && techStack.some((t) => ['Python', 'FastAPI', 'Redis'].includes(t))) ||
      (p === 'n8n' && techStack.some((t) => t.toLowerCase().includes('n8n')))
  )
  if (platforms.length === 0) return null

  return (
    <div className="flex items-center gap-1.5">
      {platforms.map((p) => {
        const Icon = platformIcons[p]
        return (
          <span
            key={p}
            className="flex items-center gap-1 rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] text-white/40"
          >
            <Icon className="h-2.5 w-2.5" />
            {p}
          </span>
        )
      })}
    </div>
  )
}

// ── Featured Template Card ──────────────────────────────────────────────────

function FeaturedCard({
  template,
}: {
  template: (typeof templates)[0]
}) {
  return (
    <SparkBorder color="gradient" hoverOnly={false} speed="slow">
      <div className="rounded-2xl bg-[#0a0f1a] p-1">
        <div className="flex flex-col gap-6 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent p-6 md:flex-row md:items-center md:p-8">
          {/* Left: Info */}
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-amber-400">
                Most Popular
              </span>
              <span className="rounded-full bg-purple-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-purple-400">
                {categoryLabels[template.category]}
              </span>
            </div>

            <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
              {template.name}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-white/50 md:text-base">
              {template.description}
            </p>

            <ul className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {template.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <CheckoutButton
                variantId={template.lemonSqueezy.variantId || undefined}
                price={template.price}
                originalPrice={template.originalPrice}
                label="Get Template"
                size="lg"
              />
              <span className="text-xs text-white/30">
                Includes commercial license
              </span>
            </div>
          </div>

          {/* Right: Tech & Stats */}
          <div className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 md:w-72">
            <div className="mb-4 text-center">
              <div className="mb-1 flex items-baseline justify-center gap-2">
                <span className="text-4xl font-bold text-white">${template.price}</span>
                {template.originalPrice && (
                  <span className="text-lg text-white/30 line-through">
                    ${template.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-xs text-emerald-400">
                Save ${(template.originalPrice || template.price) - template.price}
              </span>
            </div>

            <div className="mb-4 space-y-2 border-t border-white/[0.06] pt-4">
              {[
                { icon: Code2, text: 'Full source code' },
                { icon: Github, text: 'GitHub repo access' },
                { icon: Play, text: 'Video walkthrough' },
                { icon: Shield, text: 'Commercial license' },
                { icon: Zap, text: 'One-click deploy' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-white/50">
                  <Icon className="h-3.5 w-3.5 text-white/30" />
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1">
              {template.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-400/70 border border-cyan-500/15"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SparkBorder>
  )
}

// ── Template Card ───────────────────────────────────────────────────────────

function TemplateCard({
  template,
  index,
  isPremium,
}: {
  template: (typeof templates)[0]
  index: number
  isPremium: boolean
}) {
  const shouldReduceMotion = useReducedMotion()
  const color = categoryColors[template.category] || 'cyan'

  const card = (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05]"
    >
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="mb-3 flex items-start justify-between">
          <span className="rounded bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/40 border border-white/[0.08]">
            {categoryLabels[template.category] || template.category}
          </span>
          <div className="flex items-center gap-2">
            {template.featured && (
              <span className="flex items-center gap-1 rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/30">
                <Star className="h-2.5 w-2.5" />
                Featured
              </span>
            )}
          </div>
        </div>

        <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-cyan-400">
          {template.name}
        </h3>
        <p className="mb-3 text-xs text-white/40">{template.subtitle}</p>
      </div>

      {/* Description */}
      <div className="flex-1 px-5 pb-3">
        <p className="line-clamp-2 text-sm leading-relaxed text-white/45">
          {template.description}
        </p>
      </div>

      {/* Tech Stack + Deploy */}
      <div className="px-5 pb-3">
        <div className="mb-2 flex flex-wrap gap-1">
          {template.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-400/70 border border-cyan-500/15"
            >
              {tech}
            </span>
          ))}
          {template.techStack.length > 4 && (
            <span className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/30">
              +{template.techStack.length - 4}
            </span>
          )}
        </div>
        <DeployBadges techStack={template.techStack} />
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] px-5 py-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">${template.price}</span>
          {template.originalPrice && (
            <span className="text-sm text-white/30 line-through">${template.originalPrice}</span>
          )}
        </div>
        <CheckoutButton
          variantId={template.lemonSqueezy.variantId || undefined}
          price={template.price}
          originalPrice={template.originalPrice}
          label="Get"
          size="sm"
        />
      </div>
    </motion.div>
  )

  if (isPremium) {
    return (
      <SparkBorder color={color as 'emerald' | 'cyan' | 'purple' | 'amber'} hoverOnly>
        <div className="h-full rounded-2xl bg-[#0a0f1a]">{card}</div>
      </SparkBorder>
    )
  }

  return card
}

// ── Main Page ───────────────────────────────────────────────────────────────

export default function ShopTemplatesPage() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'tiers'>('tiers')
  const shouldReduceMotion = useReducedMotion()

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchCategory = category === 'All' || t.category === category
      const matchSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.techStack.some((s) => s.toLowerCase().includes(search.toLowerCase()))
      return matchCategory && matchSearch
    })
  }, [category, search])

  const featured = templates.find((t) => t.category === 'blueprint' && t.price >= 197) || templates[0]

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-16">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-purple-500/[0.03]" />
        <div className="pointer-events-none absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/[0.04] blur-[128px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <div className="mb-10 flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="transition-colors hover:text-white">
              Shop
            </Link>
            <span>/</span>
            <span className="text-white/70">Templates</span>
          </div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
              <Sparkles className="h-4 w-4" />
              {templates.length} Production Templates
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
              Ship{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                AI Systems
              </span>{' '}
              Faster
            </h1>

            <p className="mb-10 max-w-2xl text-lg text-white/50">
              Production-tested templates from the systems behind frankx.ai.
              Claude Code skills, n8n workflows, Next.js starters, and full AI architecture blueprints.
              Built by an AI architect who ships in production.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap gap-8 border-t border-white/[0.06] pt-6"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Template ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <FeaturedCard template={featured} />
      </section>

      {/* ── What's Included ─────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Code2, title: 'Full Source Code', desc: 'No obfuscation. Yours forever.' },
              { icon: Zap, title: 'One-Click Deploy', desc: 'Railway, Vercel, n8n ready.' },
              { icon: Play, title: 'Video Walkthrough', desc: 'Setup and customization guide.' },
              { icon: Shield, title: 'Commercial License', desc: 'Use in client projects.' },
              { icon: Download, title: 'Free Updates', desc: 'Lifetime access to improvements.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
                  <Icon className="h-4 w-4 text-white/50" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="text-xs text-white/40">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters + View Toggle ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 transition-colors focus:border-cyan-500/40 focus:outline-none"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1">
              <Filter className="mr-1 h-4 w-4 text-white/30" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    category === cat
                      ? 'border-cyan-500/30 bg-cyan-500/20 text-cyan-400'
                      : 'border-transparent bg-white/[0.04] text-white/40 hover:text-white/60'
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 rounded-lg bg-white/[0.04] p-1">
            <button
              onClick={() => setViewMode('tiers')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                viewMode === 'tiers'
                  ? 'bg-white/[0.1] text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              By Tier
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-white/[0.1] text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </section>

      {/* ── Template Grid ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        {viewMode === 'tiers' && category === 'All' && !search ? (
          // Tiered view
          <div className="space-y-16">
            {tiers.map((tier) => {
              const tierTemplates = filtered.filter(tier.filter)
              if (tierTemplates.length === 0) return null

              return (
                <div key={tier.name}>
                  <div className="mb-6 flex items-center gap-3">
                    <h2 className="text-xl font-bold text-white">{tier.name}</h2>
                    <span className="rounded-full bg-white/[0.06] px-3 py-0.5 text-xs text-white/40">
                      {tier.range}
                    </span>
                    <div className="ml-2 h-px flex-1 bg-white/[0.06]" />
                  </div>
                  <p className="mb-6 text-sm text-white/40">{tier.description}</p>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tierTemplates.map((template, index) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        index={index}
                        isPremium={template.price >= 197}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          // Flat grid view (search/filter active)
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  index={index}
                  isPremium={template.price >= 197}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-lg text-white/40">No templates match your search.</p>
                <button
                  onClick={() => {
                    setSearch('')
                    setCategory('All')
                  }}
                  className="mt-4 text-sm text-cyan-400 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                q: 'What do I get when I purchase?',
                a: 'Full source code in a private GitHub repo, deploy configs for Railway/Vercel, a video walkthrough, and access to our Discord support channel.',
              },
              {
                q: 'Can I use templates for client projects?',
                a: 'Yes. All templates include a commercial license. Use them for client projects, SaaS products, or internal tools.',
              },
              {
                q: 'Do I need my own API keys?',
                a: 'Yes. Templates require your own API keys for AI providers (Anthropic, OpenAI, Google, or OCI). You control your costs.',
              },
              {
                q: 'Are updates included?',
                a: 'Yes. All future updates to the template are included free. You get lifetime access to the GitHub repo.',
              },
              {
                q: 'What platforms can I deploy to?',
                a: 'Templates include configs for Railway (backend), Vercel (frontend), and n8n (workflows). One-click deploy buttons included.',
              },
              {
                q: 'Is there a refund policy?',
                a: 'Due to the digital nature of the product (immediate source code access), we cannot offer refunds. Review the features carefully before purchasing.',
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
              >
                <h4 className="mb-2 font-semibold text-white">{faq.q}</h4>
                <p className="text-sm leading-relaxed text-white/45">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Need a Custom Solution?</h2>
          <p className="mb-8 text-white/50">
            I build production AI systems for startups and enterprises.
            If you need something beyond these templates, let&apos;s talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GlowButton href="/ai-architecture" color="cyan" variant="primary" size="lg">
              View Blueprints
              <ArrowRight className="h-4 w-4" />
            </GlowButton>
            <GlowButton href="/start" color="emerald" variant="secondary" size="lg">
              Book a Consultation
            </GlowButton>
          </div>
        </div>
      </section>

      {/* ── Affiliate Disclosure ─────────────────────────────────────────── */}
      <div className="border-t border-white/[0.04] py-6">
        <p className="mx-auto max-w-7xl px-6 text-[11px] text-white/20">
          Deploy buttons may include affiliate links for Railway, Vercel, and n8n.
          This helps support the creation of free blueprints and tutorials.
          See our{' '}
          <Link href="/affiliates" className="underline hover:text-white/40">
            affiliate disclosure
          </Link>.
        </p>
      </div>
    </div>
  )
}
