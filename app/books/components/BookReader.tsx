'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import BookProgress from './BookProgress';
import BookTOC from './BookTOC';
import BookChapterNav from './BookChapterNav';
import ExperimentCard from './ExperimentCard';
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
        level === 1 ||
        text.toLowerCase().includes('chapter') ||
        text.toLowerCase().includes('source') ||
        text.toLowerCase().includes('end chapter') ||
        text.toLowerCase().startsWith('prolog') ||
        text.toLowerCase().startsWith('epilog')
      ) continue;
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      items.push({ id, text, level });
    }
    return items;
  }, [content]);

  const htmlContent = useMemo(() => {
    marked.setOptions({ gfm: true, breaks: true });
    let processed = content;

    // Footnotes pass — marked has no native footnote support.
    // Two markdown forms: inline `[^N]` references and `[^N]: text` definitions.
    // We build the def map once, strip defs from prose, then rewrite refs.
    const footnoteDefs = new Map<string, string>();
    const defLineRegex = /^\[\^([\w-]+)\]:\s+(.+)$/gm;
    let defMatch: RegExpExecArray | null;
    while ((defMatch = defLineRegex.exec(processed)) !== null) {
      footnoteDefs.set(defMatch[1], defMatch[2].trim());
    }

    if (footnoteDefs.size > 0) {
      // Strip the existing markdown footnote section + its defs — we'll re-emit at the end.
      processed = processed.replace(/\n+##\s+Footnotes\s*\n[\s\S]*$/m, '');
      processed = processed.replace(/^\[\^[\w-]+\]:\s+.+(\n(?!\[\^|\n).+)*$/gm, '');

      // Number footnotes in order of first inline appearance.
      const orderMap = new Map<string, number>();
      let counter = 1;
      processed = processed.replace(/\[\^([\w-]+)\]/g, (_, key: string) => {
        if (!orderMap.has(key)) orderMap.set(key, counter++);
        const num = orderMap.get(key)!;
        return `<sup class="footnote-ref"><a href="#fn-${num}" id="fnref-${num}" aria-label="Footnote ${num}">${num}</a></sup>`;
      });

      // Append the rendered footnote section. Each def's body is parsed inline so emphasis/links survive.
      const sortedNotes = [...orderMap.entries()].sort((a, b) => a[1] - b[1]);
      const notesItems = sortedNotes
        .map(([key, num]) => {
          const body = footnoteDefs.get(key) ?? '';
          const inlineHtml = marked.parseInline(body) as string;
          return `<li id="fn-${num}" class="footnote-item">${inlineHtml} <a href="#fnref-${num}" class="footnote-back" aria-label="Back to reference ${num}">↩</a></li>`;
        })
        .join('\n');
      processed += `\n\n<hr class="footnote-divider" />\n<section class="footnotes" aria-label="Footnotes">\n<h2 id="footnotes">Footnotes</h2>\n<ol class="footnote-list">\n${notesItems}\n</ol>\n</section>\n`;
    }

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
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'blockquote', 'code', 'pre', 'span', 'hr',
        'img', 'figure', 'figcaption', 'picture', 'source',
        'table', 'thead', 'tbody', 'tr', 'td', 'th', 'caption',
        'div', 'section', 'aside', 'details', 'summary',
        'sup', 'sub', 'mark', 'del', 'ins', 'abbr', 'small',
      ],
      ALLOWED_ATTR: [
        'href', 'id', 'class', 'target', 'rel',
        'src', 'alt', 'width', 'height', 'loading', 'title',
        'colspan', 'rowspan', 'scope',
        'open', 'datetime', 'cite',
      ],
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
                    {chapter.label ?? `Chapter ${chapter.number}`}
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
              {/* Content is sanitized by DOMPurify above — safe to render */}
              <div
                className={`${bodyFontClass} prose prose-lg prose-invert max-w-none book-reader-content
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
                  prose-img:rounded-xl prose-img:my-8 prose-img:shadow-2xl
                  prose-table:border-collapse prose-table:w-full
                  prose-th:text-left prose-th:text-white/90 prose-th:border-b prose-th:border-white/20 prose-th:pb-3
                  prose-td:text-white/70 prose-td:border-b prose-td:border-white/5 prose-td:py-3
                `}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              <style jsx global>{`
                .book-reader-content > h1 + p:first-letter,
                .book-reader-content > h2 + p:first-letter {
                  float: left;
                  font-family: Georgia, 'Times New Roman', serif;
                  font-size: 3.5em;
                  line-height: 0.8;
                  padding-right: 0.12em;
                  padding-top: 0.08em;
                  color: rgba(255,255,255,0.9);
                  font-weight: 700;
                }
                .book-reader-content blockquote strong {
                  font-size: 1.15em;
                  color: rgba(255,255,255,0.95);
                  letter-spacing: -0.01em;
                }
                .book-reader-content figure { margin: 2rem 0; }
                .book-reader-content figcaption {
                  text-align: center; font-size: 0.875rem;
                  color: rgba(255,255,255,0.4); margin-top: 0.75rem; font-style: italic;
                }
                .book-reader-content details {
                  background: rgba(255,255,255,0.03);
                  border: 1px solid rgba(255,255,255,0.08);
                  border-radius: 0.75rem; padding: 1rem 1.25rem; margin: 1.5rem 0;
                }
                .book-reader-content summary {
                  cursor: pointer; font-weight: 600; color: rgba(255,255,255,0.85);
                }
                .book-reader-content hr {
                  border: none; height: 1px;
                  background: linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent);
                  margin: 3rem 0;
                }
                .book-reader-content mark {
                  background: rgba(250, 204, 21, 0.15);
                  color: rgba(255,255,255,0.95); padding: 0.1em 0.3em; border-radius: 0.2em;
                }
                /* Footnotes */
                .book-reader-content .footnote-ref {
                  font-size: 0.75em; line-height: 1; vertical-align: super;
                  margin-left: 0.1em;
                }
                .book-reader-content .footnote-ref a {
                  text-decoration: none; padding: 0 0.25em;
                  border-radius: 0.2em; font-weight: 600;
                  color: currentColor;
                }
                .book-reader-content .footnote-ref a:hover {
                  background: rgba(255,255,255,0.08);
                }
                .book-reader-content section.footnotes {
                  margin-top: 4rem; padding-top: 2rem;
                  font-size: 0.9em; color: rgba(255,255,255,0.55);
                }
                .book-reader-content section.footnotes h2 {
                  font-size: 1.15rem !important; margin-top: 0 !important;
                  margin-bottom: 1.25rem !important; padding-top: 0 !important;
                  border-top: 0 !important; color: rgba(255,255,255,0.7);
                  text-transform: uppercase; letter-spacing: 0.1em;
                }
                .book-reader-content .footnote-list {
                  counter-reset: footnote;
                  list-style: none; padding-left: 0;
                }
                .book-reader-content .footnote-list .footnote-item {
                  counter-increment: footnote;
                  padding-left: 2.5rem; position: relative;
                  margin-bottom: 1rem; line-height: 1.65;
                }
                .book-reader-content .footnote-list .footnote-item::before {
                  content: counter(footnote);
                  position: absolute; left: 0; top: 0;
                  font-weight: 600; color: rgba(255,255,255,0.4);
                  font-variant-numeric: tabular-nums;
                  width: 2rem; text-align: right; padding-right: 0.5rem;
                }
                .book-reader-content .footnote-back {
                  text-decoration: none; color: rgba(255,255,255,0.4);
                  margin-left: 0.4em;
                }
                .book-reader-content .footnote-back:hover {
                  color: rgba(255,255,255,0.8);
                }
                .book-reader-content hr.footnote-divider {
                  margin: 3rem 0 1rem 0;
                  background: rgba(255,255,255,0.06); height: 1px;
                }
              `}</style>

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
