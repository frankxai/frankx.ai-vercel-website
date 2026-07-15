import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Zap } from 'lucide-react'
import { getShorts, getAllVideos } from '@/lib/video'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import {
  buildVideoObjectSchema,
  buildBreadcrumbSchema,
  buildItemListSchema,
  durationToIso8601,
  SITE_CONFIG,
} from '@/lib/schema-builders'
import ShortsClient from './ShortsClient'

const PAGE_URL = `${SITE_CONFIG.url}/watch/shorts`

// FAQ schema → AEO (AI Overview, Perplexity citations)
const shortsFAQ = [
  {
    question: 'What are AI Shorts on FrankX?',
    answer:
      'Curated vertical (9:16) videos \u2264 60 seconds that deliver high-signal insights on AI, peak performance, and building things that last. Each Short is paired with Frank\u2019s editorial commentary explaining why it matters to builders, creators, and AI architects.',
  },
  {
    question: 'Who curates these Shorts?',
    answer:
      'Frank Riemer \u2014 former AI architect at Oracle \u2014 personally selects each Short. The curation filter: does this compress a real insight into 60 seconds or less? If not, it doesn\u2019t make the page. Independent project. Not affiliated with, endorsed by, or sponsored by Oracle.',
  },
  {
    question: 'Why 60 seconds?',
    answer:
      'Short-form is the fastest way to expose your mind to new frameworks. A great 60-second Short can shift how you operate for years. The cost of watching is nothing. The upside is compounding. Frank\u2019s Personal AI CoE approach treats Shorts as rapid-fire pattern library \u2014 the same way enterprise CoEs use curated case studies.',
  },
  {
    question: 'Can I submit a Short to be featured?',
    answer:
      'Yes \u2014 send any YouTube Short link via the contact form or @frankxeth on X. The bar: compresses a non-obvious insight on AI, creative craft, or peak performance into under 60 seconds.',
  },
  {
    question: 'How do Shorts fit into FrankX\u2019s broader learning system?',
    answer:
      'Shorts are the top of the learning funnel inside ACOS (Agentic Creator OS). Scan Shorts for signal \u2192 save long-form videos to watchlists \u2192 convert ideas into blog posts, prompts, and products. Each Short has a commentary slot because pattern recognition requires interpretation, not just exposure.',
  },
]

