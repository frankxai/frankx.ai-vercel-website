'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Music2,
  Network,
  NotebookTabs,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import {
  getPublicOperatingSystem,
  operatingSystemGoals,
  publicOperatingSystems,
  type OperatingSystemGoal,
  type OperatingSystemStage,
} from '@/data/public-operating-systems'

const GOAL_ICONS: Record<OperatingSystemGoal, LucideIcon> = {
  create: Sparkles,
  business: BriefcaseBusiness,
  learn: GraduationCap,
  life: NotebookTabs,
  agents: Network,
  music: Music2,
  legacy: HeartHandshake,
}

const STAGE_LABELS: Record<OperatingSystemStage, string> = {
  'open-source': 'Open source',
  'public-blueprint': 'Public blueprint',
  'private-system': 'Private system',
}

export default function OperatingSystemNavigator() {
  const [selectedGoal, setSelectedGoal] = useState<OperatingSystemGoal>('create')

  const selectedOption = operatingSystemGoals.find((goal) => goal.id === selectedGoal) ?? operatingSystemGoals[0]
  const recommendation = getPublicOperatingSystem(selectedOption.recommendationId) ?? publicOperatingSystems[0]
  const adjacentSystems = useMemo(
    () =>
      publicOperatingSystems
        .filter((system) => system.id !== recommendation.id && system.goals.includes(selectedGoal))
        .slice(0, 2),
    [recommendation.id, selectedGoal],
  )

  return (
    <section id="navigator" className="border-y border-white/[0.08] bg-[#0d0d0f] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium text-cyan-300">Find your starting system</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What are you trying to make operational?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
            Choose the work, then inspect the system, its maturity, and the boundary around it.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1" role="list" aria-label="Operating system goals">
            {operatingSystemGoals.map((goal) => {
              const Icon = GOAL_ICONS[goal.id]
              const isSelected = selectedGoal === goal.id

              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setSelectedGoal(goal.id)}
                  aria-pressed={isSelected}
                  className={`min-h-[76px] rounded-lg border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0f] ${
                    isSelected
                      ? 'border-cyan-400/50 bg-cyan-400/[0.08] text-white'
                      : 'border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-white/[0.18] hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${isSelected ? 'text-cyan-300' : 'text-zinc-500'}`} aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-semibold">{goal.label}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-zinc-500">{goal.prompt}</span>
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="min-h-[520px] rounded-lg border border-white/[0.1] bg-black/30 p-6 sm:p-8" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
              <span className="text-sm text-zinc-500">Recommended starting point</span>
              <span className="rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300">
                {STAGE_LABELS[recommendation.stage]}
              </span>
            </div>

            <div className="pt-7">
              <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{recommendation.name}</h3>
              <p className="mt-4 text-base leading-relaxed text-zinc-300">{recommendation.outcome}</p>

              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-sm font-medium text-zinc-500">Built for</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-zinc-300">{recommendation.audience}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-500">How it works</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-zinc-300">{recommendation.mechanism}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-500">First useful result</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-zinc-100">{recommendation.firstWin}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-500">Boundary</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-zinc-400">{recommendation.boundary}</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={recommendation.detailHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Explore {recommendation.name}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {recommendation.proofHref.startsWith('http') ? (
                  <a
                    href={recommendation.proofHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/[0.14] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/[0.28] hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {recommendation.proofLabel}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    href={recommendation.proofHref}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/[0.14] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/[0.28] hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {recommendation.proofLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>

              {adjacentSystems.length > 0 && (
                <div className="mt-8 border-t border-white/[0.08] pt-5">
                  <p className="text-xs text-zinc-500">Often connected</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {adjacentSystems.map((system) => (
                      <Link key={system.id} href={system.detailHref} className="text-sm text-zinc-300 hover:text-cyan-300">
                        {system.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
