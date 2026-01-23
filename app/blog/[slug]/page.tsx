import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Calendar, Clock, Linkedin, Share2, Tag, Twitter } from 'lucide-react'

import { MDXContent } from '@/components/blog/MDXContent'
import Recommendations from '@/components/recommendations/Recommendations'
import { getAllBlogPosts, getBlogPost } from '@/lib/blog'
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

  // Article Schema
  const articleSchema = {
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
  }

  return (
    <div className="min-h-screen bg-void text-white">
      <JsonLd type="Article" data={articleSchema} />

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
              <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-xl font-bold text-white shadow-lg shadow-emerald-500/20">
                    {post.author?.[0] || 'F'}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">{post.author || 'Frank'}</div>
                    <div className="text-sm text-white/50">Oracle AI Architect & Creator</div>
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
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                      <span className="text-lg">🎯</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Reading Goal</span>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{post.readingGoal}</p>
                    </div>
                  </div>
                </div>
              )}
            </header>
          </div>
        </div>

        <div className="px-6 pt-12">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-6 text-base leading-relaxed text-white/75">
              <MDXContent source={post.content} />
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <article className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <span className="text-xl">🗺️</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Live Roadmap</span>
                <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-emerald-100 transition-colors">See how this article powers the 2025 plan</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">
                  Review the FrankX roadmap hub for the latest milestones, rituals, and metrics connected to every Atlas release.
                </p>
                <Link
                  href="/roadmap"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group-hover:gap-3"
                >
                  Explore the roadmap
                  <ArrowRight className="h-4 w-4 transition-transform" />
                </Link>
              </article>

              <article className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                  <span className="text-xl">📚</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Resource Library</span>
                <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-cyan-100 transition-colors">Grab the templates that accompany this drop</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">
                  Access collections of assessments, canvases, and playbooks that convert these ideas into operating rituals.
                </p>
                <Link
                  href="/resources"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:gap-3"
                >
                  Browse resources
                  <ArrowRight className="h-4 w-4 transition-transform" />
                </Link>
              </article>

              <article className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                  <span className="text-xl">⚡</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Automation</span>
                <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-purple-100 transition-colors">Run the daily specs check</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">
                  Execute <code className="rounded bg-white/10 px-2 py-0.5 text-xs font-mono">npm run roadmap:check</code> to print pillars, milestones, and next actions.
                </p>
                <Link
                  href="/roadmap"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group-hover:gap-3"
                >
                  View Roadmap
                  <ArrowRight className="h-4 w-4 transition-transform" />
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

        <div className="px-6 pt-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent p-10 text-center backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="text-lg">✨</span>
              <span className="text-xs font-medium text-emerald-400">Weekly Intelligence</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Stay in the intelligence loop</h3>
            <p className="text-base text-white/60 leading-relaxed max-w-2xl mx-auto">
              Join 1,000+ creators and executives receiving weekly field notes on conscious AI systems, music rituals, and agent strategy.
            </p>
            <form action="/api/newsletter" method="POST" className="mt-8 flex flex-col gap-3 sm:flex-row max-w-lg mx-auto">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all"
              />
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-xs text-white/40">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <Recommendations documents={documents} currentDocument={currentDocument} />
          </div>
        </div>
      </article>
    </div>
  )
}




