'use client';

import { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  ChevronUp,
  Menu,
  X
} from 'lucide-react';
import type { Chapter, TOCItem } from '../types';

interface PremiumReaderProps {
  chapter: Chapter;
  content: string;
  previousChapter?: Chapter;
  nextChapter?: Chapter;
}

// Reading Progress Bar
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// Scroll to Top Button
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition-colors focus:outline-none focus:ring-4 focus:ring-amber-500/50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Mobile TOC Drawer
function MobileTOC({
  items,
  isOpen,
  onClose
}: {
  items: TOCItem[];
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-white">
                  Contents
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-2">
                {items.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={onClose}
                    className={`block py-2 px-3 rounded-lg text-sm transition-colors hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-700 dark:hover:text-amber-400 ${
                      item.level === 2
                        ? 'font-medium text-gray-900 dark:text-white'
                        : 'ml-4 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Desktop TOC
function DesktopTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-2">
        <h3 className="font-serif text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          In This Chapter
        </h3>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block py-1.5 text-sm transition-all border-l-2 pl-4 ${
              activeId === item.id
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-medium'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400'
            } ${item.level === 3 ? 'ml-4 text-xs' : ''}`}
          >
            {item.text}
          </a>
        ))}
      </div>
    </nav>
  );
}

// Chapter Navigation
function ChapterNav({
  previousChapter,
  nextChapter
}: {
  previousChapter?: Chapter;
  nextChapter?: Chapter;
}) {
  return (
    <div className="mt-20 pt-12 border-t-2 border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {previousChapter && (
          <Link
            href={`/golden-age/${previousChapter.slug}`}
            className="group p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-lg transition-all"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              ← Previous Chapter
            </div>
            <div className="font-serif text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {previousChapter.title}
            </div>
          </Link>
        )}
        {nextChapter && (
          <Link
            href={`/golden-age/${nextChapter.slug}`}
            className={`group p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-lg transition-all ${
              !previousChapter ? 'sm:col-start-2' : ''
            }`}
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-right">
              Next Chapter →
            </div>
            <div className="font-serif text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors text-right">
              {nextChapter.title}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function PremiumReader({
  chapter,
  content,
  previousChapter,
  nextChapter
}: PremiumReaderProps) {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Extract TOC from content
  const tocItems = useMemo(() => {
    const items: TOCItem[] = [];
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();

      // Skip metadata sections
      if (
        text.toLowerCase().includes('chapter') ||
        text.toLowerCase().includes('source') ||
        text.toLowerCase().includes('quotable') ||
        text.toLowerCase().includes('end chapter')
      ) {
        continue;
      }

      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      items.push({ id, text, level });
    }

    return items;
  }, [content]);

  // Process markdown content
  const htmlContent = useMemo(() => {
    marked.setOptions({
      gfm: true,
      breaks: true
    });

    let processedContent = content;

    // Add IDs to headings
    tocItems.forEach((item) => {
      const headingPattern = new RegExp(
        `^#{${item.level}}\\s+${item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
        'm'
      );
      processedContent = processedContent.replace(
        headingPattern,
        `${'#'.repeat(item.level)} <span id="${item.id}">${item.text}</span>`
      );
    });

    const rawHtml = marked.parse(processedContent);
    return DOMPurify.sanitize(rawHtml as string, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote',
        'code', 'pre', 'span', 'hr'
      ],
      ALLOWED_ATTR: ['href', 'id', 'class', 'target', 'rel']
    });
  }, [content, tocItems]);

  return (
    <>
      <ReadingProgress />
      <ScrollToTop />
      <MobileTOC
        items={tocItems}
        isOpen={mobileTocOpen}
        onClose={() => setMobileTocOpen(false)}
      />

      <div className="min-h-screen bg-[#fefdfb] dark:bg-slate-950">
        {/* Premium Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-30 bg-[#fefdfb]/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-amber-100 dark:border-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/golden-age"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium text-sm sm:text-base">The Book</span>
              </Link>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20">
                  <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="font-medium">Ch. {chapter.number}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{chapter.readingTime}</span>
                </div>

                {/* Mobile TOC Toggle */}
                <button
                  onClick={() => setMobileTocOpen(true)}
                  className="xl:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Table of contents"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          <div className="flex gap-8 xl:gap-12">
            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 max-w-3xl mx-auto xl:mx-0"
            >
              {/* Chapter Header */}
              <header className="space-y-6 mb-12 pb-12 border-b-2 border-amber-200 dark:border-amber-900/30">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-800 dark:text-amber-300 text-sm font-semibold border border-amber-200 dark:border-amber-800"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Chapter {chapter.number}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight"
                >
                  {chapter.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light"
                >
                  {chapter.description}
                </motion.p>
              </header>

              {/* Premium Prose Styling */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="premium-prose prose prose-lg sm:prose-xl dark:prose-invert max-w-none
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pt-10 prose-h2:border-t-2 prose-h2:border-amber-200 dark:prose-h2:border-amber-900/30 prose-h2:scroll-mt-24
                  prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:scroll-mt-24
                  prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-lg
                  prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                  prose-em:text-gray-800 dark:prose-em:text-gray-200
                  prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50/50 dark:prose-blockquote:bg-amber-900/10 prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-4 prose-blockquote:my-10 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-gray-800 dark:prose-blockquote:text-gray-200 prose-blockquote:font-serif prose-blockquote:text-lg prose-blockquote:sm:text-xl
                  prose-ul:my-8 prose-ul:space-y-3 prose-ol:my-8 prose-ol:space-y-3
                  prose-li:text-gray-700 dark:prose-li:text-gray-300
                  prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline prose-a:border-b prose-a:border-amber-300 dark:prose-a:border-amber-700 hover:prose-a:border-amber-500 prose-a:transition-colors
                  prose-hr:border-none prose-hr:h-px prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-amber-300 dark:prose-hr:via-amber-800 prose-hr:to-transparent prose-hr:my-16
                "
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Chapter Navigation */}
              <ChapterNav
                previousChapter={previousChapter}
                nextChapter={nextChapter}
              />

              {/* End Flourish */}
              <div className="mt-16 text-center">
                <div className="inline-flex items-center gap-3 text-amber-600 dark:text-amber-400">
                  <span className="w-12 h-px bg-amber-400" />
                  <BookOpen className="w-5 h-5" />
                  <span className="w-12 h-px bg-amber-400" />
                </div>
              </div>
            </motion.article>

            {/* Desktop TOC Sidebar */}
            <DesktopTOC items={tocItems} />
          </div>
        </div>
      </div>
    </>
  );
}
