import Link from 'next/link'
import { ArrowRight, Check, FlaskConical, Sparkles, Users } from 'lucide-react'

import { GlowButton } from '@/components/ui/GlowButton'
import { GlowCard } from '@/components/ui/glow-card'
import { workshops } from '@/data/workshops'

const provenWorkshop = workshops.find((workshop) => workshop.slug === 'ikigai-branding')!
const studioWorkshops = workshops.filter((workshop) => workshop.slug !== 'ikigai-branding')

const colorClassMap: Record<(typeof studioWorkshops)[number]['color'], string> = {
  cyan: 'text-cyan-300',
  violet: 'text-violet-300',
  amber: 'text-amber-300',
}

const evidence = [
  'A clear promise for a specific room',
  'A participant-owned artifact',
  'Visible sources, assumptions, and boundaries',
  'An optional continuation rather than a forced funnel',
] as const

export default function WorkshopsPage() {
  return (
    <main className="overflow-hidden bg-[#080a0d] text-white">
      <section className="relative border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[46rem] bg-[radial-gradient(circle_at_20%_12%,rgba(16,185,129,0.13),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(139,92,246,0.11),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:px-10 lg:pb-28 lg:pt-44">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-emerald-300">FrankX Workshop Studio</p>
              <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-[5.5rem]">
                Workshops that leave evidence.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Build the room around one useful result: something participants make, test, decide, or carry into the next week.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <GlowButton href="#formats" size="lg" color="emerald">
                  Explore the formats
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </GlowButton>
                <GlowButton href="/experiences/tallinn-2026#amplifier" size="lg" variant="secondary" color="cyan">
                  Amplify your session
                </GlowButton>
              </div>
            </div>

            <div className="border-y border-white/10 py-7">
              <p className="text-sm font-semibold text-white">The provenance line is explicit</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-amber-200">Delivered foundation</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Ikigai &amp; Branding is the workshop Frank has personally developed and facilitated.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-cyan-200">Studio architecture</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Every other format is a prepared concept to tailor and pilot—not presented as past delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="formats" className="scroll-mt-24 border-b border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-2 text-sm font-medium text-amber-200">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Delivered by Frank
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                The proven foundation.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                Purpose becomes useful when it changes what you practice, publish, or choose. This format turns reflection into a concrete brand and next move.
              </p>
            </div>

            <GlowCard color="amber" href={`/workshops/${provenWorkshop.slug}`} className="rounded-[2rem]">
              <div className="flex min-h-[34rem] flex-col p-7 sm:p-9 lg:p-11">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-amber-300/30 bg-amber-300/[0.08] px-3 py-1.5 text-xs font-semibold text-amber-100">
                    Delivered workshop
                  </span>
                  <span className="text-xs text-slate-500">{provenWorkshop.duration}</span>
                </div>
                <div className="mt-auto">
                  <h3 className="max-w-2xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
                    {provenWorkshop.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                    {provenWorkshop.subtitle}
                  </p>
                  <div className="mt-9 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-400">For {provenWorkshop.audience.toLowerCase()}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                      Explore the workshop
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-cyan-300">
                <FlaskConical className="h-4 w-4" aria-hidden="true" />
                Studio architectures
              </div>
              <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Prepared to shape. Ready to test honestly.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                These are authored workshop systems and facilitator drafts. Each needs a real audience, host brief, and pilot before it earns a delivered claim.
              </p>
            </div>

            <div className="border-t border-white/10">
              {studioWorkshops.map((workshop, index) => (
                <Link
                  key={workshop.slug}
                  href={`/workshops/${workshop.slug}`}
                  className="group grid gap-5 border-b border-white/10 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:grid-cols-[3.5rem_1fr_auto] sm:items-start"
                >
                  <p className={`font-mono text-xs ${colorClassMap[workshop.color]}`}>0{index + 1}</p>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-cyan-100 motion-reduce:transition-none">
                        {workshop.title}
                      </h3>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.7rem] text-slate-400">
                        Studio draft
                      </span>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{workshop.subtitle}</p>
                    <p className="mt-3 text-xs text-slate-600">{workshop.duration} · {workshop.audience}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-cyan-300 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:px-10 lg:py-28">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
              <Users className="h-4 w-4" aria-hidden="true" />
              What every room should produce
            </div>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              A participant should be able to point to the result.
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {evidence.map((item) => (
              <li key={item} className="flex min-h-28 gap-3 rounded-2xl border border-white/10 bg-[#0b0e12] p-5 text-sm leading-6 text-slate-300">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.09),transparent_32%),radial-gradient(circle_at_82%_65%,rgba(16,185,129,0.08),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <GlowCard color="cyan" className="rounded-[2.25rem]">
            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
              <div>
                <p className="text-sm font-medium text-cyan-300">Bring your own room</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Already have a talk, method, tribe, or venue?
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
                  Use the Tallinn Session Amplifier to turn it into a before, in-room, and after plan—then share whether you want Frank to help shape the pilot.
                </p>
              </div>
              <GlowButton href="/experiences/tallinn-2026#amplifier" size="lg" color="cyan">
                Open the Session Amplifier
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </GlowButton>
            </div>
          </GlowCard>
        </div>
      </section>
    </main>
  )
}
