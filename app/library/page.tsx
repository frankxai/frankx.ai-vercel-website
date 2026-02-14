import { Metadata } from 'next';
import Link from 'next/link';
import { bookReviews, getAllReviewCategories } from '@/data/book-reviews';
import { booksRegistry } from '@/app/books/lib/books-registry';

export const metadata: Metadata = {
  title: 'Library | Book Reviews & Insights | FrankX',
  description:
    'Curated book reviews with key insights from the best books on self-development, mindset, creativity, and wealth. Read the ideas that shaped our own books.',
  keywords: [
    'book reviews',
    'reading list',
    'best self-development books',
    'book insights',
    'curated reading',
  ],
  openGraph: {
    title: 'The Library | FrankX',
    description: 'Key insights from the books that matter most.',
    type: 'website',
  },
};

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

  return (
    <div className="min-h-screen bg-[#030712]">
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
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookReviews.map((review) => {
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
                    <div className="w-16 h-24 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
                      <span className="text-2xl font-serif text-white/20">
                        {review.title.charAt(0)}
                      </span>
                    </div>
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
