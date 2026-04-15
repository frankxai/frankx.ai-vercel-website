import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Sparkles, Play, Clock, User, Tag } from 'lucide-react'
import { getShorts, getVideoById } from '@/lib/video'
import JsonLd from '@/components/seo/JsonLd'
import {
  buildVideoObjectSchema,
  buildBreadcrumbSchema,
  durationToIso8601,
  SITE_CONFIG,
} from '@/lib/schema-builders'
import Image from 'next/image'
import { UniversalEmbed } from '@/components/embeds/UniversalEmbed'
import { ShortDetailClient } from '@/components/watch/ShortDetailClient'

// Static params for SSG — all known Shorts pre-rendered at build time
export async function generateStaticParams() {
  return getShorts().map((short) => ({ id: short.id }))
}

// Per-Short SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const short = getVideoById(id)
  if (!short || short.format !== 'short') {
    return { title: 'Short not found' }
  }

  const description =
    short.commentary ||
    short.description ||
    `${short.title} — curated by FrankX with AI Architect commentary.`

  return {
    title: `${short.title} — AI Architect's take | FrankX Shorts`,
    description: description.slice(0, 160),
    keywords: [...short.tags, 'AI shorts', 'FrankX', short.author],
    openGraph: {
      title: short.title,
      description: description.slice(0, 200),
      type: 'video.other',
      url: `${SITE_CONFIG.url}/watch/shorts/${short.id}`,
      videos: [
        {
          url: `https://www.youtube.com/embed/${short.id}`,
          width: 405,
          height: 720,
          type: 'text/html',
        },
      ],
      images: [
        {
          url: `https://img.youtube.com/vi/${short.id}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
          alt: short.title,
        },
      ],
    },
    twitter: {
      card: 'player',
      title: short.title,
      description: description.slice(0, 200),
      images: [`https://img.youtube.com/vi/${short.id}/maxresdefault.jpg`],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/watch/shorts/${short.id}`,
    },
  }
}

export default async function ShortDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const short = getVideoById(id)
  if (!short || short.format !== 'short') notFound()

  const allShorts = getShorts()
  const related = allShorts.filter((s) => s.id !== short.id).slice(0, 6)

  // Full schema stack
  const videoSchema = buildVideoObjectSchema({
    name: short.title,
    description:
      short.commentary ||
      short.description ||
      `${short.title} — curated by FrankX.`,
    thumbnailUrl: [
      `https://img.youtube.com/vi/${short.id}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${short.id}/hqdefault.jpg`,
    ],
    uploadDate: short.uploadDate || '2026-04-14',
    duration: durationToIso8601(short.duration),
    contentUrl: short.url,
    embedUrl: `https://www.youtube.com/embed/${short.id}`,
    author: short.author,
    keywords: short.tags,
  })

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Watch', url: '/watch' },
    { name: 'Shorts', url: '/watch/shorts' },
    { name: short.title, url: `/watch/shorts/${short.id}` },
  ])

  return (
    <>
      <JsonLd
        type="VideoObject"
        data={videoSchema as unknown as Record<string, unknown>}
        id={`video-${short.id}`}
      />
      <JsonLd type="BreadcrumbList" data={breadcrumb} id={`breadcrumb-${short.id}`} />
      <ShortDetailClient
        shortId={short.id}
        shortTitle={short.title}
        shortAuthor={short.author}
      />

      <main className="min-h-screen bg-void text-white">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 pt-6">
          <ol className="flex items-center gap-2 text-xs text-white/40">
            <li>
              <Link href="/" className="hover:text-white/70 transition-colors">
                FrankX
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/watch" className="hover:text-white/70 transition-colors">
                Watch
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/watch/shorts"
                className="hover:text-white/70 transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" /> Shorts
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-white/80 font-medium truncate max-w-md">{short.title}</li>
          </ol>
        </nav>

        {/* Main — split layout: 9:16 embed + commentary */}
        <article className="max-w-6xl mx-auto px-6 pt-10 pb-16">
          <div className="grid md:grid-cols-[400px_1fr] gap-8 lg:gap-12">
            {/* Embed — 9:16 vertical */}
            <div className="w-full max-w-[400px] mx-auto">
              <div className="aspect-[9/16] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <UniversalEmbed
                  type="youtube"
                  id={short.id}
                  aspectRatio="9:16"
                  showControls={false}
                  title={short.title}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                <div className="inline-flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {short.duration}
                </div>
                <a
                  href={short.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Open on YouTube →
                </a>
              </div>
            </div>

            {/* Content — commentary, metadata, transcript */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Play className="w-3 h-3 fill-current" />
                Short
              </div>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
                {short.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-6">
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {short.author}
                </span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <Link
                    href="/watch"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {short.category}
                  </Link>
                </span>
              </div>

              {/* Frank's Take — the editorial moat */}
              {short.commentary && (
                <div className="card-premium rounded-3xl p-6 md:p-8 border-l-4 border-emerald-500 mb-8">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3">
                    <Sparkles className="w-4 h-4" />
                    Frank&rsquo;s Take
                  </div>
                  <blockquote className="text-lg md:text-xl font-light leading-relaxed text-white/90 italic">
                    &ldquo;{short.commentary}&rdquo;
                  </blockquote>
                  <p className="text-xs text-white/40 mt-4">
                    &mdash; Frank Riemer, AI Architect
                  </p>
                </div>
              )}

              {/* Tags */}
              {short.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {short.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Transcript slot — AEO */}
              <details className="group mb-8">
                <summary className="cursor-pointer list-none px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors flex items-center justify-between">
                  <span>Transcript</span>
                  <span className="text-xs text-white/40 group-open:rotate-180 transition-transform">
                    &#9662;
                  </span>
                </summary>
                <div className="mt-3 p-5 rounded-2xl bg-black/30 border border-white/5 text-sm text-white/50 leading-relaxed">
                  Transcript generates via{' '}
                  <code className="text-emerald-400 font-mono text-xs">
                    /video-transcribe {short.id}
                  </code>{' '}
                  &mdash; lands here automatically, unlocks citation by Google AI
                  Overviews, Perplexity, and ChatGPT.
                </div>
              </details>

              {/* Why this matters — AEO content block */}
              <div className="prose prose-invert prose-sm max-w-none">
                <h2 className="text-sm uppercase tracking-widest text-white/50 font-bold mb-3">
                  Why this Short made the cut
                </h2>
                <p className="text-white/70 leading-relaxed">
                  FrankX Shorts is a curated library, not an algorithm. Each Short
                  earns its place by compressing a real insight &mdash; a framework,
                  a non-obvious observation, a shift in how you operate &mdash; into
                  under 60 seconds. &ldquo;{short.title}&rdquo; by {short.author}{' '}
                  clears that bar in the <strong>{short.category}</strong> pillar.
                </p>
                <p className="text-white/70 leading-relaxed mt-4">
                  Want to submit a Short for the library? The filter: does this
                  compress a non-obvious insight on AI, creative craft, or peak
                  performance into under a minute? DM{' '}
                  <a
                    href="https://x.com/frankxeth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline"
                  >
                    @frankxeth
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Related Shorts */}
          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-white/5">
              <h2 className="text-2xl font-bold mb-6">More curated Shorts</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {related.map((s) => (
                  <Link
                    key={s.id}
                    href={`/watch/shorts/${s.id}`}
                    className="group block rounded-2xl overflow-hidden card-premium hover:-translate-y-1 transition-all"
                  >
                    <div className="relative aspect-[9/16] bg-black/40 border border-white/5 overflow-hidden">
                      <Image
                        src={`https://img.youtube.com/vi/${s.id}/hqdefault.jpg`}
                        alt={s.title}
                        fill
                        className="object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                        sizes="(max-width: 768px) 40vw, 180px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-[9px] font-bold uppercase tracking-widest">
                        Short
                      </div>
                      <div className="absolute bottom-0 inset-x-0 p-3">
                        <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-[10px] text-white/60 mt-1 font-medium">
                          {s.author}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/watch/shorts"
                  className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  ← Back to all Shorts
                </Link>
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  )
}
