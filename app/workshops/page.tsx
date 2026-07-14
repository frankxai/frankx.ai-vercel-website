import Link from 'next/link'
import { ArrowRight, Check, FlaskConical, Sparkles, Users } from 'lucide-react'

import { TrackedGlowButton } from '@/components/analytics/TrackedGlowButton'
import { GlowCard } from '@/components/ui/glow-card'
import { workshops } from '@/data/workshops'

function requirePersonallyDeliveredWorkshop() {
  const workshop = workshops.find((item) => item.provenance === 'delivered-personal')
  if (!workshop) {
    throw new Error('Workshop registry requires one personally delivered workshop.')
  }
  return workshop
}
const personallyDeliveredWorkshop = requirePersonallyDeliveredWorkshop()
const studioAssistedDeliveredWorkshops = workshops.filter(
  (workshop) => workshop.provenance === 'delivered-studio-assisted',
)
const studioWorkshops = workshops.filter((workshop) => workshop.provenance === 'studio-draft')

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
    <main className="overflow-hidden bg-void text-white">
      <section className="relative border-b border-white/[0.08]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[46rem] bg-workshop-aurora" />
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
                <TrackedGlowButton
                  href="#formats"
                  size="lg"
                  color="emerald"
                  eventName="workshop_studio_cta_clicked"
                  eventProperties={{ action: 'explore_formats', placement: 'hero' }}
                >
                  Explore the formats
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedGlowButton>
                <TrackedGlowButton
                  href="/experiences/tallinn-2026#amplifier"
                  size="lg"
                  variant="secondary"
                  color="cyan"
                  eventName="workshop_studio_cta_clicked"
                  eventProperties={{ action: 'open_session_amplifier', placement: 'hero' }}
                >
                  Amplify your session
                </TrackedGlowButton>
              </div>
            </div>

            <div className="border-y border-white/10 py-7">
              <p className="text-sm font-semibold text-white">The provenance line is explicit</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold text-amber-200">Personally developed + delivered</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Ikigai &amp; Branding is Frank’s personally developed and facilitated foundation.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-200">Delivered, studio-assisted</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Build Your First AI Agent has a delivery record; its architecture was built with the agentic studio.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-cyan-200">Studio drafts</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    The remaining formats are prepared architectures to tailor and pilot—not past delivery claims.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="formats" className="surface-1 scroll-mt-24 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-2 text-sm font-medium text-amber-200">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Delivered by Frank
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                The delivered work.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                Two formats have a real delivery record, with different authorship stories. The distinction stays visible.
              </p>
            </div>

            <div className="space-y-5">
              <GlowCard color="amber" href={`/workshops/${personallyDeliveredWorkshop.slug}`} className="rounded-[2rem]">
                <div className="flex min-h-[31rem] flex-col p-7 sm:p-9 lg:p-11">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-amber-300/30 bg-amber-300/[0.08] px-3 py-1.5 text-xs font-semibold text-amber-100">
                      Personally developed + delivered
                    </span>
                    <span className="text-xs text-slate-500">{personallyDeliveredWorkshop.duration}</span>
                  </div>
                  <div className="mt-auto">
                    <h3 className="max-w-2xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
                      {personallyDeliveredWorkshop.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                      {personallyDeliveredWorkshop.subtitle}
                    </p>
                    <div className="mt-9 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-slate-400">For {personallyDeliveredWorkshop.audience.toLowerCase()}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                        Explore the workshop
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              </GlowCard>

              {studioAssistedDeliveredWorkshops.map((workshop) => (
                <GlowCard key={workshop.slug} color="emerald" href={`/workshops/${workshop.slug}`} className="rounded-[2rem]">
                  <div className="grid gap-6 p-7 sm:grid-cols-[1fr_auto] sm:items-end sm:p-9">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-emerald-300/25 bg-emerald-300/[0.07] px-3 py-1.5 text-xs font-semibold text-emerald-100">
                          Delivered pilot
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400">
                          Studio-assisted architecture
                        </span>
                      </div>
                      <h3 className="mt-7 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                        {workshop.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{workshop.subtitle}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                      Explore the workshop
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.08]">
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
                These are studio-authored workshop systems and facilitator drafts. Each still needs a real audience, host brief, and pilot before it earns a delivered claim.
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

      <section className="surface-1 border-b border-white/[0.08]">
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
              <li key={item} className="surface-2 flex min-h-28 gap-3 rounded-2xl border border-white/10 p-5 text-sm leading-6 text-slate-300">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-studio-continuation" />
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
              <TrackedGlowButton
                href="/experiences/tallinn-2026#amplifier"
                size="lg"
                color="cyan"
                eventName="workshop_studio_cta_clicked"
                eventProperties={{ action: 'open_session_amplifier', placement: 'closing' }}
              >
                Open the Session Amplifier
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedGlowButton>
            </div>
          </GlowCard>
        </div>
      </section>
    </main>
  )
}
