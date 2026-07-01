import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type RecommendationDeckItem = {
  title: string
  href: string
  why: string
  image?: string
}

type RecommendationDeckGroup = {
  kind: string
  label: string
  items: RecommendationDeckItem[]
}

type RecommendationDeckProps = {
  groups: RecommendationDeckGroup[]
}

/**
 * Curated recommendations, grouped by kind (Research / Library / Blog /
 * Products / Downloads). Shape matches lib/portal/recommend.ts's
 * groupRecommendationsByKind output exactly. Each card links out to the real
 * content surface — no duplicated content, just the `why` rationale line.
 */
export function RecommendationDeck({ groups }: RecommendationDeckProps) {
  const nonEmpty = groups.filter((group) => group.items.length > 0)
  if (!nonEmpty.length) return null

  return (
    <section className="px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-emerald-200">Curated for you</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
          What's worth your time.
        </h2>

        <div className="mt-10 space-y-12">
          {nonEmpty.map((group) => (
            <div key={group.kind}>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white/45">
                {group.label}
              </h3>
              <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => {
                  const isExternal = item.href.startsWith('http')
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="group block h-full rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition hover:border-emerald-300/25 hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-base font-bold leading-snug tracking-tight text-white">
                            {item.title}
                          </h4>
                          <ArrowUpRight
                            className="h-4 w-4 shrink-0 text-white/40 transition group-hover:text-emerald-300"
                            aria-hidden
                          />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/60">{item.why}</p>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
