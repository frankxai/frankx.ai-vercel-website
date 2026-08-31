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
    <ol className="space-y-1">
      {headings.map((heading) => {
        const isActive = activeId === heading.id
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={onNavigate}
              className={`group flex items-center py-1.5 px-2.5 rounded-lg leading-snug transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] ${
                heading.level === 3 ? 'ml-3 text-[12.5px]' : 'text-[13.5px] font-medium'
              } ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-300 font-semibold shadow-sm border-l-2 border-emerald-400'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04] border-l-2 border-transparent'
              }`}
            >
              <span className="truncate">{heading.text}</span>
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
          className="fixed bottom-6 right-4 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-emerald-500/30 bg-[#121216]/90 text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-[border-color,color,transform] duration-200 hover:border-emerald-400 hover:text-emerald-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 xl:hidden"
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
              className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-sm"
              aria-label="Dismiss table of contents"
              onClick={() => setOpen(false)}
            />
            <nav
              id={panelId}
              aria-label="Table of contents"
              className="absolute inset-x-4 bottom-24 max-h-[min(70vh,32rem)] overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#0d0e12]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
                    Table of Contents
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">{headings.length} sections</span>
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
      className="rounded-2xl border border-white/[0.08] bg-[#0d0e12]/80 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.36)] backdrop-blur-xl max-h-[calc(100vh-8.5rem)] flex flex-col"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
            Table of Contents
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">{headings.length} sections</span>
      </div>
      <div className="overflow-y-auto overscroll-contain pr-1 custom-scrollbar flex-1">
        <TocList headings={headings} activeId={activeId} />
      </div>
      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between shrink-0 text-[11px]">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1 text-zinc-400 hover:text-emerald-300 transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span>Back to top</span>
        </button>
        <span className="text-zinc-500 font-mono">FrankX Dispatch</span>
      </div>
    </nav>
  )
}
