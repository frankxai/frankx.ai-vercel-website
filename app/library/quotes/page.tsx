import { Metadata } from 'next';
import Link from 'next/link';
import { bookReviews } from '@/data/book-reviews';
import type { BookReview, BookQuote } from '@/app/books/types';
import { QuoteShareToolbar } from '@/components/share/QuoteShareToolbar';

const SITE_URL = 'https://frankx.ai';

export const metadata: Metadata = {
  title: 'Quotes — Every Passage I Marked | FrankX Library',
  description:
    'Every quote worth remembering from the FrankX Library — a browsable collection of passages across philosophy, psychology, productivity, and more. Each quote links back to the book it came from.',
  keywords: [
    'book quotes',
    'curated quotes',
    'reading quotes',
    'philosophy quotes',
    'self-development quotes',
    'book quote library',
  ],
  alternates: { canonical: `${SITE_URL}/library/quotes` },
  openGraph: {
    title: 'Quotes — Every Passage I Marked | FrankX Library',
    description:
      'Every quote worth remembering from the FrankX Library — curated passages across 10+ books, each linking back to its source.',
    type: 'article',
    url: `${SITE_URL}/library/quotes`,
    siteName: 'FrankX',
  },
};

type QuoteWithBook = BookQuote & { book: BookReview };

function collectAllQuotes(): QuoteWithBook[] {
  const result: QuoteWithBook[] = [];
  for (const book of bookReviews) {
    if (!book.quotes || book.quotes.length === 0) continue;
    for (const quote of book.quotes) {
      result.push({ ...quote, book });
    }
  }
  return result;
}

function QuotesJsonLd({ quotes }: { quotes: QuoteWithBook[] }) {
  const url = `${SITE_URL}/library/quotes`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Library', item: `${SITE_URL}/library` },
          { '@type': 'ListItem', position: 3, name: 'Quotes', item: url },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'FrankX Library — All Quotes',
        description:
          'Every quote worth remembering from the FrankX Library. Passages across philosophy, psychology, productivity, and more — each linking back to its source book.',
        url,
        isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
      },
      ...quotes.slice(0, 50).map((q) => ({
        '@type': 'Quotation',
        text: q.text,
        spokenByCharacter: { '@type': 'Person', name: q.book.author },
        isPartOf: {
          '@type': 'Book',
          name: q.book.title,
          author: { '@type': 'Person', name: q.book.author },
          url: `${SITE_URL}/library/${q.book.slug}`,
        },
      })),
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const accentByCategory: Record<string, string> = {
  Philosophy: 'border-amber-500/15 bg-amber-500/[0.02]',
  Stoicism: 'border-amber-500/15 bg-amber-500/[0.02]',
  Classic: 'border-stone-500/15 bg-stone-500/[0.02]',
  'Self-Development': 'border-emerald-500/15 bg-emerald-500/[0.02]',
  Habits: 'border-cyan-500/15 bg-cyan-500/[0.02]',
  Psychology: 'border-violet-500/15 bg-violet-500/[0.02]',
  Productivity: 'border-blue-500/15 bg-blue-500/[0.02]',
  Focus: 'border-blue-500/15 bg-blue-500/[0.02]',
  Mindset: 'border-red-500/15 bg-red-500/[0.02]',
  Wealth: 'border-yellow-500/15 bg-yellow-500/[0.02]',
  Creativity: 'border-violet-500/15 bg-violet-500/[0.02]',
  Discipline: 'border-red-500/15 bg-red-500/[0.02]',
  Fiction: 'border-rose-500/15 bg-rose-500/[0.02]',
  Spirituality: 'border-purple-500/15 bg-purple-500/[0.02]',
};

function getAccent(book: BookReview) {
  for (const cat of book.categories) {
    if (accentByCategory[cat]) return accentByCategory[cat];
  }
  return 'border-white/[0.06] bg-white/[0.02]';
}

