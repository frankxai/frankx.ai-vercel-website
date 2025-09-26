import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowLeft, ArrowRight, Calendar, Clock, Linkedin, Share2, Tag, Twitter } from 'lucide-react'

import { mdxComponents } from '@/components/blog/MDXComponents'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import BlogCard from '@/components/blog/BlogCard'
import Recommendations from '@/components/recommendations/Recommendations'
import { getAllBlogPosts, getBlogPost } from '@/lib/blog'
import { createMetadata, siteConfig } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

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
    image: post.image || `/api/og?title=${encodeURIComponent(post.title)}`,
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
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3)

  const documents = allPosts.map((postItem) => ({
    title: postItem.title,
    content: postItem.content,
    url: `/blog/${postItem.slug}`,
    tags: postItem.tags,
  }))

  const currentDocument = {
    title: post.title,
    content: post.content,
    url: `/blog/${post.slug}`,
    tags: post.tags,
  }

  const canonicalUrl = `https://frankx.ai/blog/${post.slug}`
  const wordCount = post.content.split(/\s+/).filter(Boolean).length
  const imageUrl = post.image
    ? new URL(post.image, 'https://frankx.ai').toString()
    : new URL(siteConfig.ogImage, 'https://frankx.ai').toString()
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: [imageUrl],
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: new URL(siteConfig.ogImage, 'https://frankx.ai').toString(),
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    wordCount,
    keywords: post.keywords?.join(', ') || post.tags.join(', '),
    url: canonicalUrl,
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Script
        id="article-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navigation />

      <article className="pt-28 pb-24">
        <div className="px-6">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Link>

            <header className="mt-10 space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1">
                  <Tag className="h-3.5 w-3.5" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
              </div>

              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">{post.title}</h1>
              <p className="text-lg text-white/75 leading-relaxed">{post.description}</p>

              <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-sky-500 text-lg font-semibold text-white">
                    {post.author[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{post.author}</div>
                    <div className="text-xs uppercase tracking-[0.3em] text-white/60">Oracle AI Architect</div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <Share2 className="h-4 w-4" />
                    Share
                  </span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                  >
                    <Twitter className="h-4 w-4" />
                    Post to X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                  >
                    <Linkedin className="h-4 w-4" />
                    Share on LinkedIn
                  </a>
                </div>
              </div>

              {post.image && (
                <div className="overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={1280}
                    height={720}
                    className="h-auto w-full"
                    priority
                  />
                </div>
              )}

              {post.readingGoal && (
                <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-primary-500/20 via-slate-900 to-slate-950 p-6 text-sm text-white/80">
                  <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Reading Ritual</span>
                  <p className="mt-2 leading-relaxed">{post.readingGoal}</p>
                </div>
              )}
            </header>
          </div>
        </div>

        <div className="px-6 pt-12">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-6 text-base leading-relaxed text-white/75">
              <MDXRemote source={post.content} components={mdxComponents as any} />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Live roadmap</span>
                <h3 className="mt-3 text-lg font-semibold text-white">See how this article powers the 2025 plan</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Review the FrankX roadmap hub for the latest milestones, rituals, and metrics connected to every Atlas release.
                </p>
                <Link
                  href="/roadmap"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline"
                >
                  Explore the roadmap
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Resource library</span>
                <h3 className="mt-3 text-lg font-semibold text-white">Grab the templates that accompany this drop</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Access collections of assessments, canvases, and playbooks that convert these ideas into operating rituals.
                </p>
                <Link
                  href="/resources"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline"
                >
                  Browse resources
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Automation</span>
                <h3 className="mt-3 text-lg font-semibold text-white">Run the daily specs check</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Execute <code className="rounded bg-white/10 px-2 py-1 text-xs">npm run roadmap:check</code> to print pillars, milestones, and next actions before your next intelligence ritual.
                </p>
                <Link
                  href="/docs/ROADMAP_AUTOMATION.md"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline"
                >
                  View instructions
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
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
          </div>
        </div>

        <div className="px-6 pt-16">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h3 className="text-2xl font-semibold text-white">Stay in the intelligence loop</h3>
            <p className="mt-3 text-sm text-white/70">
              Join 1,000+ creators and executives receiving weekly field notes on conscious AI systems, music rituals, and agent strategy.
            </p>
            <form action="/api/newsletter" method="POST" className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-primary-500 via-primary-600 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(56,189,248,0.35)] hover:-translate-y-0.5 transition-transform"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs text-white/60">No spam. Opt out anytime.</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <Recommendations documents={documents} currentDocument={currentDocument} />
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}




