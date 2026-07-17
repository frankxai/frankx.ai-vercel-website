'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Eye,
  FileJson,
  Filter,
  FlaskConical,
  GitBranch,
  RefreshCw,
  Search,
  ServerCog,
  ShieldCheck,
} from 'lucide-react'
import {
  agenticLifeMarketRegistry,
  averageCoverage,
  axisLabels,
  coverageAxes,
  strategicRoleOrder,
  totalCoverage,
  type AgenticLifeSystem,
  type StrategicRole,
} from '@/lib/research/agentic-life-market'

const roleStyles: Record<StrategicRole, string> = {
  build: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
  integrate: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-300',
  partner: 'border-blue-400/25 bg-blue-400/10 text-blue-300',
  compete: 'border-violet-400/25 bg-violet-400/10 text-violet-300',
  inspire: 'border-amber-400/25 bg-amber-400/10 text-amber-300',
  watch: 'border-white/10 bg-white/[0.03] text-white/55',
}

const roleLabels: Record<StrategicRole, string> = {
  build: 'Build',
  integrate: 'Integrate',
  partner: 'Partner',
  compete: 'Compete',
  inspire: 'Inspire',
  watch: 'Watch',
}

const categoryLabels: Record<string, string> = {
  'frankx-stack': 'FrankX stack',
  memory: 'Memory',
  runtime: 'Runtime',
  orchestration: 'Orchestration',
  evals: 'Evals',
  observability: 'Observability',
  protocol: 'Protocol',
  automation: 'Automation',
  harness: 'Harness',
}

const operatingLoop = [
  {
    phase: '01',
    title: 'Install',
    icon: ServerCog,
    action: 'Connect through a reversible adapter. Name the owner, version, authority boundary, and export path.',
    receipt: 'Adapter contract',
  },
  {
    phase: '02',
    title: 'Test',
    icon: FlaskConical,
    action: 'Run recall, deletion, trajectory, policy, and handoff contracts against real tasks before promotion.',
    receipt: 'Audit JSON',
  },
  {
    phase: '03',
    title: 'Observe',
    icon: Eye,
    action: 'Compare traces, errors, overrides, cost, latency, and quality. Final answers alone do not pass.',
    receipt: 'Trace set',
  },
  {
    phase: '04',
    title: 'Evolve',
    icon: RefreshCw,
    action: 'Promote, constrain, replace, or remove from evidence. Update the registry and preserve the decision.',
    receipt: 'Decision record',
  },
]

const executionLanes = [
  {
    horizon: 'Now',
    title: 'Make the substrate testable',
    actions: [
      'Conformance tests for memory adapters',
      'One receipt schema across life modules',
      'Privacy-class routing before cloud writes',
    ],
  },
  {
    horizon: 'Next',
    title: 'Prove composition',
    actions: [
      'One MCP module and one A2A handoff',
      'Replayable multi-harness workflow',
      'Independent checker on every consequential lane',
    ],
  },
  {
    horizon: 'Scale',
    title: 'Measure compounding',
    actions: [
      'Context rehydration over 30 and 90 days',
      'Cross-domain transfer without privacy leakage',
      'Replace one vendor without losing authority',
    ],
  },
]

function scoreTone(score: number) {
  if (score === 3) return 'bg-emerald-400'
  if (score === 2) return 'bg-cyan-400'
  if (score === 1) return 'bg-white/30'
  return 'bg-white/[0.08]'
}

interface ScoreProps {
  system: AgenticLifeSystem
  axis: keyof AgenticLifeSystem['scores']
}

function Score({ system, axis }: ScoreProps) {
  const score = system.scores[axis]
  return (
    <div
      className="flex min-w-0 flex-col gap-1.5"
      title={`${axisLabels[axis]}: ${score}/3 — ${agenticLifeMarketRegistry.methodology.axes[axis]}`}
      aria-label={`${axisLabels[axis]} score ${score} out of 3`}
    >
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((step) => (
          <span key={step} className={`h-1.5 flex-1 rounded-full ${step <= score ? scoreTone(score) : 'bg-white/[0.06]'}`} />
        ))}
      </div>
      <span className="text-[10px] text-white/35">{axisLabels[axis]}</span>
    </div>
  )
}

