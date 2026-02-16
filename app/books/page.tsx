import Link from 'next/link';
import Image from 'next/image';
import { getCoreBooks, getArcaneanBooks } from './lib/books-registry';
import { getThemeClasses } from './lib/theme-classes';
import type { BookConfig } from './types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Books | FrankX',
  description:
    'Eleven books spanning love, discipline, creativity, mythology, and human-AI partnership. The original six plus the Arcanea Universe. Every chapter free to read online.',
  openGraph: {
    title: 'The FrankX Library',
    description: 'Original works and the Arcanea Universe. Every chapter free.',
    type: 'website',
  },
};

function BookCard({ book }: { book: BookConfig }) {
  const tc = getThemeClasses(book.theme.id);
  const publishedCount = book.chapters.filter((c) => c.published).length;
  const fontClass = book.theme.headingFont === 'serif' ? 'font-serif' : 'font-sans';

  return (
    <Link
      key={book.slug}
      href={`/books/${book.slug}`}
      className="group relative flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 overflow-hidden"
    >
      {/* Cover / Visual */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <div className={`absolute inset-0 ${tc.progressGradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center space-y-3">
              <h3 className={`${fontClass} text-2xl font-bold ${tc.gradientText}`}>
                {book.title}
              </h3>
              <p className="text-white/30 text-sm">{book.subtitle}</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          {book.series === 'arcanea' && (
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/20">
              Arcanea
            </span>
          )}
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
            book.status === 'published'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/20'
              : 'bg-amber-500/20 text-amber-300 border border-amber-400/20'
          }`}>
            {book.status === 'published' ? 'Published' : 'In Progress'}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex-1 flex flex-col">
        <h2 className={`${fontClass} text-xl font-bold text-white group-hover:text-white/90 transition-colors mb-1`}>
          {book.title}
        </h2>
        <p className="text-sm text-white/30 mb-3">{book.subtitle}</p>
        <p className="text-sm text-white/50 leading-relaxed line-clamp-2 flex-1">
          {book.description}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5 text-xs text-white/30">
          <span>{publishedCount} chapters</span>
          <span className="flex items-center gap-1.5 group-hover:text-white/50 transition-colors">
            Read
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BooksHubPage() {
  const coreBooks = getCoreBooks();
  const arcaneanBooks = getArcaneanBooks();

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-violet-500/[0.06] via-rose-500/[0.04] to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute top-32 right-1/4 w-[300px] h-[300px] bg-amber-500/[0.03] blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-white/30 mb-6">
              The Library
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6">
              <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                Eleven Books.
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-300 via-amber-200 to-violet-300 bg-clip-text text-transparent">
                Two Universes.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/40 max-w-xl mx-auto leading-relaxed">
              Original works on love, discipline, and creativity — plus the mythological world of Arcanea.
              Every chapter free to read online.
            </p>
          </div>
        </div>
      </section>

      {/* Original Works */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Original Works
          </h2>
          <p className="text-white/40 max-w-2xl">
            Love, discipline, creativity, growth, imagination, and the architecture of reality.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coreBooks.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>

      {/* The Arcanea Universe */}
      <section id="arcanea" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative mb-10">
          {/* Subtle purple glow behind heading */}
          <div className="absolute -top-16 left-0 w-[400px] h-[200px] bg-purple-500/[0.04] blur-[100px] pointer-events-none" />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400/50 mb-3">
              The Arcanea Universe
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-amber-300 bg-clip-text text-transparent">
                Mythology Meets Creation
              </span>
            </h2>
            <p className="text-white/40 max-w-2xl">
              A mythological universe exploring consciousness, creativity, and the partnership between human and artificial intelligence. Seven legends, ten guardians, and the practices that bridge worlds.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {arcaneanBooks.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>

      {/* Library CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="relative p-8 sm:p-12 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
            Curated Reading
          </h2>
          <p className="text-white/40 mb-8 max-w-lg mx-auto">
            Book reviews, key insights, and curated recommendations from the books that shaped these books.
          </p>
          <Link
            href="/library"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all text-sm"
          >
            Browse the Library
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
