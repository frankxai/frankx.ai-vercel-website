'use client'

import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Check, ChevronDown, CircleDashed, Search, X } from 'lucide-react'

type RegistryStatus = 'shipped' | 'in-progress' | 'gap'
type RegistryTier = 'haiku' | 'sonnet' | 'opus'

interface RegistryGates {
  dispatchable: boolean
  tested: boolean
  composed: boolean
  brand_gated: boolean
}

interface RegistryAgent {
  name: string
  kind: 'skill' | 'command' | 'agent' | 'mcp'
  ref: string | null
  status: RegistryStatus
  tier: RegistryTier | null
  summary: string
  gates: RegistryGates | null
}

export interface RegistryPillar {
  id: string
  number: number
  title: string
  tagline: string
  accent: string
  agents: RegistryAgent[]
}

const STATUS_LABEL: Record<RegistryStatus, string> = {
  shipped: 'Shipped',
  'in-progress': 'In progress',
  gap: 'Gap',
}

const STATUS_CLASS: Record<RegistryStatus, string> = {
  shipped: 'border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-200',
  'in-progress': 'border-amber-300/20 bg-amber-300/[0.08] text-amber-200',
  gap: 'border-white/10 bg-white/[0.035] text-white/55',
}

const GATE_LABELS: Array<[keyof RegistryGates, string]> = [
  ['dispatchable', 'Dispatchable'],
  ['tested', 'Tested'],
  ['composed', 'Composed'],
  ['brand_gated', 'Brand gated'],
]

