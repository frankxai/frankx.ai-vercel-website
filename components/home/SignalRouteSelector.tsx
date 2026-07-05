'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Building2,
  GitBranch,
  Music,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import { FRANKX_VOICE } from '@/lib/voice/frankx-voice'

type Accent = 'emerald' | 'cyan' | 'amber'

type SignalRoute = {
  id: string
  label: string
  audience: string
  title: string
  description: string
  proof: string
  href: string
  cta: string
  icon: LucideIcon
  accent: Accent
  checks: string[]
}

const routeAccents: Record<
  Accent,
  {
    icon: string
    text: string
    border: string
    surface: string
    rail: string
    focus: string
  }
> = {
  emerald: {
    icon: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20',
    text: 'text-emerald-300',
    border: 'hover:border-emerald-300/35',
    surface: 'from-emerald-500/10 via-transparent to-cyan-500/5',
    rail: 'from-emerald-400 to-cyan-400',
    focus: 'focus-visible:ring-emerald-400/50',
  },
  cyan: {
    icon: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20',
    text: 'text-cyan-300',
    border: 'hover:border-cyan-300/35',
    surface: 'from-cyan-500/10 via-transparent to-emerald-500/5',
    rail: 'from-cyan-400 to-emerald-400',
    focus: 'focus-visible:ring-cyan-400/50',
  },
  amber: {
    icon: 'bg-amber-500/10 text-amber-300 border-amber-400/20',
    text: 'text-amber-300',
    border: 'hover:border-amber-300/35',
    surface: 'from-amber-500/10 via-transparent to-emerald-500/5',
    rail: 'from-amber-300 to-emerald-400',
    focus: 'focus-visible:ring-amber-300/50',
  },
}

const architectureProof = `${FRANKX_VOICE.identity.role}. ${FRANKX_VOICE.identity.disclaimer}`

const signalRoutes: SignalRoute[] = [
  {
    id: 'creator-systems',
    label: 'Creator Systems',
    audience: 'Musicians, creators, and builders turning output into a repeatable release rhythm.',
    title: 'Make the next song, guide, or product shippable.',
    description:
      'Start with the creative operating system: Suno workflows, prompt patterns, launch rituals, and public proof from the studio.',
    proof: '12,000+ AI songs produced with Suno.',
    href: '/products/vibe-os',
    cta: 'Open Vibe OS',
    icon: Music,
    accent: 'emerald',
    checks: ['Suno workflow', 'Prompt library', 'Release ritual'],
  },
  {
    id: 'builder-systems',
    label: 'Builder Systems',
    audience: 'Developers and technical creators who want reusable agents, skills, and productized workflows.',
    title: 'Fork the system behind the work.',
    description:
      'Move from tool experiments to a working creator stack: ACOS, prompts, templates, agent patterns, and build notes.',
    proof: '630+ AI skills shipped across the operating system.',
    href: '/acos',
    cta: 'Explore ACOS',
    icon: Bot,
    accent: 'cyan',
    checks: ['Agent skills', 'Templates', 'Build notes'],
  },
  {
    id: 'architecture-systems',
    label: 'Architecture Systems',
    audience: 'Founders, operators, and teams that need practical AI architecture before they scale.',
    title: 'Design the workflow before the tooling spreads.',
    description:
      'Use the enterprise AI architecture lane for agent workflows, MCP patterns, governance, and production delivery notes.',
    proof: architectureProof,
    href: '/ai-architecture',
    cta: 'Review Architecture',
    icon: Building2,
    accent: 'amber',
    checks: ['Agent workflow', 'MCP patterns', 'Delivery map'],
  },
]

const proofSignals = [
  {
    label: 'Proof',
    value: 'Output before claims',
    detail: 'Songs, repos, guides, and systems stay visible before sales language.',
  },
  {
    label: 'Route',
    value: 'One next move',
    detail: 'Each audience gets one primary path instead of a wall of equal CTAs.',
  },
  {
    label: 'Loop',
    value: 'Build, publish, verify',
    detail: 'The homepage points to assets that can be used, forked, or audited.',
  },
]

export function SignalRouteSelector() {
  return (
    <section
      id="signal-route-selector"
      aria-labelledby="signal-route-selector-title"
      className="relative border-t border-white/5 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/50">
              Signal Router
            </p>
            <h2
              id="signal-route-selector-title"
              className="text-3xl font-bold tracking-tight text-white md:text-4xl"
            >
              Choose the signal, then ship.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/50 md:text-lg">
              FrankX has music, agents, templates, architecture, and field notes. This is the
              front-door decision layer: pick the route that matches the work you want to move
              this week.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {proofSignals.map((signal) => (
              <div
                key={signal.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-[24px] backdrop-saturate-[150%]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
                  {signal.label}
                </p>
                <p className="mt-3 text-sm font-semibold text-white">{signal.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/45">{signal.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {signalRoutes.map((route, index) => {
            const Icon = route.icon
            const accent = routeAccents[route.accent]

            return (
              <article
                key={route.id}
                className={`group relative flex min-h-[420px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] p-5 transition duration-300 backdrop-blur-[28px] backdrop-saturate-[155%] [box-shadow:0_14px_50px_-30px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.055)] hover:-translate-y-0.5 ${accent.border}`}
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${accent.surface} opacity-90`}
                  aria-hidden="true"
                />
                <div
                  className={`pointer-events-none absolute left-5 right-5 top-0 h-px bg-gradient-to-r ${accent.rail} opacity-45`}
                  aria-hidden="true"
                />

                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${accent.icon}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${accent.text}`}>
                      {route.label}
                    </span>
                  </div>

                  <p className="mt-6 min-h-[48px] text-sm leading-relaxed text-white/45">
                    {route.audience}
                  </p>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                    {route.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/52">
                    {route.description}
                  </p>

                  <div className="mt-6 rounded-2xl border border-white/[0.07] bg-[#0a0a0b]/45 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className={`mt-0.5 h-4 w-4 shrink-0 ${accent.text}`} aria-hidden="true" />
                      <p className="text-sm leading-relaxed text-white/62">{route.proof}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {route.checks.map((check) => (
                      <span
                        key={check}
                        className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/45"
                      >
                        {check}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={route.href}
                    onClick={() =>
                      trackEvent('frankx_route_selected', {
                        route: route.id,
                        href: route.href,
                        surface: 'homepage_signal_route_selector',
                      })
                    }
                    className={`mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] ${accent.focus}`}
                  >
                    {route.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-emerald-300/70" aria-hidden="true" />
            <span>Routing contract: creator output, builder systems, team architecture.</span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
            tracked as frankx_route_selected
          </span>
        </div>
      </div>
    </section>
  )
}
