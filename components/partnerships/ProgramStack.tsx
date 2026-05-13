import type { Program } from '@/content/partnerships/types'

type ProgramStackProps = {
  programs: Program[]
}

/**
 * Tier 2 — six operating modes for the partnership. Each card:
 * numbered + name + cadence chip + "what it is" + deliverables list +
 * qualitative pricing posture. Pricing posture is qualitative only, never
 * numeric on the public page.
 */
export function ProgramStack({ programs }: ProgramStackProps) {
  return (
    <section
      aria-labelledby="program-stack-heading"
      className="border-t border-white/5 py-24 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Operating modes
          </p>
          <h2
            id="program-stack-heading"
            className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4"
          >
            How the work moves.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Modes stack — a partnership rarely picks just one. Pricing is
            qualitative here; numbers live in the conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {programs.map((program) => (
            <article
              key={program.number}
              className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-emerald-400/70 tracking-wider">
                  0{program.number}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.05] text-white/70 border border-white/[0.08]">
                  {program.cadence}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white tracking-tight mb-2 leading-snug">
                {program.name}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {program.whatItIs}
              </p>

              <div className="mb-4 flex-1">
                <p className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2">
                  Produces
                </p>
                <ul className="space-y-1.5">
                  {program.whatItProduces.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-zinc-300 leading-snug flex gap-2"
                    >
                      <span aria-hidden className="text-emerald-400/50 flex-shrink-0">
                        ·
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <p className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-medium mb-1">
                  Pricing posture
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {program.pricingPosture}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
