import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { WorkingRealityBlock } from '@/content/partnerships/types'

type WorkingRealityProps = {
  blocks: WorkingRealityBlock[]
}

/**
 * Tier 1 — what is already true today. Verifiable facts before any proposal
 * lands. Each row pairs label, detail prose, and optional evidence link.
 * Render is two-column grid on lg, single-column stack on mobile.
 */
export function WorkingReality({ blocks }: WorkingRealityProps) {
  return (
    <section
      aria-labelledby="working-reality-heading"
      className="border-t border-white/5 py-24 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Working reality
          </p>
          <h2
            id="working-reality-heading"
            className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4"
          >
            What I already build with this kind of partner.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Verifiable today. The proposal section below builds from here, not
            in place of it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          {blocks.map((block, i) => (
            <article
              key={i}
              className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 transition-colors hover:bg-white/[0.035] hover:border-white/[0.1]"
            >
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium mb-3">
                {block.label}
              </p>
              <p className="text-base text-zinc-200 leading-relaxed mb-4">
                {block.detail}
              </p>
              {block.evidence ? (
                <Link
                  href={block.evidence.href}
                  target={block.evidence.href.startsWith('http') ? '_blank' : undefined}
                  rel={block.evidence.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 text-sm text-emerald-300 hover:text-emerald-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400/60 rounded"
                >
                  {block.evidence.label}
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
