import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, CircleDot, ShieldCheck, Sparkles } from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import { RetreatPathfinder } from '@/components/retreats/RetreatPathfinder'

const ladder = [
  {
    status: 'Prepared',
    title: 'Purpose to Practice',
    duration: '90 minutes',
    description: 'A small working session for 8–12 adults, ending with a two-page plan and a dated 30-day trial.',
  },
  {
    status: 'Concept',
    title: 'Creation Chamber Sprint',
    duration: 'One day',
    description: 'A focused room for turning one important idea into an artifact, a review and a next build sequence.',
  },
  {
    status: 'In development',
    title: 'Starlight Creation Retreat',
    duration: 'Three nights · four days',
    description: 'A planned 20–24 person destination format designed around clarity, creation, integration and a 30-day practice.',
  },
  {
    status: 'Designed method',
    title: '30-day integration',
    duration: 'After the room',
    description: 'A continuation rhythm intended to test what was built against ordinary work and life.',
  },
  {
    status: 'Future',
    title: 'Local chamber network',
    duration: 'Distributed',
    description: 'A future open specification for trusted local creation rooms, operators and community-led events.',
  },
]

const horizon = [
  {
    title: 'Retreat OS',
    status: 'Foundation exists',
    description: 'The operating foundation for programs, approvals, venue research and organizer workflows. It is not presented as production-proven.',
  },
  {
    title: 'Creation Chambers',
    status: 'Concept',
    description: 'Bookable local rooms with defined creator tools, safety, accessibility and operator standards. The equipment and certification specification still needs to be built.',
  },
  {
    title: 'Arcanea Experiences',
    status: 'Future horizon',
    description: 'A future creative-world layer for community workshops, event formats and destination experiences—after the core retreat method earns proof.',
  },
]

export function StarlightRetreatVision() {
  return (
    <main className="bg-[#0a0a0b] text-white">
      <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden border-b border-white/[0.08] pb-12 pt-28 sm:pb-16 lg:items-center lg:pb-20">
        <Image
          src="/images/retreats/starlight-retreat-hero.webp"
          alt="A small group working with notebooks, laptops and a physical model around a wooden table in a Mediterranean setting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,0.96)_0%,rgba(10,10,11,0.78)_38%,rgba(10,10,11,0.18)_72%,rgba(10,10,11,0.16)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(10,10,11,0.2)_0%,rgba(10,10,11,0.55)_45%,rgba(10,10,11,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,transparent_0%,rgba(10,10,11,0.15)_55%,rgba(10,10,11,0.7)_100%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-amber-200/80">Starlight Retreats · Founding vision</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              From insight to a practice that survives ordinary life.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              Small, human-led working retreats for creators, founders and people entering a new
              chapter. Reflection becomes a practical system; AI supports research, making and
              review while consequential decisions stay human.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#pathfinder"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-300 px-7 text-sm font-semibold text-[#171008] transition-colors hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                Find my first room
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Link>
              <TrackedLink
                href="/experiences/tallinn-2026"
                eventName="retreat_hero_proof_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-black/20 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                Explore the first working session
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/55">
              <span>Independent</span>
              <span aria-hidden="true">·</span>
              <span>Small cohorts</span>
              <span aria-hidden="true">·</span>
              <span>No venue or date announced</span>
            </div>
          </div>
        </div>

        <p className="absolute bottom-3 right-4 z-10 rounded-full bg-black/45 px-3 py-1.5 text-[11px] text-white/65 backdrop-blur-sm sm:bottom-5 sm:right-6">
          Representative concept visual — not a confirmed venue.
        </p>
      </section>

      <section className="border-b border-white/[0.07] py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-sm font-medium text-amber-200/70">Why the room exists</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
              Inspiration is the opening. The artifact is the test.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              ['01', 'Clarify', 'Name the decision, constraint or idea that deserves protected attention.'],
              ['02', 'Create', 'Turn it into a plan, prototype, workflow or team agreement you can inspect.'],
              ['03', 'Continue', 'Carry it home as a dated 30-day practice instead of a memory of the room.'],
            ].map(([number, title, description]) => (
              <div key={number} className="border-t border-white/10 pt-5">
                <span className="font-mono text-xs text-amber-200/50">{number}</span>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pathfinder" className="scroll-mt-24 border-b border-white/[0.07] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <RetreatPathfinder />
        </div>
      </section>

      <section className="border-b border-white/[0.07] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-amber-200/70">The proof ladder</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
              Start small. Earn the next room.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/55">
              Each format should exist only after the smaller format proves its promise, facilitation
              and follow-through.
            </p>
          </div>

          <ol className="mt-14 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {ladder.map((stage, index) => (
              <li key={stage.title} className="grid gap-4 py-7 sm:grid-cols-[3rem_1fr] lg:grid-cols-[3rem_0.7fr_0.45fr_1.3fr] lg:items-center lg:gap-8">
                <span className="font-mono text-xs text-white/25">0{index + 1}</span>
                <div>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/45">{stage.status}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{stage.title}</h3>
                </div>
                <p className="text-sm text-amber-100/60">{stage.duration}</p>
                <p className="text-sm leading-6 text-white/50">{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-white/[0.07] py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7 sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.09),transparent_48%)]" aria-hidden="true" />
            <div className="relative">
              <p className="text-sm font-medium text-amber-200/70">Destination direction</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-white">
                Mainland Spain first.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/55">
                The first destination retreat is being designed for a spring or autumn window in
                mainland Spain. Tenerife, Gran Canaria and Madeira remain research directions for a
                later winter edition.
              </p>
              <p className="mt-6 border-l border-amber-200/30 pl-4 text-sm leading-6 text-white/40">
                No property, date, availability, partnership or price is confirmed.
              </p>
            </div>
          </div>

          <div className="p-1 sm:p-4">
            <p className="text-sm font-medium text-amber-200/70">Human authority</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-white">
              AI supports the room. It does not own the room.
            </h2>
            <div className="mt-8 space-y-5">
              {[
                'People approve consequential decisions, claims and participant outcomes.',
                'Private participant context is not a marketing asset or a training dataset.',
                'The format is educational and reflective, not therapy, treatment or financial advice.',
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-200/65" aria-hidden="true" />
                  <p className="text-sm leading-6 text-white/55">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-amber-200/70">The wider system</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
              One method. Three layers. Proof before scale.
            </h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.08] lg:grid-cols-3">
            {horizon.map((item) => (
              <article key={item.title} className="bg-[#0d0d0f] p-7 sm:p-9">
                <div className="flex items-center gap-2 text-xs text-white/35">
                  <CircleDot className="h-3.5 w-3.5 text-amber-200/55" aria-hidden="true" />
                  {item.status}
                </div>
                <h3 className="mt-8 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/50">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/20 bg-amber-200/[0.06] text-amber-100">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="mt-7 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            The first invitation is a smaller room.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/55">
            Founding destination invitations are not open yet. Start with the prepared 90-minute
            working session and help the method earn its next step.
          </p>
          <TrackedLink
            href="/experiences/tallinn-2026"
            eventName="retreat_final_proof_click"
            className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-300 px-7 text-sm font-semibold text-[#171008] transition-colors hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          >
            Explore Purpose to Practice
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedLink>
        </div>
      </section>
    </main>
  )
}
