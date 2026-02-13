'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import lunr from 'lunr'
import { SearchDocument } from '@/lib/search'

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchIndex, setSearchIndex] = useState<lunr.Index | null>(null)
  const [documents, setDocuments] = useState<SearchDocument[]>([])

  useEffect(() => {
    const fetchSearchIndex = async () => {
      const response = await fetch('/search-index.json')
      const data = await response.json()
      const idx = lunr.Index.load(data)
      setSearchIndex(idx)

      const documentsResponse = await fetch('/documents.json')
      const documentsData = await documentsResponse.json()
      setDocuments(documentsData)
    }
    fetchSearchIndex()
  }, [])

  const searchResults = useMemo(() => {
    if (!searchQuery || !searchIndex) return []
    return searchIndex.search(searchQuery)
  }, [searchQuery, searchIndex])

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center">
        <h1 className="text-heading-1 font-bold text-white">Search</h1>
        <p className="mt-4 text-body text-neutral-400">Search for content on the FrankX.ai website.</p>
      </div>

      <div className="mt-12">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-lg rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-12">
        {searchResults.map((result) => {
          const document = documents.find((doc) => doc.url === result.ref)
          if (!document?.url) return null
          const isExternal = document.url.startsWith('http')
          return (
            <div key={result.ref} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 mb-4">
              {isExternal ? (
                <a href={document.url} className="hover:text-white" rel="noreferrer">
                  <h2 className="text-heading-5 font-semibold text-white">{document.title}</h2>
                </a>
              ) : (
                <Link href={document.url} className="hover:text-white">
                  <h2 className="text-heading-5 font-semibold text-white">{document.title}</h2>
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
