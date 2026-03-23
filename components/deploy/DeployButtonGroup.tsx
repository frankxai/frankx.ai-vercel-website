'use client'

import { ExternalLink, Train, Triangle, Workflow, Github } from 'lucide-react'
import type { DeployTarget } from '@/types/affiliates'

// ── Platform Config ─────────────────────────────────────────────────────────

const platformMeta: Record<string, {
  icon: React.ComponentType<{ className?: string }>
  color: string
  bg: string
  border: string
  hoverBg: string
}> = {
  railway: {
    icon: Train,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    hoverBg: 'hover:bg-purple-500/20',
  },
  vercel: {
    icon: Triangle,
    color: 'text-white',
    bg: 'bg-white/10',
    border: 'border-white/20',
    hoverBg: 'hover:bg-white/20',
  },
  n8n: {
    icon: Workflow,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    hoverBg: 'hover:bg-orange-500/20',
  },
}

// ── Affiliate URL Builder ───────────────────────────────────────────────────

function buildTrackedUrl(target: DeployTarget): string {
  const url = new URL(target.deployUrl)
  const refCode = typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_RAILWAY_REFERRAL_CODE
    : undefined

  if (target.platform === 'railway' && refCode) {
    url.searchParams.set('referralCode', refCode)
  }

  // UTM tracking for all platforms
  url.searchParams.set('utm_source', 'frankx.ai')
  url.searchParams.set('utm_medium', 'deploy-button')
  url.searchParams.set('utm_campaign', 'blueprint')

  return url.toString()
}

// ── Analytics Event ─────────────────────────────────────────────────────────

function trackDeployClick(platform: string, blueprintSlug: string) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtagFn = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag
    gtagFn('event', 'deploy_click', {
      event_category: 'monetization',
      event_label: `${platform}:${blueprintSlug}`,
      platform,
      blueprint: blueprintSlug,
    })
  }
}

// ── Component ───────────────────────────────────────────────────────────────

interface DeployButtonGroupProps {
  targets: DeployTarget[]
  blueprintSlug: string
  githubTemplateUrl?: string
  purchaseUrl?: string
  className?: string
}

export function DeployButtonGroup({
  targets,
  blueprintSlug,
  githubTemplateUrl,
  purchaseUrl,
  className = '',
}: DeployButtonGroupProps) {
  if (targets.length === 0) return null

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
        Deploy This Architecture
      </h3>

      <div className="flex flex-wrap gap-3">
        {targets.map((target) => {
          const meta = platformMeta[target.platform]
          if (!meta) return null

          const Icon = meta.icon
          const variant = target.variant || 'outline'

          return (
            <a
              key={`${target.platform}-${target.label}`}
              href={buildTrackedUrl(target)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDeployClick(target.platform, blueprintSlug)}
              className={`
                group inline-flex items-center gap-2 rounded-lg border px-4 py-2.5
                text-sm font-medium transition-all duration-200
                ${variant === 'primary'
                  ? `${meta.bg} ${meta.border} ${meta.color} ${meta.hoverBg} hover:-translate-y-0.5`
                  : variant === 'secondary'
                    ? `${meta.bg} ${meta.border} ${meta.color} ${meta.hoverBg}`
                    : `border-white/10 text-slate-400 hover:border-white/20 hover:text-white`
                }
              `}
            >
              <Icon className="h-4 w-4" />
              {target.label}
              <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
            </a>
          )
        })}

        {githubTemplateUrl && (
          <a
            href={githubTemplateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDeployClick('github', blueprintSlug)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-400 transition-all hover:border-white/20 hover:text-white"
          >
            <Github className="h-4 w-4" />
            View on GitHub
            <ExternalLink className="h-3 w-3 opacity-50" />
          </a>
        )}
      </div>

      {purchaseUrl && (
        <a
          href={purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25"
        >
          Get Pro Template
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}

      <p className="text-[11px] text-slate-600">
        Some links are affiliate partnerships. See{' '}
        <a href="/affiliates" className="underline hover:text-slate-400">disclosure</a>.
      </p>
    </div>
  )
}