export default function LibraryQuotesPage() {
  const quotes = collectAllQuotes();
  const byBook = new Map<string, QuoteWithBook[]>();
  for (const q of quotes) {
    const key = q.book.slug;
    if (!byBook.has(key)) byBook.set(key, []);
    byBook.get(key)!.push(q);
  }

  const bookOrder = Array.from(byBook.keys()).sort((a, b) => {
    const A = byBook.get(a)![0].book;
    const B = byBook.get(b)![0].book;
    return B.reviewDate.localeCompare(A.reviewDate);
  });

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <QuotesJsonLd quotes={quotes} />
      <QuoteShareToolbar />

      {/* Back link */}
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-4">
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 pt-8 pb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-rose-400/70 mb-6">
            The Quote Vault
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Every passage
            <br />
            <span className="bg-gradient-to-r from-rose-300 via-amber-200 to-rose-400 bg-clip-text text-transparent">
              worth remembering.
            </span>
          </h1>
          <p className="mt-8 text-lg text-white/60 leading-relaxed max-w-2xl">
            Curated quotes from every deep-dived book in the library. Each quote carries
            its chapter reference and, where useful, the one-sentence framing of why it
            matters. Click any book title to open its full hub.
          </p>
          <p className="mt-4 text-[13px] text-rose-300/60 max-w-2xl">
            <span className="text-rose-300/90">Tip:</span> highlight any line to share or
            copy it with a permalink — works on desktop and mobile.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/[0.05] text-rose-200 text-sm">
              <span className="font-bold tabular-nums">{quotes.length}</span>
              <span className="text-white/50">quotes</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/[0.05] text-amber-200 text-sm">
              <span className="font-bold tabular-nums">{bookOrder.length}</span>
              <span className="text-white/50">books</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/70 text-sm">
              <span className="font-bold tabular-nums">
                {new Set(bookOrder.map((s) => byBook.get(s)![0].book.author)).size}
              </span>
              <span className="text-white/50">authors</span>
            </span>
          </div>
        </div>
      </section>

      {/* Book jump nav */}
      <nav className="max-w-5xl mx-auto px-6 pb-12" aria-label="Books in this collection">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
            Jump to
          </p>
          <div className="flex flex-wrap gap-2">
            {bookOrder.map((slug) => {
              const book = byBook.get(slug)![0].book;
              return (
                <a
                  key={slug}
                  href={`#book-${slug}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-[13px] text-white/70 hover:text-white hover:border-white/[0.2] transition-colors"
                >
                  {book.title}
                  <span className="text-white/30 text-[11px] font-mono">
                    {byBook.get(slug)!.length}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Quote sections by book */}
      <div className="max-w-4xl mx-auto px-6 pb-32 space-y-20">
        {bookOrder.map((slug) => {
          const bookQuotes = byBook.get(slug)!;
          const book = bookQuotes[0].book;
          return (
            <section
              key={slug}
              id={`book-${slug}`}
              className="scroll-mt-24"
            >
              {/* Book heading */}
              <div className="pb-6 mb-8 border-b border-white/[0.06]">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <Link
                      href={`/library/${book.slug}`}
                      className="group inline-flex items-baseline gap-3 hover:text-white transition-colors"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-white/90 group-hover:text-white">
                        {book.title}
                      </h2>
                      <span className="text-[13px] text-white/40 group-hover:text-white/60 transition-colors">
                        by {book.author}
                      </span>
                    </Link>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {book.categories.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-0.5 text-[11px] rounded-full bg-white/5 text-white/50 border border-white/10"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/40 font-mono">
                    {bookQuotes.length} quote{bookQuotes.length === 1 ? '' : 's'}
                  </span>
                </div>
              </div>

              {/* Quotes */}
              <div className="space-y-4">
                {bookQuotes.map((q, i) => {
                  const quoteId = `q-${book.slug}-${i + 1}`;
                  // Permalink prefers the canonical book page anchor (deeper SEO surface)
                  const permalink = `${SITE_URL}/library/${book.slug}#${quoteId}`;
                  return (
                    <figure
                      key={i}
                      id={quoteId}
                      tabIndex={0}
                      data-shareable="quote"
                      data-quote-text={q.text}
                      data-quote-author={book.author}
                      data-quote-source={book.title}
                      data-quote-permalink={permalink}
                      className={`relative rounded-2xl border p-6 pl-8 scroll-mt-24 outline-none focus-visible:ring-2 focus-visible:ring-rose-400/30 ${getAccent(book)}`}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute top-3 left-3 text-rose-400/30 font-serif text-5xl leading-none select-none"
                      >
                        &ldquo;
                      </span>
                      <blockquote className="text-white/85 leading-relaxed text-[16px] font-light italic">
                        {q.text}
                      </blockquote>
                      {(q.chapter || q.context) && (
                        <figcaption className="mt-4 pt-4 border-t border-white/[0.04] space-y-1.5">
                          {q.chapter && (
                            <p className="text-[11px] uppercase tracking-[0.15em] text-rose-400/60">
                              {q.chapter}
                            </p>
                          )}
                          {q.context && (
                            <p className="text-[13.5px] text-white/50 leading-relaxed">
                              {q.context}
                            </p>
                          )}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>

              {/* Book CTA */}
              <div className="mt-6 text-right">
                <Link
                  href={`/library/${book.slug}`}
                  className="inline-flex items-center gap-1 text-[13px] text-white/50 hover:text-white transition-colors"
                >
                  Read the full deep-dive on {book.title}
                  <svg
                    className="w-3 h-3"
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
            </section>
          );
        })}

        {/* Bottom CTA */}
        <section className="pt-16 border-t border-white/[0.06]">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-3">
              Build your own quote vault.
            </h2>
            <p className="text-white/55 max-w-xl mx-auto text-[15px] leading-relaxed mb-6">
              This collection is powered by Library OS — the open-source system for
              turning every book you read into a permanent deep-dive. Your own quote
              vault is about an hour of setup away.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/library/approach"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                How this library is built
              </Link>
              <a
                href="https://github.com/frankxai/library-os"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                GitHub — library-os
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
