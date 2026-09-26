import Link from 'next/link';
import type { BookReview } from '@/app/books/types';
import { JsonLd } from './review-meta';

type RelatedBook = {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
};

export function ReviewTail({
  review,
  relatedBook,
  otherReviews,
}: {
  review: BookReview;
  relatedBook: RelatedBook | null | undefined;
  otherReviews: BookReview[];
}) {
  return (
    <>
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
                'group block h-full p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-cyan-400/20 hover:bg-cyan-500/[0.03] transition-colors';

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
                className="group flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-red-400/20 hover:bg-red-500/[0.03] transition-colors"
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
            className="group block p-6 rounded-2xl border border-violet-500/10 bg-violet-500/[0.03] hover:border-violet-500/20 transition-colors"
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
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 hover:text-white/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Get this book on Amazon
          </a>
        </section>
      )}

      {/* Optional newsletter after the reading and purchase links */}
      <section className="max-w-3xl mx-auto px-6 pb-12" aria-label="Newsletter call-to-action">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] px-6 py-5">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/70 mb-2">
              The FrankX Newsletter
            </p>
            <p className="text-white/80 text-[14px] leading-relaxed">
              One book breakdown like this. One spotlight from the operating loop. Every Friday.
            </p>
          </div>
          <Link
            href="/newsletter"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 px-4 py-2 text-sm font-medium text-emerald-200 transition-colors whitespace-nowrap"
          >
            Subscribe free
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

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
              className="group p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors"
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
    </>
  );
}
