'use client'

import { Fragment, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  Cloud,
  ExternalLink,
  GitBranch,
  Github,
  Layers3,
  ServerCog,
  ShieldCheck,
} from 'lucide-react'

import sourcesData from '@/data/ai-architecture/official-sources.json'
import { trackEvent } from '@/lib/analytics'

/**
 * What execution shape a reference needs. This replaced a three-vendor
 * `deployment` field, because the vendor is an example and the execution shape
 * is the thing that actually decides which platforms stay open to you.
 */
type Runtime = 'Request-scoped' | 'Durable runtime' | 'Managed service' | 'Either'

type ArchitectureSource = {
  id: string
  title: string
  owner: string
  layer: string
  summary: string
  bestFor: string
  runtime: Runtime
  flow: string[]
  docsUrl: string
  source: {
    kind: 'repository' | 'template-directory'
    label: string
    url: string
  }
}

const sources = sourcesData as ArchitectureSource[]

/** Filter by plane, not by vendor. Derived from the catalog so it cannot drift. */
const planeFilters: string[] = ['All', ...Array.from(new Set(sources.map((s) => s.layer)))]

const runtimeStyle: Record<Runtime, string> = {
  'Request-scoped': 'border-white/[0.15] surface-3 text-white',
  'Durable runtime': 'glass-purple text-violet-200',
  'Managed service': 'glass-cyan text-cyan-200',
  Either: 'border-white/10 text-slate-400',
}

