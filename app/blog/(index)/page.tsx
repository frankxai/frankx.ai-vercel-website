import { Suspense } from 'react'
import { getAllBlogPostSummaries } from '@/lib/blog'
import { createMetadata } from '@/lib/seo'
import { FAQPageJsonLd } from '@/components/seo/JsonLd'
import BlogPageClient from '../BlogPageClient'

const blogFaqs = [
  {
    question: 'What is the FrankX blog?',
    answer: 'The FrankX blog is the long-form archive: researched articles on AI architecture, agentic systems, creator workflows, and AI music production, written to stay useful long after publication. Shorter daily notes live separately in the FrankX Journal at frankx.ai/journal.'
  },
  {
    question: 'How often is new content published?',
    answer: 'New articles cover a range of topics including AI implementation guides, enterprise architecture patterns, creative AI workflows, and insights from building production AI systems.'
  },
  {
    question: 'What is the difference between the blog and the journal?',
    answer: 'The blog holds researched, edited articles built to be found and re-read. The journal at frankx.ai/journal holds short dated notes written as the work happens. A journal note sometimes graduates into a blog article once the thinking is worth researching properly.'
  },
  {
    question: 'What topics does the blog cover?',
    answer: 'The blog covers enterprise AI architecture, agentic systems, creative AI tools like Suno and Midjourney, AI implementation strategies, venture building, and insights from building production AI systems.'
  },
  {
    question: 'Can I get notified about new articles?',
    answer: 'Yes, you can join the FrankX.AI newsletter to receive notifications about new articles. Subscribe through any article page or the homepage.'
  },
  {
    question: 'Are the articles suitable for beginners?',
    answer: 'Yes, articles range from beginner-friendly introductions to advanced technical deep-dives. Each article is tagged by category, making it easy to find content matching your experience level.'
  }
]

export const metadata = createMetadata({
  title: 'Blog - AI Architecture, Creative Systems, and What Ships',
  description:
    "Inside the build. Researched articles on AI systems, creative workflows, and what's actually shipping — from enterprise architecture to AI music production.",
  keywords: [
    'ai blog',
    'frankx blog',
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
    <div className="min-h-screen bg-[#0a0a0b]">
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
  const allPosts = getAllBlogPostSummaries()
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
