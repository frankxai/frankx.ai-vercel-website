'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Item = { title: string; path: string; snippet: string }

export default function SearchClient() {
  const [q, setQ] = useState('')
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    fetch('/reading/search-index.json')
      .then((r) => r.json())
      .then((data) => setItems(data.items || []))
      .catch(() => setItems([]))
  }, [])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return items.slice(0, 30)
    return items
      .filter(
        (it) =>
          it.title.toLowerCase().includes(term) ||
          it.snippet.toLowerCase().includes(term)
      )
      .slice(0, 50)
  }, [q, items])

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold text-white">Search the intelligence archive</h1>
          <p className="text-sm text-white/70">
            Query essays, templates, and rituals. The index updates with every new dispatch so you can track the evolution of the hub in real-time.
          </p>
        </div>
        <label className="mt-8 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Search</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a topic, title, or keyword"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
        </label>
      </div>

      <ul className="mt-10 space-y-4">
        {results.map((it) => (
          <li key={it.path} className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
            <Link href={it.path} className="text-lg font-semibold text-white hover:underline">
              {it.title}
            </Link>
            <p className="mt-2 text-sm text-white/70">{it.snippet}</p>
          </li>
        ))}
        {results.length === 0 && (
          <li className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            No results. Try a different term or explore the featured collections on the hub homepage.
          </li>
        )}
      </ul>
    </>
  )
}
