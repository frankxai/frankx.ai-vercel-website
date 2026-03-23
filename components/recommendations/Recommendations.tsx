'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SparkBorder from '@/components/ui/SparkBorder'

interface RecommendationDocument {
  title: string
  url: string
  tags?: string[]
  image?: string
  category?: string
  readingTime?: string
  description?: string
}

interface RecommendationsProps {
  documents: RecommendationDocument[]
  currentDocument: RecommendationDocument
}

export default function Recommendations({ documents, currentDocument }: RecommendationsProps) {
  const recommendedDocuments = useMemo(() => {
    if (!currentDocument) return []

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

  if (recommendedDocuments.length === 0) return null

  return (
    <div className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
          Continue Reading
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {recommendedDocuments.map((doc) => (
          <SparkBorder key={doc.url} color="emerald" bg="#0b1120" speed="slow">
            <Link href={doc.url} className="block group/rec">
              {/* Image */}
              {doc.image && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                  <Image
                    src={doc.image}
                    alt={doc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover/rec:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                {/* Category + Reading Time */}
                {(doc.category || doc.readingTime) && (
                  <div className="flex items-center gap-3 mb-2.5">
                    {doc.category && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/70">
                        {doc.category}
                      </span>
                    )}
                    {doc.readingTime && (
                      <span className="text-[10px] text-white/30">{doc.readingTime}</span>
                    )}
                  </div>
                )}

                <h3 className="text-base font-semibold text-white/90 leading-snug line-clamp-2 group-hover/rec:text-white transition-colors">
                  {doc.title}
                </h3>

                {doc.description && (
                  <p className="mt-2 text-xs text-white/40 leading-relaxed line-clamp-2">
                    {doc.description}
                  </p>
                )}

                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400/70 group-hover/rec:text-emerald-400 transition-colors">
                  Read article
                  <ArrowRight className="h-3 w-3 transition-transform group-hover/rec:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </SparkBorder>
        ))}
      </div>
    </div>
  )
}
