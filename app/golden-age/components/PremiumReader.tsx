'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  ChevronUp,
  List,
  X,
  ArrowRight,
  Home,
  Eye,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import type { Chapter, TOCItem } from '../types';
import FontSizeControl from './FontSizeControl';

interface PremiumReaderProps {
  chapter: Chapter;
  content: string;
  previousChapter?: Chapter;
  nextChapter?: Chapter;
}

// Premium reading progress bar with smooth spring animation
function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-void/50 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 origin-left"
        style={{ scaleX }}
      />
      {/* Glow effect */}
      <motion.div
        className="absolute right-0 top-0 h-1 w-8 bg-amber-400 blur-md opacity-80"
        style={{
          x: useTransform(scaleX, [0, 1], ['-100vw', '0vw']),
        }}
      />
    </motion.div>
  );
}

// Floating progress indicator (shows percentage)
function FloatingProgressIndicator() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(scrollProgress);
      setVisible(scrollTop > 300 && scrollProgress < 95);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
        >
          <div className="relative w-14 h-14 rounded-2xl bg-void/90 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center group hover:scale-105 transition-transform">
            {/* Circular progress */}
            <svg className="absolute inset-0 w-14 h-14 -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="22"
                strokeWidth="2"
                stroke="rgba(255,255,255,0.1)"
                fill="none"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="22"
                strokeWidth="2"
                stroke="url(#progressGradient)"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={138}
                strokeDashoffset={138 - (progress / 100) * 138}
                transition={{ duration: 0.3 }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xs font-semibold text-white">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Focus mode toggle
function FocusMode({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
        enabled
          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
      title={enabled ? 'Exit focus mode' : 'Enter focus mode'}
    >
      {enabled ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
      <span className="hidden sm:inline">{enabled ? 'Exit Focus' : 'Focus'}</span>
    </button>
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

// Desktop sidebar TOC - Premium design with smooth progress indication
function DesktopTOC({ items, activeId }: { items: TOCItem[]; activeId: string }) {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeIndex = items.findIndex(item => item.id === activeId);

  return (
    <div className="hidden lg:block">
      <div className="sticky top-24 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
          <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">
            In This Chapter
          </h3>
        </div>

        {/* TOC Navigation */}
        <nav className="relative max-h-[60vh] overflow-y-auto pr-2 space-y-1">
          {/* Progress line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
          <motion.div
            className="absolute left-0 w-px bg-gradient-to-b from-amber-500 to-orange-500"
            initial={false}
            animate={{
              top: 0,
              height: activeIndex >= 0 ? `${((activeIndex + 1) / items.length) * 100}%` : '0%',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`relative block w-full text-left py-2.5 pl-5 transition-all duration-200 rounded-r-xl ${
                item.level === 2 ? 'text-sm' : 'pl-8 text-xs'
              } ${
                activeId === item.id
                  ? 'text-amber-400 font-medium bg-amber-500/10'
                  : index < activeIndex
                    ? 'text-gray-500'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {/* Active indicator dot */}
              {activeId === item.id && (
                <motion.div
                  layoutId="tocIndicator"
                  className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1 h-4 bg-amber-500 rounded-full"
                />
              )}
              <span className="line-clamp-2">{item.text}</span>
            </button>
          ))}
        </nav>

        {/* Progress summary */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <div className="text-xs text-gray-500">
              Section {activeIndex + 1} of {items.length}
            </div>
          </div>
        )}
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
  const [focusMode, setFocusMode] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

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

  // Toggle focus mode with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focusMode) {
        setFocusMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusMode]);

  return (
    <>
      <ReadingProgressBar />
      <ScrollToTop />
      <FloatingProgressIndicator />
      <MobileTOC
        items={tocItems}
        isOpen={tocOpen}
        onClose={() => setTocOpen(false)}
        activeId={activeId}
      />

      <div className={`min-h-screen bg-void transition-all duration-500 ${focusMode ? 'bg-[#0a0a0b]' : ''}`}>
        {/* Premium Header */}
        <motion.header
          initial={false}
          animate={{
            opacity: focusMode ? 0 : 1,
            y: focusMode ? -100 : 0,
            pointerEvents: focusMode ? 'none' : 'auto',
          }}
          transition={{ duration: 0.3 }}
          className="sticky top-1 z-30 bg-void/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  href="/golden-age"
                  className="inline-flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-colors rounded-xl px-3 py-1.5 hover:bg-white/5"
                  aria-label="Back to all chapters"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Chapters</span>
                </Link>

                <div className="h-6 w-px bg-white/10 hidden sm:block" />

                <button
                  onClick={scrollToTop}
                  className="hidden sm:flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-colors rounded-xl px-2 py-1.5 hover:bg-white/5"
                >
                  <Home className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-400 text-sm font-medium border border-amber-500/20">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Ch.</span> {chapter.number}
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm text-gray-400 bg-white/5">
                  <Clock className="w-4 h-4" />
                  <span>{chapter.readingTime}</span>
                </div>

                <FontSizeControl onSizeChange={setFontSizeClass} />

                <FocusMode enabled={focusMode} onToggle={() => setFocusMode(!focusMode)} />

                {tocItems.length > 0 && (
                  <button
                    onClick={() => setTocOpen(true)}
                    className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
                    aria-label="Open table of contents"
                  >
                    <List className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content Layout */}
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-16 transition-all duration-500 ${focusMode ? 'max-w-4xl' : ''}`}>
          <div className="lg:flex lg:gap-16">
            {/* Article Content */}
            <article ref={articleRef} className={`flex-1 max-w-3xl mx-auto lg:mx-0 transition-all duration-500 ${focusMode ? 'max-w-2xl' : ''}`}>
              {/* Chapter Header */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 mb-16 pb-12 border-b border-white/10"
              >
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-400 text-sm font-medium border border-amber-500/20 backdrop-blur-sm">
                  <BookOpen className="w-4 h-4" />
                  <span>Chapter {chapter.number}</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                  <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
                    {chapter.title}
                  </span>
                </h1>

                <p className="text-xl text-gray-400 leading-relaxed font-light max-w-2xl">
                  {chapter.description}
                </p>

                {/* Eye-guided reading indicator */}
                <div className="flex items-center gap-3 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400">
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Estimated read: {chapter.readingTime}</span>
                  </div>
                  {focusMode && (
                    <div className="text-sm text-gray-500">
                      Press <kbd className="px-2 py-0.5 rounded bg-white/10 text-gray-300 text-xs font-mono">Esc</kbd> to exit focus mode
                    </div>
                  )}
                </div>
              </motion.header>

              {/* Premium Prose - Content is sanitized with DOMPurify above */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className={`premium-prose prose ${fontSizeClass} prose-invert max-w-none
                  prose-headings:font-serif prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:pt-10
                  prose-h2:border-t prose-h2:border-amber-500/30 prose-h2:text-white prose-h2:tracking-tight
                  prose-h3:text-2xl prose-h3:mt-14 prose-h3:mb-5 prose-h3:text-amber-400
                  prose-p:text-gray-300 prose-p:leading-[1.85] prose-p:mb-7 prose-p:tracking-[0.01em]
                  prose-strong:text-white prose-strong:font-semibold
                  prose-em:text-amber-400 prose-em:not-italic prose-em:font-medium
                  prose-blockquote:relative prose-blockquote:border-l-0
                  prose-blockquote:bg-gradient-to-r prose-blockquote:from-amber-500/10 prose-blockquote:via-amber-500/5 prose-blockquote:to-transparent
                  prose-blockquote:pl-8 prose-blockquote:py-6 prose-blockquote:pr-6
                  prose-blockquote:rounded-2xl prose-blockquote:my-10
                  prose-blockquote:not-italic prose-blockquote:border prose-blockquote:border-amber-500/20
                  prose-blockquote:text-gray-200 prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:italic
                  prose-ul:my-8 prose-ul:space-y-4
                  prose-ol:my-8 prose-ol:space-y-4
                  prose-li:text-gray-300 prose-li:leading-relaxed prose-li:marker:text-amber-500
                  prose-a:text-amber-400 prose-a:no-underline prose-a:font-medium
                  prose-a:border-b prose-a:border-amber-400/30
                  hover:prose-a:border-amber-400 hover:prose-a:text-amber-300
                  prose-hr:border-0 prose-hr:h-px
                  prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-amber-500/30 prose-hr:to-transparent
                  prose-hr:my-20
                  first-letter:text-7xl first-letter:font-serif first-letter:font-bold
                  first-letter:float-left first-letter:mr-4 first-letter:mt-1
                  first-letter:text-amber-500 first-letter:leading-none
                  prose-code:text-amber-300 prose-code:bg-white/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg
                  prose-code:font-mono prose-code:text-[0.9em]
                  prose-code:before:content-none prose-code:after:content-none
                  ${focusMode ? 'prose-p:text-lg prose-p:leading-[2] text-gray-200' : ''}`}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Chapter Navigation - Premium Cards */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-20 pt-12 border-t border-white/10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {previousChapter && previousChapter.published ? (
                    <Link
                      href={`/golden-age/${previousChapter.slug}`}
                      className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 overflow-hidden"
                    >
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-amber-400" />
                          <span className="uppercase tracking-wider text-xs font-medium">Previous</span>
                        </div>
                        <div className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                          {previousChapter.title}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextChapter && nextChapter.published ? (
                    <Link
                      href={`/golden-age/${nextChapter.slug}`}
                      className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 text-right overflow-hidden"
                    >
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-l from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative">
                        <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mb-3">
                          <span className="uppercase tracking-wider text-xs font-medium">Next Chapter</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-400" />
                        </div>
                        <div className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                          {nextChapter.title}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>

                {/* Back to all chapters */}
                <div className="mt-10 text-center">
                  <Link
                    href="/golden-age"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-amber-400 hover:border-amber-500/30 font-medium transition-all"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>View All Chapters</span>
                  </Link>
                </div>
              </motion.nav>
            </article>

            {/* Sidebar TOC - Hidden in focus mode */}
            <AnimatePresence>
              {tocItems.length > 0 && !focusMode && (
                <motion.aside
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:block flex-shrink-0 w-72"
                >
                  <DesktopTOC items={tocItems} activeId={activeId} />
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
