'use client'

import { useEffect, useState } from 'react'

/**
 * Sticky vertical kanji-outline rail for the canonical ikigai workshop.
 *
 * Fixed at the left edge of the viewport on lg+ screens; hidden on smaller
 * widths so the page stays clean on mobile and tablet. Lists the 7 V9
 * modules as single-character kanji with romaji + tiny English labels.
 * Active state advances as the corresponding section scrolls into view
 * (IntersectionObserver, ratio ≥ 0.25).
 *
 * Quiet by default (opacity 40), full opacity on hover or when the module
 * is the active section. Each entry is a click-to-scroll anchor link.
 *
 * Lives only on the canonical page — V1 archive uses its own layout.
 */

interface ModuleEntry {
  n: number
  id: string
  kanji: string
  romaji: string
  label: string
}

const MODULES: ModuleEntry[] = [
  { n: 1, id: 'module-1', kanji: '観', romaji: 'kan', label: 'Audience' },
  { n: 2, id: 'module-2', kanji: '角', romaji: 'kaku', label: 'Angle' },
  { n: 3, id: 'module-3', kanji: '鉤', romaji: 'kagi', label: 'Hooks' },
  { n: 4, id: 'module-4', kanji: '暦', romaji: 'koyomi', label: 'Plan' },
  { n: 5, id: 'module-5', kanji: '出', romaji: 'shutsu', label: 'Publish' },
  { n: 6, id: 'module-6', kanji: '像', romaji: 'zō', label: 'Visual' },
  { n: 7, id: 'module-7', kanji: '伴', romaji: 'han', label: 'Partner' },
]

export function ModuleOutlineRail() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [heroOut, setHeroOut] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Fade rail in once the hero has scrolled out of view
    const hero = document.getElementById('intro')
    const heroObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => setHeroOut(!e.isIntersecting)),
      { threshold: 0.1 },
    )
    if (hero) heroObserver.observe(hero)

    // Track which module section is active
    const observers: IntersectionObserver[] = []
    MODULES.forEach((m) => {
      const el = document.getElementById(m.id)
      if (!el) return
      const o = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
              setActiveId(m.id)
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

  return (
    <aside
      aria-label="Workshop module outline"
      className={`hidden lg:flex fixed left-5 xl:left-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-1.5 print:hidden transition-opacity duration-500 ${
        heroOut ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {MODULES.map((m) => {
        const isActive = activeId === m.id
        return (
          <a
            key={m.id}
            href={`#${m.id}`}
            aria-label={`Jump to module ${m.n} — ${m.label}`}
            className={`group block px-1.5 py-1 rounded-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] ${
              isActive ? 'opacity-100' : 'opacity-35 hover:opacity-100'
            }`}
          >
            <div className="flex items-baseline gap-2">
              <span
                className={`text-[28px] leading-none [font-family:var(--font-jp-serif)] transition-colors ${
                  isActive ? 'text-violet-200' : 'text-white/85 group-hover:text-white'
                }`}
                style={{ fontWeight: 300 }}
                aria-hidden="true"
              >
                {m.kanji}
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                  {m.romaji}
                </span>
                <span className="text-[11px] font-medium text-zinc-300 mt-0.5">
                  {m.label}
                </span>
              </div>
            </div>
          </a>
        )
      })}
    </aside>
  )
}
