'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
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
  CheckCircle2,
  Clock,
  Code2,
  FileText,
} from 'lucide-react'

import prototypesData from '@/data/ai-architecture/prototypes.json'
import { CATEGORY_META, CLOUD_PROVIDER_META, DIFFICULTY_META } from '@/types/ai-architecture'
import type { ArchitecturePrototype, PrototypeCategory, CloudProvider } from '@/types/ai-architecture'
import { ArchitectureDiagram, ARCHITECTURE_PRESETS } from '@/components/ai-architecture'

const prototypes = prototypesData as ArchitecturePrototype[]

// Icon mapping
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

const cloudColors: Record<CloudProvider, string> = {
  aws: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  gcp: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  azure: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  oci: 'bg-red-500/20 text-red-400 border-red-500/30',
  'multi-cloud': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
}

function PrototypeBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <motion.div
        className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export default function PrototypePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const prototype = prototypes.find((p) => p.slug === id || p.id === id)

  if (!prototype) {
    notFound()
  }

  const Icon = categoryIcons[prototype.category] || Layers
  const categoryMeta = CATEGORY_META[prototype.category]
  const difficultyMeta = DIFFICULTY_META[prototype.difficulty]

  return (
    <>
      <PrototypeBackground />
      <main className="relative min-h-screen">
        {/* Header */}
        <section className="pt-28 pb-12">
          <div className="mx-auto max-w-5xl px-6">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link
                href="/prototypes"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Prototypes
              </Link>
            </motion.div>

            {/* Title section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 flex items-start gap-4"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-violet-500/20 px-2.5 py-0.5 text-xs font-medium text-violet-400">
                    {categoryMeta?.name || prototype.category}
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                    difficultyMeta.color === 'green' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                    difficultyMeta.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                    difficultyMeta.color === 'orange' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                    'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}>
                    {difficultyMeta.name}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white sm:text-4xl">{prototype.title}</h1>
                <p className="mt-2 text-lg text-slate-400">{prototype.subtitle}</p>
              </div>
            </motion.div>

            {/* Cloud providers and tech */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Clouds:</span>
                {prototype.cloudProviders.map((provider) => (
                  <span
                    key={provider}
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${cloudColors[provider]}`}
                  >
                    {CLOUD_PROVIDER_META[provider].shortName}
                  </span>
                ))}
              </div>
              {prototype.timeToImplement && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  {prototype.timeToImplement}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <h2 className="mb-4 text-xl font-semibold text-white">Overview</h2>
                  <p className="text-slate-400 leading-relaxed">{prototype.overview}</p>
                </motion.div>

                {/* Problem & Solution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                    <h3 className="mb-3 font-semibold text-red-400">Problem</h3>
                    <p className="text-sm text-slate-400">{prototype.problem}</p>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                    <h3 className="mb-3 font-semibold text-emerald-400">Solution</h3>
                    <p className="text-sm text-slate-400">{prototype.solution}</p>
                  </div>
                </motion.div>

                {/* Interactive Architecture Diagram */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                >
                  <ArchitectureDiagram
                    preset={
                      prototype.category === 'rag-production'
                        ? 'ragPipeline'
                        : prototype.category === 'multi-agent-orchestration'
                        ? 'multiAgent'
                        : prototype.category === 'ai-gateway'
                        ? 'aiGateway'
                        : 'ragPipeline'
                    }
                    title={`${prototype.title} Architecture`}
                  />
                </motion.div>

                {/* Implementation Steps */}
                {prototype.implementationSteps && prototype.implementationSteps.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                  >
                    <h2 className="mb-6 text-xl font-semibold text-white">Implementation Phases</h2>
                    <div className="space-y-6">
                      {prototype.implementationSteps.map((step, index) => (
                        <div key={index} className="relative pl-8">
                          <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
                            {step.phase}
                          </div>
                          <h4 className="mb-2 font-semibold text-white">{step.title}</h4>
                          <p className="mb-3 text-sm text-slate-400">{step.description}</p>
                          {step.tasks && step.tasks.length > 0 && (
                            <ul className="space-y-1">
                              {step.tasks.map((task, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                                  {task}
                                </li>
                              ))}
                            </ul>
                          )}
                          {step.estimatedDuration && (
                            <p className="mt-2 text-xs text-slate-600">
                              Duration: {step.estimatedDuration}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Code Examples */}
                {prototype.codeExamples && prototype.codeExamples.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                  >
                    <h2 className="mb-6 text-xl font-semibold text-white">Code Examples</h2>
                    {prototype.codeExamples.map((example) => (
                      <div key={example.id} className="mb-6 last:mb-0">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium text-white">{example.title}</h4>
                          <span className="rounded bg-white/10 px-2 py-0.5 text-xs text-slate-400">
                            {example.language}
                          </span>
                        </div>
                        {example.description && (
                          <p className="mb-3 text-sm text-slate-500">{example.description}</p>
                        )}
                        <pre className="overflow-x-auto rounded-lg bg-[#0d1117] p-4 text-sm">
                          <code className="text-slate-300">{example.code}</code>
                        </pre>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Cost Estimate */}
                {prototype.estimatedCost && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                  >
                    <h3 className="mb-4 font-semibold text-white">Cost Estimate</h3>
                    <div className="mb-4">
                      <p className="text-3xl font-bold text-white">
                        ${prototype.estimatedCost.monthly.toLocaleString()}
                        <span className="text-base font-normal text-slate-500">/mo</span>
                      </p>
                      <p className="text-sm text-slate-500">
                        ~${prototype.estimatedCost.annual.toLocaleString()}/year
                      </p>
                    </div>
                    <div className="space-y-2">
                      {prototype.estimatedCost.breakdown.map((item) => (
                        <div key={item.category} className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">{item.category}</span>
                          <span className="text-slate-300">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <h3 className="mb-4 font-semibold text-white">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {prototype.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Use Cases */}
                {prototype.useCases && prototype.useCases.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                  >
                    <h3 className="mb-4 font-semibold text-white">Use Cases</h3>
                    <ul className="space-y-2">
                      {prototype.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Related Patterns */}
                {prototype.relatedPatterns && prototype.relatedPatterns.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                  >
                    <h3 className="mb-4 font-semibold text-white">Related Patterns</h3>
                    <div className="space-y-2">
                      {prototype.relatedPatterns.map((pattern) => (
                        <Link
                          key={pattern}
                          href={`/ai-architect-academy/patterns#${pattern}`}
                          className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm text-slate-400 hover:bg-white/10 hover:text-white"
                        >
                          <span className="capitalize">{pattern.replace(/-/g, ' ')}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-3"
                >
                  <a
                    href="https://github.com/frankxai/ai-architect-academy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <Code2 className="h-4 w-4" />
                    View Source on GitHub
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <Link
                    href="/ai-architect-academy"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 font-medium text-white transition-all hover:bg-white/10"
                  >
                    <Building className="h-4 w-4" />
                    Explore Academy
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
