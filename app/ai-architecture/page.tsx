'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Layers,
  BookOpen,
  Play,
  Package,
  Wrench,
  ArrowRight,
  Shield,
  Database,
  Network,
  Server,
  Key,
  ExternalLink,
  Sparkles,
  Zap,
  Globe,
  Lock,
} from 'lucide-react'

import prototypesData from '@/data/ai-architecture/prototypes.json'
import { CATEGORY_META, AI_PROVIDER_META } from '@/types/ai-architecture'
import type { ArchitecturePrototype, PrototypeCategory, AIProvider } from '@/types/ai-architecture'

const blueprints = prototypesData as ArchitecturePrototype[]

const hubSections = [
  {
    id: 'blueprints',
    title: 'Blueprints',
    description: 'Architecture diagrams, implementation guides & production patterns. Free to learn from.',
    icon: BookOpen,
    href: '/ai-architecture/blueprints',
    color: 'cyan',
    badge: 'FREE',
    stat: `${blueprints.filter(b => b.status === 'published').length}+ patterns`,
  },
  {
    id: 'prototypes',
    title: 'Prototypes',
    description: 'Interactive demos powered by your own API keys. Test patterns before building.',
    icon: Play,
    href: '/ai-architecture/prototypes',
    color: 'violet',
    badge: 'BYOK',
    stat: 'Live demos',
  },
  {
    id: 'templates',
    title: 'Templates',
    description: 'Production-ready starter kits with one-click deploy to Vercel, Railway, or OCI.',
    icon: Package,
    href: '/ai-architecture/templates',
    color: 'emerald',
    badge: '$29+',
    stat: 'Ship faster',
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Curated collection of frameworks, databases, platforms & developer resources.',
    icon: Wrench,
    href: '/ai-architecture/tools',
    color: 'amber',
    badge: null,
    stat: '30+ tools',
  },
]

const categoryIcons: Record<PrototypeCategory, typeof Shield> = {
  'ai-gateway': Shield,
  'rag-production': Database,
  'multi-agent-orchestration': Network,
  'mcp-servers': Server,
  'llm-ops': Wrench,
  'vector-databases': Layers,
  'ai-coe': BookOpen,
  'security-governance': Shield,
  'cost-optimization': Sparkles,
  'observability': Play,
}

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string; glow: string }> = {
  cyan: {
    bg: 'bg-cyan-500/[0.06]',
    border: 'border-cyan-500/20 hover:border-cyan-400/40',
    icon: 'bg-cyan-500/15 text-cyan-400',
    badge: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25',
    glow: 'group-hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)]',
  },
  violet: {
    bg: 'bg-violet-500/[0.06]',
    border: 'border-violet-500/20 hover:border-violet-400/40',
    icon: 'bg-violet-500/15 text-violet-400',
    badge: 'bg-violet-500/15 text-violet-400 border border-violet-500/25',
    glow: 'group-hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)]',
  },
  emerald: {
    bg: 'bg-emerald-500/[0.06]',
    border: 'border-emerald-500/20 hover:border-emerald-400/40',
    icon: 'bg-emerald-500/15 text-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
    glow: 'group-hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]',
  },
  amber: {
    bg: 'bg-amber-500/[0.06]',
    border: 'border-amber-500/20 hover:border-amber-400/40',
    icon: 'bg-amber-500/15 text-amber-400',
    badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
    glow: 'group-hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)]',
  },
}

const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

function HubBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#030712]" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Ambient orbs */}
      <motion.div
        className="absolute -right-60 top-20 h-[600px] w-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.35, 0.5] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.08, 1, 1.08], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function SectionCard({
  section,
}: {
  section: (typeof hubSections)[0]
}) {
  const Icon = section.icon
  const colors = colorMap[section.color]

  return (
    <motion.div variants={staggerChild}>
      <Link href={section.href} className="group block h-full">
        <div
          className={`relative h-full rounded-2xl border ${colors.border} ${colors.bg} p-6 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 ${colors.glow}`}
        >
          {/* Noise texture overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} aria-hidden />

          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon} transition-transform duration-300 group-hover:scale-105`}>
                <Icon className="h-6 w-6" />
              </div>
              {section.badge && (
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${colors.badge}`}>
                  {section.badge}
                </span>
              )}
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">{section.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{section.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{section.stat}</span>
              <div className="flex items-center gap-1 text-sm text-slate-500 transition-colors group-hover:text-white">
                <span>Explore</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function BlueprintCard({ blueprint, index }: { blueprint: ArchitecturePrototype; index: number }) {
  const Icon = categoryIcons[blueprint.category] || Layers
  const categoryMeta = CATEGORY_META[blueprint.category]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={`/blueprint/${blueprint.slug}`} className="group block h-full">
        <div className="relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-cyan-500/[0.05]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-white truncate">{blueprint.title}</h4>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{categoryMeta?.name}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 line-clamp-2">{blueprint.subtitle}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {blueprint.cloudProviders.slice(0, 3).map((provider) => (
                <span
                  key={provider}
                  className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-slate-500"
                >
                  {provider.toUpperCase()}
                </span>
              ))}
              {blueprint.cloudProviders.length > 3 && (
                <span className="text-[10px] text-slate-600">+{blueprint.cloudProviders.length - 3}</span>
              )}
            </div>
            <ArrowRight className="h-4 w-4 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function ProviderButton({ provider }: { provider: AIProvider }) {
  const meta = AI_PROVIDER_META[provider]
  const providerColors: Record<string, string> = {
    orange: 'border-orange-500/25 hover:border-orange-400/50 hover:bg-orange-500/10',
    emerald: 'border-emerald-500/25 hover:border-emerald-400/50 hover:bg-emerald-500/10',
    blue: 'border-blue-500/25 hover:border-blue-400/50 hover:bg-blue-500/10',
    red: 'border-red-500/25 hover:border-red-400/50 hover:bg-red-500/10',
  }

  return (
    <a
      href={meta.keyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 rounded-lg border bg-white/[0.02] px-3 py-2 text-sm text-slate-400 transition-all hover:text-white ${providerColors[meta.color]}`}
    >
      <Key className="h-3.5 w-3.5" />
      <span className="font-medium">{meta.shortName}</span>
      <ExternalLink className="h-3 w-3 opacity-40" />
    </a>
  )
}

export default function AIArchitectureHubPage() {
  const publishedBlueprints = blueprints.filter((b) => b.status === 'published').slice(0, 6)

  return (
    <>
      <HubBackground />
      <main className="relative min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-8 sm:pt-36 sm:pb-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500/30 to-violet-500/30">
                <Layers className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                AI Architecture Hub
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Learn. Try.{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                Build.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-400"
            >
              Production-ready AI architecture patterns. Explore blueprints, test with your own API
              keys, and deploy with starter templates. Cloud-agnostic patterns that work everywhere.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/ai-architecture/blueprints"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
              >
                <BookOpen className="h-4 w-4" />
                Browse Blueprints
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/ai-architecture/prototypes"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <Play className="h-4 w-4" />
                Try Prototypes
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Journey Steps - Visual progression */}
        <section className="py-6">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center gap-3 text-xs font-medium text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                Learn
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/40 to-violet-500/40" />
              <span className="flex items-center gap-1.5">
                <Play className="h-3.5 w-3.5 text-violet-400" />
                Try
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-violet-500/40 to-emerald-500/40" />
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                Build
              </span>
            </motion.div>
          </div>
        </section>

        {/* Hub Navigation Cards */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {hubSections.map((section) => (
                <SectionCard key={section.id} section={section} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* BYOK Section */}
        <section className="py-12 border-y border-white/[0.04]">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-violet-500/15 bg-violet-500/[0.04] p-8 backdrop-blur-sm"
            >
              {/* Subtle glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" aria-hidden />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15">
                      <Lock className="h-5 w-5 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Bring Your Own Key</h3>
                      <p className="text-xs font-medium text-violet-400/80">Zero cost to us. Full control to you.</p>
                    </div>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-slate-400">
                    Try prototypes using your own API keys. Keys stay in your browser localStorage —
                    never sent to our servers. Works with any provider. You control costs.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <ProviderButton provider="anthropic" />
                  <ProviderButton provider="openai" />
                  <ProviderButton provider="google" />
                  <ProviderButton provider="oci" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Blueprints */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400"
                >
                  Architecture Patterns
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-white sm:text-3xl"
                >
                  Featured Blueprints
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="mt-2 text-slate-400"
                >
                  Production-ready patterns with diagrams, guides & cost estimates
                </motion.p>
              </div>
              <Link
                href="/ai-architecture/blueprints"
                className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-400 transition-all hover:border-white/20 hover:text-white sm:flex"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {publishedBlueprints.map((blueprint, index) => (
                <BlueprintCard key={blueprint.id} blueprint={blueprint} index={index} />
              ))}
            </div>

            <div className="mt-6 flex justify-center sm:hidden">
              <Link
                href="/ai-architecture/blueprints"
                className="flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300"
              >
                View all blueprints
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Templates Teaser */}
        <section className="py-16 border-t border-white/[0.04]">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] p-8 sm:p-10 text-center"
            >
              {/* Decorative glow */}
              <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 bg-emerald-500/10 blur-3xl" aria-hidden />

              <div className="relative">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
                  <Package className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">Starter Templates</h3>
                <p className="mx-auto mb-8 max-w-lg text-slate-400 leading-relaxed">
                  Production-ready starter kits with one-click deploy. From RAG pipelines
                  to multi-agent frameworks — ship in hours, not weeks.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {[
                    { name: 'RAG Starter Kit', price: '$49' },
                    { name: 'Multi-Agent Framework', price: '$99' },
                    { name: 'AI Chat Widget', price: '$29' },
                    { name: 'MCP Server Kit', price: '$39' },
                  ].map((template) => (
                    <span
                      key={template.name}
                      className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-2 text-sm text-emerald-400"
                    >
                      {template.name} <span className="text-emerald-500/60">•</span> {template.price}
                    </span>
                  ))}
                </div>
                <Link
                  href="/ai-architecture/templates"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Browse Templates
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cloud Agnostic */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-white">
                <Globe className="h-6 w-6" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-white">Cloud-Agnostic Patterns</h2>
              <p className="mx-auto mb-10 max-w-lg text-slate-400">
                Learn the pattern once, deploy anywhere. All blueprints and templates
                work across major cloud providers.
              </p>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'AWS', color: 'border-orange-500/20 text-orange-400 bg-orange-500/[0.06]' },
                { name: 'GCP', color: 'border-blue-500/20 text-blue-400 bg-blue-500/[0.06]' },
                { name: 'Azure', color: 'border-cyan-500/20 text-cyan-400 bg-cyan-500/[0.06]' },
                { name: 'OCI', color: 'border-red-500/20 text-red-400 bg-red-500/[0.06]' },
              ].map((cloud) => (
                <motion.div
                  key={cloud.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl border px-8 py-4 text-sm font-semibold ${cloud.color}`}
                >
                  {cloud.name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
