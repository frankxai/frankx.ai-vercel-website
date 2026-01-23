'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  ChevronUp,
  List,
  X,
  ArrowRight,
  Home,
} from 'lucide-react';
import type { Chapter, TOCItem } from '../types';
import FontSizeControl from './FontSizeControl';

interface PremiumReaderProps {
  chapter: Chapter;
  content: string;
  previousChapter?: Chapter;
  nextChapter?: Chapter;
}

// Reading progress bar
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
}

// Scroll to top button
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', toggleVisible, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition-colors cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Mobile TOC drawer
function MobileTOC({
  items,
  isOpen,
  onClose,
  activeId,
}: {
  items: TOCItem[];
  isOpen: boolean;
  onClose: () => void;
  activeId: string;
}) {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-slate-900 z-50 shadow-2xl lg:hidden overflow-y-auto"
          >
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
              <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white">
                Contents
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    item.level === 2 ? 'font-medium' : 'pl-6 text-sm'
                  } ${
                    activeId === item.id
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Desktop sidebar TOC
function DesktopTOC({ items, activeId }: { items: TOCItem[]; activeId: string }) {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="hidden lg:block">
      <div className="sticky top-24 space-y-4">
        <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
          In This Chapter
        </h3>
        <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`block w-full text-left py-2 border-l-2 transition-all cursor-pointer ${
                item.level === 2 ? 'pl-4' : 'pl-6 text-sm'
              } ${
                activeId === item.id
                  ? 'border-amber-500 text-amber-700 dark:text-amber-400 font-medium'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {item.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function PremiumReader({
  chapter,
  content,
  previousChapter,
  nextChapter,
}: PremiumReaderProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [fontSizeClass, setFontSizeClass] = useState('prose-lg');

  // Extract TOC from content
  const tocItems = useMemo(() => {
    const items: TOCItem[] = [];
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();

      // Skip meta sections
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

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  // Process markdown with premium styling
  const htmlContent = useMemo(() => {
    marked.setOptions({
      gfm: true,
      breaks: true,
    });

    // Add IDs to headings
    let processedContent = content;
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
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'blockquote', 'code', 'pre', 'span', 'hr',
      ],
      ALLOWED_ATTR: ['href', 'id', 'class', 'target', 'rel'],
    });
  }, [content, tocItems]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <ReadingProgressBar />
      <ScrollToTop />
      <MobileTOC
        items={tocItems}
        isOpen={tocOpen}
        onClose={() => setTocOpen(false)}
        activeId={activeId}
      />

      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
        {/* Premium Header */}
        <header className="sticky top-1 z-30 bg-white/95 dark:bg-void/95 backdrop-blur-lg border-b border-gray-200/80 dark:border-gray-800/80 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  href="/golden-age"
                  className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                  aria-label="Back to all chapters"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Chapters</span>
                </Link>

                <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block" />

                <button
                  onClick={scrollToTop}
                  className="hidden sm:flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Ch.</span> {chapter.number}
                </div>

                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{chapter.readingTime}</span>
                </div>

                <FontSizeControl onSizeChange={setFontSizeClass} />

                {tocItems.length > 0 && (
                  <button
                    onClick={() => setTocOpen(true)}
                    className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                    aria-label="Open table of contents"
                  >
                    <List className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-16">
          <div className="lg:flex lg:gap-16">
            {/* Article Content */}
            <article className="flex-1 max-w-3xl mx-auto lg:mx-0">
              {/* Chapter Header */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 mb-12 pb-10 border-b-2 border-amber-200 dark:border-amber-900/50"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 text-amber-800 dark:text-amber-300 text-sm font-medium border border-amber-200 dark:border-amber-800">
                  <BookOpen className="w-4 h-4" />
                  <span>Chapter {chapter.number}</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-amber-800 to-gray-900 dark:from-white dark:via-amber-300 dark:to-white bg-clip-text text-transparent leading-tight">
                  {chapter.title}
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  {chapter.description}
                </p>
              </motion.header>

              {/* Premium Prose */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className={`premium-prose prose ${fontSizeClass} dark:prose-invert max-w-none
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pt-8 prose-h2:border-t-2 prose-h2:border-amber-200 dark:prose-h2:border-amber-900/50
                  prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-amber-800 dark:prose-h3:text-amber-400
                  prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-[1.9] prose-p:mb-6
                  prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                  prose-em:text-amber-800 dark:prose-em:text-amber-400 prose-em:not-italic prose-em:font-medium
                  prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-amber-50 prose-blockquote:to-transparent dark:prose-blockquote:from-amber-900/20 dark:prose-blockquote:to-transparent
                  prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                  prose-blockquote:text-gray-800 dark:prose-blockquote:text-gray-200 prose-blockquote:font-serif prose-blockquote:text-xl
                  prose-ul:my-6 prose-ul:space-y-3
                  prose-ol:my-6 prose-ol:space-y-3
                  prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-relaxed
                  prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline prose-a:font-medium hover:prose-a:underline
                  prose-hr:border-0 prose-hr:h-px prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-amber-300 prose-hr:to-transparent dark:prose-hr:via-amber-700 prose-hr:my-16
                  first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-600 dark:first-letter:text-amber-500"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Chapter Navigation */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-16 pt-10 border-t-2 border-gray-200 dark:border-gray-800"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {previousChapter && previousChapter.published ? (
                    <Link
                      href={`/golden-age/${previousChapter.slug}`}
                      className="group p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/50 dark:hover:bg-amber-900/20 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Previous</span>
                      </div>
                      <div className="font-serif font-bold text-gray-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                        {previousChapter.title}
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextChapter && nextChapter.published ? (
                    <Link
                      href={`/golden-age/${nextChapter.slug}`}
                      className="group p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/50 dark:hover:bg-amber-900/20 transition-all text-right cursor-pointer"
                    >
                      <div className="flex items-center justify-end gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>Next</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="font-serif font-bold text-gray-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                        {nextChapter.title}
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>

                {/* Back to all chapters */}
                <div className="mt-8 text-center">
                  <Link
                    href="/golden-age"
                    className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>View All Chapters</span>
                  </Link>
                </div>
              </motion.nav>
            </article>

            {/* Sidebar TOC */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block flex-shrink-0 w-72">
                <DesktopTOC items={tocItems} activeId={activeId} />
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