function RuntimeBadge({ runtime }: { runtime: Runtime }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs ${runtimeStyle[runtime]}`}>
      {runtime === 'Either' ? 'Runs either way' : runtime}
    </span>
  )
}

function SystemTopology() {
  const stages = [
    {
      name: 'Experience',
      detail: 'Streaming UI, auth, the request that a person is waiting on',
      examples: 'Vercel · Cloudflare · Netlify · any Node host',
      icon: Cloud,
      accent: 'text-emerald-300',
    },
    {
      name: 'Durable runtime',
      detail: 'Workers, queues, MCP services, and anything that outlives a request',
      examples: 'Railway · Fly.io · Modal · Cloudflare · ECS · Cloud Run',
      icon: ServerCog,
      accent: 'text-violet-300',
    },
    {
      name: 'Managed intelligence',
      detail: 'Model endpoints, governed data, hosted evaluation',
      examples: 'Vertex · Bedrock · Azure AI · OpenAI · Anthropic',
      icon: Layers3,
      accent: 'text-cyan-300',
    },
  ]

  return (
    <div className="surface-3 rounded-[2rem] border border-white/[0.08] p-4 shadow-2xl shadow-black/30 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="font-mono text-xs text-emerald-300">Three jobs, not three vendors</p>
          <h2 className="mt-1 text-lg font-semibold text-white">The split that survives a migration</h2>
        </div>
        <ShieldCheck className="h-6 w-6 text-emerald-300" aria-hidden="true" />
      </div>
      {/* stretch, not center: the three cards carry different amounts of copy and
          centering them independently leaves their tops and bottoms ragged. */}
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
        {stages.map((stage, index) => {
          const Icon = stage.icon
          return (
            <Fragment key={stage.name}>
              <div className="surface-2 flex min-h-40 flex-col rounded-2xl border border-white/[0.08] p-5">
                <Icon className={`h-6 w-6 ${stage.accent}`} aria-hidden="true" />
                <h3 className="mt-8 font-semibold text-white">{stage.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{stage.detail}</p>
                <p className="mt-auto pt-4 font-mono text-[11px] leading-5 text-slate-600">{stage.examples}</p>
              </div>
              {index < stages.length - 1 && (
                <ArrowRight className="mx-auto h-5 w-5 rotate-90 self-center text-slate-600 lg:rotate-0" aria-hidden="true" />
              )}
            </Fragment>
          )
        })}
      </div>
      <div className="glass-emerald mt-5 flex items-start gap-3 rounded-2xl p-4 text-sm text-slate-300">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
        <p>Keep the web request short. Move durable work to something that outlives it. Use managed AI and data services only where their governance or scale earns the complexity. Which vendor fills each job is the reversible part.</p>
      </div>
    </div>
  )
}

export function OfficialArchitectureAtlas() {
  const [filter, setFilter] = useState<string>('All')
  const visibleSources = useMemo(
    () => filter === 'All' ? sources : sources.filter((source) => source.layer === filter),
    [filter],
  )

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-[12%] top-20 h-72 w-72 rounded-full bg-emerald-500/[0.07] blur-[110px]" />
          <div className="absolute right-[8%] top-36 h-80 w-80 rounded-full bg-cyan-500/[0.06] blur-[130px]" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pb-24">
          <div>
            <p className="font-mono text-sm text-emerald-300">AI architecture field guide</p>
            <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Build the agent system you can operate.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Official reference architectures and working repositories, organised by the plane they belong to rather than the vendor that published them. Every external link in this catalog was checked on 12 July 2026.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#official-architectures"
                onClick={() => trackEvent('ai_architecture_cta_opened', { destination: 'official_architectures' })}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Choose an architecture
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/ai-architecture/blueprints"
                onClick={() => trackEvent('ai_architecture_cta_opened', { destination: 'blueprints', placement: 'hero' })}
                className="text-sm font-medium text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white"
              >
                Open FrankX blueprints
              </Link>
            </div>
          </div>
          <SystemTopology />
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ['Request-scoped', 'Own the experience', 'Streaming UI, authentication, API entry, preview delivery. Anything a person is actively waiting on.'],
              ['Durable runtime', 'Run persistent work', 'Workers, queues, databases, MCP services, long jobs. Anything that outlives the request that started it.'],
              ['Managed service', 'Rent the hard parts', 'Model endpoints, governed data, hosted evaluation. Buy these where their governance or scale earns the dependency.'],
            ].map(([name, title, body]) => (
              <div key={name} className="border-l border-white/10 pl-5">
                <p className="font-mono text-xs text-slate-500">{name}</p>
                <h2 className="mt-3 text-xl font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs text-cyan-300">Where a long run lives</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            The platform question is one question, and it is not which logo.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            An agent loop that runs for eleven minutes is a different deployment problem from a completion that
            returns in two seconds. Every platform below answers it; they differ in what they hand you and what
            they leave you operating.
          </p>
          <figure className="mt-10">
            <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#050a14] p-3 sm:p-4">
              <Image
                src="/images/diagrams/ai-architecture/platform-matrix.svg"
                alt="Eight deployment platforms — Vercel, Cloudflare, AWS, Google Cloud, Azure, Railway, Fly.io and Modal — compared on unit of execution, where a long agent loop lives, and what you still operate yourself. Presented as equals, not ranked."
                width={1200}
                height={780}
                unoptimized
                loading="lazy"
                className="mx-auto h-auto w-full min-w-[960px]"
              />
            </div>
            <figcaption className="mt-3 text-sm text-white/45">
              Eight platforms as equals. Managed platforms hand you a primitive and take the operations;
              self-assembled clouds hand you every primitive and take your Tuesdays.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="official-architectures" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs text-cyan-300">Official source atlas</p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Start from maintained architecture, then adapt it deliberately.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter architectures by plane">
              {planeFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setFilter(item)
                    trackEvent('ai_architecture_filter_selected', { plane: item })
                  }}
                  aria-pressed={filter === item}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${filter === item ? 'border-white bg-white text-slate-950' : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-white/[0.08]">
            {visibleSources.map((source) => (
              <article key={source.id} className="grid gap-6 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-slate-500">{source.owner}</span>
                    <span className="text-slate-700" aria-hidden="true">/</span>
                    <span className="font-mono text-xs text-emerald-300">{source.layer}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{source.title}</h3>
                  <p className="mt-3 max-w-lg leading-7 text-slate-400">{source.summary}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-300"><span className="text-slate-500">Use it for:</span> {source.bestFor}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <RuntimeBadge runtime={source.runtime} />
                  </div>
                </div>

                <div className="surface-3 rounded-2xl border border-white/[0.08] p-5 sm:p-6">
                  <ol className="flex flex-wrap items-center gap-2" aria-label={`${source.title} request flow`}>
                    {source.flow.map((step, index) => (
                      <Fragment key={step}>
                        <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 font-mono text-xs text-slate-300">{step}</li>
                        {index < source.flow.length - 1 && (
                          <li className="flex items-center" aria-hidden="true">
                            <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
                          </li>
                        )}
                      </Fragment>
                    ))}
                  </ol>
                  <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                    <a href={source.docsUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('ai_architecture_source_opened', { architecture_id: source.id, link_kind: 'official_docs' })} className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-emerald-200">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Official architecture
                    </a>
                    <a href={source.source.url} target="_blank" rel="noreferrer" onClick={() => trackEvent('ai_architecture_source_opened', { architecture_id: source.id, link_kind: source.source.kind })} className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white">
                      <Github className="h-4 w-4" aria-hidden="true" />
                      {source.source.label}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="glass-emerald grid gap-8 rounded-[2rem] p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <GitBranch className="h-6 w-6 text-emerald-300" aria-hidden="true" />
              <h2 className="mt-5 font-display text-3xl font-bold">Use the reference. Keep your architecture.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">Fork the maintained implementation, replace its boundaries one at a time, and keep deployment, observability, security, and rollback evidence beside the code.</p>
            </div>
            <Link href="/ai-architecture/blueprints" onClick={() => trackEvent('ai_architecture_cta_opened', { destination: 'blueprints', placement: 'footer' })} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-100">
              Inspect the blueprints
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
