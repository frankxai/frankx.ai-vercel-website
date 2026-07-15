'use client'

import { useMemo, useState, type ComponentType } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Blocks,
  Brain,
  CheckCircle2,
  CircuitBoard,
  Command,
  ExternalLink,
  Filter,
  GitBranch,
  Github,
  Layers3,
  LockKeyhole,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react'

import {
  agenticLifeOsPublicScan,
  agenticLifeOsStats,
  commandSurfaces,
  dnaCards,
  featuredPublicRepos,
  intelligenceSystems,
  lifeOsModules,
  offerPackages,
  operatingIntent,
  operatingLoops,
  publicGithubRepos,
  publicRepoLaneCounts,
  resultEngines,
  resultMetrics,
  systemMapEdges,
  systemMapNodes,
  type AtlasColor,
  type PublicRepoCard,
  type RepoLane,
  type SystemMapNode,
} from '@/data/agentic-life-os-atlas'

const accentTokens: Record<
  AtlasColor,
  {
    text: string
    border: string
    bg: string
    soft: string
    ring: string
    edge: string
  }
> = {
  cyan: {
    text: 'text-cyan-300',
    border: 'border-cyan-400/25',
    bg: 'bg-cyan-500/10',
    soft: 'bg-cyan-500/[0.04]',
    ring: 'ring-cyan-400/25',
    edge: '#22d3ee',
  },
  emerald: {
    text: 'text-emerald-300',
    border: 'border-emerald-400/25',
    bg: 'bg-emerald-500/10',
    soft: 'bg-emerald-500/[0.04]',
    ring: 'ring-emerald-400/25',
    edge: '#34d399',
  },
  violet: {
    text: 'text-violet-300',
    border: 'border-violet-400/25',
    bg: 'bg-violet-500/10',
    soft: 'bg-violet-500/[0.04]',
    ring: 'ring-violet-400/25',
    edge: '#a78bfa',
  },
  amber: {
    text: 'text-amber-300',
    border: 'border-amber-400/25',
    bg: 'bg-amber-500/10',
    soft: 'bg-amber-500/[0.04]',
    ring: 'ring-amber-400/25',
    edge: '#fbbf24',
  },
  rose: {
    text: 'text-rose-300',
    border: 'border-rose-400/25',
    bg: 'bg-rose-500/10',
    soft: 'bg-rose-500/[0.04]',
    ring: 'ring-rose-400/25',
    edge: '#fb7185',
  },
  sky: {
    text: 'text-sky-300',
    border: 'border-sky-400/25',
    bg: 'bg-sky-500/10',
    soft: 'bg-sky-500/[0.04]',
    ring: 'ring-sky-400/25',
    edge: '#38bdf8',
  },
  zinc: {
    text: 'text-zinc-300',
    border: 'border-zinc-400/20',
    bg: 'bg-zinc-500/10',
    soft: 'bg-zinc-500/[0.04]',
    ring: 'ring-zinc-400/20',
    edge: '#a1a1aa',
  },
}

type LaneFilter = RepoLane | 'all'
type AtlasFlowNode = Node<SystemMapNode, 'atlas'>

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'recent'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function ExternalAnchor({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  )
}

function Eyebrow({ children, icon: Icon = Sparkles }: { children: React.ReactNode; icon?: typeof Sparkles }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  icon,
}: {
  eyebrow: string
  title: string
  copy: string
  icon?: typeof Sparkles
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">{copy}</p>
    </div>
  )
}