export default function ShortsPage() {
  const shorts = getShorts()
  const allVideos = getAllVideos()
  const hero = shorts[0] // First short is the featured hero

  // Load transcript for hero Short (if exists)
  let heroTranscript: string | null = null
  if (hero) {
    try {
      heroTranscript = fs.readFileSync(
        path.join(process.cwd(), 'data/video-transcripts', `${hero.id}.txt`),
        'utf8'
      ).trim() || null
    } catch { /* not yet transcribed */ }
  }

  // Build VideoObject schema for every Short — required for Google video rich results
  const videoSchemas = shorts.map((short) =>
    buildVideoObjectSchema({
      name: short.title,
      description:
        short.description ||
        short.commentary ||
        `${short.title} \u2014 curated by FrankX for the Watch: Shorts collection.`,
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
  )

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Watch', url: '/watch' },
    { name: 'Shorts', url: '/watch/shorts' },
  ])

  const collectionList = buildItemListSchema({
    name: 'FrankX Curated AI Shorts',
    description:
      'High-signal vertical Shorts on AI, peak performance, and the craft of building \u2014 curated by AI Architect Frank Riemer.',
    items: shorts.map((short) => ({
      name: short.title,
      url: `https://www.youtube.com/shorts/${short.id}`,
      description: short.commentary || short.description,
    })),
  })

  const collectionPage = {
    name: 'AI Shorts Collection',
    description:
      '60-second high-signal Shorts curated by FrankX \u2014 each paired with AI Architect commentary.',
    url: PAGE_URL,
    hasPart: videoSchemas,
  }

  return (
    <>
      {/* SEO / AEO structured data */}
      <JsonLd type="BreadcrumbList" data={breadcrumb} id="breadcrumb-shorts" />
      <JsonLd type="CollectionPage" data={collectionPage} id="collection-shorts" />
      <JsonLd type="ItemList" data={collectionList} id="itemlist-shorts" />
      {videoSchemas.map((schema, i) => (
        <JsonLd
          key={shorts[i].id}
          type="VideoObject"
          data={schema as unknown as Record<string, unknown>}
          id={`video-${shorts[i].id}`}
        />
      ))}
      <FAQPageJsonLd faqs={shortsFAQ} id="faq-shorts" />

      <main className="min-h-screen bg-void text-white">
        {/* Breadcrumb — visible */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 pt-6">
          <ol className="flex items-center gap-2 text-xs text-white/40">
            <li>
              <Link href="/" className="hover:text-white/70 transition-colors">
                FrankX
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/watch" className="hover:text-white/70 transition-colors inline-flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Watch
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-white/80 font-medium">Shorts</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 pt-10 pb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-rose-400 font-bold mb-5">
            <Zap className="w-4 h-4" />
            <span>AI Shorts &mdash; 60-second signal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6 max-w-4xl">
            60 seconds.{' '}
            <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Zero filler.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed">
            Vertical Shorts curated by an AI Architect. The bar is brutal: does this compress a
            real insight into under a minute? If not, it doesn&rsquo;t make the page. Every Short
            is paired with commentary on why it matters to builders, creators, and the Personal
            AI CoE you&rsquo;re assembling.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/50">
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              {shorts.length} Short{shorts.length === 1 ? '' : 's'} curated
            </span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Updated weekly
            </span>
            <span className="px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300">
              Human-curated, not algorithmic
            </span>
          </div>
        </section>

        {/* Interactive grid + lightbox (client) */}
        <ShortsClient shorts={shorts} allVideos={allVideos} />

        {/* Featured commentary — Frank&rsquo;s editorial voice */}
        {hero && hero.commentary && (
          <section className="max-w-4xl mx-auto px-6 py-16">
            <div className="card-premium rounded-3xl p-8 md:p-10 border-l-4 border-emerald-500">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-bold mb-4">
                <Sparkles className="w-4 h-4" />
                Frank&rsquo;s Take &mdash; {hero.title}
              </div>
              <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-white/90 italic">
                &ldquo;{hero.commentary}&rdquo;
              </blockquote>
              <p className="text-sm text-white/40 mt-6">
                &mdash; Frank Riemer, AI Architect &middot;{' '}
                <Link href="/about" className="text-emerald-400 hover:underline">
                  Personal AI CoE
                </Link>
              </p>
            </div>

            {/* Transcript — AEO gold */}
            <details className="mt-6 group" open={!!heroTranscript}>
              <summary className="cursor-pointer list-none px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors flex items-center justify-between">
                <span>
                  {heroTranscript ? 'Full transcript' : 'View transcript (coming soon)'}
                </span>
                <span className="text-xs text-white/40 group-open:rotate-180 transition-transform">
                  &#9662;
                </span>
              </summary>
              <div className="mt-3 p-5 rounded-2xl bg-black/30 border border-white/5 text-sm text-white/60 leading-relaxed">
                {heroTranscript || (
                  <>
                    Transcript generated via{' '}
                    <code className="text-emerald-400 font-mono text-xs">/video-transcribe</code>{' '}
                    &mdash; making this Short citable by ChatGPT, Perplexity, and Google AI Overviews.
                  </>
                )}
              </div>
            </details>
          </section>
        )}

        {/* How Frank curates — productization signal */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How this Shorts library is built
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-3xl">
            Shorts are the top of the learning funnel inside{' '}
            <Link href="/acos" className="text-emerald-400 hover:underline">
              ACOS
            </Link>{' '}
            &mdash; the Agentic Creator OS. Here&rsquo;s the exact pipeline you can steal for your
            own knowledge system.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                n: '01',
                title: 'Capture from mobile',
                body: 'iOS/Android share sheet \u2192 Notion Video Inbox database. Works from the YouTube app, Twitter, anywhere you scroll.',
              },
              {
                n: '02',
                title: 'Sync + stage',
                body: 'GitHub Action syncs Notion \u2192 video-staging.json every hour. Nothing publishes until Frank reviews with commentary.',
              },
              {
                n: '03',
                title: 'Publish with AEO',
                body: 'Each Short gets VideoObject schema, transcript, commentary, and category placement \u2014 so it\u2019s found by Google and cited by AI.',
              },
            ].map((step) => (
              <div
                key={step.n}
                className="card-premium rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-colors"
              >
                <div className="text-xs font-mono text-emerald-400 mb-2">{step.n}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/acos"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition-colors"
            >
              Explore ACOS
            </Link>
            <Link
              href="/watch"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Full video library
            </Link>
          </div>
        </section>

        {/* FAQ — AEO goldmine */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/5">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Questions about AI Shorts
          </h2>
          <div className="space-y-3">
            {shortsFAQ.map((faq, i) => (
              <details
                key={i}
                className="group card-premium rounded-2xl border border-white/10 overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    {faq.question}
                  </h3>
                  <span className="text-white/40 text-sm group-open:rotate-180 transition-transform flex-none">
                    &#9662;
                  </span>
                </summary>
                <div className="px-6 pb-6 text-white/70 leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
