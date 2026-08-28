'use client'

import Image from 'next/image'
import { useDeferredValue, useState } from 'react'
import { ArrowUpRight, Search, X } from 'lucide-react'

import { studyCategories, type StudyCategory, type V0Study } from '@/content/v0/foundry'
import { trackEvent } from '@/lib/analytics'
import { studyVisuals } from './studyVisuals'

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
  const visualStudies = studies.filter((study) => studyVisuals[study.id])

  const normalizedQuery = deferredQuery.trim().toLowerCase()
  const filteredStudies = studies.filter((study) => {
    const categoryMatches = category === 'all' || study.category === category
    const queryMatches =
      normalizedQuery.length === 0 ||
      `${study.title} ${study.description} ${categoryLabels[study.category]}`
        .toLowerCase()
        .includes(normalizedQuery)
    return categoryMatches && queryMatches
  })

  return (
    <div>
      <div className="grid auto-rows-[210px] gap-3 sm:auto-rows-[250px] md:grid-cols-2 lg:grid-cols-4">
        {visualStudies.map((study, index) => {
          const featured = index === 0
          const wide = index === 5
          return (
            <a
              key={study.id}
              href={study.demoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent('v0_study_opened', {
                  study_id: study.id,
                  destination: 'visual_index',
                })
              }
              className={`group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#111214] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${featured ? 'md:col-span-2 md:row-span-2' : ''} ${wide ? 'lg:col-span-2' : ''}`}
            >
              <Image
                src={studyVisuals[study.id]!}
                alt={`${study.title} interface study`}
                fill
                sizes={featured ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="font-mono text-[9px] text-white/52">
                    {String(study.id).padStart(2, '0')} / {categoryLabels[study.category]}
                  </p>
                  <h3 className={`${featured ? 'mt-2 text-2xl sm:text-3xl' : 'mt-2 text-lg'} font-display font-semibold tracking-[-0.025em] text-white`}>
                    {study.title}
                  </h3>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-black transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </a>
          )
        })}
      </div>

      <div className="mt-14 border-y border-white/10">
        <div className="flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter interface studies by category">
            {studyCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${category === item.id ? 'bg-white text-black' : 'border border-white/10 text-white/52 hover:border-white/25 hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <label className="relative block w-full lg:w-72">
            <span className="sr-only">Search interface studies</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search all nineteen"
              className="min-h-11 w-full rounded-full border border-white/10 bg-white/[0.03] py-2 pl-11 pr-11 text-sm text-white outline-none placeholder:text-white/30 focus:border-emerald-400/60"
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

        <p className="border-t border-white/10 py-4 font-mono text-[10px] text-white/32" aria-live="polite">
          {filteredStudies.length} {filteredStudies.length === 1 ? 'study' : 'studies'} in the source index
        </p>

        {filteredStudies.length ? (
          <div className="divide-y divide-white/10 border-t border-white/10">
            {filteredStudies.map((study) => (
              <article key={study.id} className="grid gap-3 py-5 sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:items-center">
                <div className="font-mono text-[10px] text-emerald-300/58">
                  {String(study.id).padStart(2, '0')}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-base font-semibold text-white">{study.title}</h3>
                    <span className="font-mono text-[9px] text-white/30">{categoryLabels[study.category]}</span>
                  </div>
                  <p className="mt-1 max-w-3xl text-xs leading-5 text-white/40">{study.description}</p>
                </div>
                <a
                  href={`https://v0.app/chat/${study.chatId}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('v0_study_opened', { study_id: study.id, destination: 'v0_index' })}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Open in v0
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="border-t border-white/10 py-12 text-center text-sm text-white/48">No study matches that signal.</div>
        )}
      </div>
    </div>
  )
}
