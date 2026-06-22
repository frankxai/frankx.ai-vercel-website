import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { bookReviews, getAllReviewCategories } from '@/data/book-reviews';
import { booksRegistry } from '@/app/books/lib/books-registry';

const SITE_URL = 'https://frankx.ai';
const LIBRARY_URL = `${SITE_URL}/library`;

export const metadata: Metadata = {
  title: 'Library | Book Reviews & Key Insights | FrankX',
  description:
    'Curated book reviews with key insights from the best books on self-development, mindset, creativity, wealth, and the architecture of reality. Read the ideas that shaped our own books.',
  keywords: [
    'book reviews',
    'book summaries',
    'reading list',
    'best self-development books',
    'book key insights',
    'curated reading',
    'Profit First review',
    'Fabric of Reality review',
  ],
  alternates: { canonical: LIBRARY_URL },
  openGraph: {
    title: 'The Library | FrankX',
    description: 'Key insights from the books that matter most.',
    type: 'website',
    url: LIBRARY_URL,
    siteName: 'FrankX',
    images: [
      {
        url: '/hero-homepage.png',
        width: 1200,
        height: 630,
        alt: 'FrankX Library — book reviews and key insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Library | FrankX',
    description: 'Key insights from the books that matter most.',
    images: ['/hero-homepage.png'],
  },
};

function CollectionJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Library', item: LIBRARY_URL },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'The FrankX Library',
        description:
          'Curated book reviews with key insights — the ideas that shaped our own books.',
        url: LIBRARY_URL,
        isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
      },
      {
        '@type': 'ItemList',
        name: 'Book Reviews',
        numberOfItems: bookReviews.length,
        itemListElement: bookReviews.map((review, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${LIBRARY_URL}/${review.slug}`,
          name: `${review.title} by ${review.author}`,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const categoryColors: Record<string, string> = {
  'Self-Development': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Habits: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Psychology: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Productivity: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Focus: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Mindset: 'bg-red-500/10 text-red-400 border-red-500/20',
  Fitness: 'bg-red-500/10 text-red-400 border-red-500/20',
  Fiction: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Philosophy: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Stoicism: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Creativity: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Wealth: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Classic: 'bg-stone-500/10 text-stone-400 border-stone-500/20',
  Writing: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  Career: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Spirituality: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Memoir: 'bg-stone-500/10 text-stone-400 border-stone-500/20',
  Autobiography: 'bg-stone-500/10 text-stone-400 border-stone-500/20',
  Discipline: 'bg-red-500/10 text-red-400 border-red-500/20',
  Ikigai: 'bg-teal-500/10 text-teal-300 border-teal-500/25',
  Longevity: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
  Meaning: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
  Health: 'bg-green-500/10 text-green-300 border-green-500/25',
  Anthropology: 'bg-stone-500/10 text-stone-300 border-stone-500/25',
  Neuroscience: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/25',
  'Inner Work': 'bg-violet-500/10 text-violet-300 border-violet-500/25',
  IFS: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
  Music: 'bg-pink-500/10 text-pink-300 border-pink-500/25',
  'Rockstar Energy': 'bg-orange-500/10 text-orange-300 border-orange-500/25',
  Scenes: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= rating ? 'text-amber-400' : 'text-white/10'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function LibraryPage() {
  const categories = getAllReviewCategories();
  const sortedReviews = [...bookReviews].sort((a, b) =>
    b.reviewDate.localeCompare(a.reviewDate)
  );

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <CollectionJsonLd />
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-amber-400/80 text-sm tracking-[0.2em] uppercase mb-4">
            Curated Insights
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            The{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Library
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Key insights from the books that shaped our thinking. Not summaries — the ideas
            that changed how we build, create, and live. Each review connects back to our own
            books.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {categories.slice(0, 8).map((cat) => (
              <span
                key={cat}
                className={`px-3 py-1 text-xs font-medium rounded-full border ${
                  categoryColors[cat] || 'bg-white/5 text-white/50 border-white/10'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/library/quotes"
              className="inline-flex items-center gap-2 text-sm text-rose-300/80 hover:text-rose-200 transition-colors border border-rose-500/20 rounded-full px-4 py-2 bg-rose-500/5 hover:bg-rose-500/10"
            >
              Browse all quotes
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link
              href="/library/approach"
              className="inline-flex items-center gap-2 text-sm text-amber-400/80 hover:text-amber-300 transition-colors border border-amber-500/20 rounded-full px-4 py-2 bg-amber-500/5 hover:bg-amber-500/10"
            >
              How this library is built
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection — Rockstar Energy */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <Link
          href="/library/rockstar-energy"
          className="group block rounded-2xl border border-orange-500/[0.18] bg-gradient-to-br from-orange-500/[0.06] via-rose-500/[0.03] to-transparent p-6 sm:p-7 transition-all hover:border-orange-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-[0.24em] text-orange-300/80 mb-2">
                Featured Collection
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-orange-200 transition-colors">
                Rockstar Energy &amp; Mindset
              </h2>
              <p className="text-sm text-white/60 leading-relaxed mt-2 max-w-2xl">
                Eight books, Eno&apos;s <span className="italic">scenius</span>, and a watch list —
                a study path in taste, scenes, persona, and the artist&apos;s inner state. The
                question running through all of it: what makes people feel reality is more alive
                around them?
              </p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 px-4 py-2 text-sm font-medium text-orange-200 transition-colors group-hover:bg-orange-500/20">
              Enter the collection
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </Link>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedReviews.map((review) => {
            const relatedBook = review.relatedBook
              ? booksRegistry.find((b) => b.slug === review.relatedBook)
              : null;

            return (
              <Link
                key={review.slug}
                href={`/library/${review.slug}`}
                className="group block"
              >
                <article className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {review.hasCover ? (
                      <div className="w-16 h-24 rounded-lg border border-white/10 overflow-hidden flex-shrink-0 bg-white/5">
                        <Image
                          src={review.coverImage}
                          alt={`${review.title} by ${review.author} — book cover`}
                          width={128}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-24 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
                        <span className="text-2xl font-serif text-white/20">
                          {review.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                        {review.title}
                      </h2>
                      <p className="text-sm text-white/40 mb-1">by {review.author}</p>
                      <StarRating rating={review.rating} />
                    </div>
                    <span className="text-xs text-white/30">{review.readingTime}</span>
                  </div>

                  {/* Top Insight */}
                  <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-2">
                    {review.keyInsights[0]}
                  </p>

                  {/* Deep-dive badge */}
                  {(review.chapters?.length || review.quotes?.length) && (
                    <div className="flex flex-wrap gap-2 mb-4 -mt-2">
                      {review.quotes && review.quotes.length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-rose-500/10 text-rose-300/80 border border-rose-500/15">
                          {review.quotes.length} quotes
                        </span>
                      )}
                      {review.chapters && review.chapters.length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-violet-500/10 text-violet-300/80 border border-violet-500/15">
                          {review.chapters.length} chapters
                        </span>
                      )}
                      {review.videos && review.videos.length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-red-500/10 text-red-300/80 border border-red-500/15">
                          {review.videos.length} videos
                        </span>
                      )}
                    </div>
                  )}

                  {/* Categories */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {review.categories.map((cat) => (
                      <span
                        key={cat}
                        className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${
                          categoryColors[cat] ||
                          'bg-white/5 text-white/50 border-white/10'
                        }`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Related Book */}
                  {relatedBook && (
                    <div className="pt-3 border-t border-white/[0.06]">
                      <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">
                        Related to our book
                      </p>
                      <p className="text-xs text-amber-400/70">{relatedBook.title}</p>
                    </div>
                  )}
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Research articles grounded in this collection */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-violet-500/[0.16] bg-violet-500/[0.03] p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
            <h2 className="text-xl font-semibold text-white">Research grounded in this collection</h2>
            <span className="text-[10px] uppercase tracking-[0.18em] text-violet-200">flagship article</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed mb-5">
            Some of the books in this library are not just reading recommendations &mdash; they
            are sources for deep research articles. Where four library books cluster around
            one idea, you can read the meta-article that synthesises them.
          </p>
          <Link
            href="/research/blue-zones-ikigai-ai-era"
            className="group block rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-2">
              Blue Zones &middot; Ikigai &middot; AI Era
            </p>
            <h3 className="text-base font-semibold text-white mb-2">
              The four library books behind one Japanese word
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Kamiya (1966), Buettner (2005), Garc&iacute;a &amp; Miralles (2016), Mogi (2017) &mdash; the
              lineage of ikigai from psychiatric foundation to global bestseller, with an
              honest reckoning of the 2014 Western Venn. 12-minute read.
            </p>
          </Link>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <Link
              href="/workshops/ikigai-branding"
              prefetch={false}
              className="group block rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/[0.12] p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-1.5">
                Walk the practice
              </p>
              <p className="text-sm font-semibold text-white">Ikigai &amp; Branding workshop</p>
              <p className="text-xs text-white/55 mt-1 leading-relaxed">
                10 chapters, 13 prompts. Free. 75-minute self-guided walk.
              </p>
            </Link>
            <Link
              href="/research/conscious-ai-operating-systems"
              prefetch={false}
              className="group block rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/[0.12] p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-1.5">
                Adjacent research
              </p>
              <p className="text-sm font-semibold text-white">Conscious AI Operating Systems</p>
              <p className="text-xs text-white/55 mt-1 leading-relaxed">
                The architectural answer to the meaning question.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Books CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="rounded-2xl border border-amber-500/10 bg-amber-500/[0.03] p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Inspired by the best. Built from experience.
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-6">
            These books shaped our thinking. Our own six books distill those ideas into
            actionable frameworks built from lived experience.
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium hover:bg-amber-500/20 transition-colors"
          >
            Explore Our Books
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
