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
    glow: string
    ctaBg: string
    ctaHover: string
    ctaRing: string
  }
> = {
  top: {
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/[0.06]',
    border: 'border-emerald-500/25',
    hover: 'hover:bg-emerald-500/[0.10]',
    glow: 'from-emerald-500/10',
    ctaBg: 'bg-emerald-500/15 border-emerald-500/35',
    ctaHover: 'hover:bg-emerald-500/25 hover:border-emerald-400/50',
    ctaRing: 'focus-visible:ring-emerald-400/60',
  },
  mid: {
    accent: 'text-cyan-400',
    bg: 'bg-cyan-500/[0.06]',
    border: 'border-cyan-500/25',
    hover: 'hover:bg-cyan-500/[0.10]',
    glow: 'from-cyan-500/10',
    ctaBg: 'bg-cyan-500/15 border-cyan-500/35',
    ctaHover: 'hover:bg-cyan-500/25 hover:border-cyan-400/50',
    ctaRing: 'focus-visible:ring-cyan-400/60',
  },
  bottom: {
    accent: 'text-violet-400',
    bg: 'bg-violet-500/[0.06]',
    border: 'border-violet-500/25',
    hover: 'hover:bg-violet-500/[0.10]',
    glow: 'from-violet-500/10',
    ctaBg: 'bg-violet-500/15 border-violet-500/35',
    ctaHover: 'hover:bg-violet-500/25 hover:border-violet-400/50',
    ctaRing: 'focus-visible:ring-violet-400/60',
  },
  premium: {
    accent: 'text-rose-400',
    bg: 'bg-rose-500/[0.06]',
    border: 'border-rose-500/25',
    hover: 'hover:bg-rose-500/[0.10]',
    glow: 'from-rose-500/10',
    ctaBg: 'bg-rose-500/15 border-rose-500/35',
    ctaHover: 'hover:bg-rose-500/25 hover:border-rose-400/50',
    ctaRing: 'focus-visible:ring-rose-400/60',
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
  const label =
    stage === 'top' ? 'Free resource' :
    stage === 'mid' ? 'Build this live' :
    stage === 'bottom' ? 'Go deeper' :
    'For architects'

  return (
    <aside
      className={`relative my-10 overflow-hidden rounded-2xl border ${c.border} ${c.bg} backdrop-blur-sm p-6 sm:p-8`}
      role="complementary"
      aria-label="Continue reading"
    >
      {/* Subtle top-gradient glow — adds glassmorphic depth without clutter */}
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${c.glow} to-transparent`} />

      <div className="max-w-2xl">
        <p className={`text-xs font-semibold ${c.accent} uppercase tracking-[0.15em] mb-3`}>
          {label}
        </p>
        <h3 className="text-xl font-semibold text-white mb-2.5 tracking-tight leading-snug">{headline}</h3>
        <p className="text-sm text-white/55 leading-relaxed mb-6">{subhead}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={href}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${c.ctaBg} ${c.ctaHover} ${c.accent} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${c.ctaRing}`}
          >
            {ctaText}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          {secondaryHref && secondaryText && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm text-white/45 hover:text-white/70 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
