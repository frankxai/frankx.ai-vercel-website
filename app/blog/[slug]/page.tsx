import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, Clock, Linkedin, Tag, Twitter } from 'lucide-react'

import { MDXContent } from '@/components/blog/MDXContent'
import ReadingProgress from '@/components/blog/ReadingProgress'
import TableOfContents from '@/components/blog/TableOfContents'
import RelatedResearch from '@/components/blog/RelatedResearch'
import BlogFooterCTA from '@/components/blog/BlogFooterCTA'
import Recommendations from '@/components/recommendations/Recommendations'
import { InlineLeadMagnet } from '@/components/conversion/InlineLeadMagnet'
import { getAllBlogPosts, getBlogPost, extractFAQFromContent } from '@/lib/blog'
import { createMetadata, siteConfig } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import HeroImage from '@/components/ui/HeroImage'

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
    updatedTime: post.lastUpdated || undefined,
    authors: [post.author],
    keywords: post.keywords || undefined,
    canonical: post.canonical || undefined,
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
      description:
        "Former Oracle AI architect who helped build Oracle's AI Center of Excellence. Independent builder of agentic AI systems and creator of 500+ AI-assisted songs.",
      alumniOf: {
        '@type': 'Organization',
        name: 'Oracle',
      },
      sameAs: [
        'https://x.com/frankxeth',
        'https://www.linkedin.com/in/frank-x-riemer/',
        'https://github.com/frankxai',
        'https://www.youtube.com/@frankxai',
      ],
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

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <ReadingProgress />
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

      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
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
              <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <Image src="/images/portraits/frankx-magical-forest.png" alt="Frank Riemer" width={48} height={48} className="rounded-full shadow-lg shadow-emerald-500/20 object-cover" />
                  <div>
                    <div className="text-base font-semibold text-white">{post.author || 'Frank'}</div>
                    <div className="text-sm text-white/50">AI Architect & Creator</div>
                    <div className="text-xs text-white/35">Former Oracle AI architect · helped build Oracle&apos;s AI CoE</div>
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/[0.12] hover:border-white/20 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    <Twitter className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Share</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/[0.12] hover:border-white/20 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Share</span>
                  </a>
                </div>
              </div>

              {/* Hero Image */}
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <HeroImage
                  src={post.image}
                  title={post.title}
                  subtitle={post.description}
                  alt={post.title}
                  priority
                />
              </div>

              {/* Reading Goal */}
              {post.readingGoal && (
                <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                      {/* Target / aim SVG — avoids emoji rendering inconsistency */}
                      <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-400">Reading Goal</span>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">{post.readingGoal}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Architect Recommendation — the signature routing box */}
              {post.architectNote && (
                <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/20">
                      <svg className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3M7.5 6h9A1.5 1.5 0 0118 7.5v9a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 016 16.5v-9A1.5 1.5 0 017.5 6z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-400">AI Architect Recommendation</span>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{post.architectNote.recommendation}</p>
                      {post.architectNote.coePillar && (
                        <p className="mt-3 text-xs text-white/40">
                          AI CoE pillar: <span className="text-white/65">{post.architectNote.coePillar}</span>
                        </p>
                      )}
                      {post.architectNote.personas?.length ? (
                        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                          {post.architectNote.personas.map((pp) => (
                            <li key={pp.persona} className="text-xs leading-relaxed text-white/55">
                              <span className="font-medium text-white/80">{pp.persona}:</span> {pp.pick}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
            </header>
          </div>
        </div>

        <div className="px-6 pt-12">
          <div className="mx-auto max-w-3xl">
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
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/55 transition-all duration-200 hover:bg-emerald-500/10 hover:border-emerald-500/25 hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <RelatedResearch blogSlug={slug} />

            {/* Axi article footer accent */}
            <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-8">
              <Image
                src="/images/mascot/axi-v3-icon.png"
                alt="Axi"
                width={36}
                height={36}
                className="rounded-lg opacity-60"
              />
              <p className="text-xs text-white/30">
                Read on <span className="text-white/50">FrankX.AI</span> — AI Architecture, Music & Creator Intelligence
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
    </main>
  )
}




