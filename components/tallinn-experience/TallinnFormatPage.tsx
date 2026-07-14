import { ArrowLeft, ArrowRight, Check, MapPin } from 'lucide-react'

import { TrackedGlowButton } from '@/components/analytics/TrackedGlowButton'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { GlowCard } from '@/components/ui/glow-card'
import { TALLINN_STUDIO_EVENT, type TallinnPublicFormat } from '@/data/tallinn-studio'

interface TallinnFormatPageProps {
  format: TallinnPublicFormat
}

export function TallinnFormatPage({ format }: TallinnFormatPageProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-void text-white">
      <section className="relative border-b border-white/[0.08]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-tallinn-aurora" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:px-10 lg:pb-28 lg:pt-44">
          <TrackedLink
            href="/experiences/tallinn-2026"
            eventName="tallinn_format_cta_clicked"
            eventProperties={{ action: 'return_to_studio', format_slug: format.slug }}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Tallinn Session Studio
          </TrackedLink>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-cyan-300">{format.eyebrow}</p>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-7xl">
                {format.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{format.promise}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedGlowButton
                  href="/experiences/tallinn-2026#interest"
                  size="lg"
                  color={format.accent}
                  eventName="tallinn_format_cta_clicked"
                  eventProperties={{ action: 'shape_format', format_slug: format.slug }}
                >
                  Shape this format
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedGlowButton>
                <TrackedGlowButton
                  href={format.sourceHref}
                  size="lg"
                  variant="secondary"
                  eventName="tallinn_format_cta_clicked"
                  eventProperties={{ action: 'open_source', format_slug: format.slug }}
                >
                  {format.sourceLabel}
                </TrackedGlowButton>
              </div>
            </div>

            <GlowCard color={format.accent} className="surface-2 rounded-[2rem]">
              <div className="p-7 sm:p-9">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Made for</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white">{format.fit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Leave with</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-emerald-100">{format.artifact}</p>
                  </div>
                </div>
                <p className="mt-7 border-t border-white/10 pt-6 text-xs leading-5 text-slate-400">{format.status}</p>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="text-sm font-medium text-amber-300">Session spine</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Three moves. One useful result.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
              The final agenda is shaped with the host and participants. These moves protect the core purpose without pretending every room needs the same script.
            </p>
          </div>

          <ol className="border-t border-white/10">
            {format.steps.map((step, index) => (
              <li key={step} className="grid gap-5 border-b border-white/10 py-8 sm:grid-cols-[3.5rem_1fr]">
                <p className="font-mono text-xs text-cyan-300">0{index + 1}</p>
                <div className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  <p className="text-base leading-7 text-slate-300">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="surface-1 border-y border-white/[0.08]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10 lg:py-20">
          <div>
            <div className="flex items-center gap-2 text-sm text-cyan-300">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {TALLINN_STUDIO_EVENT.city} · {TALLINN_STUDIO_EVENT.dates}
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Bring the idea, the room, or the question.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Register interest to help decide whether this should become a Tallinn session. No ticket, venue, or schedule is promised by the form.
            </p>
          </div>
          <TrackedGlowButton
            href="/experiences/tallinn-2026#interest"
            size="lg"
            color="emerald"
            eventName="tallinn_format_cta_clicked"
            eventProperties={{ action: 'register_interest', format_slug: format.slug }}
          >
            Register interest
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedGlowButton>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-5 py-10 text-xs leading-5 text-slate-500 sm:px-8 lg:px-10">
        {TALLINN_STUDIO_EVENT.independenceNotice}
      </footer>
    </main>
  )
}