export function AgenticLifeObservatory() {
  const [role, setRole] = useState<StrategicRole | 'all'>('all')
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const categories = useMemo(
    () => [...new Set(agenticLifeMarketRegistry.systems.map((system) => system.category))].sort(),
    [],
  )

  const filteredSystems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return agenticLifeMarketRegistry.systems
      .filter((system) => role === 'all' || system.strategicRole === role)
      .filter((system) => category === 'all' || system.category === category)
      .filter((system) => {
        if (!normalizedQuery) return true
        return [system.name, system.organization, system.summary, system.nextAction, system.category]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      })
      .sort((a, b) => totalCoverage(b) - totalCoverage(a) || a.name.localeCompare(b.name))
  }, [category, query, role])

  const roleCounts = useMemo(() => {
    return agenticLifeMarketRegistry.systems.reduce<Record<string, number>>((counts, system) => {
      counts[system.strategicRole] = (counts[system.strategicRole] ?? 0) + 1
      return counts
    }, {})
  }, [])

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute right-[-15%] top-[-12%] h-[55rem] w-[55rem] opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 68%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'linear-gradient(to bottom, black, transparent 72%)',
          }}
        />
      </div>

      <div className="relative">
        <section className="border-b border-white/[0.06] px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/research"
              className="mb-10 inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Research Hub
            </Link>

            <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
              <div className="max-w-4xl">
                <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-emerald-400">
                  Agentic Life Observatory · verified {agenticLifeMarketRegistry.lastVerified}
                </p>
                <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-7xl">
                  Choose infrastructure by what it proves.
                </h1>
                <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/58 sm:text-lg">
                  A living market map for systems that claim to remember, coordinate, protect, evaluate, or operate across a life. Five failure modes. Six strategic roles. One evidence trail.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href="#market-map"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0a0b] transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    Inspect the market map <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/research/agentic-life-observatory/registry.json"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/75 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <FileJson className="h-4 w-4" /> Agent JSON
                  </a>
                </div>
              </div>

              <div className="border-l border-white/10 pl-6 lg:pl-8">
                <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/35">Current registry</p>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-7">
                  <div>
                    <dt className="text-xs text-white/35">Systems</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight">{agenticLifeMarketRegistry.systems.length}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/35">Categories</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight">{categories.length}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/35">Coverage</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight">{averageCoverage(agenticLifeMarketRegistry.systems)}%</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/35">Axes</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight">{coverageAxes.length}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[0.06] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">Operating loop</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Install. Test. Observe. Evolve.</h2>
              <p className="mt-4 leading-relaxed text-white/50">
                Every technology enters through the same reversible sequence. No vendor becomes authority because its demo looked good.
              </p>
            </div>

            <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4">
              {operatingLoop.map((step) => (
                <li key={step.title} className="bg-[#0d0d0f] p-6 lg:min-h-64">
                  <div className="mb-8 flex items-center justify-between">
                    <step.icon className="h-5 w-5 text-emerald-400" />
                    <span className="font-mono text-xs text-white/25">{step.phase}</span>
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/48">{step.action}</p>
                  <div className="mt-7 inline-flex items-center gap-2 border-t border-white/[0.08] pt-4 text-xs text-white/35">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    {step.receipt}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="market-map" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">Market map</p>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Build, integrate, partner, compete, or watch.</h2>
                <p className="mt-4 leading-relaxed text-white/50">
                  Scores run from 0 to 3 across the five structural failure modes. They are directional editorial assessments, not certifications.
                </p>
              </div>
              <div className="font-mono text-xs text-white/35">
                {filteredSystems.length} of {agenticLifeMarketRegistry.systems.length} systems · {averageCoverage(filteredSystems)}% coverage
              </div>
            </div>

            <div className="mb-7 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_14rem]">
                <label className="relative block">
                  <span className="sr-only">Search systems</span>
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search systems, organizations, risks, or next actions"
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/20 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/15"
                  />
                </label>
                <label className="relative block">
                  <span className="sr-only">Filter by category</span>
                  <Filter className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-white/[0.08] bg-[#101012] pl-10 pr-4 text-sm text-white/70 outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/15"
                  >
                    <option value="all">All categories</option>
                    {categories.map((item) => (
                      <option key={item} value={item}>{categoryLabels[item] ?? item}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-3 flex flex-wrap gap-2" aria-label="Filter by strategic role">
                <button
                  type="button"
                  onClick={() => setRole('all')}
                  aria-pressed={role === 'all'}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${role === 'all' ? 'border-white/30 bg-white text-black' : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white'}`}
                >
                  All {agenticLifeMarketRegistry.systems.length}
                </button>
                {strategicRoleOrder.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setRole(item)}
                    aria-pressed={role === item}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${role === item ? roleStyles[item] : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white'}`}
                  >
                    {roleLabels[item]} {roleCounts[item] ?? 0}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0f]">
              <div className="hidden grid-cols-[minmax(15rem,1.5fr)_7rem_minmax(18rem,1fr)_5rem] gap-6 border-b border-white/[0.08] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/28 lg:grid">
                <span>System</span>
                <span>Role</span>
                <span>Failure-mode coverage</span>
                <span className="text-right">Source</span>
              </div>

              {filteredSystems.length === 0 ? (
                <div className="px-6 py-20 text-center">
                  <CircleDot className="mx-auto h-5 w-5 text-white/25" />
                  <p className="mt-3 text-sm text-white/45">No systems match this filter.</p>
                </div>
              ) : (
                <div className="divide-y divide-white/[0.065]">
                  {filteredSystems.map((system) => (
                    <article key={system.id} className="grid gap-5 px-5 py-6 transition-colors hover:bg-white/[0.018] lg:grid-cols-[minmax(15rem,1.5fr)_7rem_minmax(18rem,1fr)_5rem] lg:items-center lg:gap-6">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-white">{system.name}</h3>
                          <span className="text-[10px] uppercase tracking-wider text-white/25">{categoryLabels[system.category] ?? system.category}</span>
                        </div>
                        <p className="mt-1 text-xs text-white/32">{system.organization}</p>
                        <p className="mt-3 text-sm leading-relaxed text-white/48">{system.summary}</p>
                        <details className="group mt-3">
                          <summary className="cursor-pointer list-none text-xs text-white/35 transition-colors hover:text-white/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                            Decision detail <span className="ml-1 group-open:hidden">+</span><span className="ml-1 hidden group-open:inline">−</span>
                          </summary>
                          <div className="mt-3 space-y-2 border-l border-white/10 pl-3 text-xs leading-relaxed">
                            <p className="text-white/48"><span className="text-white/75">Next:</span> {system.nextAction}</p>
                            <p className="text-white/42"><span className="text-amber-300/80">Risk:</span> {system.risk}</p>
                            <p className="text-white/30">{system.deployment.join(' · ')} · {system.license}</p>
                          </div>
                        </details>
                      </div>

                      <div>
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${roleStyles[system.strategicRole]}`}>
                          {roleLabels[system.strategicRole]}
                        </span>
                        <p className="mt-2 font-mono text-[10px] text-white/25">{system.integrationStatus}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-5">
                        {coverageAxes.map((axis) => <Score key={axis} system={system} axis={axis} />)}
                      </div>

                      <div className="flex gap-2 lg:justify-end">
                        {system.repoUrl && (
                          <a
                            href={system.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`${system.name} repository`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/45 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                          >
                            <GitBranch className="h-4 w-4" />
                            <span className="sr-only">{system.name} repository</span>
                          </a>
                        )}
                        <a
                          href={system.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`${system.name} primary source`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/45 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                          <span className="sr-only">{system.name} primary source</span>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.015] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">Execution sequence</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What to drive next.</h2>
              <p className="mt-4 leading-relaxed text-white/50">Depth before breadth: prove authority, composition, and quality before adding more products.</p>
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
              {executionLanes.map((lane, index) => (
                <div key={lane.horizon} className="border-t border-white/12 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">{lane.horizon}</span>
                    <span className="font-mono text-xs text-white/20">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{lane.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {lane.actions.map((action) => (
                      <li key={action} className="flex gap-3 text-sm leading-relaxed text-white/50">
                        <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-emerald-400/80" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">Method</p>
              <h2 className="text-3xl font-bold tracking-tight">A score is a question, not a verdict.</h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/50">
                Each score asks whether public evidence shows the system addressing one structural failure mode. A 3 means core to the product. A 0 means not evident. It does not certify security, performance, or fitness for your data.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/40">
                Refresh claims from primary sources. Test adapters with private workloads. Keep consequential actions human-gated.
              </p>
            </div>

            <dl className="space-y-5">
              {coverageAxes.map((axis) => (
                <div key={axis} className="grid gap-2 border-b border-white/[0.08] pb-5 sm:grid-cols-[8rem_1fr]">
                  <dt className="font-mono text-xs uppercase tracking-wider text-white/60">{axisLabels[axis]}</dt>
                  <dd className="text-sm leading-relaxed text-white/42">{agenticLifeMarketRegistry.methodology.axes[axis]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-t border-white/[0.06] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-emerald-400/20 bg-emerald-400/[0.055] p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">Research graph</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight">Read the four foundations behind the map.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50">Architecture defines the substrate. Memory compounds context. Sovereignty preserves ownership. Evals make quality replayable.</p>
              </div>
              <Link
                href="/research/agentic-life-architecture"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Start with architecture <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['Architecture', '/research/agentic-life-architecture'],
                ['Memory', '/research/agentic-memory'],
                ['Sovereignty', '/research/agentic-sovereignty'],
                ['Evals', '/research/agentic-evals'],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="flex items-center justify-between border-t border-white/10 py-4 text-sm text-white/55 transition-colors hover:text-white">
                  {label}<ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
