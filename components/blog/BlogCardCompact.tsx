import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'
import { getCategoryDisplayName } from '@/lib/blog'

interface BlogCardCompactProps {
  post: BlogPost
}

export default function BlogCardCompact({ post }: BlogCardCompactProps) {
  const categoryDisplay = getCategoryDisplayName(post.sourceCategory || post.category)

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/8 hover:-translate-y-1">
      {/* Header Image */}
      {post.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={`${post.title} header image`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
          {/* Category badge on image */}
          <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
            <Tag className="w-3 h-3" />
            {categoryDisplay}
          </span>
        </div>
      )}

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded">
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-300 mb-4 line-clamp-3 leading-relaxed">
          {post.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded"
          >
            Read more
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}
