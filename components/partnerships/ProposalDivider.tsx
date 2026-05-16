type ProposalDividerVariant = 'active' | 'strategic-alignment'

type ProposalDividerProps = {
  /**
   * Tier of the partner page this divider sits inside.
   *
   * - `active` → "Proposal — if we build this together" (the conversation
   *   is live, deck is implicit, calendar is open).
   * - `strategic-alignment` → "Proposal frame — how deepening could look"
   *   (the alignment exists; the formal program lane is what's missing).
   */
  variant?: ProposalDividerVariant
}

const LABELS: Record<
  ProposalDividerVariant,
  { primary: string; secondary: string }
> = {
  active: {
    primary: 'Proposal',
    secondary: 'if we build this together',
  },
  'strategic-alignment': {
    primary: 'Proposal frame',
    secondary: 'how deepening could look',
  },
}

/**
 * The labeled hairline between Tier 1 (working reality) and Tier 2 (proposal).
 *
 * Honest layering: the proposal IS a proposal. Putting the label here is the
 * signal that earns the right to make it. A 30-year channel veteran respects
 * the order: verifiable facts first, ask second.
 *
 * Variant prop lets the label adapt: `active` partners get a direct
 * "if we build this together" framing; `strategic-alignment` partners get
 * "how deepening could look" — softer, because the formal lane is what's
 * being explored, not committed.
 */
export function ProposalDivider({
  variant = 'active',
}: ProposalDividerProps = {}) {
  const { primary, secondary } = LABELS[variant]

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
          <div className="relative text-center px-4 py-1 rounded-full backdrop-blur-[2px]">
            <p className="text-[11px] tracking-[0.3em] uppercase text-emerald-400/75 font-medium">
              {primary}
            </p>
            <p className="text-xs tracking-[0.15em] uppercase text-white/35 font-medium mt-1">
              {secondary}
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
