'use client'

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Auto-generated "On this page" table of contents.
 *
 * Reads the rendered article headings on mount (MDX headings have no ids by
 * default), assigns stable ids, tracks the active section with an
 * IntersectionObserver, and smooth-scrolls on click. Hidden for short posts.
 */
export default function TableOfContents({ selector = '.article-prose' }: { selector?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const root = document.querySelector(selector)
    if (!root) return

    const els = Array.from(root.querySelectorAll('h2, h3')) as HTMLElement[]
    const used = new Set<string>()
    const collected: Heading[] = els.map((el) => {
      let id = el.id || slugify(el.textContent || '')
      if (!id) id = 'section'
      while (used.has(id)) id = `${id}-1`
      used.add(id)
      if (!el.id) el.id = id
      el.style.scrollMarginTop = '96px'
      return { id, text: el.textContent || '', level: el.tagName === 'H3' ? 3 : 2 }
    })
    setHeadings(collected)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive((entry.target as HTMLElement).id)
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [selector])

  // Don't clutter short posts with a TOC.
  if (headings.length < 3) return null

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm"
    >
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        <List className="h-3.5 w-3.5" /> On this page
      </div>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'ml-3' : ''}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
                history.replaceState(null, '', `#${h.id}`)
              }}
              className={`block text-sm leading-snug transition-colors ${
                active === h.id ? 'text-emerald-400' : 'text-white/55 hover:text-white/80'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
