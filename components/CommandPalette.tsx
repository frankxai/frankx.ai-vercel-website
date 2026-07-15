'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Music,
  Sparkles,
  GraduationCap,
  Layers,
  Flame,
  BookOpen,
  Play,
  Network,
  TrendingUp,
  Star,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { SiteSearchGroup, SiteSearchItem } from '@/lib/site-search'
import { getCuratedSearchItems, searchSiteItems } from '@/lib/site-search'

type CommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MAX_RESULTS = 12

const GROUP_ICONS: Record<SiteSearchGroup, LucideIcon> = {
  Music,
  GenCreators: Flame,
  Learn: GraduationCap,
  Build: Network,
  Invest: TrendingUp,
  Explore: Star,
  Shortcuts: Sparkles,
}

function iconForItem(item: SiteSearchItem) {
  if (item.href === '/search') return Search
  if (item.href === '/blog') return BookOpen
  if (item.href.startsWith('/watch')) return Play
  if (item.href.startsWith('/vault')) return Layers
  return GROUP_ICONS[item.group]
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const previousPathname = useRef(pathname)

  const close = useCallback(() => {
    onOpenChange(false)
    setQuery('')
    setSelected(0)
  }, [onOpenChange])

  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    if (open) close()
  }, [pathname, open, close])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const results = useMemo(() => {
    const trimmed = query.trim()
    return trimmed ? searchSiteItems(trimmed, MAX_RESULTS) : getCuratedSearchItems(MAX_RESULTS)
  }, [query])

  useEffect(() => {
    setSelected(0)
  }, [query, open])

  const activate = useCallback(
    (item: SiteSearchItem) => {
      if (item.external) {
        window.open(item.href, '_blank', 'noopener,noreferrer')
      } else {
        router.push(item.href)
      }
      close()
    },
    [router, close]
  )

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected((current) => Math.min(current + 1, Math.max(results.length - 1, 0)))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected((current) => Math.max(current - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const item = results[selected]
      if (item) activate(item)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      close()
    }
  }

  useEffect(() => {
    if (!listRef.current) return
    const element = listRef.current.querySelector<HTMLElement>(`[data-index="${selected}"]`)
    element?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  const grouped = useMemo(() => {
    const map = new Map<string, { item: SiteSearchItem; index: number }[]>()
    results.forEach((item, index) => {
      const bucket = map.get(item.group) ?? []
      bucket.push({ item, index })
      map.set(item.group, bucket)
    })
    return Array.from(map.entries())
  }, [results])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Search FrankX"
        >
          <motion.div
            className="mx-3 mt-[12vh] max-h-[76vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]/95 shadow-2xl sm:mx-auto sm:max-w-[640px]"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search pages, guides, tools..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                spellCheck={false}
                autoComplete="off"
              />
            </div>

            <div
              ref={listRef}
              className="max-h-[58vh] overflow-y-auto py-2"
              role="listbox"
              aria-label="Search results"
            >
              {results.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-slate-500">
                  No results for &quot;{query}&quot;.
                </div>
              ) : (
                grouped.map(([group, entries]) => (
                  <div key={group} className="px-2 pb-2">
                    <div className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      {group}
                    </div>
                    {entries.map(({ item, index }) => {
                      const Icon = iconForItem(item)
                      const isSelected = index === selected
                      return (
                        <button
                          key={`${item.href}-${index}`}
                          data-index={index}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onMouseEnter={() => setSelected(index)}
                          onClick={() => activate(item)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                            isSelected ? 'bg-white/10' : 'hover:bg-white/5'
                          }`}
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
                            <Icon className="h-4 w-4 text-emerald-300" aria-hidden />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 truncate text-sm text-white">
                              <span className="truncate">{item.title}</span>
                              {item.external && (
                                <ExternalLink className="h-3 w-3 shrink-0 text-slate-500" aria-hidden />
                              )}
                            </div>
                            <div className="truncate text-[12px] text-slate-400">
                              {item.description}
                            </div>
                          </div>
                          {isSelected && (
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { CommandPalette }
