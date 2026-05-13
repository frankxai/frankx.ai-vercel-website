type AntiPositioningProps = {
  items: string[]
}

/**
 * Tier 2 — scope limits, deliberate. Strikethrough + dimmed treatment so a
 * scanning reader takes the point instantly. The discipline of saying what
 * a partnership is NOT is part of the brand.
 */
export function AntiPositioning({ items }: AntiPositioningProps) {
  if (!items.length) return null

  return (
    <section
      aria-labelledby="anti-positioning-heading"
      className="border-t border-white/5 py-24 lg:py-28"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
          Scope limits
        </p>
        <h2
          id="anti-positioning-heading"
          className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-8"
        >
          What this is not.
        </h2>

        <ul className="space-y-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-zinc-500 leading-relaxed"
            >
              <span
                aria-hidden
                className="mt-2 inline-block w-3 h-px bg-zinc-600 flex-shrink-0"
              />
              <span className="line-through decoration-zinc-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
