import Image from 'next/image';
import Link from 'next/link';
import BookProgress from './BookProgress';
import BookTOC from './BookTOC';
import BookChapterNav from './BookChapterNav';
import ExperimentCard from './ExperimentCard';
import type { BookChapter, BookTheme } from '../types';
import { getThemeClasses } from '../lib/theme-classes';
import { renderChapter } from '../lib/render-chapter';
import styles from './BookReader.module.css';

interface BookReaderProps {
  chapter: BookChapter;
  content: string;
  bookSlug: string;
  bookTitle: string;
  theme: BookTheme;
  previousChapter?: BookChapter;
  nextChapter?: BookChapter;
}

export default function BookReader({
  chapter,
  content,
  bookSlug,
  bookTitle,
  theme,
  previousChapter,
  nextChapter,
}: BookReaderProps) {
  const tc = getThemeClasses(theme.id);
  const isPoetry = chapter.type === 'poetry' || chapter.type === 'quotes';
  const fontClass = theme.headingFont === 'serif' ? 'font-serif' : 'font-sans';
  const bodyFontClass = theme.bodyFont === 'serif' ? 'font-serif' : 'font-sans';

  const { html: htmlContent, tocItems } = renderChapter(content, chapter.title);

  return (
    <>
      <BookProgress gradientClass={tc.progressGradient} />

      <div className={`${styles.reader} min-h-screen pt-14 sm:pt-16 ${tc.bgPage} text-white`}>
        {/* Sticky Header */}
        {/* Match NavigationMega's h-14 / sm:h-16 fixed header so the return
            link remains visible and clickable after chapter navigation. */}
        <header data-book-reader-header className="sticky top-14 sm:top-16 z-30 bg-black/60 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-1">
            <div className="flex items-center justify-between">
              <Link
                href={`/books/${bookSlug}`}
                className="inline-flex min-h-11 min-w-0 items-center gap-2 text-white/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors motion-reduce:transition-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                <span className="truncate font-medium text-sm">{bookTitle}</span>
              </Link>
              <div className="ml-4 flex shrink-0 items-center gap-3 text-xs text-white/70">
                <span>{chapter.label ?? `Ch. ${chapter.number}`}</span>
                <span>{chapter.readingTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Chapter Hero Image */}
        {chapter.image && (
          <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden">
            <Image
              src={chapter.image}
              alt={`${chapter.label ?? `Chapter ${chapter.number}`}: ${chapter.title}`}
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <div className="max-w-3xl mx-auto">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${tc.badgeBg} backdrop-blur-sm ${tc.badgeText} text-sm font-medium border ${tc.badgeBorder} mb-4`}>
                  {chapter.label ?? `Chapter ${chapter.number}`}
                </div>
                <h1 className={`${fontClass} text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight`}>
                  {chapter.title}
                </h1>
                <p className="text-xl text-white/60 leading-relaxed mt-4 max-w-2xl">
                  {chapter.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20">
          {tocItems.length > 0 && !isPoetry && (
            <div className="mb-8 lg:hidden">
              <BookTOC items={tocItems} activeClass={tc.tocActive} mode="mobile" />
            </div>
          )}
          <div className="lg:flex lg:gap-12">
            <article className={`min-w-0 flex-1 max-w-3xl ${isPoetry ? 'mx-auto' : ''}`}>
              {/* Header (if no hero image) */}
              {!chapter.image && (
                <header className="space-y-6 mb-12 pb-12 border-b border-white/10">
                  {chapter.epigraph && (
                    <blockquote className={`${fontClass} italic text-xl text-white/75 border-l-2 ${tc.borderPrimary} pl-6 py-2`}>
                      <p>{chapter.epigraph.text}</p>
                      <footer className="mt-2 text-sm text-white/65">— {chapter.epigraph.author}</footer>
                    </blockquote>
                  )}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${tc.badgeBg} ${tc.badgeText} text-sm font-medium border ${tc.badgeBorder}`}>
                    {chapter.label ?? `Chapter ${chapter.number}`}
                  </div>
                  <h1 className={`${fontClass} text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight`}>
                    {chapter.title}
                  </h1>
                  <p className="text-xl text-white/70 leading-relaxed">
                    {chapter.description}
                  </p>
                </header>
              )}

              {/* Chapter Content */}
              {/* Server preparation ends with sanitization after all document transformations. */}
              <div
                className={`${bodyFontClass} book-reader-content ${styles.content} ${theme.headingFont === 'serif' ? styles.serifHeadings : styles.sansHeadings} ${isPoetry ? styles.poetry : styles.prose}`}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              {chapter.experiment && (
                <div className="mt-12">
                  <ExperimentCard
                    experiment={chapter.experiment}
                    borderClass={tc.borderPrimary}
                    bookSlug={bookSlug}
                    chapterSlug={chapter.slug}
                  />
                </div>
              )}

              <BookChapterNav
                bookSlug={bookSlug}
                previousChapter={previousChapter}
                nextChapter={nextChapter}
                hoverBorderClass={tc.hoverBorder}
                hoverRingClass={tc.hoverRing}
              />
            </article>

            {/* Desktop TOC */}
            {tocItems.length > 0 && !isPoetry && (
              <div className="hidden lg:block flex-shrink-0 w-80">
                <div className="sticky top-36">
                  <BookTOC items={tocItems} activeClass={tc.tocActive} mode="desktop" />
                </div>
              </div>
            )}
          </div>
        </div>


      </div>
    </>
  );
}
