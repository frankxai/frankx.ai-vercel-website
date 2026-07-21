'use client'

import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface SaveContactButtonProps {
  variant?: 'primary' | 'ghost'
  className?: string
  /** Show a one-line platform-specific hint under the button. */
  showHint?: boolean
}

type Platform = 'ios' | 'android' | 'desktop'

// A .vcf is universal, but the *experience* differs by device: iOS opens the
// contact card straight into Contacts; Android downloads the file to be tapped;
// desktop just saves it. Naming what will happen removes the "did that work?"
// hesitation at the exact moment someone taps at an event.
const PLATFORM_COPY: Record<Platform, { label: string; hint: string }> = {
  ios: {
    label: 'Add to Apple Contacts',
    hint: 'Opens straight into your Contacts — tap Done to save.',
  },
  android: {
    label: 'Save to Contacts',
    hint: 'Downloads a contact card — tap it, then Import to save.',
  },
  desktop: {
    label: 'Download contact card',
    hint: 'Saves a .vcf you can open on your phone or mail client.',
  },
}

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'desktop'
  const ua = navigator.userAgent || ''
  // iPadOS 13+ reports as Mac; the touch-point check catches it.
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (ua.includes('Mac') && navigator.maxTouchPoints > 1)
  if (isIOS) return 'ios'
  if (/Android/.test(ua)) return 'android'
  return 'desktop'
}

export function SaveContactButton({
  variant = 'primary',
  className = '',
  showHint = false,
}: SaveContactButtonProps) {
  // Start neutral so SSR and first client render match (no hydration flash),
  // then specialise once we can read the user agent.
  const [platform, setPlatform] = useState<Platform | null>(null)
  useEffect(() => setPlatform(detectPlatform()), [])

  const copy = platform ? PLATFORM_COPY[platform] : null
  const label = copy?.label ?? 'Save my contact'

  const base = 'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[0.98]'
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 px-6 py-3.5 text-sm text-black shadow-[0_10px_40px_-12px_rgba(16,185,129,0.7)] hover:shadow-[0_14px_50px_-10px_rgba(16,185,129,0.85)] hover:scale-[1.02]'
      : 'border border-white/15 bg-white/5 px-6 py-3.5 text-sm text-white backdrop-blur hover:border-white/30 hover:bg-white/10'

  const button = (
    <a
      href="/api/vcard"
      download="frank-riemer.vcf"
      onClick={() => trackEvent('connect_vcard_downloaded', { source: 'connect_hero', platform: platform ?? 'unknown' })}
      className={`${base} ${styles} ${className}`}
    >
      <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden />
      <span>{label}</span>
    </a>
  )

  if (!showHint) return button

  return (
    <div className="flex flex-col items-start gap-2">
      {button}
      {copy && <p className="text-xs text-white/45">{copy.hint}</p>}
    </div>
  )
}
