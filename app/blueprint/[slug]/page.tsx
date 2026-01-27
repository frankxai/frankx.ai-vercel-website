import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronLeft,
  Play,
  Package,
  Clock,
  DollarSign,
  ExternalLink,
} from 'lucide-react'

import dynamic from 'next/dynamic'

import prototypesData from '@/data/ai-architecture/prototypes.json'
import { CATEGORY_META, CLOUD_PROVIDER_META, DIFFICULTY_META } from '@/types/ai-architecture'
import type { ArchitecturePrototype } from '@/types/ai-architecture'

// Dynamic import for client-side ReactFlow component
const BlueprintDiagram = dynamic(() => import('./BlueprintDiagram'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] rounded-2xl border border-white/10 bg-slate-900/80 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-slate-400">Loading interactive diagram...</span>
      </div>
    </div>
  ),
})

const blueprints = prototypesData as ArchitecturePrototype[]

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blueprints.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const blueprint = blueprints.find((b) => b.slug === slug)
  if (!blueprint) return { title: 'Blueprint Not Found' }

  return {
    title: `${blueprint.title} | AI Architecture Blueprint`,
    description: blueprint.metaDescription || blueprint.subtitle,
  }
}

export default async function BlueprintPage({ params }: Props) {
  const { slug } = await params
  const blueprint = blueprints.find((b) => b.slug === slug)

  if (!blueprint) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#030712]">
      {/* Header */}
      <section className="pt-32 pb-12 border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/ai-architecture/blueprints"
            className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            All Blueprints
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-400">
              BLUEPRINT
            </span>
            <span className="text-sm text-slate-500">
              {CATEGORY_META[blueprint.category].name}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-white">{blueprint.title}</h1>
          <p className="mb-6 text-lg text-slate-400">{blueprint.subtitle}</p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm">
            <span className={`rounded-full border px-3 py-1 ${
              blueprint.difficulty === 'beginner' ? 'border-green-500/30 text-green-400' :
              blueprint.difficulty === 'intermediate' ? 'border-yellow-500/30 text-yellow-400' :
              blueprint.difficulty === 'advanced' ? 'border-orange-500/30 text-orange-400' :
              'border-red-500/30 text-red-400'
            }`}>
              {DIFFICULTY_META[blueprint.difficulty].name}
            </span>
            {blueprint.timeToImplement && (
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="h-4 w-4" />
                {blueprint.timeToImplement}
              </span>
            )}
            {blueprint.estimatedCost && (
              <span className="flex items-center gap-1 text-slate-400">
                <DollarSign className="h-4 w-4" />
                ~${blueprint.estimatedCost.monthly.toLocaleString()}/mo
              </span>
            )}
          </div>

          {/* Cloud providers */}
          <div className="mt-6 flex flex-wrap gap-2">
            {blueprint.cloudProviders.map((provider) => (
              <span
                key={provider}
                className="rounded bg-white/5 px-3 py-1 text-sm text-slate-400"
              >
                {CLOUD_PROVIDER_META[provider].name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="py-8 border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/ai-architecture/prototypes"
              className="flex items-center gap-2 rounded-full bg-violet-500 px-5 py-2.5 font-semibold text-white transition-all hover:-translate-y-0.5"
            >
              <Play className="h-4 w-4" />
              Try Prototype (BYOK)
            </Link>
            <Link
              href="/ai-architecture/templates"
              className="flex items-center gap-2 rounded-full border border-emerald-500/30 px-5 py-2.5 font-semibold text-emerald-400 transition-all hover:bg-emerald-500/10"
            >
              <Package className="h-4 w-4" />
              Get Template
            </Link>
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-semibold text-white transition-all hover:bg-white/10"
            >
              Open in AI Studio
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          {/* Problem & Solution */}
          <div className="mb-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
              <h3 className="mb-3 text-lg font-semibold text-red-400">The Problem</h3>
              <p className="text-slate-400">{blueprint.problem}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h3 className="mb-3 text-lg font-semibold text-emerald-400">The Solution</h3>
              <p className="text-slate-400">{blueprint.solution}</p>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">Overview</h2>
            <p className="text-slate-400 leading-relaxed">{blueprint.overview}</p>
          </div>

          {/* Interactive Architecture Diagram */}
          {blueprint.architecture.components.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-white">Architecture</h2>
              <BlueprintDiagram
                components={blueprint.architecture.components}
                flows={blueprint.architecture.flows}
                title={`${blueprint.title} Architecture`}
              />
            </div>
          )}

          {/* Components */}
          {blueprint.architecture.components.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-white">Components</h2>
              <div className="space-y-4">
                {blueprint.architecture.components.map((component) => (
                  <div
                    key={component.id}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-semibold text-white">{component.name}</h4>
                      <span className="rounded bg-white/10 px-2 py-0.5 text-xs text-slate-400">
                        {component.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{component.description}</p>
                    {component.cloudService && (
                      <p className="mt-2 text-xs text-slate-500">
                        Service: {component.cloudService}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Implementation Steps */}
          {blueprint.implementationSteps.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-white">Implementation Steps</h2>
              <div className="space-y-6">
                {blueprint.implementationSteps.map((step) => (
                  <div key={step.phase} className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-400">
                        {step.phase}
                      </span>
                      <div>
                        <h4 className="font-semibold text-white">{step.title}</h4>
                        {step.estimatedDuration && (
                          <p className="text-xs text-slate-500">{step.estimatedDuration}</p>
                        )}
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-slate-400">{step.description}</p>
                    <div className="mb-4">
                      <h5 className="mb-2 text-xs font-semibold uppercase text-slate-500">Tasks</h5>
                      <ul className="space-y-1">
                        {step.tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-600" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="mb-2 text-xs font-semibold uppercase text-slate-500">Deliverables</h5>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((d, i) => (
                          <span key={i} className="rounded bg-white/5 px-2 py-1 text-xs text-slate-400">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Examples */}
          {blueprint.codeExamples.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-white">Code Examples</h2>
              <div className="space-y-6">
                {blueprint.codeExamples.map((example) => (
                  <div key={example.id} className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h4 className="mb-2 font-semibold text-white">{example.title}</h4>
                    {example.description && (
                      <p className="mb-4 text-sm text-slate-400">{example.description}</p>
                    )}
                    <pre className="overflow-x-auto rounded-lg bg-black/50 p-4 text-sm text-slate-300">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cost Breakdown */}
          {blueprint.estimatedCost && (
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-white">Cost Estimate</h2>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div>
                    <p className="text-3xl font-bold text-white">
                      ${blueprint.estimatedCost.monthly.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-500">per month</p>
                  </div>
                  <div className="text-slate-500">|</div>
                  <div>
                    <p className="text-xl font-bold text-slate-300">
                      ${blueprint.estimatedCost.annual.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-500">per year</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {blueprint.estimatedCost.breakdown.map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full bg-cyan-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="w-16 text-right text-sm text-slate-400">
                          ${item.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {blueprint.estimatedCost.assumptions && (
                  <div className="mt-4 border-t border-white/5 pt-4">
                    <p className="text-xs text-slate-500">
                      Assumptions: {blueprint.estimatedCost.assumptions.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Use Cases */}
          {blueprint.useCases.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-white">Use Cases</h2>
              <div className="flex flex-wrap gap-2">
                {blueprint.useCases.map((useCase, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {blueprint.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-white/5 px-3 py-1.5 text-sm text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Ready to Build?</h2>
          <p className="mb-6 text-slate-400">
            Try the interactive prototype or get the production-ready template.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/ai-architecture/prototypes"
              className="flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5"
            >
              <Play className="h-5 w-5" />
              Try Prototype
            </Link>
            <Link
              href="/ai-architecture/templates"
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5"
            >
              <Package className="h-5 w-5" />
              Get Template
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
