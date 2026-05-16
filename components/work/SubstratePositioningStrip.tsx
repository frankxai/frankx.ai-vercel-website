type SubstratePositioningStripProps = {
  /** The strong substrate line, e.g. "Not employee. Not on the deck. Substrate provider." */
  line: string
}

/**
 * Top-of-page band for substrate-type engagements.
 *
 * Renders above the hero on /work/[slug] when engagementType === 'substrate'.
 * The strongest positioning surface on the page — it sets the frame before
 * the reader sees the role, the client, or the work. Three short sentences
 * read as a vow.
 */
export function SubstratePositioningStrip({
  line,
}: SubstratePositioningStripProps) {
  return (
    <section
      aria-labelledby="substrate-positioning-heading"
      className="relative border-b border-emerald-500/15 bg-gradient-to-b from-emerald-500/[0.05] via-emerald-500/[0.02] to-transparent"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-5 lg:py-6">
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="hidden sm:block w-1.5 h-1.5 rounded-full bg-emerald-400"
          />
          <p
            id="substrate-positioning-heading"
            className="text-[11px] sm:text-xs tracking-[0.18em] uppercase text-emerald-300/90 font-medium leading-relaxed"
          >
            {line}
          </p>
        </div>
      </div>
    </section>
  )
}
