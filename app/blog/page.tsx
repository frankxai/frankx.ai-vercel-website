import { Suspense } from 'react'
import { getAllBlogPosts } from '@/lib/blog'
import { createMetadata } from '@/lib/seo'
import BlogPageClient from './BlogPageClient'

export const metadata = createMetadata({
  title: 'Creation Chronicles - Building Intelligence Systems',
  description:
    "Weekly insights on building with AI. From enterprise architecture to creating music with Suno. What's working, what isn't, and what I'm learning.",
  keywords: [
    'ai blog',
    'creation chronicles',
    'intelligence systems',
    'ai music',
    'suno ai',
    'enterprise ai',
    'oracle ai',
    'ai architecture',
  ],
  path: '/blog',
})

// Loading skeleton for Suspense fallback
function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl animate-pulse">
          <div className="h-4 w-32 bg-white/10 rounded mb-8" />
          <div className="h-14 w-3/4 bg-white/10 rounded mb-4" />
          <div className="h-14 w-1/2 bg-white/10 rounded mb-6" />
          <div className="h-6 w-2/3 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  const allPosts = getAllBlogPosts()
  const categories = Array.from(new Set(allPosts.map((post) => post.category))).sort()
  const tags = Array.from(new Set(allPosts.flatMap((post) => (post.tags || []).map((tag) => tag.trim())))).sort()

  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogPageClient
        posts={allPosts}
        categories={categories}
        tags={tags}
      />
    </Suspense>
  )
}
