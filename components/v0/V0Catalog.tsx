"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight, Search, X } from "lucide-react"

import { curatedCommunityTemplates } from "@/content/v0/catalog"

const ALL_CATEGORIES = "All"

export function V0Catalog() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState(ALL_CATEGORIES)

  const categories = useMemo(
    () => [
      ALL_CATEGORIES,
      ...Array.from(
        new Set(curatedCommunityTemplates.map((template) => template.category)),
      ).sort(),
    ],
    [],
  )

  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return curatedCommunityTemplates.filter((template) => {
      const inCategory =
        category === ALL_CATEGORIES || template.category === category
      const searchable = [
        template.name,
        template.author,
        template.category,
        template.note,
        ...template.stack,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return inCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [category, query])

  return (
    <div>
      <div className="flex flex-col gap-3 border-y border-white/10 py-4 sm:flex-row sm:items-center">
        <label className="relative flex min-h-11 flex-1 items-center">
          <span className="sr-only">Search the template snapshot</span>
          <Search
            className="pointer-events-none absolute left-3 h-4 w-4 text-white/40"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search patterns, stacks, or authors"
            className="min-h-11 w-full rounded-md border border-white/10 bg-[#111113] py-2 pl-10 pr-10 text-sm text-white placeholder:text-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-md text-white/50 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Clear search"
              title="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </label>

        <label className="flex min-h-11 items-center gap-3">
          <span className="text-xs font-medium text-white/50">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="min-h-11 rounded-md border border-white/10 bg-[#111113] px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {categories.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        className="flex min-h-10 items-center justify-between text-xs text-white/45"
        aria-live="polite"
      >
        <span>{matches.length} curated references</span>
        <span>Observed 17 Jul 2026</span>
      </div>

      <div className="border-b border-white/10">
        {matches.map((template) => (
          <article
            key={template.id}
            className="grid gap-3 border-t border-white/10 py-5 first:border-t-0 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_auto] sm:items-start"
          >
            <div>
              <p className="font-display text-base font-semibold text-white">
                {template.name}
              </p>
              <p className="mt-1 text-xs text-white/45">
                {template.author ? `by ${template.author} / ` : ""}
                {template.category}
              </p>
            </div>

            <div>
              <p className="text-sm leading-6 text-white/65">{template.note}</p>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/40">
                {template.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="font-mono text-xs text-cyan-300/80">
                {template.rating}
              </span>
              <a
                href={template.url}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 text-white/55 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label={`Open ${template.name} on v0`}
                title="Open on v0"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {matches.length === 0 ? (
        <div className="border-b border-white/10 py-16 text-center">
          <p className="text-sm font-medium text-white">No references found</p>
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setCategory(ALL_CATEGORIES)
            }}
            className="mt-3 min-h-11 rounded-md border border-white/15 px-4 text-sm text-white/65 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Reset filters
          </button>
        </div>
      ) : null}
    </div>
  )
}
