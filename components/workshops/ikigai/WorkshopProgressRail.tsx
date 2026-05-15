'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

interface ProgressSection {
  id: string
  label: string
  minutes: number
}

const SECTIONS: ProgressSection[] = [
  { id: 'module-1', label: 'Map', minutes: 15 },
  { id: 'synthesis', label: 'Statement', minutes: 10 },
  { id: 'brand-bridge', label: 'Brand', minutes: 10 },
  { id: 'content-plan', label: 'Plan', minutes: 12 },
  { id: 'gencreator-stack', label: 'Stack', minutes: 8 },
  { id: 'activation', label: 'Ship', minutes: 5 },
]

/**
 * Sticky progress rail that tracks which module the user is currently
 * viewing. Activates after scrolling past the hero. Hides on print.
 *
 * UX intent: a 7-module page feels long. The rail makes progress
 * legible — attendees see "you are on Map · 4 of 6 sections left" and
 * the workshop feels finite instead of endless.
 */
export function WorkshopProgressRail() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Hide when hero is in view; show once scrolled past
    const hero = document.getElementById('intro')
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setVisible(!e.isIntersecting))
      },
      { threshold: 0.1 },
    )
    if (hero) heroObserver.observe(hero)

    // Section tracking
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (!el) return
      const o = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
              setActiveId(s.id)
            }
          })
        },
        { threshold: [0.25, 0.5] },
      )
      o.observe(el)
      observers.push(o)
    })

    return () => {
      heroObserver.disconnect()
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  if (!visible) return null

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeId)
  const safeIndex = activeIndex < 0 ? 0 : activeIndex
  const progress = ((safeIndex + 1) / SECTIONS.length) * 100

  return (
    <div className="fixed top-4 inset-x-4 z-40 flex justify-center pointer-events-none print:hidden">
      <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.10] bg-[#0a0a0b]/85 backdrop-blur-xl shadow-2xl shadow-black/40">
        <Sparkles className="w-3.5 h-3.5 text-violet-300 flex-shrink-0" />
        <span className="text-xs font-medium text-white whitespace-nowrap">
          {SECTIONS[safeIndex]?.label || 'Start'}
        </span>
        <span className="text-[10px] text-zinc-500 tabular-nums whitespace-nowrap">
          · {safeIndex + 1}/{SECTIONS.length}
        </span>
        <div className="w-12 sm:w-20 h-1 rounded-full bg-white/[0.08] overflow-hidden flex-shrink-0">
          <div
            className="h-full bg-gradient-to-r from-violet-400 to-amber-400 transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <Link
          href="#activation"
          className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400 hover:text-white transition-colors px-1.5 py-0.5"
        >
          Skip to ship
          <ArrowRight className="w-2.5 h-2.5" />
        </Link>
      </div>
    </div>
  )
}
