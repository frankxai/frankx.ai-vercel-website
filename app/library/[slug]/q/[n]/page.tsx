import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { bookReviews, getReviewBySlug, getAllReviewSlugs } from '@/data/book-reviews';
import { booksRegistry } from '@/app/books/lib/books-registry';
import { QuoteShareToolbar } from '@/components/share/QuoteShareToolbar';

const SITE_URL = 'https://frankx.ai';

// Quote share pages are rendered on demand — 373 individual quote URLs don't need
// to be pre-built at deploy time. dynamicParams=true (the default) handles them.
// Removing generateStaticParams saves ~370 pages from the build prerender surface.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; n: string }>;
}): Promise<Metadata> {
  const { slug, n } = await params;
  const review = getReviewBySlug(slug);
  const idx = parseInt(n, 10) - 1;
  const quote = review?.quotes?.[idx];
  if (!review || !quote) return {};

  const url = `${SITE_URL}/library/${slug}/q/${n}`;
  // Use the quote text itself as the description — works for OG, Twitter, search
  const description = `"${quote.text}" — ${review.author}, ${review.title}`;

  return {
    title: `"${quote.text.slice(0, 60)}${quote.text.length > 60 ? '…' : ''}" — ${review.author}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${review.author} — ${review.title}`,
      description: quote.text,
      type: 'article',
      url,
      siteName: 'FrankX Library',
      authors: [review.author],
      // The opengraph-image.tsx in this folder is auto-picked up by Next.js
    },
    twitter: {
      card: 'summary_large_image',
      title: `${review.author} — ${review.title}`,
      description: quote.text,
    },
  };
}

