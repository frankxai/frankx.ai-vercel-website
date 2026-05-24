import { CONNECT_EVENTS, getActiveEvent, getUpcomingEvent } from '@/lib/connect/events'

const ACCENT_CLASSES: Record<string, string> = {
  cyan: 'from-cyan-500/15 via-cyan-400/5 to-transparent border-cyan-400/30 text-cyan-100',
  amber: 'from-amber-500/15 via-amber-400/5 to-transparent border-amber-400/30 text-amber-100',
  emerald: 'from-emerald-500/15 via-emerald-400/5 to-transparent border-emerald-400/30 text-emerald-100',
  violet: 'from-violet-500/15 via-violet-400/5 to-transparent border-violet-400/30 text-violet-100',
}

const DOT_CLASSES: Record<string, string> = {
  cyan: 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]',
  amber: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]',
  emerald: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]',
  violet: 'bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.6)]',
}

export function EventRibbon() {
  const active = getActiveEvent()
  const upcoming = active ? null : getUpcomingEvent()

  if (active) {
    return (
      <div
        className={`mx-auto mb-6 flex w-fit max-w-full items-center gap-2 rounded-full border bg-gradient-to-r px-4 py-1.5 text-xs font-medium backdrop-blur sm:text-sm ${ACCENT_CLASSES[active.accent]}`}
      >
        <span className={`inline-block h-2 w-2 animate-pulse rounded-full ${DOT_CLASSES[active.accent]}`} aria-hidden />
        <span>
          Live at <strong className="font-semibold">{active.label}</strong>
          {active.location ? ` · ${active.location}` : ''} — welcome.
        </span>
      </div>
    )
  }

  if (upcoming) {
    return (
      <div
        className={`mx-auto mb-6 flex w-fit max-w-full items-center gap-2 rounded-full border bg-gradient-to-r px-4 py-1.5 text-xs font-medium backdrop-blur sm:text-sm ${ACCENT_CLASSES[upcoming.accent]}`}
      >
        <span className={`inline-block h-2 w-2 rounded-full ${DOT_CLASSES[upcoming.accent]}`} aria-hidden />
        <span>
          See you at <strong className="font-semibold">{upcoming.label}</strong>
          {upcoming.location ? ` · ${upcoming.location}` : ''}
        </span>
      </div>
    )
  }

  return (
    <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur sm:text-sm">
      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" aria-hidden />
      <span>Welcome — let&apos;s find the right next step.</span>
    </div>
  )
}

export function getEventListForDisplay() {
  return CONNECT_EVENTS
}
