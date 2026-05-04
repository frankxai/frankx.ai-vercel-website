/**
 * /papa/ shared shell — header, draft banner, footer.
 *
 * Editorial register (Source Serif 4 via the contemplative-rails fonts) +
 * soul-amber accents instead of the rails' cream. Dark void foundation
 * matches the rest of the site.
 *
 * Per Starlight Board verdict 2026-05-05, draft sections render the
 * `<DraftBanner />` until family witness clears the noindex gate.
 */

import Link from 'next/link'
import type { ReactNode } from 'react'

interface PapaShellProps {
  children: ReactNode
  /** When true, renders the noindex draft banner across the top */
  draft?: boolean
  /** Language of the current page — affects banner copy and switcher highlight */
  lang?: 'de' | 'en' | 'ru'
}

const bannerCopy = {
  de: {
    label: 'Entwurf',
    body:
      'Diese Seite wird mit der Familie verfeinert. Lesen ist willkommen — bitte erst nach Familienfreigabe teilen.',
  },
  en: {
    label: 'Draft',
    body:
      'This page is being refined with the family. Read freely — please do not share until family review clears.',
  },
  ru: {
    label: 'Черновик',
    body:
      'Эта страница дорабатывается с семьёй. Читайте свободно — не делитесь до согласования с семьёй.',
  },
}

const switcherLabels = { de: 'Deutsch', en: 'English', ru: 'Русский' }
const switcherHrefs = { de: '/papa', en: '/papa/en', ru: '/papa/ru' }

export function DraftBanner({ lang = 'de' }: { lang?: 'de' | 'en' | 'ru' }) {
  const copy = bannerCopy[lang]
  return (
    <div
      role="status"
      className="border-b border-amber-500/20 bg-amber-500/[0.06]"
    >
      <div className="mx-auto flex max-w-3xl items-start gap-3 px-6 py-3 text-sm">
        <span className="mt-0.5 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.2em] text-amber-300">
          {copy.label}
        </span>
        <p className="leading-relaxed text-amber-100/80">{copy.body}</p>
      </div>
    </div>
  )
}

export function LanguageSwitcher({ active }: { active: 'de' | 'en' | 'ru' }) {
  return (
    <nav aria-label="Sprache" className="flex items-center gap-3 text-xs">
      {(['de', 'en', 'ru'] as const).map((l) => (
        <Link
          key={l}
          href={switcherHrefs[l]}
          aria-current={active === l ? 'page' : undefined}
          className={
            active === l
              ? 'font-medium text-amber-300/90'
              : 'text-white/40 transition-colors hover:text-amber-300/70'
          }
        >
          {switcherLabels[l]}
        </Link>
      ))}
    </nav>
  )
}

export function PapaFooter({ lang = 'de' }: { lang?: 'de' | 'en' | 'ru' }) {
  const copy = {
    de: {
      built: 'Mit Liebe gebaut von Frank in Amsterdam — für Papa.',
      links: [
        { href: '/papa', label: 'Papa' },
        { href: '/familie', label: 'Familie' },
        { href: '/familie/stammbaum', label: 'Stammbaum' },
        { href: '/opa-und-oma', label: 'Opa & Oma' },
        { href: '/lebensbaum', label: 'Lebensbaum' },
      ],
    },
    en: {
      built: 'Built with love by Frank in Amsterdam — for Papa.',
      links: [
        { href: '/papa/en', label: 'Papa (EN)' },
        { href: '/papa', label: 'Deutsch' },
        { href: '/family', label: 'Family' },
        { href: '/familie/stammbaum', label: 'Family Tree' },
      ],
    },
    ru: {
      built: 'Создано с любовью Франком в Амстердаме — для Папы.',
      links: [
        { href: '/papa', label: 'Deutsch' },
        { href: '/papa/en', label: 'English' },
      ],
    },
  }[lang]

  return (
    <footer className="border-t border-white/5 bg-black/30">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-center text-sm text-white/40">{copy.built}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {copy.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-white/30 transition-colors hover:text-amber-300/70"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <LanguageSwitcher active={lang} />
        </div>
      </div>
    </footer>
  )
}

export default function PapaShell({ children, draft, lang = 'de' }: PapaShellProps) {
  return (
    <main className="min-h-screen bg-[#0a0a0b] font-serif-editorial text-white/80">
      {draft ? <DraftBanner lang={lang} /> : null}
      {children}
      <PapaFooter lang={lang} />
    </main>
  )
}
