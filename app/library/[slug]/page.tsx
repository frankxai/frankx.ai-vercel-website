import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { bookReviews, getReviewBySlug, getAllReviewSlugs } from '@/data/book-reviews';
import { booksRegistry } from '@/app/books/lib/books-registry';
import type { BookReview } from '@/app/books/types';

const SITE_URL = 'https://frankx.ai';

export function generateStaticParams() {
  return getAllReviewSlugs().map((slug) => ({ slug }));
}

function truncate(text: string, limit = 158) {
  if (text.length <= limit) return text;
  return text.slice(0, limit - 1).trimEnd() + '…';
}

function reviewDescription(review: BookReview) {
  const lead = review.tldr ?? review.keyInsights[0];
  return truncate(`${review.title} by ${review.author}: ${lead}`);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return {};

  const description = reviewDescription(review);
  const canonical = `${SITE_URL}/library/${review.slug}`;
  const ogImage = review.hasCover ? `${SITE_URL}${review.coverImage}` : undefined;

  return {
    title: `${review.title} by ${review.author} — Book Review & Key Insights | FrankX Library`,
    description,
    keywords: [
      ...review.categories,
      review.author,
      `${review.title} summary`,
      `${review.title} key insights`,
      'book review',
      'book summary',
    ],
    authors: [{ name: 'Frank' }],
    alternates: { canonical },
    openGraph: {
      title: `${review.title} — Book Review & Key Insights`,
      description,
      type: 'article',
      url: canonical,
      siteName: 'FrankX Library',
      authors: ['Frank'],
      publishedTime: review.reviewDate,
      ...(ogImage ? { images: [{ url: ogImage, alt: `${review.title} — book cover` }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${review.title} — ${review.author}`,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
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

function JsonLd({ review }: { review: BookReview }) {
  const url = `${SITE_URL}/library/${review.slug}`;
  const description = reviewDescription(review);
  const reviewBody = review.tldr ?? review.keyInsights.join(' — ');
  const imageUrl = review.hasCover ? `${SITE_URL}${review.coverImage}` : undefined;

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Library', item: `${SITE_URL}/library` },
        { '@type': 'ListItem', position: 3, name: review.title, item: url },
      ],
    },
    {
      '@type': 'Article',
      headline: `${review.title} by ${review.author} — Book Review & Key Insights`,
      description,
      url,
      ...(imageUrl ? { image: imageUrl } : {}),
      author: { '@type': 'Person', name: 'Frank', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'FrankX',
        url: SITE_URL,
      },
      datePublished: review.reviewDate,
      dateModified: review.reviewDate,
      articleSection: review.categories,
      keywords: [...review.categories, review.author, 'book review'].join(', '),
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
    {
      '@type': 'Review',
      url,
      itemReviewed: {
        '@type': 'Book',
        name: review.title,
        author: { '@type': 'Person', name: review.author },
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(review.publicationYear ? { datePublished: String(review.publicationYear) } : {}),
        ...(review.amazonUrl ? { sameAs: review.amazonUrl } : {}),
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody,
      author: { '@type': 'Person', name: 'Frank' },
      datePublished: review.reviewDate,
      publisher: { '@type': 'Organization', name: 'FrankX', url: SITE_URL },
    },
  ];

  if (review.faq && review.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: review.faq.map((pair) => ({
        '@type': 'Question',
        name: pair.q,
        acceptedAnswer: { '@type': 'Answer', text: pair.a },
      })),
    });
  }

  const data = {
    '@context': 'https://schema.org',
    '@graph': graph,
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
          {review.hasCover ? (
            <div className="w-24 h-36 rounded-xl border border-white/10 overflow-hidden flex-shrink-0 bg-white/5">
              <Image
                src={review.coverImage}
                alt={`${review.title} by ${review.author} — book cover`}
                width={192}
                height={288}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-36 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
              <span className="text-4xl font-serif text-white/20">
                {review.title.charAt(0)}
              </span>
            </div>
          )}
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

      {/* The Short Answer (TL;DR) */}
      {review.tldr && (
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/70 mb-3">
              The Short Answer
            </p>
            <p className="text-white/80 leading-relaxed text-[15px]">{review.tldr}</p>
          </div>
        </section>
      )}

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

      {/* Frequently Asked Questions */}
      {review.faq && review.faq.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-blue-500/50" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {review.faq.map((pair, i) => (
              <details
                key={i}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 open:border-blue-500/20 open:bg-blue-500/[0.03] transition-colors"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <h3 className="text-[15px] font-medium text-white/90 group-open:text-blue-300 transition-colors">
                    {pair.q}
                  </h3>
                  <span className="flex-shrink-0 text-white/30 group-open:rotate-45 transition-transform text-lg leading-none mt-0.5">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-white/65 leading-relaxed text-[14px]">{pair.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

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
