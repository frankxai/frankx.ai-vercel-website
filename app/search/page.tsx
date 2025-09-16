'use client'

import { useEffect, useMemo, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

type Item = { title: string; path: string; snippet: string }

export default function SearchPage() {
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
    return items.filter((it) =>
      it.title.toLowerCase().includes(term) ||
      it.snippet.toLowerCase().includes(term)
    ).slice(0, 50)
  }, [q, items])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search</h1>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles and content snippets"
            className="w-full border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <ul className="space-y-4">
            {results.map((it) => (
              <li key={it.path} className="border rounded-lg p-4 hover:shadow-sm">
                <a href={it.path} className="text-lg font-semibold text-purple-700 hover:text-purple-800">
                  {it.title}
                </a>
                <p className="text-gray-600 mt-1">{it.snippet}</p>
              </li>
            ))}
            {results.length === 0 && (
              <li className="text-gray-600">No results.</li>
            )}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}