function QuoteJsonLd({
  quote,
  review,
  url,
}: {
  quote: { text: string; chapter?: string };
  review: { title: string; author: string; slug: string };
  url: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Library', item: `${SITE_URL}/library` },
          {
            '@type': 'ListItem',
            position: 3,
            name: review.title,
            item: `${SITE_URL}/library/${review.slug}`,
          },
          { '@type': 'ListItem', position: 4, name: 'Quote', item: url },
        ],
      },
      {
        '@type': 'Quotation',
        text: quote.text,
        spokenByCharacter: { '@type': 'Person', name: review.author },
        isPartOf: {
          '@type': 'Book',
          name: review.title,
          author: { '@type': 'Person', name: review.author },
          url: `${SITE_URL}/library/${review.slug}`,
        },
        url,
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

export default async function QuotePage({
  params,
}: {
  params: Promise<{ slug: string; n: string }>;
}) {
  const { slug, n } = await params;
  const review = getReviewBySlug(slug);
  const idx = parseInt(n, 10) - 1;
  const quote = review?.quotes?.[idx];
  if (!review || !quote) notFound();

  const url = `${SITE_URL}/library/${slug}/q/${n}`;
  const quoteId = `q-${slug}-${n}`;
  const totalQuotes = review.quotes!.length;
  const prevN = idx > 0 ? idx : null;
  const nextN = idx < totalQuotes - 1 ? idx + 2 : null;

  const relatedBook = review.relatedBook
    ? booksRegistry.find((b) => b.slug === review.relatedBook)
    : null;

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col">
      <QuoteJsonLd quote={quote} review={review} url={url} />
      <QuoteShareToolbar />

      {/* Top breadcrumb */}
      <header className="max-w-4xl w-full mx-auto px-6 pt-12 pb-4">
        <nav aria-label="Breadcrumb" className="text-[12px] text-white/40">
          <Link href="/library" className="hover:text-white/70 transition-colors">
            Library
          </Link>
          <span className="mx-2 text-white/20">/</span>
          <Link
            href={`/library/${slug}`}
            className="hover:text-white/70 transition-colors"
          >
            {review.title}
          </Link>
          <span className="mx-2 text-white/20">/</span>
          <span className="text-white/60">Quote {n} of {totalQuotes}</span>
        </nav>
      </header>

      {/* The quote */}
      <main className="flex-1 flex items-center px-6">
        <div className="max-w-3xl mx-auto py-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-rose-400/70 mb-8 text-center">
            From the FrankX Library
          </p>

          <figure
            id={quoteId}
            tabIndex={0}
            data-shareable="quote"
            data-quote-text={quote.text}
            data-quote-author={review.author}
            data-quote-source={review.title}
            data-quote-permalink={url}
            className="relative outline-none focus-visible:ring-2 focus-visible:ring-rose-400/30 rounded-2xl"
          >
            <span
              aria-hidden
              className="block text-rose-400/30 font-serif text-7xl md:text-9xl leading-none text-center mb-2 select-none"
            >
              &ldquo;
            </span>
            <blockquote className="text-2xl md:text-4xl leading-snug font-light italic text-white/90 text-center max-w-2xl mx-auto">
              {quote.text}
            </blockquote>
            <figcaption className="mt-12 text-center space-y-3">
              <p className="text-[15px] md:text-base text-white/60">
                — <span className="font-medium text-white/85">{review.author}</span>
              </p>
              <Link
                href={`/library/${slug}`}
                className="inline-block text-[14px] text-amber-300/80 hover:text-amber-200 transition-colors"
              >
                {review.title}
              </Link>
              {quote.chapter && (
                <p className="text-[11px] uppercase tracking-[0.18em] text-rose-400/55">
                  {quote.chapter}
                </p>
              )}
              {quote.context && (
                <p className="text-[14px] text-white/50 italic max-w-xl mx-auto pt-2">
                  {quote.context}
                </p>
              )}
            </figcaption>
          </figure>

          <p className="mt-10 text-center text-[12px] text-white/30">
            Highlight any line above to share, or press{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
              S
            </kbd>{' '}
            with the quote focused.
          </p>
        </div>
      </main>

      {/* Navigation between quotes */}
      <nav
        aria-label="Quote navigation"
        className="border-t border-white/[0.06] bg-white/[0.01]"
      >
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between gap-4">
          {prevN ? (
            <Link
              href={`/library/${slug}/q/${prevN}`}
              className="group flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              <span>Previous quote</span>
            </Link>
          ) : (
            <span aria-hidden className="opacity-0 pointer-events-none">.</span>
          )}

          <Link
            href={`/library/${slug}#${quoteId}`}
            className="text-[12px] uppercase tracking-[0.18em] text-white/40 hover:text-white/70 transition-colors"
          >
            Read in full deep-dive
          </Link>

          {nextN ? (
            <Link
              href={`/library/${slug}/q/${nextN}`}
              className="group flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors"
            >
              <span>Next quote</span>
              <svg
                className="w-4 h-4"
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
          ) : (
            <span aria-hidden className="opacity-0 pointer-events-none">.</span>
          )}
        </div>
      </nav>

      {/* Footer CTAs */}
      <section className="border-t border-white/[0.06] py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-[13px]">
          <Link
            href={`/library/${slug}`}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] py-4 px-3 transition-all"
          >
            <p className="text-white/40 text-[10px] uppercase tracking-[0.18em] mb-1">
              Full deep-dive
            </p>
            <p className="text-white/85">{review.title}</p>
          </Link>
          <Link
            href="/library/quotes"
            className="rounded-xl border border-rose-500/15 bg-rose-500/[0.04] hover:bg-rose-500/[0.07] py-4 px-3 transition-all"
          >
            <p className="text-rose-300/60 text-[10px] uppercase tracking-[0.18em] mb-1">
              Browse all quotes
            </p>
            <p className="text-white/85">The Quote Vault</p>
          </Link>
          {relatedBook ? (
            <Link
              href={`/books/${relatedBook.slug}`}
              className="rounded-xl border border-violet-500/15 bg-violet-500/[0.04] hover:bg-violet-500/[0.07] py-4 px-3 transition-all"
            >
              <p className="text-violet-300/60 text-[10px] uppercase tracking-[0.18em] mb-1">
                Our companion book
              </p>
              <p className="text-white/85">{relatedBook.title}</p>
            </Link>
          ) : (
            <Link
              href="/library/approach"
              className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] hover:bg-amber-500/[0.07] py-4 px-3 transition-all"
            >
              <p className="text-amber-300/60 text-[10px] uppercase tracking-[0.18em] mb-1">
                The system
              </p>
              <p className="text-white/85">How this library is built</p>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
