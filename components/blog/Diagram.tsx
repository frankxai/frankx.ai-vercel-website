import Image from 'next/image'

interface DiagramProps {
  src: string
  alt: string
  caption?: string
  /**
   * The diagram's own pixel dimensions. The browser reserves this ratio before
   * the file loads, so a diagram that is not 16:9 must pass its real numbers or
   * the box snaps to a different height on load. Defaults match the call sites
   * that predate these props.
   */
  width?: number
  height?: number
  /**
   * For diagrams whose labels are set in real type rather than drawn large.
   * Scaling a 1200px vector diagram into a 375px phone gives roughly 3px text,
   * which is not a small diagram — it is no diagram. When set, the figure keeps
   * a legible minimum width and pans horizontally instead.
   *
   * Off by default: existing call sites are illustrations that survive being
   * scaled down, and giving them a scrollbar would be a regression.
   */
  scrollable?: boolean
}

/** Enough of the native 1200px width to keep 13px labels around 10px on a phone. */
const LEGIBLE_MIN_WIDTH = 960

export default function Diagram({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
  scrollable = false,
}: DiagramProps) {
  return (
    <figure className="my-10">
      <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-b from-[#0b1220] to-[#070d18] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
        <div
          className={`rounded-xl border border-white/10 bg-[#050a14] p-3 ${scrollable ? 'overflow-x-auto' : ''}`}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            unoptimized
            loading="lazy"
            className="mx-auto h-auto w-full max-w-full"
            style={scrollable ? { minWidth: LEGIBLE_MIN_WIDTH } : undefined}
          />
        </div>
      </div>
      {caption || scrollable ? (
        <figcaption className="mt-3 text-center text-sm text-white/45">
          {caption}
          {scrollable ? (
            <span className="mt-1 block text-xs text-white/30 lg:hidden">
              Scroll the diagram sideways to read it.
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
