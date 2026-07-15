import type { CompoundingNode } from '@/content/portal/types'

type CompoundingBandProps = {
  nodes: CompoundingNode[]
  sharedUpside: string[]
}

/**
 * Month 0/3/6/12 progression, adapted from CompoundingTimeline for the
 * public portal. Renders `sharedUpside` as a qualitative "how we both win"
 * list underneath.
 *
 * Hard content rule: this component only ever renders qualitative value
 * statements (nodes[].body, sharedUpside[]). Never pass or render dollar
 * amounts, percentages, or split figures here — those live in the private
 * economics doc, not on the public portal.
 */
export function CompoundingBand({ nodes, sharedUpside }: CompoundingBandProps) {
  if (!nodes.length) return null

  return (
    <section className="border-t border-white/5 px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-emerald-200">The compounding model</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
          What the first year looks like.
        </h2>

        {/* Desktop: horizontal */}
        <div className="mt-12 hidden lg:block">
          <ol className="relative grid grid-cols-4 gap-6">
            <span
              aria-hidden
              className="absolute left-[12.5%] right-[12.5%] top-7 h-px bg-gradient-to-r from-emerald-500/20 via-emerald-500/40 to-emerald-500/20"
            />
            {nodes.map((node) => (
              <li key={node.month} className="relative pt-16">
                <span
                  aria-hidden
                  className="absolute left-1/2 top-[1.625rem] block h-3 w-3 -translate-x-1/2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20"
                />
                <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/70">
                  Month {node.month}
                </p>
                <h3 className="mb-3 text-center text-base font-semibold leading-snug tracking-tight text-white">
                  {node.title}
                </h3>
                <p className="text-center text-sm leading-relaxed text-zinc-400">{node.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile: vertical */}
        <ol className="relative mt-10 space-y-10 pl-6 lg:hidden">
          <span
            aria-hidden
            className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/40 via-emerald-500/20 to-emerald-500/40"
          />
          {nodes.map((node) => (
            <li key={node.month} className="relative">
              <span
                aria-hidden
                className="absolute -left-6 top-1 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-500/20"
              />
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/70">
                Month {node.month}
              </p>
              <h3 className="mb-2 text-base font-semibold leading-snug tracking-tight text-white">
                {node.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">{node.body}</p>
            </li>
          ))}
        </ol>

        {sharedUpside.length ? (
          <div className="mt-12 rounded-[1.75rem] border border-white/10 bg-black/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/42">
              How we both win
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {sharedUpside.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm leading-6 text-white/72">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-300/70" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
