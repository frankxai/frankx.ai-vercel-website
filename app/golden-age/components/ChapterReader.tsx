'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import ReadingProgress from './ReadingProgress';
import TableOfContents from './TableOfContents';
import ChapterNav from './ChapterNav';
import type { Chapter, TOCItem } from '../types';

interface ChapterReaderProps {
  chapter: Chapter;
  content: string;
  previousChapter?: Chapter;
  nextChapter?: Chapter;
}

export default function ChapterReader({
  chapter,
  content,
  previousChapter,
  nextChapter,
}: ChapterReaderProps) {
  // Extract TOC from content
  const tocItems = useMemo(() => {
    const items: TOCItem[] = [];
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();

      // Skip if it's just a chapter title or sources
      if (
        text.toLowerCase().includes('chapter') ||
        text.toLowerCase().includes('source') ||
        text.toLowerCase().includes('quotable') ||
        text.toLowerCase().includes('end chapter')
      ) {
        continue;
      }

      // Create ID from text
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      items.push({ id, text, level });
    }

    return items;
  }, [content]);

  // Process markdown content with sanitization
  const htmlContent = useMemo(() => {
    // Configure marked
    marked.setOptions({
      gfm: true,
      breaks: true,
    });

    // Add IDs to headings for TOC navigation
    let processedContent = content;
    tocItems.forEach((item) => {
      const headingPattern = new RegExp(`^#{${item.level}}\\s+${item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm');
      processedContent = processedContent.replace(
        headingPattern,
        `${'#'.repeat(item.level)} <span id="${item.id}">${item.text}</span>`
      );
    });

    // Parse markdown and sanitize HTML to prevent XSS
    const rawHtml = marked.parse(processedContent);
    return DOMPurify.sanitize(rawHtml as string, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre', 'span', 'hr'],
      ALLOWED_ATTR: ['href', 'id', 'class', 'target', 'rel'],
    });
  }, [content, tocItems]);

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/golden-age"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">All Chapters</span>
              </Link>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <BookOpen className="w-4 h-4" />
                  <span>Chapter {chapter.number}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{chapter.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <div className="lg:flex lg:gap-12">
            {/* Article */}
            <article className="flex-1 max-w-3xl">
              {/* Chapter Header */}
              <header className="space-y-6 mb-12 pb-12 border-b-2 border-gray-200 dark:border-gray-800">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium">
                    <BookOpen className="w-4 h-4" />
                    <span>Chapter {chapter.number}</span>
                  </div>

                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    {chapter.title}
                  </h1>

                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                    {chapter.description}
                  </p>
                </div>
              </header>

              {/* Chapter Content */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pt-8 prose-h2:border-t prose-h2:border-gray-200 dark:prose-h2:border-gray-800
                  prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                  prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                  prose-em:text-gray-800 dark:prose-em:text-gray-200
                  prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50 dark:prose-blockquote:bg-amber-900/10
                  prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:not-italic
                  prose-blockquote:text-gray-800 dark:prose-blockquote:text-gray-200
                  prose-ul:my-6 prose-ul:space-y-2
                  prose-ol:my-6 prose-ol:space-y-2
                  prose-li:text-gray-700 dark:prose-li:text-gray-300
                  prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
                  prose-hr:border-gray-300 dark:prose-hr:border-gray-700 prose-hr:my-12"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Chapter Navigation */}
              <ChapterNav previousChapter={previousChapter} nextChapter={nextChapter} />
            </article>

            {/* Sidebar - Table of Contents */}
            {tocItems.length > 0 && (
              <div className="hidden lg:block flex-shrink-0 w-80">
                <div className="sticky top-24">
                  <TableOfContents items={tocItems} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile TOC */}
        {tocItems.length > 0 && (
          <div className="lg:hidden">
            <TableOfContents items={tocItems} />
          </div>
        )}
      </div>
    </>
  );
}
