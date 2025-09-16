import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { BlogPost } from '@/lib/blog'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
  className?: string
}

export default function BlogCard({ post, featured = false, className }: BlogCardProps) {
  return (
    <article className={cn(
      "group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100",
      featured && "lg:col-span-2 lg:row-span-2",
      className
    )}>
      {post.image && (
        <div className={cn(
          "relative overflow-hidden",
          featured ? "h-64 lg:h-80" : "h-48"
        )}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <div className={cn(
        "p-6",
        featured && "lg:p-8"
      )}>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readingTime}
          </span>
        </div>

        <h2 className={cn(
          "font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2",
          featured ? "text-2xl lg:text-3xl" : "text-xl"
        )}>
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>

        <p className={cn(
          "text-gray-600 mb-4 line-clamp-3",
          featured ? "text-lg" : "text-base"
        )}>
          {post.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              {post.author[0]}
            </div>
            <span className="text-sm font-medium text-gray-700">{post.author}</span>
          </div>

          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors group-hover:gap-2 duration-200"
          >
            Read more
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700 transition-colors cursor-pointer"
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