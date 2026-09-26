import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { bookReviews, getReviewBySlug } from '@/data/book-reviews';
import { booksRegistry } from '@/app/books/lib/books-registry';
import { BookCover } from '@/components/library/BookCover';
import { ReadingGuide } from '@/components/library/ReadingGuide';
import { generateMetadata, StarRating } from './review-meta';
import { ReviewTail } from './review-tail';

export { generateMetadata };

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
    .sort((a, b) => b.categories.filter(category => review.categories.includes(category)).length - a.categories.filter(category => review.categories.includes(category)).length)
    .slice(0, 3);



  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Back Link */}
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-4">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
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
          <BookCover title={review.title} author={review.author} src={review.hasCover ? review.coverImage : undefined} hasGuide={Boolean(review.guide)} priority className="w-20 sm:w-28" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {review.title}
            </h1>
            <p className="text-lg text-white/75 mb-3">{review.guide?.kind === 'Primary text' ? review.author : `by ${review.author}`}</p>
            {review.guide ? <p className="text-sm text-emerald-200">{review.guide.kind} · Reading guide</p> : <StarRating rating={review.rating} />}
            <div className="flex flex-wrap gap-2 mt-4">
              {review.categories.map((cat) => (
                <Link key={cat} href={`/library?category=${encodeURIComponent(cat)}`} className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/75 hover:border-emerald-300/40 focus-visible:ring-2 focus-visible:ring-emerald-300">{cat}</Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Source capture — public projection only */}
      {review.capture && (
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="overflow-hidden rounded-2xl border border-cyan-400/15 bg-cyan-500/[0.03]">
            <div className="p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300/75 mb-3">
                Source capture
              </p>
              {review.capture.publicNote && (
                <p className="text-[15px] leading-relaxed text-white/75">
                  {review.capture.publicNote}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-cyan-100/65">
                <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-2.5 py-1">
                  Captured: {review.capture.capturedAt}
                </span>
                {review.capture.translator && (
                  <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-2.5 py-1">
                    Translation: {review.capture.translator}
                  </span>
                )}
                {review.capture.sourcePages && review.capture.sourcePages.length > 0 && (
                  <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-2.5 py-1">
                    Source pages: {review.capture.sourcePages.join(', ')}
                  </span>
                )}
              </div>
              {review.capture.rightsStatus && (
                <p className="mt-4 border-t border-cyan-400/10 pt-4 text-xs leading-relaxed text-white/45">
                  {review.capture.rightsStatus}
                </p>
              )}
            </div>
            {review.capture.images && review.capture.images.length > 0 && (
              <div className="grid gap-px border-t border-cyan-400/10 bg-cyan-400/10 sm:grid-cols-2">
                {review.capture.images.map((image, index) => (
                  <figure key={`${image.src}-${index}`} className="bg-[#0a0a0b]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width ?? 960}
                      height={image.height ?? 1280}
                      className="h-auto w-full object-cover"
                    />
                    {image.caption && (
                      <figcaption className="px-4 py-3 text-xs leading-relaxed text-white/45">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

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

      {review.guide && <ReadingGuide guide={review.guide} slug={review.slug} />}

      {/* Table of Contents */}
      <nav className="max-w-3xl mx-auto px-6 pb-12" aria-label="Contents">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">
            In this guide
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-white/60">
            <li>
              <a href="#insights" className="hover:text-amber-300 transition-colors">
                01 &nbsp;·&nbsp; Key Insights
              </a>
            </li>
            {review.application && (
              <li>
                <a href="#application" className="hover:text-amber-300 transition-colors">
                  Action &nbsp;·&nbsp; Practice this
                </a>
              </li>
            )}
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
          <p className="text-sm text-white/50 mb-6">{review.quotes.length} recorded excerpts. Check the named edition and location before sharing the wording.</p>
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
            the book's argument without re-reading it, and re-read it with fresh compass
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

      {/* Applied to FrankX */}
      {review.application && (
        <section id="application" className="max-w-3xl mx-auto px-6 pb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-cyan-400/60" />
            Applied to FrankX
          </h2>
          <div className="rounded-2xl border border-cyan-400/15 bg-cyan-500/[0.035] p-6">
            <h3 className="text-lg font-semibold text-cyan-100">{review.application.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/70">{review.application.body}</p>
            {review.application.practice && (
              <div className="mt-5 rounded-xl border border-cyan-400/15 bg-[#0a0a0b]/50 p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-white">
                    {review.application.practice.title}
                  </p>
                  {review.application.practice.duration && (
                    <span className="text-[11px] uppercase tracking-[0.14em] text-cyan-200/55">
                      {review.application.practice.duration}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {review.application.practice.instruction}
                </p>
              </div>
            )}
            {review.application.connections && review.application.connections.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {review.application.connections.map((connection, index) => {
                  const card = (
                    <>
                      <p className="text-sm font-semibold text-white/90">{connection.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/50">{connection.reason}</p>
                    </>
                  );
                  const className =
                    'block rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 transition-colors hover:border-cyan-400/25 hover:bg-cyan-500/[0.05]';

                  return connection.href.startsWith('http') ? (
                    <a
                      key={`${connection.href}-${index}`}
                      href={connection.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {card}
                    </a>
                  ) : (
                    <Link key={`${connection.href}-${index}`} href={connection.href} className={className}>
                      {card}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      <ReviewTail review={review} relatedBook={relatedBook} otherReviews={otherReviews} />
    </div>
  );
}
