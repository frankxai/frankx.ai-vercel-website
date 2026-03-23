'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import BookProgress from './BookProgress';
import BookTOC from './BookTOC';
import BookChapterNav from './BookChapterNav';
import type { BookChapter, BookTheme, TOCItem } from '../types';
import { getThemeClasses } from '../lib/theme-classes';

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

  const tocItems = useMemo(() => {
    const items: TOCItem[] = [];
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      if (
        text.toLowerCase().includes('chapter') ||
        text.toLowerCase().includes('source') ||
        text.toLowerCase().includes('end chapter')
      ) continue;
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      items.push({ id, text, level });
    }
    return items;
  }, [content]);

  const htmlContent = useMemo(() => {
    marked.setOptions({ gfm: true, breaks: true });
    let processed = content;
    tocItems.forEach((item) => {
      const escaped = item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`^#{${item.level}}\\s+${escaped}$`, 'm');
      processed = processed.replace(
        pattern,
        `${'#'.repeat(item.level)} <span id="${item.id}">${item.text}</span>`
      );
    });
    const rawHtml = marked.parse(processed);
    return DOMPurify.sanitize(rawHtml as string, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre', 'span', 'hr'],
      ALLOWED_ATTR: ['href', 'id', 'class', 'target', 'rel'],
    });
  }, [content, tocItems]);

  return (
    <>
      <BookProgress gradientClass={tc.progressGradient} />

      <div className={`min-h-screen ${tc.bgPage} text-white`}>
        {/* Sticky Header */}
        <header className="sticky top-0 z-30 bg-black/60 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href={`/books/${bookSlug}`}
                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                <span className="font-medium text-sm">{bookTitle}</span>
              </Link>
              <div className="flex items-center gap-4 text-sm text-white/40">
                <span>Ch. {chapter.number}</span>
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
              alt={`Chapter ${chapter.number}: ${chapter.title}`}
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <div className="max-w-3xl mx-auto">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${tc.badgeBg} backdrop-blur-sm ${tc.badgeText} text-sm font-medium border ${tc.badgeBorder} mb-4`}>
                  Chapter {chapter.number}
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
          <div className="lg:flex lg:gap-12">
            <article className={`flex-1 max-w-3xl ${isPoetry ? 'mx-auto' : ''}`}>
              {/* Header (if no hero image) */}
              {!chapter.image && (
                <header className="space-y-6 mb-12 pb-12 border-b border-white/10">
                  {chapter.epigraph && (
                    <blockquote className={`${fontClass} italic text-xl text-white/50 border-l-2 ${tc.borderPrimary} pl-6 py-2`}>
                      <p>{chapter.epigraph.text}</p>
                      <footer className="mt-2 text-sm text-white/30">— {chapter.epigraph.author}</footer>
                    </blockquote>
                  )}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${tc.badgeBg} ${tc.badgeText} text-sm font-medium border ${tc.badgeBorder}`}>
                    Chapter {chapter.number}
                  </div>
                  <h1 className={`${fontClass} text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight`}>
                    {chapter.title}
                  </h1>
                  <p className="text-xl text-white/50 leading-relaxed">
                    {chapter.description}
                  </p>
                </header>
              )}

              {/* Chapter Content */}
              <div
                className={`${bodyFontClass} prose prose-lg prose-invert max-w-none
                  ${isPoetry ? 'text-center leading-loose' : ''}
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-white
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pt-8 prose-h2:border-t prose-h2:border-white/10
                  prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                  prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-white prose-strong:font-semibold
                  prose-em:text-white/80
                  prose-blockquote:border-l-4 prose-blockquote:border-current
                  prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:not-italic prose-blockquote:rounded-r-xl
                  prose-blockquote:text-white/80 prose-blockquote:bg-white/[0.02]
                  prose-ul:my-6 prose-ul:space-y-2
                  prose-ol:my-6 prose-ol:space-y-2
                  prose-li:text-white/70
                  prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-hr:border-white/10 prose-hr:my-12
                `}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

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
                <div className="sticky top-24">
                  <BookTOC items={tocItems} activeClass={tc.tocActive} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile TOC */}
        {tocItems.length > 0 && !isPoetry && (
          <div className="lg:hidden">
            <BookTOC items={tocItems} activeClass={tc.tocActive} />
          </div>
        )}
      </div>
    </>
  );
}
