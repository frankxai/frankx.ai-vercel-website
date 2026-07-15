'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Cloud,
  Cpu,
  ExternalLink,
  Film,
  Gauge,
  HardDrive,
  Info,
  Laptop,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Zap,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import {
  HARDWARE_FAQ,
  HARDWARE_PLATFORMS,
  HARDWARE_REVIEWED_AT,
  recommendSetup,
  SETUP_PROFILES,
  WORKLOAD_FIT,
} from '@/data/hardware-intelligence'
import type { HardwareLane, PlannerInputs } from '@/lib/hardware-intelligence/types'

const workloadOptions: Array<{
  id: PlannerInputs['workload']
  label: string
  detail: string
  icon: typeof Cpu
}> = [
  { id: 'build', label: 'Build products', detail: 'Agents, code, browsers, Docker', icon: Cpu },
  { id: 'media', label: 'Create media', detail: 'Images, video, editing, 3D', icon: Film },
  { id: 'agents', label: 'Run agents', detail: 'Private models, RAG, uptime', icon: Bot },
  { id: 'balanced', label: 'Mixed studio', detail: 'Build, create, and operate', icon: Sparkles },
]

const laneFilters: Array<{ id: 'all' | HardwareLane; label: string }> = [
  { id: 'all', label: 'All classes' },
  { id: 'creator', label: 'Creator GPUs' },
  { id: 'memory', label: 'Unified memory' },
  { id: 'pro', label: 'Pro GPUs' },
  { id: 'apple', label: 'Apple silicon' },
  { id: 'edge', label: 'Edge inference' },
]

