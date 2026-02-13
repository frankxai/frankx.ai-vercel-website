'use client'

import { useMemo, useState } from 'react'
import { PROMPTS, type Prompt } from '@/lib/prompts'

export default function PromptLibrary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState<string>('All')

  const categories = useMemo(() => ['All', ...new Set(PROMPTS.map((prompt) => prompt.category))], [])

  const filteredPrompts = useMemo(() => {
    return PROMPTS.filter((prompt) => {
      const searchMatch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase())
      const categoryMatch = category === 'All' || prompt.category === category
      return searchMatch && categoryMatch
    })
  }, [category, searchQuery])

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Prompt Library</h1>
        <p className="mt-4 text-lg text-slate-400">A collection of AI prompts for various use cases.</p>
      </div>

      <div className="mt-12">
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search prompts..."
            className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <select
            className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPrompts.map((prompt: Prompt) => (
          <div key={prompt.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">{prompt.title}</h2>
            <p className="mt-2 text-slate-400">{prompt.description}</p>
            <div className="mt-4">
              <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-slate-300">
                {prompt.category}
              </span>
            </div>
            <div className="mt-6">
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-800 p-4 text-sm text-slate-300">
                <code>{prompt.content}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
