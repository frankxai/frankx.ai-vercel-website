'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface LanguageBannerProps {
  targetHref: string
  targetLang: string
  message: string
  linkText: string
}

export function LanguageBanner({
  targetHref,
  targetLang,
  message,
  linkText,
}: LanguageBannerProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find((c) => c.startsWith('x-show-lang-banner='))
    if (cookie?.endsWith(targetLang)) {
      setVisible(true)
    }
  }, [targetLang])

  function dismiss() {
    setVisible(false)
    document.cookie = 'lang-pref=en; path=/; max-age=31536000'
    document.cookie =
      'x-show-lang-banner=; path=/; max-age=0'
  }

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-3 bg-rose-950/80 backdrop-blur-sm border-b border-rose-400/10 px-4 py-2.5 text-sm text-rose-200/70">
      <span>{message}</span>
      <Link
        href={targetHref}
        className="underline underline-offset-2 text-rose-200/90 hover:text-white transition-colors"
      >
        {linkText}
      </Link>
      <button
        onClick={dismiss}
        className="ml-2 text-rose-200/40 hover:text-rose-200/70 transition-colors"
        aria-label="Dismiss"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}
