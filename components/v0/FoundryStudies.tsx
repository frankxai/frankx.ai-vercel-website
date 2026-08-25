'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import { ArrowUpRight, ExternalLink, Search, X } from 'lucide-react'

import {
  studyCategories,
  type StudyCategory,
  type V0Study,
} from '@/content/v0/foundry'

const categoryLabels: Record<StudyCategory, string> = {
  'landing-page': 'Landing',
  'product-page': 'Product',
  dashboard: 'Dashboard',
  'creator-tool': 'Creator tool',
  community: 'Community',
  component: 'System',
  'micro-saas': 'Micro-SaaS',
}

export function FoundryStudies({ studies }: { studies: V0Study[] }) {
  const [category, setCategory] = useState<'all' | StudyCategory>('all')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const filteredStudies = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()

    return studies.filter((study) => {
      const categoryMatches = category === 'all' || study.category === category
      const queryMatches =
        normalizedQuery.length === 0 ||
        `${study.title} ${study.description} ${categoryLabels[study.category]}`
          .toLowerCase()
          .includes(normalizedQuery)

      return categoryMatches && queryMatches
    })
  }, [category, deferredQuery, studies])

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-white/10 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Filter interface studies by category"
        >
          {studyCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                category === item.id
                  ? 'bg-white text-black'
                  : 'border border-white/10 text-white/55 hover:border-white/25 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <label className="relative block w-full lg:w-72">
          <span className="sr-only">Search interface studies</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search studies"
            className="min-h-11 w-full rounded-full border border-white/10 bg-white/[0.03] py-2 pl-11 pr-11 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-emerald-400/60"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-white/35 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </label>
      </div>

      <p
        className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/35"
        aria-live="polite"
      >
        {filteredStudies.length} {filteredStudies.length === 1 ? 'study' : 'studies'}
      </p>

      {filteredStudies.length > 0 ? (
        <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
          {filteredStudies.map((study) => (
            <article
              key={study.chatId}
              className="group grid gap-4 py-6 sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:items-center"
            >
              <div className="flex items-center gap-3 sm:block">
                <span className="font-mono text-xs text-emerald-300/75">
                  {String(study.id).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/30 sm:mt-2 sm:block">
                  W{study.wave}
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-semibold text-white">{study.title}</h3>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/35">
                    {categoryLabels[study.category]}
                  </span>
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/48">
                  {study.description}
                </p>
              </div>

              <div className="flex items-center gap-4 sm:pl-6">
                <a
                  href={study.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Live study
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={`https://v0.app/chat/${study.chatId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Open in v0
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-3xl border border-dashed border-white/15 px-6 py-12 text-center">
          <p className="font-display text-2xl font-semibold text-white">No study matches that signal.</p>
          <button
            type="button"
            onClick={() => {
              setCategory('all')
              setQuery('')
            }}
            className="mt-5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Reset the catalog
          </button>
        </div>
      )}
    </div>
  )
}
