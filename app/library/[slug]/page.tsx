import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { bookReviews, getReviewBySlug, getAllReviewSlugs } from '@/data/book-reviews';
import { booksRegistry } from '@/app/books/lib/books-registry';

export function generateStaticParams() {
  return getAllReviewSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return {};

  return {
    title: `${review.title} by ${review.author} — Book Review | FrankX Library`,
    description: `Key insights from ${review.title}: ${review.keyInsights[0]}`,
    keywords: [...review.categories, review.author, 'book review', 'key insights'],
    openGraph: {
      title: `${review.title} — Book Review`,
      description: review.keyInsights[0],
      type: 'article',
    },
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 ${star <= rating ? 'text-amber-400' : 'text-white/10'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function JsonLd({ review }: { review: { title: string; author: string; rating: number; reviewDate: string } }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Book',
      name: review.title,
      author: { '@type': 'Person', name: review.author },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
    },
    author: { '@type': 'Person', name: 'Frank' },
    datePublished: review.reviewDate,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  const relatedBook = review.relatedBook
    ? booksRegistry.find((b) => b.slug === review.relatedBook)
    : null;

  const otherReviews = bookReviews
    .filter((r) => r.slug !== review.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Back Link */}
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-4">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Library
        </Link>
      </div>

      {/* Review Header */}
      <header className="max-w-3xl mx-auto px-6 pb-12">
        <div className="flex items-start gap-6">
          <div className="w-24 h-36 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
            <span className="text-4xl font-serif text-white/20">
              {review.title.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {review.title}
            </h1>
            <p className="text-lg text-white/50 mb-3">by {review.author}</p>
            <StarRating rating={review.rating} />
            <div className="flex flex-wrap gap-2 mt-4">
              {review.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/50 border border-white/10"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Key Insights */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-amber-500/50" />
          Key Insights
        </h2>
        <div className="space-y-4">
          {review.keyInsights.map((insight, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-sm font-bold">
                {i + 1}
              </span>
              <p className="text-white/70 leading-relaxed text-[15px]">{insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Best For */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-emerald-500/50" />
          Best For
        </h2>
        <div className="flex flex-wrap gap-3">
          {review.bestFor.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 text-sm rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-emerald-400/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Related Our Book */}
      {relatedBook && (
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-violet-500/50" />
            If You Liked This, Read Ours
          </h2>
          <Link
            href={`/books/${relatedBook.slug}`}
            className="group block p-6 rounded-2xl border border-violet-500/10 bg-violet-500/[0.03] hover:border-violet-500/20 transition-all"
          >
            <p className="text-[10px] uppercase tracking-wider text-violet-400/50 mb-2">
              Our Book
            </p>
            <h3 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors mb-1">
              {relatedBook.title}
            </h3>
            <p className="text-sm text-white/40 mb-3">{relatedBook.subtitle}</p>
            <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
              {relatedBook.description}
            </p>
            <span className="inline-flex items-center gap-1 mt-4 text-xs text-violet-400/60 group-hover:text-violet-300 transition-colors">
              Read free
              <svg
                className="w-3 h-3"
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
            </span>
          </Link>
        </section>
      )}

      {/* Amazon Link */}
      {review.amazonUrl && (
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <a
            href={review.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 hover:text-white/80 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Get this book on Amazon
          </a>
        </section>
      )}

      {/* More from Library */}
      <section className="max-w-3xl mx-auto px-6 pb-32">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-white/20" />
          More from the Library
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {otherReviews.map((r) => (
            <Link
              key={r.slug}
              href={`/library/${r.slug}`}
              className="group p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all"
            >
              <h3 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors mb-1 truncate">
                {r.title}
              </h3>
              <p className="text-xs text-white/40">{r.author}</p>
            </Link>
          ))}
        </div>
      </section>

      <JsonLd review={review} />
    </div>
  );
}
