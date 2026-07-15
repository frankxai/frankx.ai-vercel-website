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
import { TrackedLink } from '@/components/analytics/TrackedLink'

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
    <main className="overflow-hidden bg-[#0a0a0b] text-white">
      <section className="relative border-b border-white/[0.08]">
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-gradient-to-b ${accent.glow} to-transparent`} />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:px-10 lg:pb-28 lg:pt-44">
          <Link
            href="/experiences/tallinn-2026"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Tallinn Working Sessions
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
                <TrackedLink
                  href="#request-this-room"
                  eventName="tallinn_offer_cta_open"
                  eventProperties={{ experience_slug: experience.slug, destination: 'interest_form' }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                >
                  Share your interest
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href="#run-of-show"
                  eventName="tallinn_offer_cta_open"
                  eventProperties={{ experience_slug: experience.slug, destination: 'run_of_show' }}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/[0.15] px-6 py-3 text-sm font-semibold text-white hover:border-white/[0.35] hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  See the 90-minute plan
                </TrackedLink>
              </div>
            </div>

            <div className={`surface-3 rounded-[2rem] border ${accent.border} p-7 shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:p-8`}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">What you take home</p>
              <p className="mt-5 font-display text-3xl font-semibold text-white">{experience.artifact}</p>
              <p className="mt-5 text-sm leading-6 text-slate-300">{experience.leaveWith}</p>
              {experience.slug === 'purpose-to-practice' ? (
                <TrackedLink
                  href="/experiences/tallinn-2026/purpose-to-practice/map"
                  eventName="tallinn_offer_artifact_open"
                  eventProperties={{ experience_slug: experience.slug, artifact: 'practice_map' }}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-white/25 underline-offset-4 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Preview the worksheet
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
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

      <section id="run-of-show" className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${accent.eyebrow}`}>What happens in 90 minutes</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Most of the session is spent doing the work.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                A short introduction, guided exercises, time to work, and a final decision. This is a working session, not a keynote.
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

      <section className="surface-1 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="surface-3 rounded-[1.75rem] border border-white/[0.08] p-7 sm:p-9">
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
            <div className="surface-3 rounded-[1.75rem] border border-white/[0.08] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Who leads</p>
              <dl className="mt-7 space-y-6">
                <div>
                  <dt className="text-sm font-semibold text-white">Frank</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-400">{experience.frankRole}</dd>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <dt className="text-sm font-semibold text-white">Ana’s role — only with her approval</dt>
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">What already exists</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Built from existing workshops and research.</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                This proposed pilot draws on existing workshops, research, and templates. The Tallinn format itself has not yet been tested and will run only after the participation threshold is met.
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

      <section className="surface-1 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Current status</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Proposed only. Nothing is booked yet.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="surface-3 rounded-2xl border border-white/[0.08] p-6">
                <MapPin className="h-5 w-5 text-amber-300" aria-hidden="true" />
                <h3 className="mt-7 text-lg font-semibold text-white">Possible venue</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{TALLINN_EVENT.venueCandidate} is being considered. No room has been reserved.</p>
              </div>
              <div className="surface-3 rounded-2xl border border-white/[0.08] p-6">
                <Users className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                <h3 className="mt-7 text-lg font-semibold text-white">When we decide</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">We review the venue only after {TALLINN_VALIDATION_GATE.minimumConfirmed} people confirm the same time, with {TALLINN_VALIDATION_GATE.standbyTarget} additional people on standby.</p>
              </div>
              <div className="surface-3 rounded-2xl border border-white/[0.08] p-6">
                <Clock3 className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <h3 className="mt-7 text-lg font-semibold text-white">Possible times</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{TALLINN_TIME_WINDOWS.slice(0, 3).map((slot) => slot.label).join(' · ')}</p>
              </div>
              <div className="surface-3 rounded-2xl border border-white/[0.08] p-6">
                <ShieldCheck className="h-5 w-5 text-slate-300" aria-hidden="true" />
                <h3 className="mt-7 text-lg font-semibold text-white">Approval</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">Frank approves the venue, budget, final hosts, and schedule. Personal-data collection remains off unless he explicitly enables it after the privacy requirements are met.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="request-this-room" className="relative bg-[#0a0a0b]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${accent.eyebrow}`}>Interest, not booking</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Would you be interested in this session?</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">Your answer helps us choose one session and one workable time. This is not a registration, booking, or payment.</p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm leading-6 text-slate-400">
                <p className="font-semibold text-white">Optional follow-up</p>
                <ul className="mt-3 space-y-2">
                  {experience.aftercare.map((item) => <li key={item}>· {item}</li>)}
                </ul>
              </div>
            </div>
            <div className="surface-3 rounded-[2rem] border border-white/[0.08] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.38)] sm:p-8 lg:p-10">
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

      <footer className="border-t border-white/[0.08] bg-[#0a0a0b]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-xs leading-5 text-slate-500 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p>{TALLINN_EVENT.independenceNotice}</p>
          <Link href="/experiences/tallinn-2026" className="shrink-0 text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white">
            See all ten session ideas
          </Link>
        </div>
      </footer>
    </main>
  )
}
