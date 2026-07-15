'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, FileText, Search as SearchIcon } from 'lucide-react'

import type { SiteSearchItem } from '@/lib/site-search'
import { getCuratedSearchItems, searchSiteItems } from '@/lib/site-search'

type ReadingItem = { title: string; path: string; snippet: string }

const MAX_ROUTE_RESULTS = 24
const MAX_ARCHIVE_RESULTS = 24

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9/.\s-]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function scoreReadingItem(item: ReadingItem, query: string, tokens: string[]) {
  const title = normalize(item.title)
  const snippet = normalize(item.snippet)
  const path = normalize(item.path)
  let score = 0

  if (title === query) score += 120
  if (title.startsWith(query)) score += 80
  if (title.includes(query)) score += 55
  if (path.includes(query)) score += 45
  if (snippet.includes(query)) score += 25

  for (const token of tokens) {
    if (title.startsWith(token)) score += 18
    else if (title.includes(token)) score += 12
    if (path.includes(token)) score += 8
    if (snippet.includes(token)) score += 5
  }

  return score
}

function searchReadingItems(items: ReadingItem[], query: string) {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return items.slice(0, MAX_ARCHIVE_RESULTS)
  const tokens = normalizedQuery.split(' ').filter(Boolean)

  return items
    .map((item) => ({ item, score: scoreReadingItem(item, normalizedQuery, tokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, MAX_ARCHIVE_RESULTS)
    .map(({ item }) => item)
}

function RouteResult({ item }: { item: SiteSearchItem }) {
  const isExternal = item.external || item.href.startsWith('http')
  const className =
    'group flex min-w-0 items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-emerald-400/30 hover:bg-white/[0.07]'

  const content = (
    <>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-emerald-500/10 text-emerald-300">
        <FileText className="h-4 w-4" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <h2 className="min-w-0 flex-1 truncate text-sm font-semibold text-white">{item.title}</h2>
          <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-500">
            {item.group}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">{item.description}</p>
      </div>
      <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-emerald-300" aria-hidden />
    </>
  )

  if (isExternal) {
    return (
      <a href={item.href} className={className} target="_blank" rel="noreferrer">
        {content}
      </a>
    )
  }

  return (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  )
}

export default function Search() {
  const [query, setQuery] = useState('')
  const [archiveItems, setArchiveItems] = useState<ReadingItem[]>([])

  useEffect(() => {
    fetch('/reading/search-index.json')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setArchiveItems(Array.isArray(data.items) ? data.items : []))
      .catch(() => setArchiveItems([]))
  }, [])

  const routeResults = useMemo(() => {
    const trimmed = query.trim()
    return trimmed ? searchSiteItems(trimmed, MAX_ROUTE_RESULTS) : getCuratedSearchItems(12)
  }, [query])

  const archiveResults = useMemo(() => searchReadingItems(archiveItems, query), [archiveItems, query])

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-8">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
            FrankX Search
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Find pages, guides, tools, and archive notes.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
            Search across the public site index and the deeper reading archive from one focused surface.
          </p>
        </div>

        <label className="mt-8 flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 px-4 py-3 focus-within:border-emerald-400/50">
          <SearchIcon className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search AI architecture, music, agents, workshops..."
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Site Results
          </h2>
          <span className="text-xs text-slate-600">{routeResults.length} matches</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {routeResults.map((item) => (
            <RouteResult key={item.href} item={item} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Reading Archive
          </h2>
          <span className="text-xs text-slate-600">{archiveResults.length} matches</span>
        </div>
        <div className="space-y-3">
          {archiveResults.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="group flex min-w-0 items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-cyan-500/10 text-cyan-300">
                <BookOpen className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">{item.snippet}</p>
              </div>
            </Link>
          ))}
          {routeResults.length === 0 && archiveResults.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm text-slate-400">
              No results. Try a route, topic, product, or workshop name.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
