import Link from 'next/link'
import {
  ArrowRight,
  CalendarClock,
  Check,
  CircleDot,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

import {
  TALLINN_EVENT,
  TALLINN_TIME_WINDOWS,
  TALLINN_VALIDATION_GATE,
  tallinnExperiences,
  tallinnReviewExperiences,
} from '@/data/tallinn-experiences'
import { TrackedLink } from '@/components/analytics/TrackedLink'

import { ExperienceRouter } from './ExperienceRouter'
import { TallinnInterestForm } from './TallinnInterestForm'

interface TallinnFoundryPageProps {
  captureEnabled: boolean
}

const systemStages = [
  { index: '01', label: 'What matters', note: 'meaning + judgment' },
  { index: '02', label: 'Practical result', note: 'one useful plan' },
  { index: '03', label: 'Weekly rhythm', note: 'repeatable limits' },
  { index: '04', label: 'Team use', note: 'roles + decisions' },
] as const

const sourceRail = [
  {
    label: 'Ikigai & Personal Branding',
    href: '/workshops/ikigai-branding',
    note: 'Purpose and positioning exercises',
  },
  {
    label: 'Research',
    href: '/research',
    note: 'Evidence and reading behind the sessions',
  },
  {
    label: 'Library',
    href: '/library',
    note: 'Books and field notes',
  },
  {
    label: 'Agentic Builder Lab',
    href: '/agentic-builder-lab',
    note: 'Examples of practical AI workflows',
  },
] as const

const collaborationModes = [
  {
    mode: 'No role assumed',
    title: 'Participation is opt-in',
    body: 'Frank facilitates and remains responsible for the session. An invited collaborator has no operational or public role unless they explicitly accept one.',
  },
  {
    mode: 'Optional contribution',
    title: 'One clearly agreed contribution',
    body: 'A collaborator may approve a short reflection or role-clarity exercise. Scope, wording, credit, fee, and reuse rights are agreed first.',
  },
  {
    mode: 'Co-created session',
    title: 'A session designed and delivered together',
    body: 'Frank and an invited collaborator may co-create a people-and-AI workshop only after roles, fees, credit, ownership, reuse rights, and cancellation terms are agreed in writing.',
  },
] as const

const demandSteps = [
  {
    n: '01',
    title: 'Collect interest',
    body: 'People choose a session and every provisional time they could attend. This is not registration.',
  },
  {
    n: '02',
    title: 'Confirm one session and time',
    body: `Choose the strongest option, then ask likely attendees to confirm once more. Proceed only with ${TALLINN_VALIDATION_GATE.minimumConfirmed} confirmed and ${TALLINN_VALIDATION_GATE.standbyTarget} on standby.`,
  },
  {
    n: '03',
    title: 'Get a written venue quote',
    body: `Ask for a two-hour room-only quote. Frank must approve any spend; the budget cap is €${TALLINN_VALIDATION_GATE.roomOnlyCapEur} unless he explicitly changes it.`,
  },
  {
    n: '04',
    title: 'Make the go or no-go decision',
    body: `At ${TALLINN_VALIDATION_GATE.decisionWindow}, confirm the venue and participant details—or cancel the proposal and notify everyone.`,
  },
] as const

const aftercare = [
  { when: 'Immediately', what: 'Interest received; no ticket or venue promise.' },
  { when: 'After review', what: 'One confirmation request for the selected session and time.' },
  { when: 'T−24 hours', what: 'Final venue address, access, what to bring, and privacy expectations.' },
  { when: 'Same day', what: 'The participant’s completed worksheet, materials, and source list.' },
  { when: '+48 hours', what: 'One implementation prompt, only if requested.' },
  { when: 'Day 7', what: 'One session-related check-in, only with separate consent.' },
] as const

function SystemMap() {
  return (
    <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-4">
      {systemStages.map((stage, index) => (
        <div key={stage.label} className="relative bg-[#0d1117] p-5 sm:min-h-40 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-cyan-300">{stage.index}</span>
            {index < systemStages.length - 1 ? (
              <ArrowRight className="h-4 w-4 text-slate-700 max-sm:rotate-90" aria-hidden="true" />
            ) : (
              <CircleDot className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            )}
          </div>
          <p className="mt-9 text-base font-semibold text-white">{stage.label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{stage.note}</p>
        </div>
      ))}
    </div>
  )
}

export function TallinnFoundryPage({ captureEnabled }: TallinnFoundryPageProps) {
  const reviewOffers = [...tallinnReviewExperiences].sort(
    (a, b) => (a.reviewRank ?? 99) - (b.reviewRank ?? 99),
  )
  const secondWave = tallinnExperiences.filter((experience) => experience.reviewRank === null)
  const formExperiences = tallinnExperiences.map(({ slug, title }) => ({ slug, title }))

  return (
    <main className="overflow-hidden bg-[#0a0a0b] text-white">
      <section className="relative border-b border-white/[0.08]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_72%_10%,rgba(67,191,227,0.12),transparent_42%),radial-gradient(circle_at_22%_5%,rgba(245,158,11,0.08),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:px-10 lg:pb-28 lg:pt-44">
          <div className="grid gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                Tallinn · {TALLINN_EVENT.window} · independent working sessions
              </p>
              <h1 className="mt-7 max-w-4xl font-display text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-7xl lg:text-[5.65rem]">
                Leave Tallinn with one clear plan you can use the next morning.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Small, practical 90-minute sessions for purpose, creative work, and responsible AI use in teams. Eight to twelve people. Everyone leaves with a completed plan, worksheet, or team agreement.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href="#find-your-format"
                  eventName="tallinn_foundry_cta_open"
                  eventProperties={{ destination: 'formats' }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                >
                  Find the right session
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href="#request"
                  eventName="tallinn_foundry_cta_open"
                  eventProperties={{ destination: 'interest_form' }}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/[0.15] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/[0.35] hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  See current status
                </TrackedLink>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                How each session works
              </p>
              <SystemMap />
              <div className="mt-5 flex items-start gap-3 text-sm leading-6 text-slate-400">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                <p>Nothing is booked yet. Frank leads; any invited collaborator chooses whether and how they contribute.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>{TALLINN_EVENT.independenceNotice}</p>
            <a
              href="https://www.mindvalley.com/u"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white"
            >
              Official event information
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <ExperienceRouter experiences={tallinnExperiences} />

      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Recommended shortlist</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Five session ideas for review.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
                Purpose to Practice is the recommended first pilot. The other four serve creators, solo founders, teams, and founders who want a quieter integration session. The fifth becomes a retreat format only if participants want to explore it.
              </p>
            </div>

            <div className="border-t border-white/10">
              {reviewOffers.map((experience) => (
                <article
                  key={experience.slug}
                  className="grid gap-5 border-b border-white/10 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-start"
                >
                  <p className="font-mono text-sm text-slate-600">0{experience.reviewRank}</p>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-2xl font-semibold text-white">{experience.title}</h3>
                      {experience.reviewRank === 1 ? (
                        <span className="rounded-full border border-amber-300/30 bg-amber-300/[0.07] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-amber-200">
                          Pilot
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{experience.promise}</p>
                    <p className="mt-3 text-xs leading-5 text-slate-500">
                      Leave with: <span className="text-slate-300">{experience.artifact}</span>
                    </p>
                  </div>
                  <TrackedLink
                    href={`/experiences/tallinn-2026/${experience.slug}`}
                    eventName="tallinn_experience_open"
                    eventProperties={{ experience_slug: experience.slug, collection: 'ana_review' }}
                    aria-label={`Review ${experience.title}`}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-300 underline decoration-cyan-300/25 underline-offset-4 hover:decoration-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    See details
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Additional ideas—not proposed for the first pilot</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                Keep these five on hold until the first session is reviewed. Do not announce or build them yet.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {secondWave.map((experience) => (
                <TrackedLink
                  key={experience.slug}
                  href={`/experiences/tallinn-2026/${experience.slug}`}
                  eventName="tallinn_experience_open"
                  eventProperties={{ experience_slug: experience.slug, collection: 'second_wave' }}
                  className="group bg-[#0b0d10] p-6 transition-colors hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">{experience.eyebrow}</p>
                  <h3 className="mt-3 text-base font-semibold text-white">{experience.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{experience.artifact}</p>
                  <ArrowRight className="mt-5 h-4 w-4 text-slate-600 transition-colors group-hover:text-cyan-300" aria-hidden="true" />
                </TrackedLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="surface-1 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Existing workshops and research</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Review the material behind this proposal.
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {sourceRail.map((source) => (
              <Link
                key={source.href}
                href={source.href}
                className="group min-h-44 bg-[#0b0d10] p-6 transition-colors hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300"
              >
                <Sparkles className="h-5 w-5 text-slate-600 transition-colors group-hover:text-cyan-300" aria-hidden="true" />
                <p className="mt-8 text-sm font-semibold text-white">{source.label}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">{source.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Optional collaboration</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Every collaborator chooses their role before anything is announced.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
                A collaborator may contribute behind the scenes or publicly. Their role expands only with explicit approval, a clear scope, agreed credit, and fair commercial terms.
              </p>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {collaborationModes.map((item) => (
                <div key={item.mode} className="grid gap-3 py-7 sm:grid-cols-[8rem_1fr]">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">{item.mode}</p>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 rounded-2xl border border-amber-300/20 bg-amber-300/[0.045] p-5 text-sm leading-6 text-amber-50/90">
            No public health, therapy, psychology, neuroscience, certification, or outcome claim will be attributed to a collaborator without their approval of the exact evidence and wording.
          </div>
        </div>
      </section>

      <section className="surface-1 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Possible venue
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                No venue booking before participant confirmation.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
                Tallink Spa & Conference Hotel is being considered because Frank is staying there. No meeting room is included or reserved.
              </p>
              <a
                href="https://hotels.tallink.com/events/tallink-spa-conference-hotel-conference-center"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/25 underline-offset-4 hover:decoration-white"
              >
                View Tallink’s conference information
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          <ol className="grid gap-px overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/10 sm:grid-cols-2">
              {demandSteps.map((step) => (
              <li key={step.n} className="surface-3 p-6 sm:p-7">
                  <p className="font-mono text-xs text-slate-600">{step.n}</p>
                  <h3 className="mt-7 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>

            <div className="surface-2 mt-12 rounded-[1.75rem] border border-white/[0.08] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <CalendarClock className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              Possible times—not confirmed
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {TALLINN_TIME_WINDOWS.map((slot) => (
                <div key={slot.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-slate-300">
                  {slot.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Optional follow-up</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Participants choose what follow-up they receive.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
                Follow-up is limited to the session and sent only with consent. No participant is added to a newsletter or unrelated marketing.
              </p>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {aftercare.map((item) => (
                <div key={item.when} className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr]">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{item.when}</p>
                  <p className="text-sm leading-6 text-slate-300">{item.what}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="request" className="relative bg-[#0a0a0b]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(67,191,227,0.08),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                <Users className="h-4 w-4" aria-hidden="true" />
                Share your interest
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Which session would you attend?
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                Choose a session and every provisional time that could work. We will contact you only if the minimum group can attend the same time.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-300">
                {[
                  'No payment or ticket at this stage',
                  'No venue is currently booked',
                  'No newsletter or unrelated marketing',
                  'No sensitive health or employment details',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-3 rounded-[2rem] border border-white/[0.08] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.38)] sm:p-8 lg:p-10">
              <TallinnInterestForm
                experiences={formExperiences}
                defaultExperienceSlug="purpose-to-practice"
                captureEnabled={captureEnabled}
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.08] bg-[#0a0a0b]">
        <div className="mx-auto max-w-7xl px-5 py-10 text-xs leading-5 text-slate-500 sm:px-8 lg:px-10">
          <p>{TALLINN_EVENT.independenceNotice}</p>
          <p className="mt-2">Concept review only. No venue, time, host role, capacity, or interest collection is confirmed.</p>
        </div>
      </footer>
    </main>
  )
}