export function AgentRegistry({ pillars }: { pillars: RegistryPillar[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialParams = useRef(searchParams.toString())
  const initialStatus = searchParams.get('status')
  const initialTier = searchParams.get('tier')
  const initialPillar = searchParams.get('pillar')
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [status, setStatus] = useState<'all' | RegistryStatus>(
    initialStatus === 'shipped' || initialStatus === 'in-progress' || initialStatus === 'gap' ? initialStatus : 'all',
  )
  const [pillar, setPillar] = useState(pillars.some((item) => item.id === initialPillar) ? initialPillar as string : 'all')
  const [tier, setTier] = useState<'all' | RegistryTier | 'unassigned'>(
    initialTier === 'haiku' || initialTier === 'sonnet' || initialTier === 'opus' || initialTier === 'unassigned' ? initialTier : 'all',
  )
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(initialParams.current)
      if (query) params.set('q', query)
      else params.delete('q')
      if (status !== 'all') params.set('status', status)
      else params.delete('status')
      if (pillar !== 'all') params.set('pillar', pillar)
      else params.delete('pillar')
      if (tier !== 'all') params.set('tier', tier)
      else params.delete('tier')
      const nextQuery = params.toString()
      window.history.replaceState(window.history.state, '', `${pathname}${nextQuery ? `?${nextQuery}` : ''}`)
    }, 160)
    return () => window.clearTimeout(timer)
  }, [pathname, pillar, query, status, tier])

  const filtered = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase()
    return pillars
      .filter((item) => pillar === 'all' || item.id === pillar)
      .map((item) => ({
        ...item,
        agents: item.agents.filter((agent) => {
          const matchesQuery = !normalized || [agent.name, agent.ref, agent.kind, agent.summary, item.title]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
            .includes(normalized)
          const matchesStatus = status === 'all' || agent.status === status
          const matchesTier = tier === 'all' || (tier === 'unassigned' ? !agent.tier : agent.tier === tier)
          return matchesQuery && matchesStatus && matchesTier
        }),
      }))
      .filter((item) => item.agents.length > 0)
  }, [deferredQuery, pillar, pillars, status, tier])

  const resultCount = filtered.reduce((total, item) => total + item.agents.length, 0)
  const hasFilters = query.length > 0 || status !== 'all' || pillar !== 'all' || tier !== 'all'

  const reset = () => {
    setQuery('')
    setStatus('all')
    setPillar('all')
    setTier('all')
  }

  return (
    <section className="px-5 py-14 sm:px-6 sm:py-20" aria-labelledby="registry-heading">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Live source manifest</p>
            <h2 id="registry-heading" className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The operating registry
            </h2>
          </div>
          <p className="font-mono text-xs text-white/45" aria-live="polite">
            {resultCount} {resultCount === 1 ? 'result' : 'results'}
          </p>
        </div>

        <div className="sticky top-16 z-20 -mx-2 mt-6 rounded-2xl border border-white/10 bg-[#0a0a0b]/95 p-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="grid gap-2 lg:grid-cols-[minmax(240px,1fr)_repeat(3,minmax(140px,0.35fr))_auto]">
            <label className="relative block">
              <span className="sr-only">Search agents</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" aria-hidden />
              <input
                type="search"
                name="registry-query"
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search role, capability, or reference…"
                className="min-h-11 w-full rounded-xl border border-white/10 bg-white/[0.035] py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-emerald-300/35 focus:ring-2 focus:ring-emerald-300/15"
              />
            </label>
            <FilterSelect label="Status" value={status} onChange={(value) => setStatus(value as typeof status)} options={[
              ['all', 'All states'], ['shipped', 'Shipped'], ['in-progress', 'In progress'], ['gap', 'Gaps'],
            ]} />
            <FilterSelect label="Pillar" value={pillar} onChange={setPillar} options={[
              ['all', 'All pillars'], ...pillars.map((item) => [item.id, `${String(item.number).padStart(2, '0')} · ${item.title}`] as [string, string]),
            ]} />
            <FilterSelect label="Tier" value={tier} onChange={(value) => setTier(value as typeof tier)} options={[
              ['all', 'All tiers'], ['haiku', 'Haiku'], ['sonnet', 'Sonnet'], ['opus', 'Opus'], ['unassigned', 'Unassigned'],
            ]} />
            <button
              type="button"
              onClick={reset}
              disabled={!hasFilters}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <X className="h-4 w-4" aria-hidden /> Reset
            </button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-12 space-y-16">
            {filtered.map((item) => (
              <section key={item.id} id={item.id} className="scroll-mt-40" aria-labelledby={`${item.id}-heading`}>
                <div className="grid gap-3 border-b border-white/10 pb-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-end">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300/65">
                      Pillar {String(item.number).padStart(2, '0')} · {item.agents.length} shown
                    </p>
                    <h3 id={`${item.id}-heading`} className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-white/50 md:text-right">{item.tagline}</p>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {item.agents.map((agent) => (
                    <details key={`${item.id}-${agent.ref ?? agent.name}`} className="group rounded-2xl border border-white/[0.09] bg-white/[0.025] [contain-intrinsic-size:116px] [content-visibility:auto] open:border-white/15 open:bg-white/[0.04]">
                      <summary className="flex min-h-[116px] cursor-pointer list-none items-start gap-4 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300/45 [&::-webkit-details-marker]:hidden">
                        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/20 font-mono text-[10px] uppercase text-white/45">
                          {agent.kind.slice(0, 2)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-white">{agent.name}</span>
                            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_CLASS[agent.status]}`}>
                              {STATUS_LABEL[agent.status]}
                            </span>
                            {agent.tier && <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-2 py-0.5 font-mono text-[10px] uppercase text-cyan-100/70">{agent.tier}</span>}
                          </span>
                          <span className="mt-2 line-clamp-2 block text-sm leading-6 text-white/48">{agent.summary}</span>
                        </span>
                        <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-white/35 transition-transform group-open:rotate-180" aria-hidden />
                      </summary>
                      <div className="border-t border-white/[0.07] px-5 pb-5 pt-4">
                        {agent.ref && <p className="mb-4 overflow-x-auto font-mono text-[11px] text-white/38">ref · {agent.ref}</p>}
                        <p className="text-sm leading-6 text-white/65">{agent.summary}</p>
                        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Quality gates">
                          {GATE_LABELS.map(([key, label]) => {
                            const lit = Boolean(agent.gates?.[key])
                            return (
                              <div key={key} className={`flex min-h-10 items-center gap-2 rounded-lg border px-2.5 py-2 text-[11px] ${lit ? 'border-emerald-300/15 bg-emerald-300/[0.055] text-emerald-100/80' : 'border-white/[0.07] bg-black/15 text-white/35'}`}>
                                {lit ? <Check className="h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden /> : <CircleDashed className="h-3.5 w-3.5 shrink-0" aria-hidden />}
                                {label}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
            <p className="font-display text-xl font-semibold text-white">No registry entries match.</p>
            <p className="mt-2 text-sm text-white/45">Change a filter or search for a broader capability.</p>
            <button type="button" onClick={reset} className="mt-5 min-h-11 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function FilterSelect({ label, value, onChange, options }: {
  label: string
  value: string
  onChange: (value: string) => void
  options: Array<[string, string]>
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        name={`registry-${label.toLowerCase().replaceAll(' ', '-')}`}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#0e0f11] px-3 py-2.5 pr-9 text-sm text-white/75 outline-none focus:border-emerald-300/35 focus:ring-2 focus:ring-emerald-300/15"
      >
        {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" aria-hidden />
    </label>
  )
}
