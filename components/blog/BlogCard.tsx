import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

import type { BlogPost } from '@/lib/types/blog'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
  className?: string
}

export default function BlogCard({ post, featured = false, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-950/90 shadow-[0_35px_120px_rgba(15,23,42,0.65)] transition-all duration-500 hover:-translate-y-1 hover:border-white/20',
        featured && 'lg:col-span-2 lg:row-span-2',
        className
      )}
    >
      {post.image && (
        <div
          className={cn(
            'relative overflow-hidden',
            featured ? 'h-72 lg:h-96' : 'h-52'
          )}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority={featured}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />
        </div>
      )}

      <div className={cn('p-6 lg:p-8 space-y-5', featured && 'lg:p-10')}>
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-white/60">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/80">
            <Tag className="w-3.5 h-3.5" />
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-white/60">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1.5 text-white/60">
            <Clock className="w-4 h-4" />
            {post.readingTime}
          </span>
        </div>

        <h2
          className={cn(
            'font-semibold text-white transition-colors duration-200 group-hover:text-primary-200',
            featured ? 'text-3xl lg:text-4xl leading-tight' : 'text-2xl leading-snug'
          )}
        >
          <Link href={`/blog/${post.slug}`} className="hover:underline decoration-primary-400/70">
            {post.title}
          </Link>
        </h2>

        <p
          className={cn(
            'text-sm text-white/70 leading-relaxed',
            featured ? 'text-lg text-white/75' : 'text-base'
          )}
        >
          {post.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-sky-500 text-sm font-semibold text-white">
              {post.author[0]}
            </div>
            <span className="text-sm font-medium text-white/80">{post.author}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-200 transition-all duration-200 group-hover:gap-3"
          >
            Read more
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