function AtlasNode({ data, selected }: NodeProps<AtlasFlowNode>) {
  const tokens = accentTokens[data.accent]

  return (
    <div
      className={`w-[230px] rounded-lg border ${tokens.border} ${tokens.soft} p-4 shadow-2xl shadow-black/30 ring-1 ${
        selected ? tokens.ring : 'ring-white/[0.04]'
      } backdrop-blur-xl`}
    >
      <Handle type="target" position={Position.Left} className="!h-2 !w-2 !border-0 !bg-zinc-500" />
      <Handle type="source" position={Position.Right} className={`!h-2 !w-2 !border-0 ${tokens.bg}`} />

      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${tokens.text}`}>{data.kicker}</div>
          <div className="mt-1 text-sm font-semibold leading-tight text-zinc-50">{data.label}</div>
        </div>
        {data.metric ? (
          <span className={`rounded-md border px-2 py-1 text-[10px] font-medium ${tokens.border} ${tokens.text}`}>
            {data.metric}
          </span>
        ) : null}
      </div>

      <p className="text-[11px] leading-5 text-zinc-400">{data.description}</p>

      {data.href ? (
        <ExternalAnchor
          href={data.href}
          className={`mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium ${tokens.text} hover:text-zinc-50`}
        >
          {data.repo ?? 'Open source'}
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </ExternalAnchor>
      ) : data.repo ? (
        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
          <LockKeyhole className="h-3 w-3" aria-hidden="true" />
          {data.repo}
        </div>
      ) : null}
    </div>
  )
}

const nodeTypes = {
  atlas: AtlasNode as ComponentType<NodeProps>,
}

function SystemMap() {
  const nodes = useMemo<AtlasFlowNode[]>(
    () =>
      systemMapNodes.map((node) => ({
        id: node.id,
        type: 'atlas',
        data: node,
        position: node.position,
      })),
    [],
  )

  const edges = useMemo<Edge[]>(
    () =>
      systemMapEdges.map((edge) => {
        const sourceNode = systemMapNodes.find((node) => node.id === edge.source)
        const edgeColor = sourceNode ? accentTokens[sourceNode.accent].edge : '#71717a'

        return {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          label: edge.label,
          animated: edge.animated,
          markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor },
          style: { stroke: edgeColor, strokeWidth: edge.animated ? 2.2 : 1.4 },
          labelStyle: { fill: '#a1a1aa', fontSize: 11, fontWeight: 600 },
          labelBgStyle: { fill: 'rgba(10,10,11,0.88)' },
        }
      }),
    [],
  )

  return (
    <div id="system-map" className="h-[520px] min-h-[420px] overflow-hidden rounded-lg border border-white/[0.08] bg-[#08080a]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.35}
        maxZoom={1.35}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
      >
        <Background color="#27272a" gap={28} size={1} />
        <MiniMap
          pannable
          zoomable
          className="!hidden !h-24 !w-32 !border !border-white/[0.08] !bg-zinc-950/90 sm:!block"
          nodeColor={(node) => accentTokens[(node.data as SystemMapNode).accent]?.edge ?? '#71717a'}
          maskColor="rgba(0,0,0,0.45)"
        />
        <Controls className="!border !border-white/[0.08] !bg-zinc-950/90 [&_button]:!border-white/[0.08] [&_button]:!bg-transparent [&_button]:!text-zinc-200 [&_button:hover]:!bg-white/[0.08]" />
      </ReactFlow>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#070708] pt-24">
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,47,73,0.28),rgba(7,7,8,0.4)_38%,#070708_100%)]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl grid-cols-1 gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
        <div className="flex flex-col justify-center pb-4 pt-8">
          <Eyebrow icon={Network}>FrankX system funnel</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl">
            Agentic Life OS
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            A proof-producing command system for founder work: decide the highest-leverage move, execute it with
            bounded agents, preserve the evidence, and convert the result into offers, assets, learning, and operating
            advantage.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#github-atlas"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-300 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-200"
            >
              View public repo atlas
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#funnel"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-5 text-sm font-semibold text-zinc-100 transition hover:bg-white/[0.08]"
            >
              See the offer funnel
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-3">
            {agenticLifeOsStats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-3">
                <div className="text-2xl font-semibold text-zinc-50">{stat.value}</div>
                <div className="mt-1 text-[11px] leading-4 text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center pb-8 pt-4 lg:pt-12">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.16em] text-cyan-300">Interactive system map</div>
              <p className="mt-1 text-xs text-zinc-500">XYFlow map of the funnel, modules, substrate, and evidence paths.</p>
            </div>
            <span className="hidden rounded-lg border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-xs text-zinc-400 sm:inline-flex">
              {agenticLifeOsPublicScan.totalPublic} public repos
            </span>
          </div>
          <SystemMap />
        </div>
      </div>
    </section>
  )
}

function StatStrip() {
  return (
    <section className="border-b border-white/[0.06] bg-[#0a0a0b] py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:grid-cols-5 sm:px-6 lg:px-8">
        {agenticLifeOsStats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="text-2xl font-semibold text-zinc-50">{stat.value}</div>
            <div className="mt-1 text-xs text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function IntentionAndResults() {
  return (
    <section className="border-b border-white/[0.06] bg-[#08080a] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-2xl">
            <Eyebrow icon={ShieldCheck}>Intention</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">{operatingIntent.headline}</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-400 sm:text-base">{operatingIntent.copy}</p>
            <p className="mt-5 rounded-lg border border-emerald-400/20 bg-emerald-500/[0.05] p-4 text-sm leading-6 text-emerald-100/85">
              {operatingIntent.promise}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {resultMetrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4">
                  <div className="text-2xl font-semibold text-zinc-50">{metric.value}</div>
                  <div className="mt-1 text-xs font-semibold text-zinc-300">{metric.label}</div>
                  <p className="mt-2 text-[11px] leading-4 text-zinc-500">{metric.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {resultEngines.map((engine) => {
              const tokens = accentTokens[engine.accent]
              return (
                <article key={engine.name} className={`rounded-lg border ${tokens.border} bg-white/[0.025] p-5`}>
                  <div className={`mb-4 inline-flex rounded-lg border ${tokens.border} ${tokens.bg} p-2 ${tokens.text}`}>
                    <Workflow className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-50">{engine.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{engine.intent}</p>
                  <div className="mt-4 border-t border-white/[0.06] pt-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Mechanism</div>
                    <p className="mt-2 text-xs leading-5 text-zinc-400">{engine.mechanism}</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Result</div>
                    <p className="mt-2 text-xs leading-5 text-zinc-400">{engine.result}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function OfferFunnel() {
  return (
    <section id="funnel" className="border-b border-white/[0.06] bg-[#0a0a0b] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Offer architecture"
          title="One system, four buyer-readable paths"
          copy="The funnel starts public and gets more private as implementation risk rises. Each step has a clear delivery mode and boundary."
          icon={GitBranch}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {offerPackages.map((offer, index) => (
            <div key={offer.name} className="relative rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-md border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-300">
                  0{index + 1}
                </span>
                <span className="text-[11px] text-zinc-500">{offer.status}</span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-50">{offer.name}</h3>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">{offer.audience}</p>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{offer.promise}</p>
              <p className="mt-4 border-t border-white/[0.06] pt-4 text-xs leading-5 text-zinc-500">{offer.deliveryMode}</p>
              <Link
                href={offer.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
              >
                {offer.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DnaCards() {
  return (
    <section id="dna" className="border-b border-white/[0.06] bg-[#08080a] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Execution DNA"
          title="How agentic work becomes visible results"
          copy="These are the repeated patterns behind the system: capture intent, route execution, preserve memory, package the offer, and verify the output."
          icon={CircuitBoard}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {dnaCards.map((card) => {
            const tokens = accentTokens[card.accent]
            return (
              <article key={card.name} className={`rounded-lg border ${tokens.border} bg-white/[0.025] p-5`}>
                <div className={`mb-4 inline-flex rounded-lg border ${tokens.border} ${tokens.bg} p-2 ${tokens.text}`}>
                  <Blocks className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${tokens.text}`}>{card.layer}</div>
                <h3 className="mt-2 text-base font-semibold text-zinc-50">{card.name}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{card.description}</p>
                <div className="mt-5 border-t border-white/[0.06] pt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Execution</div>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">{card.execution}</p>
                </div>
                <div className="mt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Result</div>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">{card.result}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.evidence.map((item) => (
                    <span key={item} className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-[11px] text-zinc-400">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function IntelligenceSystems() {
  return (
    <section className="border-b border-white/[0.06] bg-[#0a0a0b] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Intelligence systems"
          title="The substrate that powers the loops"
          copy="These systems keep the public offer honest: governance, memory, capability routing, swarm runtime, domain safety, and design verification."
          icon={Brain}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {intelligenceSystems.map((system) => {
            const tokens = accentTokens[system.accent]
            return (
              <article key={system.name} className={`rounded-lg border ${tokens.border} bg-white/[0.025] p-5`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${tokens.text}`}>{system.layer}</div>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-50">{system.name}</h3>
                  </div>
                  {system.href ? (
                    <ExternalAnchor href={system.href} className={`rounded-lg border ${tokens.border} ${tokens.bg} p-2 ${tokens.text} hover:text-zinc-50`}>
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">Open {system.repoName}</span>
                    </ExternalAnchor>
                  ) : (
                    <span className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-2 text-zinc-500">
                      <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{system.purpose}</p>
                <div className="mt-5 rounded-lg border border-white/[0.06] bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    Proof gate
                  </div>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">{system.proofGate}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ModulesAndLoops() {
  return (
    <section id="loops" className="border-b border-white/[0.06] bg-[#08080a] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionHeading
              eyebrow="Private module map"
              title="The life domains stay explicit"
              copy="The public page can explain the modules without exposing their underlying private records, local paths, credentials, or client data."
              icon={Layers3}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {lifeOsModules.map((module) => {
                const tokens = accentTokens[module.accent]
                return (
                  <article key={module.key} className={`rounded-lg border ${tokens.border} bg-white/[0.025] p-4`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${tokens.text}`}>{module.risk}</div>
                        <h3 className="mt-1 text-sm font-semibold text-zinc-50">{module.name}</h3>
                      </div>
                      <span className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-[10px] text-zinc-500">
                        {module.status}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-zinc-400">{module.purpose}</p>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
                      <LockKeyhole className="h-3 w-3" aria-hidden="true" />
                      {module.repo}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Operating loops"
              title="Recurring loops with proof gates"
              copy="Every loop has a cadence, owner, inputs, outputs, and a safety gate. That makes the system operational instead of inspirational."
              icon={Workflow}
            />
            <div className="space-y-3">
              {operatingLoops.map((loop) => {
                const tokens = accentTokens[loop.accent]
                return (
                  <article key={loop.name} className={`rounded-lg border ${tokens.border} bg-white/[0.025] p-4`}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${tokens.text}`}>{loop.cadence}</div>
                        <h3 className="mt-1 text-base font-semibold text-zinc-50">{loop.name}</h3>
                      </div>
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-[11px] text-zinc-400">
                        <Command className="h-3 w-3" aria-hidden="true" />
                        {loop.owner}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{loop.purpose}</p>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Inputs</div>
                        <p className="mt-1 text-xs leading-5 text-zinc-400">{loop.inputs.join(', ')}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Outputs</div>
                        <p className="mt-1 text-xs leading-5 text-zinc-400">{loop.outputs.join(', ')}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Safety gate</div>
                        <p className="mt-1 text-xs leading-5 text-zinc-400">{loop.safetyGate}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RepoCard({ repo }: { repo: PublicRepoCard }) {
  const tokens = accentTokens[repo.accent]
  const topics = repo.topics.slice(0, 3)

  return (
    <article className={`rounded-lg border ${tokens.border} bg-white/[0.025] p-4 transition hover:bg-white/[0.04]`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className={`mb-2 inline-flex rounded-md border ${tokens.border} ${tokens.bg} px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${tokens.text}`}>
            {repo.laneLabel}
          </div>
          <h3 className="truncate text-sm font-semibold text-zinc-50">{repo.name}</h3>
        </div>
        <ExternalAnchor href={repo.url} className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-2 text-zinc-400 transition hover:text-zinc-50">
          <Github className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Open {repo.name}</span>
        </ExternalAnchor>
      </div>
      <p className="mt-3 line-clamp-3 min-h-[60px] text-xs leading-5 text-zinc-400">
        {repo.description || 'Public FrankX repository.'}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {repo.language ? (
          <span className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-[11px] text-zinc-400">{repo.language}</span>
        ) : null}
        {topics.map((topic) => (
          <span key={topic} className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-[11px] text-zinc-500">
            {topic}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3 text-[11px] text-zinc-500">
        <span>{repo.evidence}</span>
        <span>{formatDate(repo.updatedAt)}</span>
      </div>
    </article>
  )
}

function GithubAtlas() {
  const [query, setQuery] = useState('')
  const [lane, setLane] = useState<LaneFilter>('all')

  const filteredRepos = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return publicGithubRepos.filter((repo) => {
      const matchesLane = lane === 'all' || repo.lane === lane
      const matchesQuery =
        normalized.length === 0 ||
        `${repo.name} ${repo.description} ${repo.language} ${repo.topics.join(' ')}`.toLowerCase().includes(normalized)

      return matchesLane && matchesQuery
    })
  }, [lane, query])

  return (
    <section id="github-atlas" className="border-b border-white/[0.06] bg-[#0a0a0b] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="GitHub proof layer"
            title="Public repos become rich evidence cards"
            copy="The scan uses live GitHub metadata from the frankxai organization. Private repositories stay summarized as counts only."
            icon={Github}
          />
          <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4 text-xs text-zinc-500 lg:min-w-[260px]">
            <div className="flex items-center gap-2 text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              Last scan
            </div>
            <div className="mt-2">{formatDate(agenticLifeOsPublicScan.generatedAt)}</div>
            <div className="mt-1">{agenticLifeOsPublicScan.totalPublic} public repos, {agenticLifeOsPublicScan.privateRepoCount} private summarized</div>
          </div>
        </div>

        {featuredPublicRepos.length > 0 ? (
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredPublicRepos.map((repo) => (
              <RepoCard key={`featured-${repo.name}`} repo={repo} />
            ))}
          </div>
        ) : null}

        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-md">
            <span className="sr-only">Search public repositories</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search public repos, topics, languages"
              className="h-11 w-full rounded-lg border border-white/[0.1] bg-white/[0.035] pl-10 pr-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan-300/40"
            />
          </label>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setLane('all')}
              className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border px-3 text-xs font-semibold transition ${
                lane === 'all'
                  ? 'border-emerald-300/40 bg-emerald-500/10 text-emerald-200'
                  : 'border-white/[0.08] bg-white/[0.025] text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Filter className="h-3.5 w-3.5" aria-hidden="true" />
              All {publicGithubRepos.length}
            </button>
            {publicRepoLaneCounts
              .filter((item) => item.count > 0)
              .map((item) => {
                const tokens = accentTokens[item.accent]
                return (
                  <button
                    key={item.lane}
                    type="button"
                    onClick={() => setLane(item.lane)}
                    className={`h-10 shrink-0 rounded-lg border px-3 text-xs font-semibold transition ${
                      lane === item.lane
                        ? `${tokens.border} ${tokens.bg} ${tokens.text}`
                        : 'border-white/[0.08] bg-white/[0.025] text-zinc-400 hover:text-zinc-100'
                    }`}
                  >
                    {item.label} {item.count}
                  </button>
                )
              })}
          </div>
        </div>

        <div className="mb-4 text-sm text-zinc-500">
          Showing <span className="text-zinc-200">{filteredRepos.length}</span> public repositories
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRepos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CommandSurfaceGrid() {
  return (
    <section className="border-b border-white/[0.06] bg-[#08080a] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Commands and skills"
          title="The workbench behind the operating system"
          copy="These are public-safe examples of how the OS routes work through skills, commands, and verification gates."
          icon={Command}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {commandSurfaces.map((item) => (
            <article key={item.command} className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
              <div className="flex items-center justify-between gap-3">
                <code className="rounded-md border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 font-mono text-sm text-cyan-200">
                  {item.command}
                </code>
                <span className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-[11px] text-zinc-500">
                  {item.skill}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{item.use}</p>
              <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-xs text-zinc-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                {item.output}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="bg-[#0a0a0b] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Eyebrow icon={ShieldCheck}>Public boundary intact</Eyebrow>
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">The map is public. The operating layer stays private.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          This route exposes the product architecture, public GitHub evidence, and implementation logic without publishing private memory,
          health, finance, family, client, credentials, or unreleased strategy data.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-300 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-200"
          >
            Request an implementation map
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <ExternalAnchor
            href="https://github.com/frankxai"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-5 text-sm font-semibold text-zinc-100 transition hover:bg-white/[0.08]"
          >
            Browse public GitHub
            <Github className="h-4 w-4" aria-hidden="true" />
          </ExternalAnchor>
        </div>
      </div>
    </section>
  )
}

export default function AgenticLifeOsShell() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-zinc-100">
      <Hero />
      <StatStrip />
      <IntentionAndResults />
      <OfferFunnel />
      <DnaCards />
      <IntelligenceSystems />
      <ModulesAndLoops />
      <GithubAtlas />
      <CommandSurfaceGrid />
      <FinalCta />
    </main>
  )
}
