import { GlowCard } from '@/components/ui/glow-card'
import type { YearPlanQuarter } from '@/content/portal/types'

type YearPlanGridProps = {
  yearPlan: YearPlanQuarter[]
}

/**
 * The roadmap — four quarter cards, each with a theme + milestone list.
 * Ordered by the fixed Q1-Q4 sequence regardless of array order.
 */
export function YearPlanGrid({ yearPlan }: YearPlanGridProps) {
  if (!yearPlan.length) return null

  const order: YearPlanQuarter['quarter'][] = ['Q1', 'Q2', 'Q3', 'Q4']
  const byQuarter = new Map(yearPlan.map((q) => [q.quarter, q]))
  const ordered = order.map((q) => byQuarter.get(q)).filter((q): q is YearPlanQuarter => Boolean(q))

  return (
    <section className="px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-emerald-200">The roadmap</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
          The year, quarter by quarter.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ordered.map((quarter) => (
            <GlowCard key={quarter.quarter} color="teal" className="rounded-[2rem] p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300/70">
                {quarter.quarter}
              </span>
              <h3 className="mt-3 text-lg font-black tracking-tight">{quarter.theme}</h3>
              <ul className="mt-4 space-y-2">
                {quarter.milestones.map((milestone, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-6 text-white/64">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-300/70" />
                    {milestone}
                  </li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
