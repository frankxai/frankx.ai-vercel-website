import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Calendar, Mail, Share2 } from 'lucide-react'
import { MDXContent } from '@/components/blog/MDXContent'
import { getAllNewsletters, getNewsletter } from '@/lib/newsletters'
import { createMetadata, siteConfig } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'

export const dynamicParams = false

export async function generateStaticParams() {
  const newsletters = getAllNewsletters()
  return newsletters.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const newsletter = getNewsletter(slug)

  if (!newsletter) {
    return createMetadata({
      title: 'Newsletter Not Found',
      description: 'The requested newsletter issue could not be found.',
      path: `/newsletter/archive/${slug}`,
    })
  }

  return createMetadata({
    title: `${newsletter.title} - The FrankX Letter #${newsletter.issueNumber}`,
    description: newsletter.description,
    path: `/newsletter/archive/${newsletter.slug}`,
    type: 'article',
    publishedTime: newsletter.date,
    authors: ['Frank Riemer'],
  })
}

export default async function NewsletterIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const newsletter = getNewsletter(slug)

  if (!newsletter) {
    notFound()
  }

  const allNewsletters = getAllNewsletters()
  const currentIndex = allNewsletters.findIndex((n) => n.slug === slug)
  const prevNewsletter = currentIndex < allNewsletters.length - 1 ? allNewsletters[currentIndex + 1] : null
  const nextNewsletter = currentIndex > 0 ? allNewsletters[currentIndex - 1] : null

  const canonicalUrl = `${siteConfig.url}/newsletter/archive/${newsletter.slug}`

  const articleSchema = {
    headline: newsletter.title,
    description: newsletter.description,
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    datePublished: newsletter.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <JsonLd type="Article" data={articleSchema} />

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <article className="relative pt-28 pb-24">
        <div className="px-6">
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <Link
              href="/newsletter/archive"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Archive
            </Link>

            {/* Header */}
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">
                  <Mail className="h-4 w-4 text-violet-400" />
                  <span className="text-sm font-medium text-violet-400">
                    Issue #{newsletter.issueNumber}
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-white/50">
                  <Calendar className="h-4 w-4" />
                  {new Date(newsletter.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-4">
                {newsletter.title}
              </h1>

              <p className="text-xl text-white/60">
                {newsletter.description}
              </p>

              {/* Share */}
              <div className="flex items-center gap-3 mt-6">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(newsletter.title)}&url=${encodeURIComponent(canonicalUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </a>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <MDXContent source={newsletter.content} />
            </div>

            {/* Navigation */}
            <nav className="mt-16 pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                {prevNewsletter ? (
                  <Link
                    href={`/newsletter/archive/${prevNewsletter.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-violet-500/30 hover:bg-white/[0.04] transition-all flex-1"
                  >
                    <ArrowLeft className="h-5 w-5 text-white/40 group-hover:text-violet-400" />
                    <div>
                      <span className="text-xs text-white/40">Previous Issue</span>
                      <p className="text-sm font-medium text-white group-hover:text-violet-100">
                        #{prevNewsletter.issueNumber}: {prevNewsletter.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextNewsletter && (
                  <Link
                    href={`/newsletter/archive/${nextNewsletter.slug}`}
                    className="group flex items-center justify-end gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-violet-500/30 hover:bg-white/[0.04] transition-all flex-1 text-right"
                  >
                    <div>
                      <span className="text-xs text-white/40">Next Issue</span>
                      <p className="text-sm font-medium text-white group-hover:text-violet-100">
                        #{nextNewsletter.issueNumber}: {nextNewsletter.title}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-violet-400" />
                  </Link>
                )}
              </div>
            </nav>

            {/* Subscribe CTA */}
            <div className="mt-12 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-pink-900/20 p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Enjoyed this issue?
              </h3>
              <p className="text-white/60 mb-6">
                Subscribe to get the next one delivered straight to your inbox.
              </p>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                <Mail className="h-5 w-5" />
                Subscribe to The FrankX Letter
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
