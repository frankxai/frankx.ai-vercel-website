'use client'

import FrankOmega from '@/components/FrankOmega'
import { ScrollScene } from '@/components/motion'

export type ContractStage = {
  id: string
  /** Two-digit ordinal in the plugin's handoff chain. */
  index: string
  name: string
  model: string
  /** Paths the stage writes, relative to docs/architecture/. */
  files: string[]
  /** The first condition that halts the stage, verbatim from the agent. */
  stop: string
}

/**
 * TeamSetPiece — the page's single scroll set-piece.
 *
 * The argument it carries: one stated goal produces one artifact set, and every
 * file in it has exactly one author and one condition that stops that author.
 * The seams between stages draw in as the section passes, so the handoff chain
 * is shown by the motion instead of asserted in a caption; the last seam is the
 * verifier's, and it lands in the failed-gate treatment the static DOM already
 * carries — a run that fails verification is the normal case, not the exception.
 * That closing rule is cyan, the far end of the seam gradient, not a warning
 * colour: the page runs on the tech spectrum only, and a failed gate here is a
 * reported state rather than an alarm.
 *
 * FRANK-Ω carries one static caption for the whole scene rather than a caption
 * per beat. A caption that changes as you scroll is animated text, which is the
 * one thing this scene is not allowed to do; one sentence that is true at every
 * beat costs nothing and cannot be caught mid-swap.
 *
 * Nothing containing copy moves. `taste.md` ("No animations on text") and the
 * `ScrollScene` contract both forbid it: the file names, the stop conditions and
 * the captions are already there and stay put. Only the seam geometry is tweened,
 * on `scaleY` and `scaleX` — pure transforms on elements with no text in them.
 *
 * Not pinned. Pinning suits a beat the reader passes through once; this is a file
 * contract they will scan and scroll back to, and a pinned panel would both trap
 * the scroll and hide the list's real length on first sight. Below 768px the
 * timeline is not built at all, and `ScrollScene` already no-ops under
 * `prefers-reduced-motion: reduce`. Because every tween is a `.from()`, the
 * un-animated DOM is the finished composition in both cases.
 */
export default function TeamSetPiece({
  stages,
  fileCount,
  verifierStop,
}: {
  stages: ContractStage[]
  fileCount: number
  verifierStop: string
}) {
  return (
    <ScrollScene
      scrub
      // A span keyed to the section arriving, not to its height: the list is tall,
      // so an end tied to `bottom` would still be drawing seams long after the
      // first rows had scrolled away.
      start="top 85%"
      end="top 15%"
      timeline={(tl, root) => {
        // The narrow-viewport opt-out is decided here rather than in React state:
        // `ScrollScene` builds its timeline once, on mount, so a media query
        // resolved in a later effect would arrive after the scene already exists.
        if (!window.matchMedia('(min-width: 768px)').matches) return

        // Seams only. Every other node in this scene contains copy.
        const seams = root.querySelectorAll('[data-seam]')
        const verdict = root.querySelector('[data-verdict]')

        tl.from(seams, { scaleY: 0, stagger: 0.12, ease: 'none' })
        if (verdict) tl.from(verdict, { scaleX: 0, ease: 'none' }, '>-0.1')
      }}
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <FrankOmega variant="thinking" size="md" speech="One author per file. No exceptions." />
          <p className="mt-6 max-w-sm leading-7 text-slate-300">
            One stated goal goes in. {fileCount} files come out, under{' '}
            <span className="font-mono text-slate-200">docs/architecture/</span> in your own
            repository, and each one has a single author.
          </p>
          <p className="mt-4 max-w-sm leading-7 text-slate-400">
            The last stage is a fresh context that wrote none of them. It re-runs the commands,
            compares what it observes against what was recorded, and has no tool that can edit the
            files it is reviewing.
          </p>
        </div>

        <ol
          className="space-y-0"
          aria-label="The artifact contract, in the order the team writes it"
        >
          {stages.map((stage, i) => {
            const last = i === stages.length - 1
            return (
              <li key={stage.id} className="relative">
                <div className="grid gap-3 py-5 sm:grid-cols-[auto_1fr] sm:gap-6">
                  <span className="font-mono text-xs leading-6 text-emerald-300/80">
                    {stage.index}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-semibold text-white">{stage.name}</h3>
                      <span className="font-mono text-[11px] text-slate-500">{stage.model}</span>
                    </div>
                    <ul className="mt-2.5 space-y-1">
                      {stage.files.map((file) => (
                        <li
                          key={file}
                          className="break-all font-mono text-xs leading-6 text-slate-300"
                        >
                          {file}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2.5 max-w-xl text-sm leading-6 text-slate-500">
                      Stops when: {stage.stop}
                    </p>
                  </div>
                </div>

                {!last ? (
                  <span
                    data-seam
                    aria-hidden="true"
                    className="ml-[7px] block h-5 w-px origin-top bg-gradient-to-b from-emerald-400/50 to-cyan-400/15"
                  />
                ) : null}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-10 lg:ml-auto lg:w-[55%]">
        <span
          data-verdict
          aria-hidden="true"
          className="block h-px w-full origin-left bg-cyan-400/60"
        />
        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-cyan-300">
          Failed gate
        </p>
        <p className="mt-2 max-w-xl leading-7 text-slate-300">{verifierStop}</p>
        <p className="mt-3 max-w-xl leading-7 text-slate-500">
          That is the design. The run stops at the first red gate and hands you the receipt, rather
          than repairing the artifact so the gate can go green.
        </p>
      </div>
    </ScrollScene>
  )
}