function formatBudget(value: number) {
  return new Intl.NumberFormat('en-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
}

function ComputeConstellation({ input }: { input: PlannerInputs }) {
  const weights = useMemo(() => {
    const media = input.workload === 'media' ? 92 : input.workload === 'balanced' ? 72 : 45
    const memory = input.workload === 'agents' ? 94 : input.alwaysOn || input.privacy ? 78 : 42
    const cloud = input.budget < 4500 ? 88 : input.workload === 'build' ? 72 : 52
    return { media, memory, cloud }
  }, [input])

  const nodes = [
    { label: 'Workstation', value: weights.media, note: 'Interactive speed', icon: Laptop, color: 'emerald' },
    { label: 'Memory node', value: weights.memory, note: 'Capacity + uptime', icon: Server, color: 'cyan' },
    { label: 'Frontier cloud', value: weights.cloud, note: 'Elastic quality', icon: Cloud, color: 'violet' },
  ] as const

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-black/30 p-5 sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),transparent_58%)]" />
      <div className="relative mb-7 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">Compute constellation</p>
          <p className="mt-1 text-xs leading-relaxed text-white/45">Separate memory pools. One routed system.</p>
        </div>
        <Network className="h-5 w-5 text-cyan-300/70" aria-hidden />
      </div>

      <div className="relative grid gap-3 sm:grid-cols-3">
        {nodes.map((node) => {
          const Icon = node.icon
          const accent = node.color === 'emerald' ? 'bg-emerald-400' : node.color === 'cyan' ? 'bg-cyan-400' : 'bg-violet-400'
          return (
            <div key={node.label} className="relative rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
              <div className="mb-6 flex items-center justify-between">
                <Icon className="h-5 w-5 text-white/70" aria-hidden />
                <span className="font-mono text-xs text-white/40">{node.value}%</span>
              </div>
              <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full ${accent} transition-[width] duration-300 motion-reduce:transition-none`}
                  style={{ width: `${node.value}%` }}
                />
              </div>
              <p className="text-sm font-semibold text-white">{node.label}</p>
              <p className="mt-1 text-xs text-white/40">{node.note}</p>
            </div>
          )
        })}
      </div>
      <p className="relative mt-5 flex items-start gap-2 text-xs leading-relaxed text-white/45">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300/70" aria-hidden />
        A 32GB GPU plus a 128GB node is not a 160GB GPU. Route work first; cluster matched nodes only for a named model.
      </p>
    </div>
  )
}

function Planner() {
  const [input, setInput] = useState<PlannerInputs>({
    budget: 5000,
    workload: 'balanced',
    privacy: false,
    alwaysOn: false,
    team: false,
  })
  const recommendations = useMemo(() => recommendSetup(input), [input])
  const primary = recommendations[0]

  return (
    <section id="planner" className="scroll-mt-24 border-y border-white/[0.06] bg-white/[0.015] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <div>
            <p className="text-sm font-medium text-emerald-300">Plan your first useful node</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
              Spend against the bottleneck—not the benchmark.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
              Set the constraints that change the answer. The planner returns a primary topology, a lower-risk alternative,
              and the trigger for your next machine.
            </p>

            <div className="mt-9">
              <div className="mb-4 flex items-end justify-between">
                <label htmlFor="hardware-budget" className="text-sm font-medium text-white/75">Capital budget</label>
                <span className="font-mono text-lg text-white">{formatBudget(input.budget)}</span>
              </div>
              <input
                id="hardware-budget"
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={input.budget}
                onChange={(event) => setInput((current) => ({ ...current, budget: Number(event.target.value) }))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-400"
              />
              <div className="mt-2 flex justify-between text-xs text-white/30"><span>€1k</span><span>€15k</span></div>
            </div>

            <fieldset className="mt-8">
              <legend className="mb-3 text-sm font-medium text-white/75">Dominant workload</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {workloadOptions.map((option) => {
                  const Icon = option.icon
                  const active = input.workload === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setInput((current) => ({ ...current, workload: option.id }))}
                      aria-pressed={active}
                      className={`rounded-2xl border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50 ${
                        active ? 'border-emerald-400/40 bg-emerald-400/[0.09]' : 'border-white/[0.07] bg-white/[0.025] hover:border-white/15'
                      }`}
                    >
                      <Icon className={`mb-3 h-4 w-4 ${active ? 'text-emerald-300' : 'text-white/45'}`} aria-hidden />
                      <span className="block text-sm font-medium text-white">{option.label}</span>
                      <span className="mt-1 block text-xs text-white/40">{option.detail}</span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-2">
              {[
                { key: 'privacy', label: 'Private data must stay local', icon: ShieldCheck },
                { key: 'alwaysOn', label: 'Agents must run independently 24/7', icon: Zap },
                { key: 'team', label: 'A team will share the endpoint', icon: Network },
              ].map((toggle) => {
                const key = toggle.key as 'privacy' | 'alwaysOn' | 'team'
                const Icon = toggle.icon
                const active = input[key]
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setInput((current) => ({ ...current, [key]: !current[key] }))}
                    className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50"
                  >
                    <span className="flex items-center gap-3 text-sm text-white/65"><Icon className="h-4 w-4 text-white/35" />{toggle.label}</span>
                    <span className={`grid h-5 w-5 place-items-center rounded-md border ${active ? 'border-emerald-300/50 bg-emerald-400 text-black' : 'border-white/15'}`}>
                      {active ? <Check className="h-3.5 w-3.5" /> : null}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-4 lg:pt-2">
            <ComputeConstellation input={input} />
            <GlowCard color="emerald" className="p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-emerald-300">Primary recommendation</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{primary.name}</h3>
                  <p className="mt-2 text-sm text-white/50">{primary.strapline}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white/55">
                  {formatBudget(primary.budgetBandEur[0])}–{formatBudget(primary.budgetBandEur[1])}
                </span>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-white/40">Build</p>
                  <ul className="mt-3 space-y-2">
                    {primary.components.map((item) => <li key={item} className="flex gap-2 text-sm text-white/70"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />{item}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/40">Keep elastic</p>
                  <ul className="mt-3 space-y-2">
                    {primary.cloudFirst.map((item) => <li key={item} className="flex gap-2 text-sm text-white/70"><Cloud className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />{item}</li>)}
                  </ul>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-amber-300/15 bg-amber-300/[0.045] p-4">
                <p className="text-xs font-medium text-amber-200">Expansion gate</p>
                <p className="mt-1.5 text-sm leading-6 text-white/60">{primary.expansionTrigger}</p>
              </div>
            </GlowCard>

            <div className="grid gap-3 sm:grid-cols-2">
              {recommendations.slice(1).map((profile, index) => (
                <div key={profile.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                  <p className="text-xs text-white/35">{index === 0 ? 'Lower-risk alternative' : 'Expansion path'}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{profile.name}</p>
                  <p className="mt-2 text-xs leading-5 text-white/45">{profile.fit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PlatformExplorer() {
  const [filter, setFilter] = useState<'all' | HardwareLane>('all')
  const visible = filter === 'all' ? HARDWARE_PLATFORMS : HARDWARE_PLATFORMS.filter((platform) => platform.lane === filter)

  return (
    <section id="compare" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-cyan-300">Compare the memory architecture</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">Four lanes. No fake universal winner.</h2>
          <p className="mt-5 text-base leading-7 text-white/55">
            Creator GPUs optimize interactive throughput. Unified-memory systems optimize capacity. Pro GPUs buy bandwidth,
            ECC, and support. Edge accelerators solve a different inference problem.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter hardware classes">
          {laneFilters.map((lane) => (
            <button
              key={lane.id}
              type="button"
              onClick={() => setFilter(lane.id)}
              aria-pressed={filter === lane.id}
              className={`rounded-full border px-4 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 ${filter === lane.id ? 'border-cyan-300/35 bg-cyan-300/10 text-cyan-100' : 'border-white/[0.08] text-white/45 hover:text-white/75'}`}
            >
              {lane.label}
            </button>
          ))}
        </div>

        <div className="mt-7 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02]">
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-left">
              <thead className="border-b border-white/[0.07] bg-white/[0.025] text-xs text-white/40">
                <tr>
                  <th className="px-5 py-4 font-medium">Platform</th>
                  <th className="px-5 py-4 font-medium">Memory</th>
                  <th className="px-5 py-4 font-medium">Bandwidth</th>
                  <th className="px-5 py-4 font-medium">Model fit</th>
                  <th className="px-5 py-4 font-medium">Planning price</th>
                  <th className="px-5 py-4 font-medium">Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.055]">
                {visible.map((platform) => (
                  <tr key={platform.id} className="align-top transition-colors hover:bg-white/[0.025]">
                    <td className="px-5 py-5">
                      <p className="text-sm font-semibold text-white">{platform.name}</p>
                      <p className="mt-1 text-xs text-white/35">{platform.vendor}</p>
                      <p className="mt-3 max-w-[230px] text-xs leading-5 text-white/45">{platform.bestFor.slice(0, 3).join(' · ')}</p>
                    </td>
                    <td className="px-5 py-5 text-sm text-white/65">{platform.memory}</td>
                    <td className="px-5 py-5 text-sm text-white/65">{platform.bandwidth}</td>
                    <td className="max-w-[230px] px-5 py-5 text-sm leading-6 text-white/60">{platform.modelBand}</td>
                    <td className="px-5 py-5 text-sm text-white/65">{platform.priceLabel}</td>
                    <td className="px-5 py-5">
                      <a href={platform.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-cyan-300/75 hover:text-cyan-200">
                        {platform.sourceLabel}<ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs leading-5 text-white/35">Price bands are European planning signals observed around {HARDWARE_REVIEWED_AT}; VAT, configuration, stock, seller, and warranty can change the checkout price.</p>
      </div>
    </section>
  )
}

function SetupArchetypes() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-amber-200">Reference architectures</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">Start with the system shape.</h2>
          </div>
          <Link href="/ai-architecture" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white">
            Explore AI architecture <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {SETUP_PROFILES.map((profile, index) => (
            <article key={profile.id} className={`rounded-[1.6rem] border p-5 ${index === 1 ? 'border-emerald-300/25 bg-emerald-300/[0.055] lg:col-span-2' : 'border-white/[0.075] bg-white/[0.025]'}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-white/30">0{index + 1}</span>
                {index === 1 ? <span className="rounded-full bg-emerald-300/10 px-2.5 py-1 text-[11px] text-emerald-200">Strong first node</span> : null}
              </div>
              <h3 className="mt-8 text-lg font-semibold text-white">{profile.name}</h3>
              <p className="mt-2 text-sm leading-6 text-white/45">{profile.strapline}</p>
              <p className="mt-6 font-mono text-xs text-white/55">{formatBudget(profile.budgetBandEur[0])}–{formatBudget(profile.budgetBandEur[1])}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkloadFit() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-medium text-violet-300">Model and media fit</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">Memory decides what loads. Bandwidth decides how it feels.</h2>
            <p className="mt-5 text-base leading-7 text-white/55">
              Model weights are only the start. Context cache, runtime overhead, vision encoders, batching, and concurrency all consume memory.
            </p>
            <div className="mt-8 rounded-2xl border border-violet-300/15 bg-violet-300/[0.045] p-5">
              <p className="text-sm font-medium text-violet-100">Conservative planning rule</p>
              <p className="mt-2 text-sm leading-6 text-white/50">Treat 4-bit weights as roughly 0.5–0.7 bytes per parameter, then preserve meaningful headroom for context and runtime.</p>
            </div>
          </div>
          <div className="space-y-2">
            {WORKLOAD_FIT.map((row) => (
              <div key={row.memory} className="grid gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 sm:grid-cols-[150px_1fr_1fr] sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-white">{row.memory}</p>
                  <p className="mt-1 text-xs text-white/35">{row.posture}</p>
                </div>
                <div><p className="text-[11px] text-emerald-300/70">Keep local</p><p className="mt-1 text-sm leading-5 text-white/55">{row.local}</p></div>
                <div><p className="text-[11px] text-cyan-300/70">Keep elastic</p><p className="mt-1 text-sm leading-5 text-white/55">{row.cloud}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FleetRoadmap() {
  const phases = [
    { phase: 'Node 00', title: 'Durable cloud operator', body: 'Queues, identities, approvals, logs, and frontier routing. Always-on does not mean always-local.', icon: Cloud },
    { phase: 'Node 01', title: 'Main RTX workstation', body: 'Desktop CPU, 64–128GB RAM, fast NVMe, editing, local images, and interactive development.', icon: Cpu },
    { phase: 'Node 02', title: 'Unified-memory service', body: 'Add only for 70B+ models, privacy, independent uptime, team access, or measured API displacement.', icon: Server },
    { phase: 'Fleet', title: 'Network and specialize', body: 'NAS, 10GbE, UPS, matched model nodes, creator seats, and cloud burst. Route before clustering.', icon: Network },
  ]
  return (
    <section id="fleet" className="border-y border-white/[0.06] bg-white/[0.015] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-300">Fleet expansion</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">Every first machine should have a second career.</h2>
          <p className="mt-5 text-base leading-7 text-white/55">A balanced workstation can later become an editor seat, render worker, or QA node. That is how a founder manages depreciation.</p>
        </div>
        <div className="relative mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
          {phases.map((phase) => {
            const Icon = phase.icon
            return (
              <div key={phase.phase} className="bg-[#0d0d0f] p-6">
                <div className="flex items-center justify-between"><span className="font-mono text-xs text-white/30">{phase.phase}</span><Icon className="h-4 w-4 text-emerald-300/60" /></div>
                <h3 className="mt-10 text-base font-semibold text-white">{phase.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/45">{phase.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.62fr_1.38fr]">
        <div>
          <p className="text-sm font-medium text-cyan-300">Clear answers</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white">What changes the decision.</h2>
          <p className="mt-5 text-sm leading-6 text-white/45">Reviewed {HARDWARE_REVIEWED_AT}. We separate vendor specifications, retail observations, and editorial inference.</p>
        </div>
        <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {HARDWARE_FAQ.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-medium text-white marker:content-none">
                {item.question}<ChevronDown className="h-4 w-4 shrink-0 text-white/35 transition-transform group-open:rotate-180" />
              </summary>
              <p className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-white/50">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HardwareHubShell() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a0b] text-white">
      <main>
        <section className="relative px-5 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_at_65%_8%,rgba(6,182,212,0.12),transparent_55%),radial-gradient(ellipse_at_20%_20%,rgba(16,185,129,0.08),transparent_48%)]" />
            <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:72px_72px]" />
          </div>
          <div className="relative mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1.5 text-emerald-200">Hardware Intelligence</span>
                <span>Reviewed {HARDWARE_REVIEWED_AT}</span>
              </div>
              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                Buy compute for the work you actually do.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/55 sm:text-xl">
                Plan an AI workstation, a private model node, or a small fleet without confusing VRAM, unified memory,
                cloud capacity, and marketing TOPS.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#planner" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-100">
                  Plan my setup <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#compare" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-medium text-white/75 hover:border-white/20 hover:text-white">
                  Compare hardware
                </a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/[0.08] bg-black/30 p-6 backdrop-blur-sm">
              <p className="text-xs font-medium text-white/35">The decision in one sentence</p>
              <p className="mt-4 text-xl leading-8 text-white/85">Buy the workstation when your whole workflow is blocked. Buy unified memory when model capacity is the measured bottleneck.</p>
              <div className="mt-7 grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-5">
                {[['VRAM', 'Speed'], ['Unified', 'Capacity'], ['Cloud', 'Elasticity']].map(([label, value]) => (
                  <div key={label}><p className="font-mono text-[11px] text-white/30">{label}</p><p className="mt-1 text-sm text-white/65">{value}</p></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Planner />
        <SetupArchetypes />
        <PlatformExplorer />
        <WorkloadFit />
        <FleetRoadmap />

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] p-6"><Gauge className="h-5 w-5 text-cyan-300/70" /><h2 className="mt-8 text-lg font-semibold">Do not compare raw TOPS</h2><p className="mt-3 text-sm leading-6 text-white/45">FP4, INT8, sparsity, GPU, and NPU claims describe different operations. Workload benchmarks and memory behavior matter more.</p></div>
              <div className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] p-6"><WalletCards className="h-5 w-5 text-emerald-300/70" /><h2 className="mt-8 text-lg font-semibold">Separate ranking from commission</h2><p className="mt-3 text-sm leading-6 text-white/45">Retailer relationships may fund the research. They do not change technical scoring. Any tracked link will be labelled.</p></div>
              <div className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] p-6"><HardDrive className="h-5 w-5 text-amber-200/70" /><h2 className="mt-8 text-lg font-semibold">Emerging hardware has a lane</h2><p className="mt-3 text-sm leading-6 text-white/45">Axelera belongs in European edge vision. Chinese accelerators belong in sovereign-compute research until EU procurement, support, and software are verifiable.</p></div>
            </div>
          </div>
        </section>

        <FAQ />

        <section className="border-t border-white/[0.06] px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/[0.08] bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.12),transparent_42%),rgba(255,255,255,0.025)] p-7 sm:p-10 md:p-14">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl"><p className="text-sm text-emerald-300">Continue the system</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Hardware is one layer of your AI architecture.</h2><p className="mt-4 text-base leading-7 text-white/50">Connect the purchase to model routing, bounded agents, observability, content workflows, and a business case.</p></div>
              <div className="flex flex-wrap gap-3"><Link href="/ai-architecture" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">Architecture hub <ArrowRight className="h-4 w-4" /></Link><Link href="/llm-hub" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/70">LLM Hub</Link></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
