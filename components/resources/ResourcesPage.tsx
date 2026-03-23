'use client'

import { useState, useMemo, useEffect } from 'react'
import { getDatabase } from '@/lib/notion'

export type Resource = {
  id: string
  title: string
  description: string
  url: string
  category: string
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const fetchResources = async () => {
      const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID
      if (databaseId) {
        const results = await getDatabase(databaseId)
        const resources = results.map((page: any) => {
          return {
            id: page.id,
            title: page.properties.Name.title[0].plain_text,
            description: page.properties.Description.rich_text[0].plain_text,
            url: page.properties.URL.url,
            category: page.properties.Category.select.name,
          }
        })
        setResources(resources)
      }
    }
    fetchResources()
  }, [])

  const categories = ['All', ...new Set(resources.map((resource) => resource.category))]

  const filteredResources = useMemo(() => {
    if (category === 'All') {
      return resources
    }
    return resources.filter((resource) => resource.category === category)
  }, [category, resources])

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center">
        <h1 className="text-heading-1 font-bold text-white">Resources</h1>
        <p className="mt-4 text-body text-neutral-400">A collection of resources for creators, entrepreneurs, and AI enthusiasts.</p>
      </div>

      <div className="mt-12">
        <div className="flex justify-center">
          <div className="flex items-center gap-4">
            <label htmlFor="category" className="text-white">Category:</label>
            <select
              id="category"
              className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-400/50"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition hover:bg-neutral-800"
          >
            <h2 className="text-heading-5 font-semibold text-white">{resource.title}</h2>
            <p className="mt-2 text-body-sm text-neutral-400">{resource.description}</p>
            <div className="mt-4">
              <span className="inline-flex items-center rounded-full bg-neutral-800 px-3 py-1 text-sm font-medium text-neutral-300">
                {resource.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
