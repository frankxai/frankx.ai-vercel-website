'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Check, RadioTower } from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import {
  TALLINN_AMPLIFIER_OUTCOMES,
  TALLINN_AMPLIFIER_ROLES,
  type TallinnAmplifierOutcome,
  type TallinnAmplifierRole,
} from '@/data/tallinn-studio'

interface SessionAmplifierProps {
  defaultRole?: TallinnAmplifierRole
  defaultOutcome?: TallinnAmplifierOutcome
}

const stages = [
  { id: 'before', index: '01', label: 'Before the room' },
  { id: 'inRoom', index: '02', label: 'Inside the room' },
  { id: 'after', index: '03', label: 'After the room' },
] as const

export function SessionAmplifier({
  defaultRole = 'speaker',
  defaultOutcome = 'participant-artifact',
}: SessionAmplifierProps) {
  const [role, setRole] = useState<TallinnAmplifierRole>(defaultRole)
  const [outcome, setOutcome] = useState<TallinnAmplifierOutcome>(defaultOutcome)

  const selectedRole = useMemo(
    () => TALLINN_AMPLIFIER_ROLES.find((item) => item.id === role) ?? TALLINN_AMPLIFIER_ROLES[0],
    [role],
  )
  const selectedOutcome = useMemo(
    () =>
      TALLINN_AMPLIFIER_OUTCOMES.find((item) => item.id === outcome) ??
      TALLINN_AMPLIFIER_OUTCOMES[0],
    [outcome],
  )

  return (
    <section id="amplifier" className="border-y border-white/[0.07] bg-white/[0.012]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-300">
              <RadioTower className="h-4 w-4" aria-hidden="true" />
              Session Amplifier
            </div>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              See what your room could keep.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Choose your role and the result you care about. The plan changes immediately. No booking, account, or private details required.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <div className="space-y-8">
            <fieldset>
              <legend className="text-sm font-semibold text-white">I am here as a…</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                {TALLINN_AMPLIFIER_ROLES.map((item) => (
                  <label
                    key={item.id}
                    className={`relative cursor-pointer rounded-2xl border px-4 py-3 transition-colors focus-within:ring-2 focus-within:ring-cyan-300 focus-within:ring-offset-2 focus-within:ring-offset-[#090c10] motion-reduce:transition-none ${
                      role === item.id
                        ? 'border-cyan-300/55 bg-cyan-300/10 text-white'
                        : 'border-white/10 bg-white/[0.025] text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="amplifier-role"
                      value={item.id}
                      checked={role === item.id}
                      onChange={() => setRole(item.id)}
                      className="sr-only"
                    />
                    <span className="block text-sm font-semibold">{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-white">I want the room to create…</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {TALLINN_AMPLIFIER_OUTCOMES.map((item) => (
                  <label
                    key={item.id}
                    className={`relative cursor-pointer rounded-2xl border px-4 py-3 transition-colors focus-within:ring-2 focus-within:ring-emerald-300 focus-within:ring-offset-2 focus-within:ring-offset-[#090c10] motion-reduce:transition-none ${
                      outcome === item.id
                        ? 'border-emerald-300/55 bg-emerald-300/[0.09] text-white'
                        : 'border-white/10 bg-white/[0.025] text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="amplifier-outcome"
                      value={item.id}
                      checked={outcome === item.id}
                      onChange={() => setOutcome(item.id)}
                      className="sr-only"
                    />
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">{item.note}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div aria-live="polite">
            <GlowCard color="cyan" className="rounded-[2rem] bg-[#0d1117]">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-cyan-300">Recommended amplification path</p>
                    <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.025em] text-white sm:text-4xl">
                      {selectedRole.label} → {selectedOutcome.label}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">{selectedRole.note}</p>
                  </div>
                  <div className="shrink-0 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] px-4 py-3 sm:max-w-48">
                    <p className="text-xs text-slate-500">Core artifact</p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-emerald-100">{selectedOutcome.artifact}</p>
                  </div>
                </div>

                <ol className="mt-8 grid gap-3 md:grid-cols-3">
                  {stages.map((stage) => (
                    <li key={stage.id} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs text-cyan-300">{stage.index}</span>
                        <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                      </div>
                      <p className="mt-7 text-sm font-semibold text-white">{stage.label}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{selectedRole[stage.id]}</p>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xl text-sm leading-6 text-slate-400">
                    This is a starting architecture. The speaker or host keeps authorship; Frank shapes the room, artifact, and continuation layer around it.
                  </p>
                  <Link
                    href={`/experiences/tallinn-2026?role=${role}&outcome=${outcome}#interest`}
                    className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-100 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
                  >
                    Use this plan
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  )
}
