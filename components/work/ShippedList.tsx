import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ShippedItem } from '@/content/work/types'

type ShippedListProps = {
  items: ShippedItem[]
}

/**
 * What got built on this engagement. Reads as a peer-architect ledger,
 * not a sales sheet — each row is one verifiable shipped item, with an
 * optional public artifact link when permission has been granted.
 */
export function ShippedList({ items }: ShippedListProps) {
  if (!items.length) return null

  return (
    <section
      aria-labelledby="shipped-heading"
      className="border-t border-white/5 py-20 lg:py-24"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Shipped
          </p>
          <h2
            id="shipped-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3"
          >
            What got built.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Verifiable items the engagement has produced. Open artifacts are
            linked. NDA-bounded items state the shape, not the contents.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {items.map((item, i) => {
            const isExternal = item.url?.startsWith('http') ?? false
            const Body = (
              <>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/70 font-medium">
                    {item.label}
                  </p>
                  {item.url ? (
                    <ArrowUpRight
                      className="w-4 h-4 flex-shrink-0 text-zinc-500 group-hover:text-emerald-300 transition-colors"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {item.detail}
                </p>
              </>
            )

            return (
              <li key={i}>
                {item.url ? (
                  <Link
                    href={item.url}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="group block rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 transition-colors hover:bg-white/[0.04] hover:border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                  >
                    {Body}
                  </Link>
                ) : (
                  <article className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6">
                    {Body}
                  </article>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
