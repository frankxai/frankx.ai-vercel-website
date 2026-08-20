'use client'

import { ScrollScene } from '@/components/motion'

export type StackLayer = {
  id: string
  /** Two-digit ordinal, rendered as the plane's label. */
  index: string
  name: string
  /** The one job this plane owns. If you cannot state it in a sentence, the plane is wrong. */
  role: string
  parts: string[]
  /** What crossing the line *into* this plane costs you. Rendered on the boundary rail. */
  boundary: string
}

/**
 * ReferenceStackScene — the pillar guide's single scroll set-piece.
 *
 * Demonstrates rather than decorates: the planes of a production AI system
 * assemble bottom-up as the reader scrolls through the pinned section, so the
 * dependency direction (model access at the base, experience at the top) is
 * carried by the motion itself rather than asserted in a caption.
 *
 * Per `taste.md`: exactly one set-piece per page, transform/opacity only, and a
 * static composition that tells the whole story. `ScrollScene` early-returns
 * under `prefers-reduced-motion: reduce`, and because every tween is a
 * `.from()`, the un-animated DOM *is* the finished diagram — the reduced-motion
 * reader gets the complete stack, not a broken half-state.
 *
 * Deliberately NOT pinned. A pinned panel is right for a narrative beat the reader
 * passes through once; this stack is reference material they will scan, re-read, and
 * scroll back to. Pinning it would trap the scroll on a table and hide its full shape
 * on first sight, so the scene stays in flow and the assembly simply plays as the
 * section passes.
 */
export function ReferenceStackScene({ layers }: { layers: StackLayer[] }) {
  return (
    <ScrollScene
      scrub
      start="top 85%"
      end="bottom 60%"
      timeline={(tl, root) => {
        const planes = root.querySelectorAll('[data-plane]')
        const seams = root.querySelectorAll('[data-seam]')
        const rails = root.querySelectorAll('[data-boundary]')

        // The stack is authored top-down (experience first, model access last), so
        // `from: 'end'` animates the final DOM node first and the foundation
        // therefore assembles before anything that depends on it.
        tl.from(planes, {
          opacity: 0,
          yPercent: 6,
          stagger: { each: 0.14, from: 'end' },
          ease: 'none',
        })
          .from(seams, { scaleY: 0, stagger: { each: 0.14, from: 'end' }, ease: 'none' }, 0.06)
          .from(rails, { opacity: 0, xPercent: -12, stagger: 0.1, ease: 'none' }, 0.3)
      }}
    >
      <ul className="w-full space-y-0" aria-label="Reference architecture planes, experience layer first, model access at the base">
        {layers.map((layer, i) => (
          <li key={layer.id} className="relative">
            <div
              data-plane
              className="surface-2 grid gap-4 rounded-2xl border border-white/[0.08] p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6"
            >
              <span className="font-mono text-xs text-emerald-300/80">{layer.index}</span>

              <div>
                <h3 className="font-semibold text-white">{layer.name}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">{layer.role}</p>
              </div>

              <ul className="flex flex-wrap gap-1.5 sm:justify-end">
                {layer.parts.map((part) => (
                  <li
                    key={part}
                    className="rounded-full border border-white/[0.1] px-2.5 py-1 font-mono text-[11px] text-slate-300"
                  >
                    {part}
                  </li>
                ))}
              </ul>
            </div>

            {i < layers.length - 1 && (
              <div className="flex items-stretch gap-3 pl-5">
                <span
                  data-seam
                  aria-hidden="true"
                  className="my-1 block h-6 w-px origin-top bg-gradient-to-b from-emerald-400/50 to-cyan-400/20"
                />
                <span data-boundary className="self-center font-mono text-[11px] text-slate-500">
                  {layer.boundary}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </ScrollScene>
  )
}

export default ReferenceStackScene
