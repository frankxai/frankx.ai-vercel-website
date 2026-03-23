import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBookGlossary, getTermsByCategory, getAlphabeticalIndex } from '@/lib/glossary';
import { getBookBySlug } from '@/app/books/lib/books-registry';
import { getThemeClasses } from '@/app/books/lib/theme-classes';
import { GlassCard } from '@/components/liquid-glass';
import type { Metadata } from 'next';

interface GlossaryPageProps {
  params: {
    bookSlug: string;
  };
}

export async function generateMetadata({ params }: GlossaryPageProps): Promise<Metadata> {
  const book = getBookBySlug(params.bookSlug);
  const glossary = getBookGlossary(params.bookSlug);

  if (!book || !glossary) {
    return { title: 'Glossary Not Found' };
  }

  return {
    title: `${glossary.title} | ${book.title}`,
    description: glossary.description,
  };
}

export default function GlossaryPage({ params }: GlossaryPageProps) {
  const book = getBookBySlug(params.bookSlug);
  const glossary = getBookGlossary(params.bookSlug);

  if (!book || !glossary) {
    notFound();
  }

  const tc = getThemeClasses(book.theme.id);
  const categorized = getTermsByCategory(glossary);
  const alphabetical = getAlphabeticalIndex(glossary);
  const categories = Object.keys(categorized).sort();
  const letters = Object.keys(alphabetical).sort();

  return (
    <div className={`min-h-screen ${tc.bgPage} text-white`}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/books/${params.bookSlug}`}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium text-sm">{book.title}</span>
            </Link>
            <div className="text-sm text-white/40">
              {glossary.terms.length} terms
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <div className="space-y-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${tc.badgeBg} ${tc.badgeText} text-sm font-medium border ${tc.badgeBorder}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Glossary
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight">
            {glossary.title}
          </h1>

          <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
            {glossary.description}
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mt-12 flex flex-wrap gap-2">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all text-sm font-medium"
            >
              {letter}
            </a>
          ))}
        </div>
      </div>

      {/* Terms by Category */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-16">
        {categories.map((category) => (
          <section key={category} id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
            <h2 className={`text-2xl font-bold font-serif mb-8 pb-4 border-b ${tc.borderPrimary}`}>
              {category}
            </h2>

            <div className="space-y-6">
              {categorized[category].map((term) => {
                const termId = term.term.toLowerCase().replace(/\s+/g, '-');
                return (
                  <GlassCard
                    key={termId}
                    material="frosted"
                    elevation="low"
                    hoverable
                    className="p-6"
                  >
                    <div id={termId} className="scroll-mt-24 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-bold text-white">
                          {term.term}
                        </h3>
                        {term.chapter && (
                          <Link
                            href={`/books/${params.bookSlug}`}
                            className={`text-sm ${tc.textPrimary} hover:underline flex-shrink-0`}
                          >
                            Ch. {term.chapter}
                          </Link>
                        )}
                      </div>

                      <p className="text-white/75 leading-relaxed">
                        {term.extended || term.definition}
                      </p>

                      {term.aliases && term.aliases.length > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-white/40">Also:</span>
                          <span className="text-white/60">{term.aliases.join(', ')}</span>
                        </div>
                      )}

                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div className="flex items-center gap-2 text-sm pt-2 border-t border-white/10">
                          <span className="text-white/40">Related:</span>
                          <div className="flex flex-wrap gap-2">
                            {term.relatedTerms.map((relatedTerm) => {
                              const relatedId = relatedTerm.toLowerCase().replace(/\s+/g, '-');
                              return (
                                <a
                                  key={relatedId}
                                  href={`#${relatedId}`}
                                  className={`${tc.textPrimary} hover:underline`}
                                >
                                  {relatedTerm}
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </section>
        ))}

        {/* Back to Book */}
        <div className="pt-12 border-t border-white/10">
          <Link
            href={`/books/${params.bookSlug}`}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${tc.bgPrimary} ${tc.textPrimary} hover:brightness-110 transition-all font-medium`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to {book.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
