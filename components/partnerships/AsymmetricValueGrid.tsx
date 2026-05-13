import type { ValueBlock } from '@/content/partnerships/types'

type AsymmetricValueGridProps = {
  blocks: ValueBlock[]
}

/**
 * Tier 2 — the proposal's leverage blocks. Exactly 5 blocks recommended;
 * grid is 3 across at lg with the 5th block spanning two columns at md to
 * avoid an awkward orphan. Single column on mobile.
 */
export function AsymmetricValueGrid({ blocks }: AsymmetricValueGridProps) {
  return (
    <section
      aria-labelledby="asymmetric-value-heading"
      className="border-t border-white/5 py-24 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Asymmetric value
          </p>
          <h2
            id="asymmetric-value-heading"
            className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4"
          >
            What I bring that compounds.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Five leverage points specific to this partnership. Each is a
            standing capability, not a one-off output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {blocks.map((block, i) => (
            <article
              key={i}
              className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 transition-colors hover:bg-white/[0.04] hover:border-emerald-500/20"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium">
                  0{i + 1}
                </span>
                {block.metric ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/[0.08] text-emerald-300 border border-emerald-500/15">
                    {block.metric}
                  </span>
                ) : null}
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight mb-3 leading-snug">
                {block.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {block.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
