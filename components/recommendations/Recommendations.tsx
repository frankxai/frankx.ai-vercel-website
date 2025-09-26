'use client'

import { useMemo } from 'react'
import { SearchDocument } from '@/lib/search'

interface RecommendationsProps {
  documents: SearchDocument[]
  currentDocument: SearchDocument
}

export default function Recommendations({ documents, currentDocument }: RecommendationsProps) {
  const recommendedDocuments = useMemo(() => {
    if (!currentDocument) {
      return []
    }

    const currentTags = currentDocument.tags || []

    return documents
      .filter((doc) => doc.url !== currentDocument.url)
      .map((doc) => {
        const docTags = doc.tags || []
        const commonTags = currentTags.filter((tag) => docTags.includes(tag))
        return { ...doc, commonTags: commonTags.length }
      })
      .filter((doc) => doc.commonTags > 0)
      .sort((a, b) => b.commonTags - a.commonTags)
      .slice(0, 3)
  }, [documents, currentDocument])

  if (recommendedDocuments.length === 0) {
    return null
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white">Related Content</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recommendedDocuments.map((doc) => (
          <a
            key={doc.url}
            href={doc.url}
            className="block rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:bg-slate-800"
          >
            <h3 className="text-xl font-semibold text-white">{doc.title}</h3>
          </a>
        ))}
      </div>
    </div>
  )
}
