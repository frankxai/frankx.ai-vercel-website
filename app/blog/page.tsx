import { Suspense } from 'react'
import { getAllBlogPosts } from '@/lib/blog'
import { createMetadata } from '@/lib/seo'
import { FAQPageJsonLd } from '@/components/seo/JsonLd'
import BlogPageClient from './BlogPageClient'

const blogFaqs = [
  {
    question: 'What topics does the FrankX blog cover?',
    answer: 'The blog covers enterprise AI architecture, agentic AI systems, creative AI tools like Suno and Midjourney, production implementation patterns, and real-world insights from building AI systems at scale.'
  },
  {
    question: 'How often is new content published?',
    answer: 'New articles are published 2-3 times per week, covering AI implementation guides, architecture patterns, creative AI workflows, and insights from building production AI systems.'
  },
  {
    question: 'Who writes the articles?',
    answer: 'All articles are written by Frank, an AI Architect and creator who builds enterprise AI systems and produces AI-generated music. Each article shares practical, hands-on experience rather than theory.'
  },
  {
    question: 'Can I get notified about new articles?',
    answer: 'Yes, subscribe to the FrankX newsletter to receive weekly insights on AI systems, creative workflows, and new articles. Subscribe through any article page or the homepage.'
  },
  {
    question: 'Are the articles suitable for beginners?',
    answer: 'Yes, articles range from beginner-friendly introductions to advanced technical deep-dives. Each article is tagged by category, making it easy to find content matching your experience level.'
  }
]

export const metadata = createMetadata({
  title: 'Blog - What I\'m Building, What\'s Working',
  description:
    "Weekly insights on building with AI. From enterprise architecture to creating music with Suno. What's working, what isn't, and what I'm learning.",
  keywords: [
    'ai blog',
    'ai architecture blog',
    'intelligence systems',
    'ai music',
    'suno ai',
    'enterprise ai',
    'ai architect blog',
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
    <>
      <FAQPageJsonLd faqs={blogFaqs} />
      <Suspense fallback={<BlogSkeleton />}>
        <BlogPageClient
          posts={allPosts}
          categories={categories}
          tags={tags}
        />
      </Suspense>
    </>
  )
}
