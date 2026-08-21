'use client'

import { useEffect, useId, useState } from 'react'

type Heading = {
  id: string
  text: string
  level: 2 | 3
}

type Variant = 'rail' | 'mobile'

function collectHeadings(): Heading[] {
  const article = document.querySelector('.article-prose')
  if (!article) return []

  const nodes = Array.from(article.querySelectorAll('h2, h3')) as HTMLElement[]
  return nodes
    .map((node) => {
      const text = (node.textContent ?? '').trim()
      if (!text || !node.id) return null
      return {
        id: node.id,
        text,
        level: node.tagName === 'H3' ? (3 as const) : (2 as const),
      }
    })
    .filter((heading): heading is Heading => heading !== null)
}

function TocList({
  headings,
  activeId,
  onNavigate,
}: {
  headings: Heading[]
  activeId: string
  onNavigate?: () => void
}) {
  return (
    <ol className="space-y-0.5">
      {headings.map((heading) => {
        const isActive = activeId === heading.id
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={onNavigate}
              className={`block cursor-pointer border-l-2 py-1.5 leading-snug transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] ${
                heading.level === 3 ? 'pl-5 text-[13px]' : 'pl-3 text-sm'
              } ${
                isActive
                  ? 'border-emerald-400 text-white'
                  : 'border-white/10 text-zinc-400 hover:border-white/30 hover:text-zinc-100'
              }`}
            >
              {heading.text}
            </a>
          </li>
        )
      })}
    </ol>
  )
}

export default function TableOfContents({ variant = 'rail' }: { variant?: Variant }) {
  const panelId = useId()
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const collected = collectHeadings()
    setHeadings(collected)
    if (collected.length) setActiveId((current) => current || collected[0].id)

    const nodes = collected
      .map((heading) => document.getElementById(heading.id))
      .filter((node): node is HTMLElement => node !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible?.target.id) setActiveId(visible.target.id)
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (headings.length < 2) return null

  if (variant === 'mobile') {
    return (
      <>
        <button
          type="button"
          className="fixed bottom-6 right-4 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#121214]/90 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors duration-200 hover:border-emerald-400/40 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 xl:hidden"
          aria-label={open ? 'Close table of contents' : 'Open table of contents'}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
          )}
        </button>

        {open ? (
          <div className="fixed inset-0 z-30 xl:hidden">
            <button
              type="button"
              className="absolute inset-0 cursor-pointer bg-black/40"
              aria-label="Dismiss table of contents"
              onClick={() => setOpen(false)}
            />
            <nav
              id={panelId}
              aria-label="Table of contents"
              className="absolute inset-x-4 bottom-24 max-h-[min(70vh,32rem)] overflow-y-auto rounded-2xl border border-white/[0.1] bg-[#0f0f12]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-md"
            >
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                On this page
              </div>
              <TocList headings={headings} activeId={activeId} onNavigate={() => setOpen(false)} />
            </nav>
          </div>
        ) : null}
      </>
    )
  }

  return (
    <nav
      aria-label="Table of contents"
      className="max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain pr-1"
    >
      <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        On this page
      </div>
      <TocList headings={headings} activeId={activeId} />
    </nav>
  )
}
