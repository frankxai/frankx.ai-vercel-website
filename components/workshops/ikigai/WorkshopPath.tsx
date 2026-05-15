'use client'

import Link from 'next/link'
import { Sparkles, Users, BookOpen, ArrowRight } from 'lucide-react'

interface PathOption {
  id: string
  badge: string
  title: string
  subtitle: string
  audience: string
  cta: string
  href: string
  primary?: boolean
  icon: typeof Sparkles
  color: 'violet' | 'amber' | 'zinc'
}

const PATHS: PathOption[] = [
  {
    id: 'ai-native',
    badge: 'Recommended',
    title: 'Run it yourself with AI',
    subtitle: 'Six prompts. Your favorite AI assistant. Forty-five focused minutes.',
    audience: 'For self-serve attendees — paste each prompt into ChatGPT, Claude, or Gemini and ship.',
    cta: 'Start the workshop',
    href: '#module-1',
    primary: true,
    icon: Sparkles,
    color: 'violet',
  },
  {
    id: 'live-attendee',
    badge: 'Live workshop',
    title: 'Follow along with Frank',
    subtitle: 'A facilitator runs the deck. You follow along on your phone.',
    audience: 'For workshop attendees — open the prompts here, follow Frank\'s pace.',
    cta: 'View the prompt library',
    href: '#module-1',
    icon: Users,
    color: 'amber',
  },
  {
    id: 'manual',
    badge: 'No AI needed',
    title: 'Use the manual wizards',
    subtitle: 'Browser-based wizard for each module. Saves to your device.',
    audience: 'For attendees without an AI subscription — every module has a manual fallback.',
    cta: 'Open the wizards',
    href: '#module-1',
    icon: BookOpen,
    color: 'zinc',
  },
]

const COLOR_MAP = {
  violet: {
    border: 'border-violet-500/30',
    bg: 'bg-gradient-to-br from-violet-500/[0.08] via-white/[0.02] to-amber-500/[0.04]',
    badge: 'text-violet-300 bg-violet-500/[0.12] border-violet-500/30',
    icon: 'text-violet-300 bg-violet-500/10 border-violet-500/30',
    cta: 'bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 text-white shadow-lg shadow-violet-500/20',
  },
  amber: {
    border: 'border-amber-500/20',
    bg: 'bg-white/[0.02]',
    badge: 'text-amber-300 bg-amber-500/[0.08] border-amber-500/20',
    icon: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
    cta: 'bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.10] text-zinc-200',
  },
  zinc: {
    border: 'border-white/[0.08]',
    bg: 'bg-white/[0.015]',
    badge: 'text-zinc-400 bg-white/[0.04] border-white/[0.08]',
    icon: 'text-zinc-300 bg-white/[0.04] border-white/[0.08]',
    cta: 'bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-zinc-300',
  },
} as const

/**
 * Path-selector for the three user types that land on the workshop:
 *   - Individual doing it self-serve with AI (default / recommended)
 *   - Attendee at a live workshop following along
 *   - Person without an AI subscription using manual wizards
 *
 * Lives right after the hero so visitors aren't dumped into a 7-module
 * page without orientation. Each card anchor-links to #module-1 — the
 * downstream sections serve all three audiences.
 */
export function WorkshopPath() {
  return (
    <section className="pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300 mb-1.5">
            Pick your path
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Three ways to run this workshop
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
            All three paths use the same prompt library below. Pick the one that matches how you want to work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {PATHS.map((p) => {
            const c = COLOR_MAP[p.color]
            const Icon = p.icon
            return (
              <Link
                key={p.id}
                href={p.href}
                className={`group block rounded-3xl border ${c.border} ${c.bg} p-6 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xl ${
                  p.primary ? 'hover:shadow-violet-500/[0.15]' : 'hover:shadow-black/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${c.icon}`}>
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${c.badge}`}>
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{p.subtitle}</p>
                <p className="text-xs text-zinc-500 leading-relaxed mb-5">{p.audience}</p>
                <div
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${c.cta}`}
                >
                  {p.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
