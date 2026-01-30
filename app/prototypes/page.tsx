'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Layers,
  Shield,
  Database,
  Network,
  Server,
  Settings,
  DollarSign,
  Activity,
  Building,
  Lock,
  ExternalLink,
  Filter,
} from 'lucide-react'

import prototypesData from '@/data/ai-architecture/prototypes.json'
import { CATEGORY_META, CLOUD_PROVIDER_META, DIFFICULTY_META } from '@/types/ai-architecture'
import type { ArchitecturePrototype, PrototypeCategory, CloudProvider, DifficultyLevel } from '@/types/ai-architecture'

// Type assertion for imported JSON
const prototypes = prototypesData as ArchitecturePrototype[]

// Icon mapping for categories
const categoryIcons: Record<PrototypeCategory, typeof Shield> = {
  'ai-gateway': Shield,
  'rag-production': Database,
  'multi-agent-orchestration': Network,
  'mcp-servers': Server,
  'llm-ops': Settings,
  'vector-databases': Layers,
  'ai-coe': Building,
  'security-governance': Lock,
  'cost-optimization': DollarSign,
  'observability': Activity,
}

// Color mapping for categories
const categoryColors: Record<PrototypeCategory, string> = {
  'ai-gateway': 'violet',
  'rag-production': 'emerald',
  'multi-agent-orchestration': 'cyan',
  'mcp-servers': 'orange',
  'llm-ops': 'rose',
  'vector-databases': 'amber',
  'ai-coe': 'blue',
  'security-governance': 'red',
  'cost-optimization': 'green',
  'observability': 'purple',
}

const colorMap: Record<string, { bg: string; border: string; icon: string; text: string }> = {
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    icon: 'bg-violet-500/20 text-violet-400',
    text: 'text-violet-400',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/20 text-emerald-400',
    text: 'text-emerald-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20 hover:border-orange-500/40',
    icon: 'bg-orange-500/20 text-orange-400',
    text: 'text-orange-400',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20 hover:border-rose-500/40',
    icon: 'bg-rose-500/20 text-rose-400',
    text: 'text-rose-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    icon: 'bg-amber-500/20 text-amber-400',
    text: 'text-amber-400',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    icon: 'bg-blue-500/20 text-blue-400',
    text: 'text-blue-400',
  },
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20 hover:border-red-500/40',
    icon: 'bg-red-500/20 text-red-400',
    text: 'text-red-400',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20 hover:border-green-500/40',
    icon: 'bg-green-500/20 text-green-400',
    text: 'text-green-400',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    icon: 'bg-purple-500/20 text-purple-400',
    text: 'text-purple-400',
  },
}

// Difficulty badge colors
const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  expert: 'bg-red-500/20 text-red-400 border-red-500/30',
}

// Cloud provider badge colors
const cloudColors: Record<CloudProvider, string> = {
  aws: 'bg-orange-500/10 text-orange-400',
  gcp: 'bg-blue-500/10 text-blue-400',
  azure: 'bg-cyan-500/10 text-cyan-400',
  oci: 'bg-red-500/10 text-red-400',
  'multi-cloud': 'bg-violet-500/10 text-violet-400',
}

function PrototypesBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      <motion.div
        className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-40 bottom-20 h-[400px] w-[400px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function PrototypeCard({ prototype, index }: { prototype: ArchitecturePrototype; index: number }) {
  const color = categoryColors[prototype.category] || 'violet'
  const colors = colorMap[color]
  const Icon = categoryIcons[prototype.category] || Layers

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/prototype/${prototype.slug}`} className="group block h-full">
        <div
          className={`relative flex h-full flex-col rounded-2xl border ${colors.border} ${colors.bg} p-6 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}
        >
          {/* Status badge */}
          {prototype.status === 'published' && (
            <div className="absolute -right-2 -top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
              Live
            </div>
          )}

          {/* Icon and category */}
          <div className="mb-4 flex items-center justify-between">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}>
              <Icon className="h-6 w-6" />
            </div>
            <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${difficultyColors[prototype.difficulty]}`}>
              {DIFFICULTY_META[prototype.difficulty].name}
            </span>
          </div>

          {/* Title and subtitle */}
          <h3 className="mb-2 text-lg font-bold text-white group-hover:text-white/90">
            {prototype.title}
          </h3>
          <p className="mb-4 text-sm text-slate-400 line-clamp-2">{prototype.subtitle}</p>

          {/* Cloud providers */}
          <div className="mb-4 flex flex-wrap gap-1">
            {prototype.cloudProviders.slice(0, 3).map((provider) => (
              <span
                key={provider}
                className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${cloudColors[provider]}`}
              >
                {CLOUD_PROVIDER_META[provider].shortName}
              </span>
            ))}
            {prototype.cloudProviders.length > 3 && (
              <span className="rounded px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                +{prototype.cloudProviders.length - 3}
              </span>
            )}
          </div>

          {/* Technologies */}
          <div className="mb-4 flex flex-wrap gap-1">
            {prototype.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
            {prototype.estimatedCost && (
              <span className="text-xs text-slate-500">
                ~${prototype.estimatedCost.monthly.toLocaleString()}/mo
              </span>
            )}
            <div className="flex items-center gap-1 text-slate-400 group-hover:text-white">
              <span className="text-xs font-medium">View details</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function PrototypesPage() {
  const publishedPrototypes = prototypes.filter((p) => p.status === 'published')

  return (
    <>
      <PrototypesBackground />
      <main className="relative min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Architecture Prototypes
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl"
            >
              Production-Ready
              <span className="block bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                Architecture Blueprints
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg text-slate-400"
            >
              Complete architecture prototypes with diagrams, implementation guides, cost estimates, and code examples.
              Start from proven patterns, customize for your needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/ai-architect-academy"
                className="group flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                <Building className="h-4 w-4" />
                AI Architect Academy
              </Link>
              <a
                href="https://github.com/frankxai/ai-architect-academy"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                View on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 border-y border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { value: publishedPrototypes.length, label: 'Prototypes' },
                { value: '4', label: 'Cloud Providers' },
                { value: '10', label: 'Categories' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prototypes Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">All Prototypes</h2>
              <button className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-400 hover:bg-white/5">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>

            {publishedPrototypes.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {publishedPrototypes.map((prototype, index) => (
                  <PrototypeCard key={prototype.id} prototype={prototype} index={index} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
                <Layers className="mx-auto mb-4 h-12 w-12 text-slate-500" />
                <h3 className="mb-2 text-lg font-semibold text-white">Coming Soon</h3>
                <p className="text-slate-400">
                  Architecture prototypes are being prepared. Check back soon or explore the{' '}
                  <a href="https://github.com/frankxai/ai-architect-academy" className="text-cyan-400 hover:underline">
                    GitHub repository
                  </a>{' '}
                  for patterns.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">Have a Prototype Idea?</h2>
            <p className="mb-6 text-slate-400">
              The AI Architect Academy is open source. Contribute your patterns and prototypes to help others.
            </p>
            <a
              href="https://github.com/frankxai/ai-architect-academy/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Suggest a Prototype
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
