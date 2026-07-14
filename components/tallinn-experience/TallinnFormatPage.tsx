import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, MapPin } from 'lucide-react'

import { GlowButton } from '@/components/ui/GlowButton'
import { GlowCard } from '@/components/ui/glow-card'
import { TALLINN_STUDIO_EVENT, type TallinnPublicFormat } from '@/data/tallinn-studio'

interface TallinnFormatPageProps {
  format: TallinnPublicFormat
}

export function TallinnFormatPage({ format }: TallinnFormatPageProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080a0d] text-white">
      <section className="relative border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(circle_at_18%_10%,rgba(6,182,212,0.12),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(245,158,11,0.09),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:px-10 lg:pb-28 lg:pt-44">
          <Link
            href="/experiences/tallinn-2026"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Tallinn Session Studio
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-cyan-300">{format.eyebrow}</p>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-7xl">
                {format.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{format.promise}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <GlowButton href="/experiences/tallinn-2026#interest" size="lg" color={format.accent}>
                  Shape this format
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </GlowButton>
                <GlowButton href={format.workshopHref} size="lg" variant="secondary">
                  See the source work
                </GlowButton>
              </div>
            </div>

            <GlowCard color={format.accent} className="rounded-[2rem] bg-[#0b0e12]">
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

      <section className="border-y border-white/[0.07] bg-white/[0.015]">
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
          <GlowButton href="/experiences/tallinn-2026#interest" size="lg" color="emerald">
            Register interest
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </GlowButton>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-5 py-10 text-xs leading-5 text-slate-500 sm:px-8 lg:px-10">
        {TALLINN_STUDIO_EVENT.independenceNotice}
      </footer>
    </main>
  )
}
