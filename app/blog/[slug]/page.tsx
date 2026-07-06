import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, Clock, Linkedin, Tag, Target, Twitter } from 'lucide-react'

import { MDXContent } from '@/components/blog/MDXContent'
import RelatedResearch from '@/components/blog/RelatedResearch'
import BlogFooterCTA from '@/components/blog/BlogFooterCTA'
import SeriesNav from '@/components/blog/SeriesNav'
import Recommendations from '@/components/recommendations/Recommendations'
import { InlineLeadMagnet } from '@/components/conversion/InlineLeadMagnet'
import { getAllBlogPosts, getBlogPost, getSeriesPosts, extractFAQFromContent } from '@/lib/blog'
import { createMetadata, siteConfig } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import HeroImage from '@/components/ui/HeroImage'
import TableOfContents from '@/components/blog/TableOfContents'

// Static generation - content is read at build time
export const dynamicParams = false

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return createMetadata({
      title: 'Post Not Found - FrankX Journal',
      description: 'The requested FrankX Journal story could not be located.',
      path: `/blog/${slug}`,
    })
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    image:
      post.image ||
      `/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description)}`,
    publishedTime: post.date,
    authors: [post.author],
    keywords: post.keywords || undefined,
  })
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllBlogPosts()
  const documents = allPosts.map((postItem) => ({
    title: postItem.title,
    content: postItem.content,
    url: `/blog/${postItem.slug}`,
    tags: postItem.tags,
    image: postItem.image,
    category: postItem.category,
    readingTime: postItem.readingTime,
    description: postItem.description,
  }))

  const currentDocument = {
    title: post.title,
    content: post.content,
    url: `/blog/${post.slug}`,
    tags: post.tags,
    image: post.image,
    category: post.category,
    readingTime: post.readingTime,
    description: post.description,
  }

  const canonicalUrl = `https://frankx.ai/blog/${post.slug}`
  const wordCount = post.content.split(/\s+/).filter(Boolean).length
  const imageUrl = post.image
    ? new URL(post.image, 'https://frankx.ai').toString()
    : new URL(siteConfig.ogImage, 'https://frankx.ai').toString()

  // Article Schema
  const articleSchema = {
    headline: post.title,
    description: post.description,
    image: [imageUrl],
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://frankx.ai',
      jobTitle: 'AI Architect',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: 'https://frankx.ai',
      logo: {
        '@type': 'ImageObject',
        url: new URL(siteConfig.ogImage, 'https://frankx.ai').toString(),
      },
    },
    datePublished: post.date,
    dateModified: post.lastUpdated || post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    wordCount,
    keywords: post.keywords?.join(', ') || post.tags?.join(', ') || post.category || '',
    ...(post.tldr && { abstract: post.tldr }),
  }

  // Extract FAQ from content body for FAQPage schema
  const extractedFaqs = extractFAQFromContent(post.content)

  // Resolve series siblings (published parts) when this post belongs to a series
  const seriesPosts = post.series ? getSeriesPosts(post.series.slug) : []

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <JsonLd type="Article" data={articleSchema} />
      {extractedFaqs.length > 0 && (
        <JsonLd
          type="FAQPage"
          data={{
            mainEntity: extractedFaqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }}
        />
      )}

      {/* Editorial background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.10),rgba(6,182,212,0.04)_42%,transparent_72%)]" />
      </div>

      <article className="relative pt-28 pb-24">
        <div className="px-6">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs
              items={[
                { label: 'Creation Chronicles', href: '/blog' },
                { label: post.title, href: `/blog/${post.slug}` },
              ]}
            />

            <header className="mt-8 space-y-6">
              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-400">
                  <Tag className="h-3.5 w-3.5" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-2 text-white/40">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center gap-2 text-white/40">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white tracking-tight">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-white/60 leading-relaxed max-w-3xl">
                {post.description}
              </p>

              {/* Author Card */}
              <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#101216] p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <Image src="/images/portraits/frankx-magical-forest.png" alt="Frank Riemer" width={48} height={48} className="rounded-full shadow-lg shadow-emerald-500/20 object-cover" />
                  <div>
                    <div className="text-base font-semibold text-white">{post.author || 'Frank'}</div>
                    <div className="text-sm text-white/50">AI Architect & Creator Systems Builder</div>
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </a>
                </div>
              </div>

              {/* Hero Image */}
              <HeroImage
                src={post.image}
                title={post.title}
                subtitle={post.description}
                alt={post.title}
                priority
                className="rounded-2xl"
              />

              {/* Reading Goal */}
              {post.readingGoal && (
                <div className="rounded-2xl border border-emerald-500/20 bg-[#101216] p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                      <Target className="h-4 w-4 text-emerald-300" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Reading Goal</span>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{post.readingGoal}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Series navigation — only for posts that belong to a series */}
              {post.series && (
                <SeriesNav
                  series={post.series}
                  currentSlug={post.slug}
                  publishedParts={seriesPosts}
                />
              )}
            </header>
          </div>
        </div>

        <div className="px-6 pt-12">
          <div className="mx-auto max-w-[680px]">
            <TableOfContents />
            <div className="article-prose">
              <MDXContent source={post.content} />
            </div>
          </div>

          {/* Wider container for cards and meta sections */}
          <div className="mx-auto max-w-4xl">
            {/* Value-driven CTA cards with SparkBorder */}
            <div className="mt-16">
              <BlogFooterCTA />
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 border-t border-white/10 pt-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">Tags</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:bg-white/10"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <RelatedResearch blogSlug={slug} />

            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                FrankX.AI / AI Architecture, Creator Systems, and Builder Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="px-6 pt-20">
          <div className="mx-auto max-w-3xl">
            <InlineLeadMagnet
              variant="banner"
              headline="Stay in the intelligence loop"
              description="Weekly field notes on AI systems, production patterns, and builder strategy."
              listType="newsletter"
            />
          </div>
        </div>

        {/* Related Posts */}
        <div className="px-6 pt-4">
          <div className="mx-auto max-w-4xl">
            <Recommendations documents={documents} currentDocument={currentDocument} />
          </div>
        </div>
      </article>
    </div>
  )
}



