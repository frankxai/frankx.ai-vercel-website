import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ExternalLink,
  MapPin,
  RadioTower,
  Sparkles,
  Users,
} from 'lucide-react'

import { CursorSpotlight } from '@/components/ui/CursorSpotlight'
import { GlowButton } from '@/components/ui/GlowButton'
import { GlowCard } from '@/components/ui/glow-card'
import {
  TALLINN_AMPLIFIER_OUTCOMES,
  TALLINN_AMPLIFIER_ROLES,
  TALLINN_COLLABORATION_PATHS,
  TALLINN_PUBLIC_FORMATS,
  TALLINN_STUDIO_EVENT,
  type TallinnAmplifierOutcome,
  type TallinnAmplifierRole,
} from '@/data/tallinn-studio'

import { SessionAmplifier } from './SessionAmplifier'
import { TallinnInterestForm } from './TallinnInterestForm'

interface TallinnStudioPageProps {
  defaultRole?: TallinnAmplifierRole
  defaultOutcome?: TallinnAmplifierOutcome
}

const roomStages = [
  {
    index: '01',
    label: 'Before',
    note: 'Sharpen the promise, audience, and artifact.',
    color: 'text-cyan-300',
  },
  {
    index: '02',
    label: 'In the room',
    note: 'Create participation with a useful point.',
    color: 'text-amber-300',
  },
  {
    index: '03',
    label: 'After',
    note: 'Return the work, sources, and next move.',
    color: 'text-emerald-300',
  },
] as const

const workingPrinciples = [
  'The speaker or coach keeps authorship of the method.',
  'Participants leave with something they can use.',
  'Capture and follow-through stay consent-based.',
  'A venue is matched to the work, not only the headcount.',
] as const

const roomProfiles = [
  {
    type: 'Salon table',
    scale: '8–16 people',
    bestFor: 'Coaching methods, founder questions, and peer practice',
    needs: 'One shared table or circle, writing surface, calm acoustics',
  },
  {
    type: 'Workshop studio',
    scale: '12–28 people',
    bestFor: 'Agent builds, mapping, and participant work',
    needs: 'Reliable Wi-Fi, power, screen, movable seating, accessible arrival',
  },
  {
    type: 'Listening room',
    scale: '8–20 people',
    bestFor: 'AI music, creative review, and story-led sessions',
    needs: 'Good playback, low noise, comfortable sightlines, no sound spill',
  },
  {
    type: 'Stage-side breakout',
    scale: '10–24 people',
    bestFor: 'Talk follow-through and speaker session amplification',
    needs: 'A bounded 60–90 minute window, writable wall, clear wayfinding',
  },
] as const

