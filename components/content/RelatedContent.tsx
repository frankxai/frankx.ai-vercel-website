'use client'

import Link from 'next/link'
import { ArrowRight, FileText, ExternalLink, Sparkles } from 'lucide-react'
import type { RelatedContent as RelatedContentType } from '@/lib/content-graph'
import { cn } from '@/lib/utils'

interface RelatedContentProps {
  items: RelatedContentType[]
  title?: string
  description?: string
  className?: string
}

const reasonLabels: Record<RelatedContentType['reason'], string> = {
  'same-category': 'Same Category',
  'shared-tags': 'Related Topics',
  'manual': 'Recommended',
  'topic-cluster': 'Topic Cluster'
}

const reasonColors: Record<RelatedContentType['reason'], string> = {
  'same-category': 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5',
  'shared-tags': 'text-purple-400 border-purple-400/20 bg-purple-400/5',
  'manual': 'text-amber-400 border-amber-400/20 bg-amber-400/5',
  'topic-cluster': 'text-green-400 border-green-400/20 bg-green-400/5'
}

const typeIcons = {
  blog: FileText,
  research: ExternalLink,
  resource: Sparkles
}

export default function RelatedContent({
  items,
  title = 'Related Reading',
  description = 'Continue exploring these related topics',
  className
}: RelatedContentProps) {
  if (items.length === 0) return null

  return (
    <section className={cn('py-16', className)}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight leading-[1.15] mb-2">
          {title}
        </h2>
        <p className="text-slate-400 leading-[1.6]">{description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ content, score, reason }) => {
          const Icon = typeIcons[content.type]

          return (
            <article
              key={content.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-900/90 p-6 backdrop-blur transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
            >
              {/* Type & Reason Badges */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  <Icon className="h-3 w-3" />
                  {content.type}
                </span>
                <span className={cn(
                  'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
                  reasonColors[reason]
                )}>
                  {reasonLabels[reason]}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white leading-tight mb-2 group-hover:text-cyan-400 transition-colors">
                {content.title}
              </h3>

              {/* Description */}
              {content.description && (
                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {content.description}
                </p>
              )}

              {/* Tags */}
              {content.tags && content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {content.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <Link
                href={content.url}
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Read More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Relevance Score (hidden, for debugging) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="absolute top-2 right-2 text-xs text-slate-600">
                  {score}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
