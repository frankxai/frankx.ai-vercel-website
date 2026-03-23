import { Suspense } from 'react'
import { getAllBlogPosts } from '@/lib/blog'
import { createMetadata } from '@/lib/seo'
import { FAQPageJsonLd } from '@/components/seo/JsonLd'
import BlogPageClient from './BlogPageClient'

const blogFaqs = [
  {
    question: 'What is Creation Chronicles?',
    answer: 'Creation Chronicles is FrankX.AI\'s blog featuring weekly insights on building intelligence systems. It covers topics from enterprise AI architecture to creative AI applications like music production with Suno, sharing real-world learnings and practical implementation strategies.'
  },
  {
    question: 'How often is new content published?',
    answer: 'New articles are published 2-3 times per week, covering a range of topics including AI implementation guides, enterprise architecture patterns, creative AI workflows, and insights from building production AI systems.'
  },
  {
    question: 'What topics does Creation Chronicles cover?',
    answer: 'The blog covers enterprise AI architecture, Oracle Cloud AI services, creative AI tools like Suno and Midjourney, agentic AI systems, AI implementation strategies, and personal insights from a musician-technologist\'s journey building with AI.'
  },
  {
    question: 'Can I get notified about new articles?',
    answer: 'Yes, you can join the FrankX.AI newsletter to receive notifications about new articles, exclusive content, and early access to resources. Subscribe through any article page or the homepage.'
  },
  {
    question: 'Are the articles suitable for beginners?',
    answer: 'Yes, articles range from beginner-friendly introductions to advanced technical deep-dives. Each article is tagged by category and difficulty, making it easy to find content matching your experience level.'
  }
]

export const metadata = createMetadata({
  title: 'Creation Chronicles - Building Intelligence Systems',
  description:
    "Inside the build. AI systems, creative workflows, and what's actually shipping — from enterprise architecture to AI music production.",
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
