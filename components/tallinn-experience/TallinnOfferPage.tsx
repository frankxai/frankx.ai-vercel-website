import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react'

import {
  TALLINN_EVENT,
  TALLINN_TIME_WINDOWS,
  TALLINN_VALIDATION_GATE,
  tallinnExperiences,
  type TallinnAccent,
  type TallinnExperience,
} from '@/data/tallinn-experiences'

import { TallinnInterestForm } from './TallinnInterestForm'

interface TallinnOfferPageProps {
  experience: TallinnExperience
  captureEnabled: boolean
}

const accentStyles: Record<
  TallinnAccent,
  { eyebrow: string; border: string; glow: string; number: string }
> = {
  amber: {
    eyebrow: 'text-amber-300',
    border: 'border-amber-300/25',
    glow: 'from-amber-300/10',
    number: 'text-amber-300',
  },
  cyan: {
    eyebrow: 'text-cyan-300',
    border: 'border-cyan-300/25',
    glow: 'from-cyan-300/10',
    number: 'text-cyan-300',
  },
  emerald: {
    eyebrow: 'text-emerald-300',
    border: 'border-emerald-300/25',
    glow: 'from-emerald-300/10',
    number: 'text-emerald-300',
  },
}

export function TallinnOfferPage({ experience, captureEnabled }: TallinnOfferPageProps) {
  const accent = accentStyles[experience.accent]
  const formExperiences = tallinnExperiences.map(({ slug, title }) => ({ slug, title }))

  return (
    <main className="overflow-hidden bg-[#08090b] text-white">
      <section className="relative border-b border-white/[0.07]">
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-gradient-to-b ${accent.glow} to-transparent`} />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:px-10 lg:pb-28 lg:pt-44">
          <Link
            href="/experiences/tallinn-2026"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Tallinn Experience Foundry
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${accent.eyebrow}`}>
                {experience.eyebrow} · {experience.duration} · {experience.capacity}
              </p>
              <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-white sm:text-7xl">
                {experience.title}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-8 text-slate-200 sm:text-2xl">
                {experience.promise}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">{experience.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#request-this-room"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090b]"
                >
                  Test this format
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#run-of-show"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-white/35 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Inspect the 90 minutes
                </Link>
              </div>
            </div>

            <div className={`rounded-[2rem] border ${accent.border} bg-[#0d1117] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:p-8`}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">The leave-with</p>
              <p className="mt-5 font-display text-3xl font-semibold text-white">{experience.artifact}</p>
              <p className="mt-5 text-sm leading-6 text-slate-300">{experience.leaveWith}</p>
              {experience.slug === 'purpose-to-practice' ? (
                <Link
                  href="/experiences/tallinn-2026/purpose-to-practice/map"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-white/25 underline-offset-4 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Inspect the working map
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-xs leading-5 text-slate-500">Arrive with</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{experience.arriveWith}</p>
              </div>
            </div>
          </div>

          <p className="mt-16 border-t border-white/10 pt-6 text-xs leading-5 text-slate-500">
            {TALLINN_EVENT.independenceNotice}
          </p>
        </div>
      </section>

      <section id="run-of-show" className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${accent.eyebrow}`}>Run of show</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Every minute earns the artifact.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                A working room, not a compressed keynote. Demonstration stays short so participants can make, inspect, and commit.
              </p>
            </div>
            <ol className="border-t border-white/10">
              {experience.sessionArc.map((beat, index) => (
                <li key={`${beat.minutes}-${beat.title}`} className="grid gap-5 border-b border-white/10 py-7 sm:grid-cols-[4rem_7rem_1fr]">
                  <p className={`font-mono text-xs ${accent.number}`}>0{index + 1}</p>
                  <p className="text-sm font-semibold text-white">{beat.minutes} min</p>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{beat.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{beat.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-[#0d1117] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">You leave with</p>
              <ul className="mt-7 space-y-4">
                {experience.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex gap-3 text-sm leading-6 text-slate-200">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-[#0d1117] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Host architecture</p>
              <dl className="mt-7 space-y-6">
                <div>
                  <dt className="text-sm font-semibold text-white">Frank</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-400">{experience.frankRole}</dd>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <dt className="text-sm font-semibold text-white">Ana · invitation, not assumption</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-400">{experience.anaInvitation}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Inspectable proof</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Built from real surfaces.</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                The pilot repackages working research, templates, and architecture. It does not pretend a new methodology has already been validated.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-3">
              {experience.proofLinks.map((proof) => (
                <Link
                  key={proof.href}
                  href={proof.href}
                  className="group min-h-52 bg-[#0b0d10] p-6 transition-colors hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300"
                >
                  <ShieldCheck className="h-5 w-5 text-slate-600 transition-colors group-hover:text-cyan-300" aria-hidden="true" />
                  <h3 className="mt-8 text-sm font-semibold text-white">{proof.label}</h3>
                  <p className="mt-3 text-xs leading-5 text-slate-500">{proof.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] bg-[#0b0d10]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Operational truth</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">A proposal until demand clears the gate.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#0e1116] p-6">
                <MapPin className="h-5 w-5 text-amber-300" aria-hidden="true" />
                <h3 className="mt-7 text-lg font-semibold text-white">Venue candidate</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{TALLINN_EVENT.venueCandidate}. No room is booked and no free room is assumed.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0e1116] p-6">
                <Users className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                <h3 className="mt-7 text-lg font-semibold text-white">Demand threshold</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{TALLINN_VALIDATION_GATE.minimumConfirmed} reconfirmed + {TALLINN_VALIDATION_GATE.standbyTarget} standby at one time before venue review.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0e1116] p-6">
                <Clock3 className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <h3 className="mt-7 text-lg font-semibold text-white">Windows to test</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{TALLINN_TIME_WINDOWS.slice(0, 3).map((slot) => slot.label).join(' · ')}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0e1116] p-6">
                <ShieldCheck className="h-5 w-5 text-slate-300" aria-hidden="true" />
                <h3 className="mt-7 text-lg font-semibold text-white">Decision owner</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">Frank approves venue, spend, final host roles, schedule, and any move from preview to live capture.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="request-this-room" className="relative bg-[#0a0d12]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${accent.eyebrow}`}>Interest, not booking</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Would you enter this room?</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">Your answer helps choose one format and one compatible time. It creates no payment, ticket, or venue commitment.</p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm leading-6 text-slate-400">
                <p className="font-semibold text-white">After the room</p>
                <ul className="mt-3 space-y-2">
                  {experience.aftercare.map((item) => <li key={item}>· {item}</li>)}
                </ul>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-[#0d1117] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.38)] sm:p-8 lg:p-10">
              <TallinnInterestForm
                experiences={formExperiences}
                defaultExperienceSlug={experience.slug}
                lockExperience
                captureEnabled={captureEnabled}
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] bg-[#08090b]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-xs leading-5 text-slate-500 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p>{TALLINN_EVENT.independenceNotice}</p>
          <Link href="/experiences/tallinn-2026" className="shrink-0 text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white">
            Compare all ten formats
          </Link>
        </div>
      </footer>
    </main>
  )
}
