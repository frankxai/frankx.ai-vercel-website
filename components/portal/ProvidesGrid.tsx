import { GlowCard } from '@/components/ui/glow-card'
import type { ProvidesItem } from '@/content/portal/types'

type ProvidesGridProps = {
  items: ProvidesItem[]
}

/**
 * "What Frank provides" — one GlowCard per item, mirrors the allianceContract
 * grid on /allies (rounded-[2rem], emerald glow, icon-free since items are
 * partner-authored copy rather than a fixed principle set).
 */
export function ProvidesGrid({ items }: ProvidesGridProps) {
  if (!items.length) return null

  return (
    <section className="px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-emerald-200">What I provide</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
          The work this relationship carries.
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <GlowCard key={item.title} color="emerald" className="rounded-[2rem] p-6">
              <h3 className="text-lg font-black tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/64">{item.detail}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
