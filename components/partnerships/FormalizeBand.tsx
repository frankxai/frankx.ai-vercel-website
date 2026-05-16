type FormalizeBandProps = {
  text: string
}

/**
 * Strategic-alignment tier — closing band rendered between AntiPositioning
 * and PartnerCTA. Articulates that the work is in motion and only the
 * formal program lane remains. Single paragraph, centered, max-w-3xl.
 *
 * Visual treatment matches the partnerships component family: 11px tracking
 * 0.25em uppercase eyebrow in emerald-400/60, restrained typographic band.
 */
export function FormalizeBand({ text }: FormalizeBandProps) {
  if (!text) return null

  return (
    <section
      aria-labelledby="formalize-band-heading"
      className="border-t border-white/5 py-24 lg:py-28"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
          What&apos;s left to formalize
        </p>
        <h2 id="formalize-band-heading" className="sr-only">
          What&apos;s left to formalize
        </h2>
        <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed">
          {text}
        </p>
      </div>
    </section>
  )
}