export function TallinnStudioPage({
  defaultRole = 'speaker',
  defaultOutcome = 'participant-artifact',
}: TallinnStudioPageProps) {
  const provenFormat = TALLINN_PUBLIC_FORMATS[0]
  const studioFormats = TALLINN_PUBLIC_FORMATS.slice(1)
  const planKey = `${defaultRole}:${defaultOutcome}`

  return (
    <main className="overflow-hidden bg-[#080a0d] text-white">
      <CursorSpotlight />

      <section className="relative border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[54rem] bg-[radial-gradient(circle_at_18%_12%,rgba(6,182,212,0.14),transparent_34%),radial-gradient(circle_at_78%_8%,rgba(245,158,11,0.10),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:px-10 lg:pb-28 lg:pt-44">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2 text-cyan-200">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {TALLINN_STUDIO_EVENT.city}
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" aria-hidden="true" />
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {TALLINN_STUDIO_EVENT.dates}
                </span>
              </div>

              <h1 className="mt-7 max-w-3xl font-display text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-7xl lg:text-[5.6rem]">
                Make the room travel farther.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                A Tallinn session studio for speakers, coaches, tribe hosts, venues, and attendees who want a live idea to become a useful participant artifact—and keep working after everyone leaves.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <GlowButton href="#amplifier" size="lg" color="cyan">
                  Build your session path
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </GlowButton>
                <GlowButton href="#interest" size="lg" variant="secondary" color="emerald">
                  Register interest
                </GlowButton>
              </div>

              <div className="mt-12 grid gap-px overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/10 sm:grid-cols-3">
                {roomStages.map((stage) => (
                  <div key={stage.index} className="bg-[#0b0e12] p-5">
                    <p className={`font-mono text-xs ${stage.color}`}>{stage.index}</p>
                    <p className="mt-6 text-sm font-semibold text-white">{stage.label}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{stage.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-4">
              <GlowCard color="cyan" className="rounded-[2rem] p-2 sm:p-3">
                <a
                  href={TALLINN_STUDIO_EVENT.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-[1.55rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  aria-label="Open the official Mindvalley U 2026 event page"
                >
                  <Image
                    src={TALLINN_STUDIO_EVENT.officialHeroImage}
                    alt="Official Mindvalley U 2026 Tallinn event artwork with the city skyline and event dates"
                    width={1920}
                    height={1080}
                    priority
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="h-auto w-full rounded-[1.55rem]"
                  />
                </a>
                <div className="grid gap-4 px-4 pb-4 pt-5 sm:grid-cols-[1fr_auto] sm:items-start sm:px-5">
                  <div>
                    <p className="text-sm font-semibold text-white">The wider gathering</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Official Mindvalley U 2026 artwork, shown as event context. FrankX is an independent companion concept.
                    </p>
                  </div>
                  <a
                    href={TALLINN_STUDIO_EVENT.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-200 underline decoration-cyan-300/30 underline-offset-4 transition-colors hover:text-white motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    Official event
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </GlowCard>

              <p className="mt-5 border-l border-amber-300/40 pl-4 text-xs leading-5 text-slate-500">
                {TALLINN_STUDIO_EVENT.independenceNotice}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SessionAmplifier
        key={`amplifier:${planKey}`}
        defaultRole={defaultRole}
        defaultOutcome={defaultOutcome}
      />

      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-2 text-sm font-medium text-amber-200">
                <Users className="h-4 w-4" aria-hidden="true" />
                Ways to work together
              </div>
              <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Start with the room you already have.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                Bring an existing method, a community question, a possible venue, or the small session you wish someone would host.
              </p>
            </div>

            <div className="border-t border-white/10">
              {TALLINN_COLLABORATION_PATHS.map((path, index) => (
                <article
                  key={path.title}
                  className="group grid gap-5 border-b border-white/10 py-8 sm:grid-cols-[3.5rem_1fr_auto] sm:items-start"
                >
                  <p className="font-mono text-xs text-slate-600">0{index + 1}</p>
                  <div>
                    <p className="text-xs text-cyan-300">{path.forWhom}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-white">
                      {path.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{path.body}</p>
                  </div>
                  <Link
                    href={`/experiences/tallinn-2026?role=${path.role}&outcome=${path.outcome}#amplifier`}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-cyan-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    See the path
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Room fit guide
              </div>
              <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Match the venue to the work.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                A useful room is more than an address. These profiles help venue hosts and facilitators compare the work, scale, access, sound, and equipment before anyone makes a promise.
              </p>
              <Link
                href="/experiences/tallinn-2026?role=venue&outcome=new-workshop#interest"
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-emerald-200 underline decoration-emerald-300/30 underline-offset-4 transition-colors hover:text-white motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Share a possible venue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="border-t border-white/10">
              {roomProfiles.map((room, index) => (
                <article key={room.type} className="grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[3.5rem_0.75fr_1.25fr] sm:items-start">
                  <p className="font-mono text-xs text-slate-600">0{index + 1}</p>
                  <div>
                    <h3 className="text-base font-semibold text-white">{room.type}</h3>
                    <p className="mt-1 text-xs text-cyan-300">{room.scale}</p>
                  </div>
                  <div>
                    <p className="text-sm leading-6 text-slate-300">{room.bestFor}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">Needs: {room.needs}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Workshop studio
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              One proven foundation. Three formats to shape.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
              Frank’s Ikigai &amp; Branding work is the delivered foundation. The other formats are studio architectures: useful starting points, tailored with the people in the room and never presented as a delivery record.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <GlowCard color="amber" href={`/experiences/tallinn-2026/${provenFormat.slug}`} className="rounded-[2rem]">
              <div className="flex min-h-full flex-col p-7 sm:p-9 lg:p-11">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-amber-300/30 bg-amber-300/[0.08] px-3 py-1.5 text-xs font-semibold text-amber-100">
                    {provenFormat.eyebrow}
                  </span>
                  <span className="text-xs text-slate-500">{provenFormat.status}</span>
                </div>
                <h3 className="mt-16 max-w-xl font-display text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
                  {provenFormat.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">{provenFormat.promise}</p>
                <div className="mt-auto flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Participant artifact</p>
                    <p className="mt-1 text-sm font-semibold text-amber-100">{provenFormat.artifact}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Explore the format
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </GlowCard>

            <div className="divide-y divide-white/10 rounded-[2rem] border border-white/10 bg-[#0b0e12] px-6 sm:px-8">
              {studioFormats.map((format) => (
                <Link
                  key={format.slug}
                  href={`/experiences/tallinn-2026/${format.slug}`}
                  className="group grid gap-3 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <p className="text-xs text-cyan-300">{format.eyebrow}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white transition-colors group-hover:text-cyan-100 motion-reduce:transition-none">
                      {format.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{format.artifact}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-cyan-300 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              href="/workshops"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-white/20 underline-offset-4 transition-colors hover:text-emerald-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              See the workshop studio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:px-10 lg:py-28">
          <figure>
            <a
              href={TALLINN_STUDIO_EVENT.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              aria-label="Open the official Mindvalley U website"
            >
              <Image
                src={TALLINN_STUDIO_EVENT.officialCommunityImage}
                alt="Participants gathered on stage at Mindvalley U Tallinn 2024"
                width={1176}
                height={880}
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="h-auto w-full rounded-[2rem] border border-white/10"
              />
            </a>
            <figcaption className="mt-3 text-xs leading-5 text-slate-500">
              Official Mindvalley U Tallinn 2024 community image. Source:{' '}
              <a
                href={TALLINN_STUDIO_EVENT.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-white/20 underline-offset-4 hover:text-white"
              >
                Mindvalley U
              </a>
              .
            </figcaption>
          </figure>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-300">
              <RadioTower className="h-4 w-4" aria-hidden="true" />
              Designed around human signal
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Technology supports the room. It does not replace it.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
              The useful role for AI is quiet: clarify the brief, structure the artifact, preserve sources, and help return the work. Judgment, consent, facilitation, and the relationship stay human.
            </p>
            <ul className="mt-8 space-y-4">
              {workingPrinciples.map((principle) => (
                <li key={principle} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="interest" className="relative scroll-mt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(16,185,129,0.10),transparent_30%),radial-gradient(circle_at_84%_75%,rgba(6,182,212,0.09),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start lg:px-10 lg:py-28">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-medium text-emerald-300">Register interest</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Should this room exist in Tallinn?
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
              Share the role you might play, the result you care about, or a venue that could fit. This is a signal—not a ticket, booking, or schedule commitment.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-300">
              {[
                'Speakers and coaches can bring an existing method.',
                'Tribe hosts can propose a focused working room.',
                'Venues can share access, capacity, and equipment.',
                'Attendees can request or help shape a micro-session.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <GlowCard color="emerald" className="rounded-[2rem] bg-[#0b0e12]">
            <div className="p-5 sm:p-8 lg:p-10">
              <TallinnInterestForm
                key={`interest:${planKey}`}
                defaultRole={defaultRole}
                defaultOutcome={defaultOutcome}
              />
            </div>
          </GlowCard>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] bg-[#080a0d]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-xs leading-5 text-slate-500 sm:px-8 md:flex-row md:items-start md:justify-between lg:px-10">
          <p className="max-w-3xl">{TALLINN_STUDIO_EVENT.independenceNotice}</p>
          <div className="flex shrink-0 gap-5">
            <a href={TALLINN_STUDIO_EVENT.officialUrl} target="_blank" rel="noreferrer" className="underline decoration-white/20 underline-offset-4 hover:text-white">
              Official event
            </a>
            <a href={TALLINN_STUDIO_EVENT.officialFaqUrl} target="_blank" rel="noreferrer" className="underline decoration-white/20 underline-offset-4 hover:text-white">
              Official FAQ
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

export function isTallinnAmplifierRole(value: string | undefined): value is TallinnAmplifierRole {
  return TALLINN_AMPLIFIER_ROLES.some((role) => role.id === value)
}

export function isTallinnAmplifierOutcome(value: string | undefined): value is TallinnAmplifierOutcome {
  return TALLINN_AMPLIFIER_OUTCOMES.some((outcome) => outcome.id === value)
}
