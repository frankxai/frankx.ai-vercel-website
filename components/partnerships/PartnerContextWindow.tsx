type PartnerContextWindowProps = {
  context: string
}

/**
 * Renders the ~150-word grounding paragraph that sets the partnership in its
 * real market context. Two-paragraph treatment when the source contains a
 * blank line; single block otherwise.
 */
export function PartnerContextWindow({ context }: PartnerContextWindowProps) {
  const paragraphs = context
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <section
      aria-labelledby="partner-context-heading"
      className="border-t border-white/5 py-24 lg:py-28"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
          Context
        </p>
        <h2
          id="partner-context-heading"
          className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-8 max-w-xl"
        >
          The market this conversation sits inside.
        </h2>
        <div className="space-y-5 text-base text-zinc-300 leading-relaxed">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
