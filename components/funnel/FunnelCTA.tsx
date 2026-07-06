import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Stage = 'top' | 'mid' | 'bottom' | 'premium'

const STAGE_CONFIG: Record<
  Stage,
  {
    accent: string
    bg: string
    border: string
    hover: string
  }
> = {
  top: {
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/[0.04]',
    border: 'border-emerald-500/20',
    hover: 'hover:bg-emerald-500/[0.08]',
  },
  mid: {
    accent: 'text-cyan-400',
    bg: 'bg-cyan-500/[0.04]',
    border: 'border-cyan-500/20',
    hover: 'hover:bg-cyan-500/[0.08]',
  },
  bottom: {
    accent: 'text-violet-400',
    bg: 'bg-violet-500/[0.04]',
    border: 'border-violet-500/20',
    hover: 'hover:bg-violet-500/[0.08]',
  },
  premium: {
    accent: 'text-rose-400',
    bg: 'bg-rose-500/[0.04]',
    border: 'border-rose-500/20',
    hover: 'hover:bg-rose-500/[0.08]',
  },
}

/**
 * FunnelCTA — drop into any blog or guide to route readers based on intent stage.
 *
 * Top-of-funnel = free Primer. Mid = €7 Pack. Bottom = €197 Toolkit. Premium = Architect.
 *
 * Restraint matters more than urgency. One clear path forward — no manipulative timers
 * or fake scarcity. Specificity in the headline + one named artifact = trust.
 */
export function FunnelCTA({
  stage,
  headline,
  subhead,
  href,
  ctaText,
  secondaryHref,
  secondaryText,
}: {
  stage: Stage
  headline: string
  subhead: string
  href: string
  ctaText: string
  secondaryHref?: string
  secondaryText?: string
}) {
  const c = STAGE_CONFIG[stage]
  return (
    <aside
      className={`my-10 rounded-2xl border ${c.border} ${c.bg} p-6 sm:p-8`}
      role="complementary"
      aria-label="Continue reading"
    >
      <div className="max-w-2xl">
        <p className={`text-xs font-medium ${c.accent} uppercase tracking-wider mb-2`}>
          {stage === 'top' && 'Free resource'}
          {stage === 'mid' && 'Build this live'}
          {stage === 'bottom' && 'Go deeper'}
          {stage === 'premium' && 'For architects'}
        </p>
        <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">{headline}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed mb-5">{subhead}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={href}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${c.bg} ${c.hover} border ${c.border} ${c.accent}`}
          >
            {ctaText}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {secondaryHref && secondaryText && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
