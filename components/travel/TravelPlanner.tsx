'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

export type PlannerJourney = {
  slug: string
  city: string
  country: string
  region: 'Europe' | 'Asia' | 'Americas' | 'Africa'
  month: string
  monthIndex: number
  hook: string
  stayLength: string
  events: { name: string; type: string }[]
  stayVariants: { length: string; focus: string }[]
}

const regionColors: Record<PlannerJourney['region'], string> = {
  Europe: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  Asia: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
  Americas: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  Africa: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
}

// Event type → reader-facing interest facet. Drives the "what you're into" filter.
const INTEREST_BY_TYPE: Record<string, string> = {
  festival: 'Festivals',
  music: 'Music',
  art: 'Art & museums',
  culture: 'Food & culture',
  food: 'Food & culture',
  tech: 'Tech & ideas',
  seasonal: 'Nature & seasons',
}

const LENSES = ['Long weekend', 'Two weeks', 'A month'] as const
type Lens = (typeof LENSES)[number]

function interestsOf(j: PlannerJourney): string[] {
  const set = new Set<string>()
  for (const e of j.events) {
    const label = INTEREST_BY_TYPE[e.type]
    if (label) set.add(label)
  }
  return [...set]
}

function ArrowIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] ${
        active
          ? 'bg-amber-500/15 border-amber-500/30 text-amber-200'
          : 'bg-white/[0.02] border-white/10 text-white/55 hover:border-white/20 hover:text-white/80'
      }`}
    >
      {children}
    </button>
  )
}

export default function TravelPlanner({ journeys }: { journeys: PlannerJourney[] }) {
  const [month, setMonth] = useState<number | 'any'>('any')
  const [region, setRegion] = useState<PlannerJourney['region'] | 'any'>('any')
  const [interests, setInterests] = useState<string[]>([])
  const [lens, setLens] = useState<Lens>('Two weeks')

  const monthOptions = useMemo(
    () => journeys.map((j) => ({ index: j.monthIndex, label: j.month.replace(' 2026', '') })),
    [journeys],
  )
  const regionOptions = useMemo(
    () => [...new Set(journeys.map((j) => j.region))] as PlannerJourney['region'][],
    [journeys],
  )
  const interestOptions = useMemo(() => {
    const set = new Set<string>()
    journeys.forEach((j) => interestsOf(j).forEach((i) => set.add(i)))
    return [...set]
  }, [journeys])

  const toggleInterest = (i: string) =>
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))

  const reset = () => {
    setMonth('any')
    setRegion('any')
    setInterests([])
  }

  const filtered = useMemo(
    () =>
      journeys.filter((j) => {
        if (month !== 'any' && j.monthIndex !== month) return false
        if (region !== 'any' && j.region !== region) return false
        if (interests.length > 0) {
          const js = interestsOf(j)
          if (!interests.some((i) => js.includes(i))) return false
        }
        return true
      }),
    [journeys, month, region, interests],
  )

  const hasFilters = month !== 'any' || region !== 'any' || interests.length > 0

  return (
    <div>
      {/* Planner bar */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 mb-8">
        <div className="flex items-center justify-between gap-3 mb-5">
          <p className="text-[11px] uppercase tracking-[0.25em] text-amber-400/70">Plan your trip</p>
          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="text-xs text-white/45 hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded"
            >
              Reset
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* When */}
          <div role="group" aria-label="Filter by month">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-2">When</p>
            <div className="flex flex-wrap gap-2">
              <Chip active={month === 'any'} onClick={() => setMonth('any')}>
                Any month
              </Chip>
              {monthOptions.map((m) => (
                <Chip key={m.index} active={month === m.index} onClick={() => setMonth(m.index)}>
                  {m.label}
                </Chip>
              ))}
            </div>
          </div>

          {/* Where */}
          <div role="group" aria-label="Filter by region">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-2">Where</p>
            <div className="flex flex-wrap gap-2">
              <Chip active={region === 'any'} onClick={() => setRegion('any')}>
                Anywhere
              </Chip>
              {regionOptions.map((r) => (
                <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
                  {r}
                </Chip>
              ))}
            </div>
          </div>

          {/* What you're into */}
          <div role="group" aria-label="Filter by interest">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-2">What you’re into</p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((i) => (
                <Chip key={i} active={interests.includes(i)} onClick={() => toggleInterest(i)}>
                  {i}
                </Chip>
              ))}
            </div>
          </div>

          {/* How long — re-frames each card, does not filter */}
          <div role="group" aria-label="Trip length lens">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-2">How long</p>
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.02] p-1">
              {LENSES.map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={lens === l}
                  onClick={() => setLens(l)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                    lens === l ? 'bg-amber-500/15 text-amber-200' : 'text-white/55 hover:text-white/80'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result summary */}
      <p className="text-sm text-white/50 mb-5" aria-live="polite">
        {filtered.length === 0
          ? 'No routes match yet — widen a filter.'
          : `${filtered.length} ${filtered.length === 1 ? 'route' : 'routes'} for a ${lens.toLowerCase()}.`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 text-center">
          <p className="text-white/60 text-sm mb-4">Nothing matches that combination for the rest of 2026.</p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium hover:bg-amber-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((j) => {
            const variant =
              j.stayVariants.find((v) => v.length.toLowerCase() === lens.toLowerCase()) ?? j.stayVariants[0]
            return (
              <Link key={j.slug} href={`/travel/${j.slug}`} className="group block focus-visible:outline-none">
                <article className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-amber-500/20 hover:bg-amber-500/[0.03] group-focus-visible:ring-2 group-focus-visible:ring-amber-300 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#0a0a0b]">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-amber-400/70">{j.month}</span>
                    <span className={`px-2.5 py-0.5 text-[10px] font-medium rounded-full border ${regionColors[j.region]}`}>
                      {j.region}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                    {j.city}
                    <span className="text-white/35 font-normal">, {j.country}</span>
                  </h2>

                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{j.hook}</p>

                  {variant && (
                    <p className="mt-4 text-xs text-amber-200/70 leading-relaxed">
                      <span className="text-white/40">{variant.length}:</span> {variant.focus}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px]">
                    {j.events[0] && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/[0.07] border border-amber-500/15 text-amber-200/80">
                        {j.events[0].name}
                      </span>
                    )}
                    {interestsOf(j)
                      .slice(0, 2)
                      .map((i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/55"
                        >
                          {i}
                        </span>
                      ))}
                  </div>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-amber-400/80 group-hover:text-amber-300 transition-colors">
                    See the route
                    <ArrowIcon />
                  </span>
                </article>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
