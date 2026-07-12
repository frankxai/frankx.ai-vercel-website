'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  BookOpenText,
  Boxes,
  Headphones,
  HeartHandshake,
  Network,
  PackageOpen,
  type LucideIcon,
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

let pluginsRegistered = false

type PalaceRoute = {
  id: string
  number: string
  label: string
  title: string
  description: string
  href: string
  icon: LucideIcon
  accent: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose' | 'blue'
}

const palaceRoutes: PalaceRoute[] = [
  {
    id: 'listen',
    number: '01',
    label: 'Listen',
    title: 'Begin with sound.',
    description: 'Studio releases, the evolving Suno archive, and the stories behind the music.',
    href: '/music',
    icon: Headphones,
    accent: 'emerald',
  },
  {
    id: 'learn',
    number: '02',
    label: 'Learn',
    title: 'Take the maps.',
    description: 'Field guides for agents, creativity, and a more deliberately designed life.',
    href: '/learn',
    icon: BookOpenText,
    accent: 'cyan',
  },
  {
    id: 'build',
    number: '03',
    label: 'Build',
    title: 'Fork what works.',
    description: 'Open systems, skills, prompts, and workflows you can study and adapt.',
    href: '/acos',
    icon: Boxes,
    accent: 'blue',
  },
  {
    id: 'reflect',
    number: '04',
    label: 'Reflect',
    title: 'Make room for meaning.',
    description: 'Books, questions, recovery, and gentle ways to hear your own life again.',
    href: '/soulbook',
    icon: HeartHandshake,
    accent: 'violet',
  },
  {
    id: 'acquire',
    number: '05',
    label: 'Acquire',
    title: 'Invest in your next capability.',
    description: 'Paid packs and guided systems with clear scope for people ready to go further.',
    href: '/products',
    icon: PackageOpen,
    accent: 'amber',
  },
  {
    id: 'explore',
    number: '06',
    label: 'Explore',
    title: 'See the wider constellation.',
    description: 'The connected worlds, brands, labs, and public experiments around FrankX.',
    href: '/ecosystem',
    icon: Network,
    accent: 'rose',
  },
]

const accentClasses: Record<PalaceRoute['accent'], { icon: string; marker: string; hover: string }> = {
  emerald: {
    icon: 'border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200',
    marker: 'bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,0.45)]',
    hover: 'hover:border-emerald-300/25 focus-visible:ring-emerald-300/60',
  },
  cyan: {
    icon: 'border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-200',
    marker: 'bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.45)]',
    hover: 'hover:border-cyan-300/25 focus-visible:ring-cyan-300/60',
  },
  violet: {
    icon: 'border-violet-300/20 bg-violet-300/[0.07] text-violet-200',
    marker: 'bg-violet-300 shadow-[0_0_20px_rgba(196,181,253,0.42)]',
    hover: 'hover:border-violet-300/25 focus-visible:ring-violet-300/60',
  },
  amber: {
    icon: 'border-amber-300/20 bg-amber-300/[0.07] text-amber-200',
    marker: 'bg-amber-300 shadow-[0_0_20px_rgba(252,211,77,0.42)]',
    hover: 'hover:border-amber-300/25 focus-visible:ring-amber-300/60',
  },
  rose: {
    icon: 'border-rose-300/20 bg-rose-300/[0.07] text-rose-200',
    marker: 'bg-rose-300 shadow-[0_0_20px_rgba(253,164,175,0.4)]',
    hover: 'hover:border-rose-300/25 focus-visible:ring-rose-300/60',
  },
  blue: {
    icon: 'border-blue-300/20 bg-blue-300/[0.07] text-blue-200',
    marker: 'bg-blue-300 shadow-[0_0_20px_rgba(147,197,253,0.42)]',
    hover: 'hover:border-blue-300/25 focus-visible:ring-blue-300/60',
  },
}

