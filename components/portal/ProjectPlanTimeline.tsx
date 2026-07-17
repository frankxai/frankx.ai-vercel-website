import { Check } from 'lucide-react'
import type { ProjectPlanPhase } from '@/content/portal/types'

type ProjectPlanTimelineProps = {
  phases: ProjectPlanPhase[]
}

const STATUS_STYLES: Record<
  ProjectPlanPhase['status'],
  { dot: string; card: string; label: string; labelText: string }
> = {
  done: {
    dot: 'bg-emerald-400 ring-4 ring-emerald-500/20',
    card: 'border-emerald-400/25 bg-emerald-400/[0.06]',
    label: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/25',
    labelText: 'Done',
  },
  'in-progress': {
    dot: 'bg-white ring-4 ring-white/25',
    card: 'border-white/20 bg-white/[0.055]',
    label: 'bg-white/15 text-white border-white/25',
    labelText: 'In progress',
  },
  next: {
    dot: 'bg-transparent ring-2 ring-white/25',
    card: 'border-white/10 bg-white/[0.02]',
    label: 'bg-white/[0.04] text-white/50 border-white/10',
    labelText: 'Next',
  },
}

/**
 * The active build — vertical phase timeline. Status drives visual weight:
 * done is solid/checked, in-progress is bright, next is quiet/outlined.
 * Same connector-line pattern as CompoundingTimeline, but vertical-only
 * since project plans read as a sequence, not a comparison grid.
 */
export function ProjectPlanTimeline({ phases }: ProjectPlanTimelineProps) {
  if (!phases.length) return null

  return (
    <section className="px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold text-emerald-200">The active build</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
          Where this stands right now.
        </h2>

        <ol className="relative mt-10 space-y-6 pl-8">
          <span
            aria-hidden
            className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/40 via-white/15 to-white/5"
          />
          {phases.map((phase, index) => {
            const style = STATUS_STYLES[phase.status]
            return (
              <li key={`${phase.phase}-${index}`} className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-[27px] top-6 grid h-6 w-6 place-items-center rounded-full ${style.dot}`}
                >
                  {phase.status === 'done' ? (
                    <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
                  ) : null}
                </span>
                <div className={`rounded-[1.75rem] border p-6 backdrop-blur-xl ${style.card}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.15em] ${style.label}`}
                    >
                      {style.labelText}
                    </span>
                    <span className="text-xs font-semibold text-white/45">{phase.window}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-black tracking-tight">{phase.phase}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/68">{phase.outcome}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
