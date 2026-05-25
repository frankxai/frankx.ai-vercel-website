'use client'

import Link from 'next/link'
import { Music4, Workflow, BookOpen, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface FeaturedWork {
  id: 'music-lab' | 'acos' | 'blog'
  title: string
  subtitle: string
  href: string
  icon: LucideIcon
  badge: string
}

const FEATURED: FeaturedWork[] = [
  {
    id: 'music-lab',
    title: 'Music Lab',
    subtitle: '12K+ AI tracks, generative sessions, sonic rituals.',
    href: '/music-lab',
    icon: Music4,
    badge: 'Suno',
  },
  {
    id: 'acos',
    title: 'Agentic Creator OS',
    subtitle: 'The full operating system for AI-native creators and architects.',
    href: '/acos',
    icon: Workflow,
    badge: 'Flagship',
  },
  {
    id: 'blog',
    title: 'Creation Chronicles',
    subtitle: 'Tutorials on AI architecture, music, and shipping at the edge.',
    href: '/blog',
    icon: BookOpen,
    badge: 'Weekly',
  },
]

export function FeaturedWorkGrid() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      {FEATURED.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={() =>
              trackEvent('connect_featured_clicked', { target: item.id, destination: item.href })
            }
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 transition-all hover:border-white/20 hover:from-white/[0.07] hover:to-white/[0.02]"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/80 ring-1 ring-white/10">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/60">
                {item.badge}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <ArrowUpRight className="h-3.5 w-3.5 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80" aria-hidden />
              </div>
              <p className="mt-1 text-xs leading-relaxed text-white/55">{item.subtitle}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
