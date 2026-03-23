'use client'

import Link from 'next/link'

interface LanguageSwitcherProps {
  currentLang: 'en' | 'de'
  enHref: string
  deHref: string
}

export function LanguageSwitcher({
  currentLang,
  enHref,
  deHref,
}: LanguageSwitcherProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md px-3 py-1.5 text-xs tracking-wider">
      <Link
        href={enHref}
        className={`px-2 py-0.5 rounded-full transition-all duration-300 ${
          currentLang === 'en'
            ? 'bg-white/10 text-white/80'
            : 'text-white/30 hover:text-white/60'
        }`}
      >
        EN
      </Link>
      <span className="text-white/15">|</span>
      <Link
        href={deHref}
        className={`px-2 py-0.5 rounded-full transition-all duration-300 ${
          currentLang === 'de'
            ? 'bg-white/10 text-white/80'
            : 'text-white/30 hover:text-white/60'
        }`}
      >
        DE
      </Link>
    </div>
  )
}
