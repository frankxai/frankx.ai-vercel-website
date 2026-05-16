type OutcomeBlockProps = {
  /** 100–200 words. What the engagement produced, in operator terms. */
  outcome: string
}

/**
 * What the engagement produced. One paragraph block — quiet, peer-architect
 * tone, never sales sheet. Sits between StackBlock and the anti-positioning
 * list so the reader has the full picture before scope limits land.
 */
export function OutcomeBlock({ outcome }: OutcomeBlockProps) {
  if (!outcome) return null

  return (
    <section
      aria-labelledby="outcome-heading"
      className="border-t border-white/5 py-20 lg:py-24"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
          Outcome
        </p>
        <h2
          id="outcome-heading"
          className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-6"
        >
          What it produced.
        </h2>
        <p className="text-base text-zinc-300 leading-relaxed">{outcome}</p>
      </div>
    </section>
  )
}
