'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Route } from 'lucide-react'

import type {
  TallinnOutcome,
  TallinnPersona,
} from '@/data/tallinn-experiences'
import {
  TALLINN_OUTCOMES,
  TALLINN_PERSONAS,
} from '@/data/tallinn-experiences'

export interface RouterExperience {
  slug: string
  title: string
  promise: string
  artifact: string
  personas: readonly TallinnPersona[]
  outcomes: readonly TallinnOutcome[]
  reviewRank: number | null
  frankRole: string
  anaInvitation: string
}
interface ExperienceRouterProps {
  experiences: readonly RouterExperience[]
}

const pathStages = [
  { label: 'Human signal', note: 'What matters and what stays human' },
  { label: 'Practice', note: 'A decision or artifact you can use' },
  { label: 'System', note: 'A repeatable workflow with boundaries' },
  { label: 'Team', note: 'Roles, knowledge, escalation, review' },
] as const

const activeStage: Record<TallinnOutcome, number> = {
  direction: 0,
  artifact: 1,
  workflow: 2,
  'team-system': 3,
}

function recommendationScore(
  experience: RouterExperience,
  persona: TallinnPersona,
  outcome: TallinnOutcome,
) {
  const personaScore = experience.personas.includes(persona) ? 8 : 0
  const outcomeScore = experience.outcomes.includes(outcome) ? 8 : 0
  const reviewScore = experience.reviewRank ? 6 - experience.reviewRank : 0
  return personaScore + outcomeScore + reviewScore
}

export function ExperienceRouter({ experiences }: ExperienceRouterProps) {
  const [persona, setPersona] = useState<TallinnPersona>('creator')
  const [outcome, setOutcome] = useState<TallinnOutcome>('direction')

  const recommendations = useMemo(
    () =>
      [...experiences]
        .sort(
          (a, b) =>
            recommendationScore(b, persona, outcome) -
            recommendationScore(a, persona, outcome),
        )
        .slice(0, 2),
    [experiences, outcome, persona],
  )

  const [primary, alternative] = recommendations
  const stage = activeStage[outcome]

  return (
    <section id="find-your-format" className="border-y border-white/[0.07] bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">
            Outcome router
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Find the room that matches the work.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Two choices. One recommendation. Every format ends in an inspectable artifact.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="space-y-9">
            <fieldset>
              <legend className="text-sm font-semibold text-white">I am here as a…</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                {(Object.keys(TALLINN_PERSONAS) as TallinnPersona[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={persona === id}
                    onClick={() => setPersona(id)}
                    className={`min-h-12 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] ${
                      persona === id
                        ? 'border-cyan-300/55 bg-cyan-300/10 text-white'
                        : 'border-white/10 bg-white/[0.025] text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {TALLINN_PERSONAS[id].label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-white">I want to leave with…</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {(Object.keys(TALLINN_OUTCOMES) as TallinnOutcome[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={outcome === id}
                    onClick={() => setOutcome(id)}
                    className={`min-h-14 rounded-2xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] ${
                      outcome === id
                        ? 'border-emerald-300/55 bg-emerald-300/10 text-white'
                        : 'border-white/10 bg-white/[0.025] text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <span className="block text-sm font-semibold">{TALLINN_OUTCOMES[id].label}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">
                      {TALLINN_OUTCOMES[id].note}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div
            aria-live="polite"
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1117] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:p-8"
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-cyan-300">
              <Route className="h-4 w-4" aria-hidden="true" />
              Recommended working room
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {pathStages.map((item, index) => (
                <div
                  key={item.label}
                  className={`relative border-l-2 py-2 pl-4 sm:border-l-0 sm:border-t-2 sm:pl-0 sm:pt-4 ${
                    index <= stage ? 'border-cyan-300/70' : 'border-white/10'
                  }`}
                >
                  <p className={index <= stage ? 'text-sm font-semibold text-white' : 'text-sm text-slate-500'}>
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{item.note}</p>
                </div>
              ))}
            </div>

            {primary ? (
              <div className="mt-8 border-t border-white/10 pt-7">
                <p className="text-sm text-slate-400">
                  {TALLINN_PERSONAS[persona].note}
                </p>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-white">
                  {primary.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-300">{primary.promise}</p>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.14em] text-slate-500">You make</dt>
                    <dd className="mt-1 text-sm text-white">{primary.artifact}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.14em] text-slate-500">Host shape</dt>
                    <dd className="mt-1 text-sm leading-6 text-slate-300">
                      Frank leads. Ana’s lane is invitation-only and hers to choose.
                    </dd>
                  </div>
                </dl>
                <Link
                  href={`/experiences/tallinn-2026/${primary.slug}`}
                  className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
                >
                  Review this format
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {alternative ? (
                  <p className="mt-5 text-sm text-slate-400">
                    Alternative:{' '}
                    <Link
                      href={`/experiences/tallinn-2026/${alternative.slug}`}
                      className="font-medium text-white underline decoration-white/25 underline-offset-4 hover:decoration-white"
                    >
                      {alternative.title}
                    </Link>
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
