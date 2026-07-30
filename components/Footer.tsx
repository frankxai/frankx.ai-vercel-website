'use client'

import Link from 'next/link'
import { ArrowUp, ExternalLink, Mail } from 'lucide-react'
import { socialLinks } from '@/lib/social-links'

function BackToTop() {
  const scrollToTop = () => {
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group flex min-h-10 items-center gap-1.5 text-xs text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      aria-label="Back to top"
    >
      <ArrowUp
        className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 motion-reduce:transform-none"
        aria-hidden="true"
      />
      Top
    </button>
  )
}

const NAV_COLUMNS = [
  {
    label: 'Systems',
    links: [
      { label: 'Start by current state', href: '/start' },
      { label: 'AI Architecture', href: '/ai-architecture' },
      { label: 'Work with Frank', href: '/work-with-me' },
      { label: 'Build release status', href: '/build' },
    ],
  },
  {
    label: 'Writing',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Journal', href: '/journal' },
      { label: 'MVU field journal', href: '/mvu' },
      { label: 'Research', href: '/research' },
    ],
  },
  {
    label: 'Studio',
    links: [
      { label: 'GenCreator', href: '/gencreator' },
      { label: 'Music', href: '/music' },
      { label: 'About Frank', href: '/frank-riemer' },
      { label: 'Contact', href: '/contact' },
    ],
  },
] as const

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: socialLinks.linkedin },
  { label: 'GitHub', href: socialLinks.github },
  { label: 'Suno', href: socialLinks.suno },
  { label: 'X', href: socialLinks.twitter },
  { label: 'YouTube', href: socialLinks.youtube },
] as const

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 bg-[#08090a] text-white"
      aria-label="Site footer"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_18%_0%,rgba(16,185,129,0.08),transparent_34%),radial-gradient(circle_at_78%_0%,rgba(34,211,238,0.05),transparent_30%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1.75fr] lg:gap-20">
          <div>
            <Link
              href="/"
              className="inline-flex rounded-sm text-xl font-semibold tracking-[-0.02em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              FrankX.AI
            </Link>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200">
              Agentic systems and field notes
            </p>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/75">
              Frank Riemer maps founder-routed work and builds bounded agent systems with explicit
              human control.
            </p>
            <a
              href="mailto:frank@frankx.ai"
              className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              frank@frankx.ai
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {NAV_COLUMNS.map((column) => (
              <nav key={column.label} aria-label={`${column.label} links`}>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                  {column.label}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-7">
          <nav aria-label="Social profiles" className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1.5 text-xs text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                {link.label}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Frank Riemer. All rights reserved.</p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Legal">
            <Link href="/privacy" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
              Terms
            </Link>
            <Link href="/legal" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
              Legal
            </Link>
            <a href="/rss.xml" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
              RSS
            </a>
          </nav>
          <BackToTop />
        </div>
      </div>
    </footer>
  )
}
