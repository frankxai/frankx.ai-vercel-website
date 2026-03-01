import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { booksRegistry, getBookBySlug } from '../lib/books-registry';
import { getThemeClasses } from '../lib/theme-classes';
import { createMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import BookDownloadGate from '../components/BookDownloadGate';

interface PageProps {
  params: Promise<{ bookSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { bookSlug } = await params;
  const book = getBookBySlug(bookSlug);

  if (!book) {
    return createMetadata({
      title: 'Book Not Found',
      description: 'The requested book could not be found.',
      path: `/books/${bookSlug}`,
    });
  }

  return createMetadata({
    title: `${book.title} — ${book.subtitle}`,
    description: book.description,
    path: `/books/${book.slug}`,
    type: 'website',
    keywords: book.keywords,
    authors: [book.author],
  });
}

export async function generateStaticParams() {
  return booksRegistry.map((book) => ({ bookSlug: book.slug }));
}

export default async function BookLandingPage({ params }: PageProps) {
  const { bookSlug } = await params;
  const book = getBookBySlug(bookSlug);

  if (!book) notFound();

  const tc = getThemeClasses(book.theme.id);
  const publishedChapters = book.chapters.filter((c) => c.published);
  const totalReadingTime = publishedChapters.reduce((acc, c) => {
    const mins = parseInt(c.readingTime) || 0;
    return acc + mins;
  }, 0);
  const fontClass = book.theme.headingFont === 'serif' ? 'font-serif' : 'font-sans';

  return (
    <>
      <JsonLd
        type="Book"
        data={{
          name: book.title,
          description: book.description,
          author: { '@type': 'Person', name: book.author },
          publisher: { '@type': 'Organization', name: 'FrankX.AI' },
          numberOfPages: publishedChapters.length,
          bookFormat: 'EBook',
          inLanguage: 'en',
        }}
      />

      <div className={`min-h-screen ${tc.bgPage} text-white`}>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

          <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-16 sm:pt-32 sm:pb-24">
            {/* Back to library */}
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors mb-12 text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              All Books
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Book Info */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${tc.badgeBg} ${tc.badgeText} text-xs font-medium border ${tc.badgeBorder} uppercase tracking-wider`}>
                    {book.status === 'published' ? 'Available Now' : 'In Progress'}
                  </div>
                  <h1 className={`${fontClass} text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95]`}>
                    <span className={tc.gradientText}>{book.title}</span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-white/40 font-light">
                    {book.subtitle}
                  </p>
                </div>

                <p className="text-lg text-white/60 leading-relaxed max-w-lg">
                  {book.description}
                </p>

                {/* Stats */}
                <div className="flex gap-8 text-sm text-white/40">
                  <div>
                    <span className="block text-2xl font-bold text-white">{publishedChapters.length}</span>
                    Chapters
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-white">{totalReadingTime}</span>
                    Minutes
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-white">Free</span>
                    Online
                  </div>
                </div>

                {/* CTA */}
                {publishedChapters.length > 0 && (
                  <Link
                    href={`/books/${bookSlug}/${publishedChapters[0].slug}`}
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-semibold text-lg hover:bg-white/90 transition-all group`}
                  >
                    Start Reading
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                )}
              </div>

              {/* Book Cover */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-64 sm:w-72 lg:w-80">
                  {/* Glow effect */}
                  <div className={`absolute -inset-8 ${tc.progressGradient} opacity-20 blur-3xl rounded-3xl`} />
                  {/* Cover */}
                  <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl aspect-[2/3]">
                    {book.coverImage ? (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full p-8">
                        <div className="text-center space-y-4">
                          <h2 className={`${fontClass} text-3xl font-bold ${tc.gradientText}`}>{book.title}</h2>
                          <p className="text-white/30 text-sm">{book.subtitle}</p>
                          <p className="text-white/20 text-xs uppercase tracking-wider mt-8">{book.author}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters */}
        <section className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
          <h2 className={`${fontClass} text-3xl font-bold text-white mb-2`}>Chapters</h2>
          <p className="text-white/40 mb-12">Read each chapter free online.</p>

          <div className="space-y-4">
            {book.chapters.map((chapter, i) => (
              <div key={chapter.slug}>
                {chapter.published ? (
                  <Link
                    href={`/books/${bookSlug}/${chapter.slug}`}
                    className={`group flex items-start gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-xl ${tc.hoverBorder} hover:bg-white/[0.04] transition-all`}
                  >
                    <span className={`text-3xl font-bold text-white/10 group-hover:text-white/20 transition-colors tabular-nums min-w-[3rem]`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className={`${fontClass} text-xl font-bold text-white/80 group-hover:text-white transition-colors`}>
                        {chapter.title}
                      </h3>
                      <p className="text-white/40 mt-1 text-sm line-clamp-2">{chapter.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/30 flex-shrink-0">
                      <span>{chapter.readingTime}</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-start gap-6 p-6 bg-white/[0.01] border border-white/5 rounded-xl opacity-50">
                    <span className="text-3xl font-bold text-white/10 tabular-nums min-w-[3rem]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className={`${fontClass} text-xl font-bold text-white/40`}>{chapter.title}</h3>
                      <p className="text-white/20 mt-1 text-sm">{chapter.description}</p>
                    </div>
                    <span className="text-xs text-white/20 bg-white/5 px-3 py-1 rounded-full">Coming Soon</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* PDF Download Gate */}
        <section className="max-w-xl mx-auto px-6 pb-16">
          <BookDownloadGate
            bookSlug={book.slug}
            bookTitle={book.title}
            themeColor={book.theme.primary}
          />
        </section>

        {/* Categories / Tags */}
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div className="flex flex-wrap gap-2">
            {book.categories.map((cat) => (
              <span key={cat} className="px-3 py-1 text-xs text-white/30 border border-white/10 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