export function MindPalaceAtlas() {
  const rootRef = useRef<HTMLElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      if (!pluginsRegistered) {
        gsap.registerPlugin(ScrollTrigger)
        pluginsRegistered = true
      }

      const routes = gsap.utils.toArray<HTMLElement>('[data-palace-route]', root)
      const thread = threadRef.current
      const media = gsap.matchMedia()

      media.add(
        {
          desktop: '(min-width: 1024px)',
          reducedMotion: '(prefers-reduced-motion: reduce)',
          coarsePointer: '(pointer: coarse)',
        },
        (context) => {
          const conditions = context.conditions as {
            desktop: boolean
            reducedMotion: boolean
            coarsePointer: boolean
          }

          if (!conditions.desktop || conditions.reducedMotion || conditions.coarsePointer) {
            gsap.set(routes, { clearProps: 'all' })
            if (thread) gsap.set(thread, { clearProps: 'all' })
            return
          }

          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root,
              start: 'top 18%',
              end: 'bottom 76%',
              scrub: 0.55,
              fastScrollEnd: true,
              preventOverlaps: 'frankx-mind-palace',
              invalidateOnRefresh: true,
            },
          })

          timeline.addLabel('setup')

          if (thread) {
            timeline.fromTo(
              thread,
              { scaleY: 0, transformOrigin: 'top center' },
              { scaleY: 1, duration: 3.25 },
              'setup',
            )
          }

          timeline
            .fromTo(
              routes,
              {
                autoAlpha: 0.14,
                x: (index) => (index % 2 === 0 ? -72 : 72),
                y: 18,
                scale: 0.975,
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 1,
                stagger: 0.42,
                force3D: true,
              },
              'setup',
            )
            .addLabel('claim', 0.7)
            .addLabel('proof', 1.45)
            .addLabel('mechanism', 2.2)
            .addLabel('decision', 2.85)
            .addLabel('hold', 3.25)
        },
      )

      return () => media.revert()
    },
    { scope: rootRef },
  )

  return (
    <section
      ref={rootRef}
      id="mind-palace"
      aria-labelledby="mind-palace-title"
      className="relative border-t border-white/[0.07] py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_78%_18%,rgba(16,185,129,0.08),transparent_34%),radial-gradient(circle_at_25%_48%,rgba(34,211,238,0.055),transparent_28%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <div className="max-w-xl lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs tracking-[0.1em] text-emerald-300/60">
            The mind palace
          </p>
          <h2
            id="mind-palace-title"
            className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl"
          >
            A map, not a maze.
          </h2>
          <p className="mt-6 text-base leading-7 text-white/50 sm:text-lg sm:leading-8">
            FrankX holds music, agent systems, books, experiments, and the notes between them. Choose
            the room that meets you where you are now.
          </p>
          <p className="mt-8 border-l border-emerald-300/25 pl-5 font-serif text-lg italic leading-8 text-white/40">
            Music stays first because feeling is often the shortest path back to attention.
          </p>
          <div className="mt-10 flex items-center gap-3 text-xs leading-6 text-white/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
            Begin anywhere. Every room leads to real work.
          </div>
        </div>

        <div className="relative">
          <div
            ref={threadRef}
            data-palace-thread
            className="absolute bottom-7 left-[22px] top-7 w-px origin-top bg-gradient-to-b from-emerald-300/60 via-cyan-300/30 to-rose-300/20 sm:left-[26px]"
            aria-hidden="true"
          />

          <div className="space-y-4">
            {palaceRoutes.map((route) => {
              const Icon = route.icon
              const accent = accentClasses[route.accent]

              return (
                <Link
                  key={route.id}
                  data-palace-route
                  href={route.href}
                  onClick={() =>
                    trackEvent('frankx_mind_palace_route_selected', {
                      route: route.id,
                      href: route.href,
                      surface: 'homepage_mind_palace',
                    })
                  }
                  className={`group relative grid min-h-[132px] grid-cols-[46px_1fr_auto] items-start gap-4 rounded-[1.5rem] border border-white/[0.075] bg-[#0c0f0e]/90 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition-colors hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b] sm:grid-cols-[54px_1fr_auto] sm:gap-5 sm:p-5 ${accent.hover}`}
                >
                  <div
                    className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl border sm:h-[52px] sm:w-[52px] ${accent.icon}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span
                      className={`absolute -left-[3px] top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${accent.marker}`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0 pt-0.5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono text-[10px] text-white/25">{route.number}</span>
                      <span className="font-mono text-[11px] tracking-[0.08em] text-white/40">
                        {route.label}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
                      {route.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">{route.description}</p>
                  </div>

                  <ArrowUpRight
                    className="mt-1 h-4 w-4 text-white/30 transition-colors group-hover:text-white/70"
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
