import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { activeForcingFunctions, daysUntil, type ForcingFunction } from '@/lib/intake/forcing-functions'
import { getPersona } from '@/lib/intake'

export const dynamic = 'force-static'
export const revalidate = 3600 // 1h — recompute "days until" labels

export const metadata: Metadata = {
  title: 'Studio Calendar — Forcing Functions | FrankX',
  description:
    'The deadlines the Content Operations system optimizes against. Workshops, launches, weekly releases — each biases producer dispatch decisions during classifier cross-reference.',
  alternates: { canonical: 'https://frankx.ai/studio/calendar' },
  openGraph: {
    title: 'Studio Calendar — Forcing Functions',
    description: 'The deadlines that bias content production. Workshops, launches, weekly releases.',
    url: 'https://frankx.ai/studio/calendar',
    siteName: 'FrankX',
    type: 'website',
  },
}

const KIND_LABEL: Record<ForcingFunction['kind'], string> = {
  'workshop-delivery': 'Workshop',
  'launch-deadline': 'Launch',
  'recurring-release': 'Release',
  'recurring-content': 'Cadence',
  'content-batch': 'Batch',
}

const KIND_COLOR: Record<ForcingFunction['kind'], string> = {
  'workshop-delivery': 'bg-violet-500/10 text-violet-300 ring-violet-500/30',
  'launch-deadline': 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/30',
  'recurring-release': 'bg-amber-500/10 text-amber-300 ring-amber-500/30',
  'recurring-content': 'bg-cyan-500/10 text-cyan-300 ring-cyan-500/30',
  'content-batch': 'bg-rose-500/10 text-rose-300 ring-rose-500/30',
}

export default function StudioCalendarPage() {
  const functions = activeForcingFunctions()
  const now = new Date()
  const upcoming = functions
    .map((f) => ({ ...f, daysOut: daysUntil(f, now) }))
    .filter((f) => f.daysOut >= -1) // include "today" and future
    .sort((a, b) => a.daysOut - b.daysOut)

  return (
    <main id="main" className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 mb-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] rounded-full"
          >
            <ArrowRight className="h-4 w-4 rotate-180" aria-hidden />
            Studio
          </Link>
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-6">
            Forcing Functions Calendar · {functions.length} active
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 max-w-4xl">
            The deadlines the system
            <br />
            <span className="text-emerald-400">optimizes against.</span>
          </h1>
          <p className="text-[17px] leading-relaxed text-white/80 max-w-2xl mb-4">
            Workshops, launches, weekly releases. Each biases producer dispatch decisions during
            the classifier cross-reference phase. When a drop arrives within the window of an
            active function, the matching platform's persona gets prioritized.
          </p>
          <p className="text-sm text-white/50 font-mono">
            Source: <code className="text-emerald-400/80">data/forcing-functions.json</code>
          </p>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <ol className="space-y-3">
            {upcoming.map((f) => {
              const personas = f.platforms.map((p) => getPersona(p)).filter(Boolean)
              const dateLabel =
                f.daysOut === 0
                  ? 'Today'
                  : f.daysOut === 1
                    ? 'Tomorrow'
                    : f.daysOut < 0
                      ? `${Math.abs(f.daysOut)} days ago`
                      : `In ${f.daysOut} days`
              const urgent = f.daysOut >= 0 && f.daysOut <= 7
              const passed = f.daysOut < 0
              return (
                <li
                  key={f.id}
                  className={`rounded-2xl backdrop-blur-xl border ${urgent ? 'border-emerald-500/30 bg-emerald-500/[0.04]' : passed ? 'border-white/[0.06] bg-white/[0.02]' : 'border-white/10 bg-white/[0.04]'} p-6 flex items-start gap-6`}
                >
                  <div className="shrink-0 w-32 text-right">
                    <p className="font-mono text-sm text-emerald-400/80 mb-1">{f.date}</p>
                    <p
                      className={`text-xs ${urgent ? 'text-emerald-300' : passed ? 'text-white/30' : 'text-white/50'}`}
                    >
                      {dateLabel}
                    </p>
                    {urgent && (
                      <div className="mt-2 inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-emerald-400">
                        <AlertCircle className="h-3 w-3" aria-hidden />
                        Active window
                      </div>
                    )}
                    {passed && (
                      <div className="mt-2 inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-white/30">
                        <CheckCircle2 className="h-3 w-3" aria-hidden />
                        Past
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-full ring-1 ${KIND_COLOR[f.kind]}`}
                      >
                        {KIND_LABEL[f.kind]}
                      </span>
                      <span className="text-[10px] tracking-[0.15em] uppercase text-white/40">
                        {f.archetype} · {f.spectrum}
                      </span>
                      {f.recurrence && (
                        <span className="text-[10px] tracking-[0.15em] uppercase text-white/40 inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden />
                          {f.recurrence}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-lg font-semibold text-white mb-2">
                      {f.label}
                    </h2>
                    <p className="text-sm text-white/60 leading-relaxed mb-3">{f.biasInstruction}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {personas.map(
                        (p) =>
                          p && (
                            <span
                              key={p.platform}
                              className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/55"
                            >
                              {p.label}
                            </span>
                          ),
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            How the calendar feeds production
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-6">
            Calendar is not a to-do list. It's a bias function.
          </h2>
          <div className="space-y-5 text-[17px] leading-relaxed text-white/80">
            <p>
              When `content-intake-classifier` reads a new capture, it walks 5 cross-reference
              signals in order. The forcing-functions calendar is the first signal — the highest-leverage
              context for "what should this content prioritize."
            </p>
            <p>
              A voice memo dropped 3 days before NLDigital biases toward LinkedIn + newsletter
              variants. A travel photo dropped on a Friday biases toward Instagram + Spotify-companion
              cross-promo if a music release is also scheduled. The classifier reads
              <code className="font-mono text-emerald-400/80 mx-1">forcingFunctionsInWindow(7)</code>
              and weights accordingly.
            </p>
            <p>
              When a forcing function passes, it auto-marks `state: completed` (or moves to next
              occurrence for recurring). The bias falls off. The system stays current without
              constant manual upkeep.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          >
            <Calendar className="h-4 w-4" aria-hidden />
            Back to Studio
          </Link>
        </div>
      </section>
    </main>
  )
}
