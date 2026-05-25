'use client'

import { Download } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface SaveContactButtonProps {
  variant?: 'primary' | 'ghost'
  className?: string
}

export function SaveContactButton({ variant = 'primary', className = '' }: SaveContactButtonProps) {
  const base = 'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[0.98]'
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 px-6 py-3.5 text-sm text-black shadow-[0_10px_40px_-12px_rgba(16,185,129,0.7)] hover:shadow-[0_14px_50px_-10px_rgba(16,185,129,0.85)] hover:scale-[1.02]'
      : 'border border-white/15 bg-white/5 px-6 py-3.5 text-sm text-white backdrop-blur hover:border-white/30 hover:bg-white/10'

  return (
    <a
      href="/api/vcard"
      download="frank-riemer.vcf"
      onClick={() => trackEvent('connect_vcard_downloaded', { source: 'connect_hero' })}
      className={`${base} ${styles} ${className}`}
    >
      <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden />
      <span>Save my contact</span>
    </a>
  )
}
