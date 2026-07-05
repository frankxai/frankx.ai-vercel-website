'use client'

import Link from 'next/link'
import { ExternalLink, ArrowUp, Mail } from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'
import Image from 'next/image'
import { socialLinks } from '@/lib/social-links'

function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 transition-colors"
      aria-label="Back to top"
    >
      <ArrowUp className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
      Top
    </button>
  )
}

const NAV_COLUMNS = [
  {
    label: 'Music',
    links: [
      { label: 'Music Showcase', href: '/music' },
      { label: 'Music Lab', href: '/music-lab' },
      { label: 'Vibe OS', href: '/products/vibe-os' },
      { label: 'Suno Profile', href: socialLinks.suno, external: true },
    ],
  },
  {
    label: 'Create',
    links: [
      { label: 'GenCreator Hub', href: '/gencreator' },
      { label: 'Prompt Library', href: '/prompt-library' },
      { label: 'ACOS', href: '/acos' },
      { label: 'Templates', href: '/templates' },
      { label: 'Creation Chronicles', href: '/creation-chronicles' },
      { label: 'GenCreator.AI', href: 'https://gencreator.ai', external: true, accent: 'emerald' },
    ],
  },
  {
    label: 'Learn',
    links: [
      { label: 'Courses', href: '/courses' },
      { label: 'Guides', href: '/guides' },
      { label: 'Books', href: '/books' },
      { label: 'Library', href: '/library' },
      { label: 'Games Lab', href: '/games' },
      { label: 'Watch', href: '/watch' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    label: 'Build',
    links: [
      { label: 'Architecture Hub', href: '/ai-architecture' },
      { label: 'Blueprints', href: '/ai-architecture/blueprints' },
      { label: 'AI World', href: '/ai-world' },
      { label: 'Research Hub', href: '/research' },
      { label: 'Products', href: '/products' },
    ],
  },
  {
    label: 'Work with me',
    links: [
      { label: 'Start Here', href: '/start' },
      { label: 'Foundry', href: '/foundry', accent: 'emerald' },
      { label: "Founder's Circle", href: '/founders-circle', accent: 'rose' },
      { label: 'Coaching', href: '/coaching' },
      { label: 'Licensing', href: '/licensing' },
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
] as const

type NavLink = {
  label: string
  href: string
  external?: boolean
  accent?: 'emerald' | 'rose'
}

function FooterLink({ link }: { link: NavLink }) {
  const base = 'transition-colors hover:text-white'
  const color =
    link.accent === 'emerald'
      ? 'text-emerald-400/70 hover:text-emerald-300'
      : link.accent === 'rose'
        ? 'text-rose-400/70 hover:text-rose-300'
        : 'text-white/40'

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${color} inline-flex items-center gap-1`}
      >
        {link.label}
        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
      </a>
    )
  }
  return (
    <Link href={link.href} className={`${base} ${color}`}>
      {link.label}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer
      className="relative border-t border-white/5 bg-[#0a0a0b] text-white overflow-hidden"
      aria-label="Site footer"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">

        {/* Main grid */}
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group">
              <Image
                src="/images/mascot/axi-v3-icon.png"
                alt="Axi — FrankX mascot"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <div>
                <span className="block text-base sm:text-lg font-semibold text-white">FrankX.AI</span>
                <span className="block text-[10px] sm:text-xs text-white/55">AI Systems &amp; Music</span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xs">
              AI architect by day. Music creator by night.
              Building systems, making music, sharing everything.
            </p>
            {/* Email — direct contact signal */}
            <a
              href="mailto:hello@frankx.ai"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3" />
              hello@frankx.ai
            </a>
            {/* Social links */}
            <nav aria-label="Social profiles" className="mt-4 sm:mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {[
                { label: 'LinkedIn', href: socialLinks.linkedin },
                { label: 'GitHub', href: socialLinks.github },
                { label: 'Suno', href: socialLinks.suno },
                { label: 'X', href: socialLinks.twitter },
                { label: 'YouTube', href: socialLinks.youtube },
                { label: 'Instagram', href: socialLinks.instagram },
              ].map((s, i, arr) => (
                <span key={s.label} className="inline-flex items-center gap-x-3">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/50 hover:text-white transition-colors"
                  >
                    {s.label}
                  </a>
                  {i < arr.length - 1 && <span className="text-white/15" aria-hidden>·</span>}
                </span>
              ))}
            </nav>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => (
            <nav key={col.label} aria-label={col.label}>
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/50 mb-3 sm:mb-4">
                {col.label}
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link as NavLink} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="relative mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/5">
          <div
            className="absolute inset-0 -mx-4 sm:-mx-6 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-transparent to-violet-950/20 pointer-events-none"
            aria-hidden
          />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">Weekly dispatch — AI architecture &amp; creative systems</p>
              <p className="text-xs text-white/40 mt-0.5">One email per week. No fluff. Unsubscribe anytime.</p>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[300px]">
              <EmailSignup listType="newsletter" placeholder="your@email.com" buttonText="Subscribe" compact />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>&copy; {new Date().getFullYear()} Frank Riemer. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1" aria-label="Legal">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span className="text-white/20" aria-hidden>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span className="text-white/20" aria-hidden>·</span>
            <Link href="/legal" className="hover:text-white transition-colors">Legal</Link>
            <span className="text-white/20" aria-hidden>·</span>
            <Link href="/licensing" className="hover:text-white transition-colors">Licensing</Link>
            <span className="text-white/20" aria-hidden>·</span>
            <a href="/rss.xml" className="hover:text-white transition-colors" aria-label="RSS feed">RSS</a>
          </nav>
          <BackToTop />
        </div>

      </div>
    </footer>
  )
}
