import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export interface HubCount {
  value: string
  label: string
  detail: string
}

/**
 * The lead surface. Counts are passed in already generated from registries and
 * receipts at build time; nothing here is typed.
 */
export default function HubHero({ counts }: { counts: HubCount[] }) {
  return (
    <section className="relative border-b border-white/[0.08] pt-28 pb-14 md:pt-32 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-emerald-300">
              FrankX research
            </p>
            <h1 className="mt-6 max-w-[15ch] text-balance font-display text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Research, with the <em className="font-serif-italic text-white">working</em> shown.
            </h1>
            <p className="mt-6 max-w-[56ch] text-base leading-7 text-white/70 md:text-lg md:leading-8">
              Each investigation opens onto the receipts, dataset, grades or source
              ledger behind its claims. The topic maps further down stay under review
              until their sources pass.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-2">
              <Link
                href="#investigations"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-emerald-300 px-6 text-[15px] font-semibold text-[#0a0a0b] transition-colors hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                Read the investigations
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/research/methodology"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                How a claim is graded
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
              </Link>
            </div>
          </div>

          <aside
            aria-label="What this page holds"
            className="border-t border-white/[0.08] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          >
            <p className="font-mono text-[10.5px] tracking-[0.1em] text-white/45">Index</p>
            <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-7">
              {counts.map((count) => (
                <div key={count.label}>
                  <dt className="font-display text-3xl font-semibold tabular-nums tracking-[-0.04em] text-white md:text-4xl">
                    {count.value}
                  </dt>
                  <dd className="mt-2 text-xs leading-5 text-white/50">
                    <span className="block font-medium text-white/75">{count.label}</span>
                    {count.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
