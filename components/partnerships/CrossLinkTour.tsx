import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { CrossLink } from '@/content/partnerships/types'

type CrossLinkTourProps = {
  links: CrossLink[]
}

/**
 * Tier 2 — the proof-of-tour. Each card links into a working surface that
 * compounds the partnership. The rationale tells the reader why this surface
 * matters to THIS partnership, not a generic blurb.
 */
export function CrossLinkTour({ links }: CrossLinkTourProps) {
  return (
    <section
      aria-labelledby="cross-link-tour-heading"
      className="border-t border-white/5 py-24 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Where this lives
          </p>
          <h2
            id="cross-link-tour-heading"
            className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4"
          >
            The surfaces this partnership runs through.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Each link goes to a working part of frankx.ai. None of these are
            mockups.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {links.map((link) => {
            const isExternal = link.href.startsWith('http')
            return (
              <li key={link.surface}>
                <Link
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group block h-full rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 transition-colors hover:bg-white/[0.04] hover:border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium">
                      {link.surface}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-zinc-500 group-hover:text-emerald-300 transition-colors"
                      aria-hidden
                    />
                  </div>
                  <h3 className="text-base font-semibold text-white tracking-tight mb-2 leading-snug">
                    {link.label}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {link.rationale}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
