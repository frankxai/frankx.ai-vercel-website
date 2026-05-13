/**
 * The labeled hairline between Tier 1 (working reality) and Tier 2 (proposal).
 *
 * Honest layering: the proposal IS a proposal. Putting the label here is the
 * signal that earns the right to make it. A 30-year channel veteran respects
 * the order: verifiable facts first, ask second.
 */
export function ProposalDivider() {
  return (
    <section
      aria-label="Proposal section follows"
      className="relative py-16 lg:py-20"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-emerald-500/20"
          />
          <div className="text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-emerald-400/70 font-medium">
              Proposal
            </p>
            <p className="text-xs tracking-[0.15em] uppercase text-white/30 font-medium mt-1">
              if we build this together
            </p>
          </div>
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-l from-transparent via-emerald-500/20 to-emerald-500/20"
          />
        </div>
      </div>
    </section>
  )
}
