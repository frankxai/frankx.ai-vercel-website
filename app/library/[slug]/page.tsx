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

  if (review.quotes && review.quotes.length > 0) {
    review.quotes.forEach((quote) => {
      graph.push({
        '@type': 'Quotation',
        text: quote.text,
        spokenByCharacter: { '@type': 'Person', name: review.author },
        isPartOf: {
          '@type': 'Book',
          name: review.title,
          author: { '@type': 'Person', name: review.author },
        },
      });
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

      {/* Table of Contents */}
      <nav className="max-w-3xl mx-auto px-6 pb-12" aria-label="Contents">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">
            In this deep-dive
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-white/60">
            <li>
              <a href="#insights" className="hover:text-amber-300 transition-colors">
                01 &nbsp;·&nbsp; Key Insights
              </a>
            </li>
            {review.quotes && review.quotes.length > 0 && (
              <li>
                <a href="#quotes" className="hover:text-amber-300 transition-colors">
                  02 &nbsp;·&nbsp; Quotes ({review.quotes.length})
                </a>
              </li>
            )}
            {review.chapters && review.chapters.length > 0 && (
              <li>
                <a href="#chapters" className="hover:text-amber-300 transition-colors">
                  03 &nbsp;·&nbsp; Chapter-by-Chapter ({review.chapters.length})
                </a>
              </li>
            )}
            <li>
              <a href="#audience" className="hover:text-amber-300 transition-colors">
                04 &nbsp;·&nbsp; Best For
              </a>
            </li>
            {review.faq && review.faq.length > 0 && (
              <li>
                <a href="#faq" className="hover:text-amber-300 transition-colors">
                  05 &nbsp;·&nbsp; FAQ
                </a>
              </li>
            )}
            {review.continueReading && review.continueReading.length > 0 && (
              <li>
                <a href="#continue-reading" className="hover:text-amber-300 transition-colors">
                  06 &nbsp;·&nbsp; Continue Reading
                </a>
              </li>
            )}
            {review.videos && review.videos.length > 0 && (
              <li>
                <a href="#videos" className="hover:text-amber-300 transition-colors">
                  07 &nbsp;·&nbsp; Go Deeper — Videos
                </a>
              </li>
            )}
          </ol>
        </div>
      </nav>

      {/* Key Insights */}
      <section id="insights" className="max-w-3xl mx-auto px-6 pb-16 scroll-mt-24">
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

      {/* Quotes */}
      {review.quotes && review.quotes.length > 0 && (
        <section id="quotes" className="max-w-3xl mx-auto px-6 pb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-rose-400/60" />
            Quotes Worth Remembering
          </h2>
          <p className="text-sm text-white/40 mb-6">
            {review.quotes.length} curated passages from {review.title}. Chapter references
            map back to the book so you can re-read them in context.
          </p>
          <div className="space-y-4">
            {review.quotes.map((quote, i) => (
              <figure
                key={i}
                className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6 pl-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-3 text-rose-400/40 font-serif text-5xl leading-none select-none"
                >
                  &ldquo;
                </span>
                <blockquote className="text-white/80 leading-relaxed text-[15.5px] font-light italic">
                  {quote.text}
                </blockquote>
                {(quote.chapter || quote.context) && (
                  <figcaption className="mt-4 pt-4 border-t border-white/[0.04] space-y-1">
                    {quote.chapter && (
                      <p className="text-[11px] uppercase tracking-[0.15em] text-rose-400/60">
                        {quote.chapter}
                      </p>
                    )}
                    {quote.context && (
                      <p className="text-[13px] text-white/50 leading-relaxed">
                        {quote.context}
                      </p>
                    )}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Chapter-by-Chapter */}
      {review.chapters && review.chapters.length > 0 && (
        <section id="chapters" className="max-w-3xl mx-auto px-6 pb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-violet-400/60" />
            Chapter-by-Chapter
          </h2>
          <p className="text-sm text-white/40 mb-6">
            Each chapter distilled to a key idea + 2–4 sentence summary — so you can navigate
            the book&apos;s argument without re-reading it, and re-read it with fresh compass
            if you want.
          </p>
          <div className="space-y-3">
            {review.chapters.map((ch) => (
              <details
                key={ch.number}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] open:border-violet-400/20 open:bg-violet-500/[0.03] transition-colors"
              >
                <summary className="cursor-pointer list-none p-5 flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-300 text-sm font-mono font-semibold">
                    {ch.number.toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold text-white/90 group-open:text-violet-200 transition-colors leading-snug">
                      {ch.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-white/55 leading-relaxed">
                      {ch.keyIdea}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-white/30 group-open:rotate-45 transition-transform text-lg leading-none mt-2.5">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 pl-[76px]">
                  <p className="text-[14px] text-white/65 leading-relaxed">{ch.summary}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Best For */}
      <section id="audience" className="max-w-3xl mx-auto px-6 pb-16 scroll-mt-24">
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
        <section id="faq" className="max-w-3xl mx-auto px-6 pb-16 scroll-mt-24">
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

      {/* Continue Reading */}
      {review.continueReading && review.continueReading.length > 0 && (
        <section id="continue-reading" className="max-w-3xl mx-auto px-6 pb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-cyan-400/60" />
            Continue Reading
          </h2>
          <p className="text-sm text-white/40 mb-6">
            If {review.title} opened a door, these books walk you through it. Curated for
            reason, not algorithm — each entry explains why it pairs with this book.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {review.continueReading.map((item, i) => {
              const cardInner = (
                <>
                  <h3 className="text-[15px] font-semibold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-white/45 mt-1">by {item.author}</p>
                  <p className="text-[13.5px] text-white/60 leading-relaxed mt-3">
                    {item.reason}
                  </p>
                  {item.url && (
                    <span className="inline-flex items-center gap-1 mt-4 text-[12px] text-cyan-400/60 group-hover:text-cyan-300 transition-colors">
                      Get the book
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
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </span>
                  )}
                </>
              );

              const className =
                'group block h-full p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-cyan-400/20 hover:bg-cyan-500/[0.03] transition-all';

              return item.url ? (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {cardInner}
                </a>
              ) : (
                <div key={i} className={className}>
                  {cardInner}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Videos — Go Deeper */}
      {review.videos && review.videos.length > 0 && (
        <section id="videos" className="max-w-3xl mx-auto px-6 pb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-red-400/60" />
            Go Deeper — Videos
          </h2>
          <p className="text-sm text-white/40 mb-6">
            The book is the foundation. These talks and interviews are where the ideas
            sharpen, get challenged, and connect to adjacent work. Best watched after
            reading, not instead of.
          </p>
          <div className="space-y-3">
            {review.videos.map((v, i) => (
              <a
                key={i}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-red-400/20 hover:bg-red-500/[0.03] transition-all"
              >
                <span className="flex-shrink-0 mt-1 w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-white group-hover:text-red-200 transition-colors leading-snug">
                    {v.title}
                  </h3>
                  <p className="text-[13px] text-white/45 mt-0.5">{v.creator}</p>
                  <p className="text-[13.5px] text-white/60 leading-relaxed mt-2">
                    {v.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {v.kind && (
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-red-500/10 text-red-400/80 border border-red-500/15">
                        {v.kind}
                      </span>
                    )}
                    {v.duration && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-white/40 border border-white/10">
                        {v.duration}
                      </span>
                    )}
                  </div>
                </div>
                <svg
                  className="flex-shrink-0 w-4 h-4 text-white/20 group-hover:text-red-400/60 transition-colors mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Related Our Book */}
      {relatedBook && (
        <section id="our-book" className="max-w-3xl mx-auto px-6 pb-16 scroll-mt-24">
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
