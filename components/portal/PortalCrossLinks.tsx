import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { PortalCrossLink } from '@/content/portal/types'

type PortalCrossLinksProps = {
  links: PortalCrossLink[]
}

/**
 * Small link-out grid pointing to the real surfaces this portal touches.
 * Reuses the compact card pattern from components/partnerships/CrossLinkTour.tsx.
 */
export function PortalCrossLinks({ links }: PortalCrossLinksProps) {
  if (!links.length) return null

  return (
    <section className="border-t border-white/5 px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-emerald-200">Where this lives</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
          The surfaces this relationship runs through.
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => {
            const isExternal = link.href.startsWith('http')
            const Component = isExternal ? 'a' : Link
            return (
              <li key={link.surface}>
                <Component
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group block h-full rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition-colors hover:border-emerald-500/20 hover:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400/60">
                      {link.surface}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-emerald-300"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mb-2 text-base font-semibold leading-snug tracking-tight text-white">
                    {link.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{link.rationale}</p>
                </Component>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
