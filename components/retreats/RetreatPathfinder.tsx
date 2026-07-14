'use client'

import { useState } from 'react'
import { ArrowRight, Check, Clock3, Compass, Hammer, Users } from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import { trackEvent } from '@/lib/analytics'

const intentions = [
  {
    id: 'clarity',
    label: 'Turn a decision into a practice',
    icon: Compass,
    format: 'Purpose to Practice',
    status: 'Prepared',
    duration: '90 minutes',
    artifact: 'A two-page plan and a dated 30-day trial.',
    next: 'Start with the first working session',
  },
  {
    id: 'build',
    label: 'Build one important idea',
    icon: Hammer,
    format: 'Creation Chamber Sprint',
    status: 'Concept',
    duration: 'One day',
    artifact: 'A working prototype, review notes and the next build sequence.',
    next: 'See how the founding method begins',
  },
  {
    id: 'system',
    label: 'Create a personal operating rhythm',
    icon: Clock3,
    format: 'Starlight Creation Retreat',
    status: 'In development',
    duration: 'Three nights · four days',
    artifact: 'A working second brain, human-approved AI workflows and a 30-day practice.',
    next: 'Follow the first proof product',
  },
  {
    id: 'team',
    label: 'Redesign how a team works',
    icon: Users,
    format: 'Team Creation Room',
    status: 'Future',
    duration: 'Custom working room',
    artifact: 'A team agreement, decision rhythm and practical agent boundaries.',
    next: 'Explore the prepared session',
  },
] as const

export function RetreatPathfinder() {
  const [selectedId, setSelectedId] = useState<(typeof intentions)[number]['id']>('clarity')
  const selected = intentions.find((intention) => intention.id === selectedId) ?? intentions[0]

  return (
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
      <div>
        <p className="text-sm font-medium text-amber-200/70">Choose the progress you need</p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
          Find your first room.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
          The ladder begins with the smallest format that can create a useful artifact. Future rooms
          stay visible, but their status stays honest.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {intentions.map((intention) => {
            const Icon = intention.icon
            const isSelected = intention.id === selectedId

            return (
              <button
                key={intention.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedId(intention.id)
                  trackEvent('retreat_path_selected', { intent: intention.id })
                }}
                className={`group flex min-h-16 items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-colors motion-reduce:transition-none ${
                  isSelected
                    ? 'border-amber-200/35 bg-amber-200/[0.08] text-white'
                    : 'border-white/[0.08] bg-white/[0.025] text-white/60 hover:border-white/15 hover:text-white'
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? 'border-amber-200/30 bg-amber-200/10 text-amber-100'
                      : 'border-white/10 bg-white/[0.03] text-white/40'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium leading-5">{intention.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-[2rem] border border-amber-200/15 bg-[#12100d] p-6 shadow-[0_32px_90px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10"
        aria-live="polite"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_46%)]" aria-hidden="true" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-200/20 bg-amber-200/[0.07] px-3 py-1 text-xs font-medium text-amber-100/80">
              {selected.status}
            </span>
            <span className="text-xs text-white/40">{selected.duration}</span>
          </div>

          <p className="mt-8 text-xs font-medium tracking-[0.08em] text-white/35">Recommended room</p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            {selected.format}
          </h3>

          <div className="mt-8 border-t border-white/[0.08] pt-7">
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-300/10 text-amber-200">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">What you leave with</p>
                <p className="mt-2 text-sm leading-6 text-white/55">{selected.artifact}</p>
              </div>
            </div>
          </div>

          <TrackedLink
            href="/experiences/tallinn-2026"
            eventName="retreat_path_cta_click"
            eventProperties={{ intent: selected.id, format: selected.format }}
            className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-300 px-6 text-sm font-semibold text-[#171008] transition-colors hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12100d]"
          >
            {selected.next}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedLink>

          {selected.status !== 'Prepared' && (
            <p className="mt-4 max-w-md text-xs leading-5 text-white/35">
              This format is not open for booking. The 90-minute working session is the prepared
              proof product.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
