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
  BookOpen,
  ChevronLeft,
} from 'lucide-react'

import prototypesData from '@/data/ai-architecture/prototypes.json'
import { CATEGORY_META, CLOUD_PROVIDER_META, DIFFICULTY_META } from '@/types/ai-architecture'
import type { ArchitecturePrototype, PrototypeCategory, CloudProvider, DifficultyLevel } from '@/types/ai-architecture'

const blueprints = prototypesData as ArchitecturePrototype[]

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

// Difficulty badge colors
const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  expert: 'bg-red-500/20 text-red-400 border-red-500/30',
}

// Cloud provider colors
const cloudColors: Record<CloudProvider, string> = {
  aws: 'bg-orange-500/10 text-orange-400',
  gcp: 'bg-blue-500/10 text-blue-400',
  azure: 'bg-cyan-500/10 text-cyan-400',
  oci: 'bg-red-500/10 text-red-400',
  'multi-cloud': 'bg-violet-500/10 text-violet-400',
}

function BlueprintCard({ blueprint, index }: { blueprint: ArchitecturePrototype; index: number }) {
  const Icon = categoryIcons[blueprint.category] || Layers

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/ai-architecture/${blueprint.slug}`} className="group block h-full">
        <div className="relative flex h-full flex-col rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 group-hover:-translate-y-1 group-hover:shadow-xl">
          {/* Type badge */}
          <div className="absolute -right-2 -top-2 rounded-full bg-cyan-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-white">
            Blueprint
          </div>

          {/* Icon and category */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
              <Icon className="h-6 w-6" />
            </div>
            <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${difficultyColors[blueprint.difficulty]}`}>
              {DIFFICULTY_META[blueprint.difficulty].name}
            </span>
          </div>

          {/* Title and subtitle */}
          <h3 className="mb-2 text-lg font-bold text-white group-hover:text-white/90">
            {blueprint.title}
          </h3>
          <p className="mb-4 text-sm text-slate-400 line-clamp-2">{blueprint.subtitle}</p>

          {/* Cloud providers */}
          <div className="mb-4 flex flex-wrap gap-1">
            {blueprint.cloudProviders.slice(0, 3).map((provider) => (
              <span
                key={provider}
                className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${cloudColors[provider]}`}
              >
                {CLOUD_PROVIDER_META[provider].shortName}
              </span>
            ))}
            {blueprint.cloudProviders.length > 3 && (
              <span className="rounded px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                +{blueprint.cloudProviders.length - 3}
              </span>
            )}
          </div>

          {/* Technologies */}
          <div className="mb-4 flex flex-wrap gap-1">
            {blueprint.technologies.slice(0, 3).map((tech) => (
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
            {blueprint.estimatedCost && (
              <span className="text-xs text-slate-500">
                ~${blueprint.estimatedCost.monthly.toLocaleString()}/mo
              </span>
            )}
            <div className="flex items-center gap-1 text-slate-400 group-hover:text-cyan-400">
              <span className="text-xs font-medium">View blueprint</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function BlueprintsPage() {
  const publishedBlueprints = blueprints.filter((b) => b.status === 'published')

  return (
    <main className="min-h-screen bg-[#030712]">
      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/ai-architecture"
            className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Hub
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Architecture Blueprints</h1>
              <p className="text-slate-400">
                Diagrams, implementation guides & cost estimates • <span className="text-cyan-400">FREE</span>
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-slate-400"
          >
            Reference architectures for enterprise AI systems. Each blueprint includes Mermaid diagrams,
            component breakdowns, implementation steps, and realistic cost estimates. Cloud-agnostic
            patterns that work on AWS, GCP, Azure, or OCI.
          </motion.p>
        </div>
      </section>

      {/* Blueprints Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          {publishedBlueprints.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {publishedBlueprints.map((blueprint, index) => (
                <BlueprintCard key={blueprint.id} blueprint={blueprint} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-slate-500" />
              <h3 className="mb-2 text-lg font-semibold text-white">Coming Soon</h3>
              <p className="text-slate-400">
                Architecture blueprints are being prepared. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Want to Try These Patterns?</h2>
          <p className="mb-6 text-slate-400">
            Use your own API keys to test blueprints interactively in our prototypes.
          </p>
          <Link
            href="/ai-architecture/prototypes"
            className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Try Prototypes (BYOK)
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
