import { MotionSection, MotionItem } from './MotionLayer'

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
 *
 * Motion: fades up as the band enters the viewport. The single paragraph
 * carries the weight — type tracking pulled in slightly for premium feel.
 */
export function FormalizeBand({ text }: FormalizeBandProps) {
  if (!text) return null

  return (
    <MotionSection
      aria-labelledby="formalize-band-heading"
      className="border-t border-white/5 py-24 lg:py-28"
    >
      <MotionItem className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
          What&apos;s left to formalize
        </p>
        <h2 id="formalize-band-heading" className="sr-only">
          What&apos;s left to formalize
        </h2>
        <p
          className="text-lg sm:text-xl text-zinc-300 leading-[1.7]"
          style={{ letterSpacing: '-0.005em' }}
        >
          {text}
        </p>
      </MotionItem>
    </MotionSection>
  )
}
