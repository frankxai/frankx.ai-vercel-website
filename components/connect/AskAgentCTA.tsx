'use client'

import Link from 'next/link'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export function AskAgentCTA({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/agents?from=connect"
      onClick={() => trackEvent('connect_ask_agent_clicked', { source: 'connect_hero' })}
      className={`group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:border-white/30 hover:bg-white/[0.08] ${className}`}
    >
      <Sparkles className="h-4 w-4 text-amber-300" aria-hidden />
      <span>Ask my agent</span>
      <ArrowUpRight className="h-4 w-4 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
    </Link>
  )
}
