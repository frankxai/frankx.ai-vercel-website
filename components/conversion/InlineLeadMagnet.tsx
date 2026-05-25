'use client'

import { ArrowRight, Mail } from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'
import { trackEvent } from '@/lib/analytics'

type Variant = 'banner' | 'card' | 'inline'

interface InlineLeadMagnetProps {
  variant?: Variant
  headline?: string
  description?: string
  listType?: 'newsletter' | 'ai-architect' | 'arcanea' | 'investor' | 'all'
  className?: string
}

export function InlineLeadMagnet({
  variant = 'banner',
  headline = 'Get weekly AI insights',
  description = 'Practical tutorials on AI architecture, music production, and creator tools. No spam.',
  listType = 'newsletter',
  className = '',
}: InlineLeadMagnetProps) {
  const handleFocus = () => {
    trackEvent('lead_magnet_focus', { variant, listType })
  }

  if (variant === 'inline') {
    return (
      <div
        className={`my-8 rounded-xl border border-white/10 bg-white/[0.03] p-5 ${className}`}
        onFocus={handleFocus}
      >
        <div className="flex items-start gap-3 mb-3">
          <Mail className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm font-medium text-white">{headline}</p>
        </div>
        <div className="max-w-sm">
          <EmailSignup
            listType={listType}
            placeholder="your@email.com"
            buttonText="Subscribe"
            compact
          />
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div
        className={`rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 ${className}`}
        onFocus={handleFocus}
      >
        <Mail className="w-5 h-5 text-emerald-400 mb-3" />
        <h3 className="text-base font-semibold text-white mb-1">{headline}</h3>
        <p className="text-sm text-white/50 mb-4">{description}</p>
        <EmailSignup
          listType={listType}
          placeholder="your@email.com"
          buttonText="Subscribe"
          compact
        />
      </div>
    )
  }

  // banner (default) — full-width
  return (
    <div
      className={`relative rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5 p-6 md:p-8 ${className}`}
      onFocus={handleFocus}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{headline}</h3>
          <p className="text-sm text-white/50">{description}</p>
        </div>
        <div className="w-full md:w-auto md:min-w-[280px]">
          <EmailSignup
            listType={listType}
            placeholder="your@email.com"
            buttonText="Subscribe"
            compact
          />
        </div>
      </div>
    </div>
  )
}
