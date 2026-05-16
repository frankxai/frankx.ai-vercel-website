import type { ProposalAsk as ProposalAskItem } from '@/content/partnerships/proposals/types'

type ProposalAskProps = {
  asks: ProposalAskItem[]
}

/**
 * Explicit-ask section for an unlisted proposal. The recipient should be
 * able to scan this in 30 seconds and know exactly what is being requested.
 *
 * Each ask is a category + detail pair. Category is the verb in the
 * recipient's vocabulary (Program entry, Credits, Co-marketing, DevRel
 * touchpoint). Detail is one or two sentences with the specifics.
 */
export function ProposalAsk({ asks }: ProposalAskProps) {
  if (!asks.length) return null

  return (
    <section
      aria-labelledby="proposal-ask-heading"
      className="border-t border-white/5 py-24 lg:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            The ask
          </p>
          <h2
            id="proposal-ask-heading"
            className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4"
          >
            What I am asking for.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Specific, bounded, and small enough that a yes is a clean motion
            on your side. No bundles, no surprises.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {asks.map((ask, i) => (
            <li
              key={i}
              className="relative rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 transition-colors hover:bg-white/[0.04] hover:border-emerald-500/20"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span
                  aria-hidden
                  className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/70 font-mono"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  {ask.category}
                </h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {ask.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
