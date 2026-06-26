'use client'

import { useEffect, useState } from 'react'

type Heading = {
  id: string
  text: string
  level: 2 | 3
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const article = document.querySelector('.article-prose')
    if (!article) return

    const nodes = Array.from(article.querySelectorAll('h2, h3')) as HTMLElement[]
    const collected: Heading[] = nodes.map((node) => {
      if (!node.id) node.id = slugify(node.textContent ?? '')
      return {
        id: node.id,
        text: node.textContent ?? '',
        level: node.tagName === 'H2' ? 2 : 3,
      }
    })
    setHeadings(collected)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  if (headings.length < 3) return null

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
    >
      <div className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        On this page
      </div>
      <ul className="space-y-1.5 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.id}`}
              className={`block leading-snug transition-colors ${
                activeId === h.id
                  ? 'text-emerald-300'
                  : 'text-zinc-400 hover:text-zinc-100'
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
