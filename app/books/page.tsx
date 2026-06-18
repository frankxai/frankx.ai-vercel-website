import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getPublishedBooks } from './lib/books-registry';
import { getThemeClasses } from './lib/theme-classes';
import type { Metadata } from 'next';
import { bookCreationEngine, platformBooks } from '@/data/platform';
import {
  CTASection as PlatformCTASection,
  SectionHeader,
  StatusBadge,
  SystemFlow,
} from '@/components/platform/platform-ui';

export const metadata: Metadata = {
  title: 'Books, Field Notes and Living Systems | FrankX',
  description:
    'Books as operating systems for the Intelligence Age: AI systems, creator OS, cloud AI, Arcanea IP, music, philosophy, and practical field notes.',
  openGraph: {
    title: 'Books, Field Notes and Living Systems | FrankX',
    description: 'Books as operating systems for the Intelligence Age.',
    type: 'website',
  },
};

export default function BooksHubPage() {
  const books = getPublishedBooks();

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-violet-500/[0.06] via-rose-500/[0.04] to-transparent blur-[128px] pointer-events-none" />
        <div className="absolute top-32 right-1/4 w-[300px] h-[300px] bg-amber-500/[0.03] blur-[128px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-white/30 mb-6">
              Books and field notes
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6">
              <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                Books, Field Notes
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-300 via-amber-200 to-violet-300 bg-clip-text text-transparent">
                and Living Systems.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/40 max-w-xl mx-auto leading-relaxed">
              FrankX.ai books explore intelligence, AI, creativity, cloud systems, philosophy,
              worldbuilding, music, and the human operating system.
            </p>
          </div>
        </div>
      </section>

      {/* Living Book Projects */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-y border-white/[0.05]">
        <SectionHeader
          eyebrow="Book Projects"
          title="Books as operating systems for the Intelligence Age."
          deck="The writing lab now connects AI systems, cloud AI, creator operating systems, Arcanea IP, Meaningwave, and philosophical field notes into a durable IP platform."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {platformBooks.map((book) => (
            <Link
              key={book.slug}
              href={book.ctaHref || '/newsletter'}
              className="group rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-white/[0.16] hover:bg-white/[0.055]"
            >
              <div className="mb-6 flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.06] text-emerald-300">
                  <BookOpen className="h-5 w-5" />
                </div>
                <StatusBadge status={book.status} />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                {book.category}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-white">{book.title}</h2>
              <p className="mt-2 text-sm text-emerald-200/70">{book.subtitle}</p>
              <p className="mt-4 text-sm leading-6 text-white/52">{book.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {book.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/42">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5">
                <span className="text-xs capitalize text-white/38">{book.bookStatus.replace('-', ' ')}</span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  {book.ctaLabel || 'Explore project'}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Books Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="mb-10 pt-16">
          <SectionHeader
            eyebrow="Published Library"
            title="Readable books already live on the site."
            deck="The current registry stays intact: published and in-progress books keep their reader routes, covers, chapters, PDF/EPUB paths, and SEO history."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {books.map((book) => {
            const tc = getThemeClasses(book.theme.id);
            const publishedCount = book.chapters.filter((c) => c.published).length;
            const fontClass = book.theme.headingFont === 'serif' ? 'font-serif' : 'font-sans';

            return (
              <Link
                key={book.slug}
                href={`/books/${book.slug}`}
                className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 overflow-hidden"
              >
                {/* Cover / Visual */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* Gradient glow */}
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

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
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

                  {/* Meta */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5 text-xs text-white/30">
                    <div className="flex items-center gap-3">
                      <span>{publishedCount} chapters</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/40">PDF</span>
                    </div>
                    <span className="flex items-center gap-1.5 group-hover:text-white/50 transition-colors">
                      Read
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Book Creation Engine */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <SectionHeader
          eyebrow="Book Creation Engine"
          title="Research, outline, draft, publish, repurpose, productize."
          deck="The book system is designed to compound: every book can become essays, playbooks, templates, workshops, products, and community loops."
        />
        <div className="mt-10">
          <SystemFlow steps={bookCreationEngine} compact />
        </div>
      </section>

      {/* Library CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="relative p-8 sm:p-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-center">
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

      <PlatformCTASection
        eyebrow="Writing Lab"
        title="Follow the book and field-note pipeline."
        deck="New books, research notes, and living systems will move through the newsletter before they become finished products."
        primary={{ label: 'Follow the writing lab', href: '/newsletter' }}
        secondary={{ label: 'Read essays', href: '/blog' }}
      />
    </div>
  );
}
