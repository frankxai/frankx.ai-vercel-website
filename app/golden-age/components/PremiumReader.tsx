'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  ChevronUp,
  List,
  X,
  ArrowRight,
  Home,
  Bookmark,
  BookMarked,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';
import type { Chapter, TOCItem } from '../types';
import FontSizeControl from './FontSizeControl';
import ChapterFeedback from './ChapterFeedback';
import ShareQuote from './ShareQuote';

interface PremiumReaderProps {
  chapter: Chapter;
  content: string;
  previousChapter?: Chapter;
  nextChapter?: Chapter;
}

// Elegant reading progress with time remaining
function ReadingProgressBar({ readingTime }: { readingTime: string }) {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const totalMinutes = parseInt(readingTime) || 10;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);

      // Calculate time remaining
      const remaining = Math.ceil(totalMinutes * (1 - scrollProgress / 100));
      setTimeRemaining(remaining > 0 ? `${remaining} min left` : 'Almost done');
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, [readingTime]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Progress track */}
      <div className="h-1 bg-gradient-to-r from-amber-100/20 via-amber-200/30 to-amber-100/20 dark:from-amber-900/20 dark:via-amber-800/30 dark:to-amber-900/20">
        <motion.div
          className="h-full relative overflow-hidden"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {/* Animated gradient fill */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          {/* Glow at the edge */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-300/80 to-transparent blur-sm" />
        </motion.div>
      </div>

      {/* Time remaining indicator */}
      <AnimatePresence>
        {progress > 5 && progress < 95 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-4 top-3 text-xs font-medium text-amber-700/70 dark:text-amber-400/70"
          >
            {timeRemaining}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Elegant scroll to top with progress ring
function ScrollToTop({ progress }: { progress: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', toggleVisible, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-14 h-14 flex items-center justify-center cursor-pointer group"
          aria-label="Scroll to top"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-amber-500/20 dark:bg-amber-400/20 rounded-full blur-xl group-hover:bg-amber-500/30 transition-colors" />

          {/* Progress ring */}
          <svg className="absolute inset-0 w-14 h-14 -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-amber-200/30 dark:text-amber-800/30"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-amber-500 dark:text-amber-400"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </svg>

          {/* Center icon */}
          <div className="relative bg-white dark:bg-slate-900 rounded-full p-2 shadow-lg border border-amber-200/50 dark:border-amber-700/50">
            <ChevronUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Enhanced mobile TOC with beautiful animations
function MobileTOC({
  items,
  isOpen,
  onClose,
  activeId,
  chapterNumber,
  chapterTitle,
}: {
  items: TOCItem[];
  isOpen: boolean;
  onClose: () => void;
  activeId: string;
  chapterNumber: number;
  chapterTitle: string;
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
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="fixed right-0 top-0 bottom-0 w-[320px] max-w-[90vw] z-50 lg:hidden overflow-hidden"
          >
            {/* Paper texture background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/80 to-amber-100/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} />

            <div className="relative h-full overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 z-10 backdrop-blur-xl bg-amber-50/90 dark:bg-slate-900/90 border-b border-amber-200/50 dark:border-amber-800/30">
                <div className="flex items-center justify-between p-5">
                  <div>
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm font-medium mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Chapter {chapterNumber}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                      {chapterTitle}
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2.5 hover:bg-amber-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Navigation items with stagger animation */}
              <nav className="p-5 space-y-1">
                {items.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onClick={() => handleClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all cursor-pointer ${
                      item.level === 2 ? 'font-medium' : 'pl-8 text-sm'
                    } ${
                      activeId === item.id
                        ? 'bg-gradient-to-r from-amber-200/80 to-orange-200/60 dark:from-amber-900/40 dark:to-orange-900/30 text-amber-900 dark:text-amber-200 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-amber-100/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {activeId === item.id && (
                        <motion.span
                          layoutId="active-indicator"
                          className="w-1.5 h-1.5 rounded-full bg-amber-500"
                        />
                      )}
                      {item.text}
                    </span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Enhanced desktop TOC with reading progress indicators
function DesktopTOC({
  items,
  activeId,
  progress,
}: {
  items: TOCItem[];
  activeId: string;
  progress: number;
}) {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="hidden lg:block">
      <div className="sticky top-28 space-y-6">
        {/* Section title with decorative elements */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-amber-300/50 to-transparent dark:from-amber-700/50" />
          <h3 className="font-serif text-sm font-bold uppercase tracking-[0.2em] text-amber-700/80 dark:text-amber-400/80">
            Contents
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-amber-300/50 to-transparent dark:from-amber-700/50" />
        </div>

        {/* Navigation with elegant styling */}
        <nav className="space-y-0.5 max-h-[55vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-200 dark:scrollbar-thumb-amber-800">
          {items.map((item, index) => {
            const itemProgress = (index / items.length) * 100;
            const isPast = progress > itemProgress + 10;

            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`group block w-full text-left py-2.5 pl-4 pr-2 border-l-2 transition-all duration-300 cursor-pointer relative ${
                  item.level === 2 ? '' : 'pl-7 text-[0.9rem]'
                } ${
                  activeId === item.id
                    ? 'border-amber-500 dark:border-amber-400'
                    : isPast
                      ? 'border-amber-300/40 dark:border-amber-700/40'
                      : 'border-amber-100 dark:border-slate-800'
                }`}
              >
                <span
                  className={`transition-colors duration-300 ${
                    activeId === item.id
                      ? 'text-amber-800 dark:text-amber-300 font-semibold'
                      : isPast
                        ? 'text-gray-400 dark:text-gray-600'
                        : 'text-gray-600 dark:text-gray-400 group-hover:text-amber-700 dark:group-hover:text-amber-400'
                  }`}
                >
                  {item.text}
                </span>

                {/* Active indicator dot */}
                {activeId === item.id && (
                  <motion.div
                    layoutId="desktop-active"
                    className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 shadow-lg shadow-amber-500/50"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Reading progress summary */}
        <div className="pt-4 border-t border-amber-200/50 dark:border-amber-800/30">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span className="font-medium text-amber-600 dark:text-amber-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-amber-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Bookmark button component
function BookmarkButton({ chapterSlug }: { chapterSlug: string }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('golden-age-bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(chapterSlug));
  }, [chapterSlug]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('golden-age-bookmarks') || '[]');
    let newBookmarks;

    if (isBookmarked) {
      newBookmarks = bookmarks.filter((b: string) => b !== chapterSlug);
    } else {
      newBookmarks = [...bookmarks, chapterSlug];
    }

    localStorage.setItem('golden-age-bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <motion.button
      onClick={toggleBookmark}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-lg transition-all cursor-pointer ${
        isBookmarked
          ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400'
      }`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <BookMarked className="w-5 h-5" />
      ) : (
        <Bookmark className="w-5 h-5" />
      )}
    </motion.button>
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
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  // Track scroll progress
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

  // Extract TOC from content
  const tocItems = useMemo(() => {
    const items: TOCItem[] = [];
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();

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

  // Process markdown
  const htmlContent = useMemo(() => {
    marked.setOptions({ gfm: true, breaks: true });

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
      <ReadingProgressBar readingTime={chapter.readingTime} />
      <ScrollToTop progress={progress} />
      <ShareQuote chapterTitle={chapter.title} chapterSlug={chapter.slug} />
      <MobileTOC
        items={tocItems}
        isOpen={tocOpen}
        onClose={() => setTocOpen(false)}
        activeId={activeId}
        chapterNumber={chapter.number}
        chapterTitle={chapter.title}
      />

      {/* Main container with paper-like atmosphere */}
      <div className="min-h-screen relative">
        {/* Subtle paper texture background */}
        <div className="fixed inset-0 bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-amber-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 pointer-events-none" />
        <div
          className="fixed inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient glow */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-200/20 dark:bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="fixed bottom-1/4 right-0 w-80 h-80 bg-orange-200/15 dark:bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Premium Header */}
        <header className="sticky top-1 z-30 mx-4 sm:mx-6 lg:mx-auto lg:max-w-7xl">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-amber-200/50 dark:border-amber-800/30 shadow-lg shadow-amber-900/5 dark:shadow-black/20">
            <div className="px-4 sm:px-6 py-3">
              <div className="flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-2 sm:gap-4">
                  <Link
                    href="/golden-age"
                    className="group inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                    aria-label="Back to all chapters"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    <span className="hidden sm:inline font-medium">Chapters</span>
                  </Link>

                  <div className="h-6 w-px bg-amber-200/50 dark:bg-amber-800/50 hidden sm:block" />

                  <button
                    onClick={scrollToTop}
                    className="hidden sm:flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Home className="w-4 h-4" />
                  </button>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Chapter badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium border border-amber-200/50 dark:border-amber-700/50">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ch.</span>
                    <span>{chapter.number}</span>
                  </div>

                  {/* Reading time */}
                  <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{chapter.readingTime}</span>
                  </div>

                  {/* Bookmark */}
                  <BookmarkButton chapterSlug={chapter.slug} />

                  {/* Font size */}
                  <FontSizeControl onSizeChange={setFontSizeClass} />

                  {/* TOC toggle */}
                  {tocItems.length > 0 && (
                    <button
                      onClick={() => setTocOpen(true)}
                      className="lg:hidden p-2 hover:bg-amber-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      aria-label="Open table of contents"
                    >
                      <List className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
          <div className="lg:flex lg:gap-20">
            {/* Article */}
            <article ref={articleRef} className="flex-1 max-w-3xl mx-auto lg:mx-0">
              {/* Chapter Header */}
              <motion.header
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8 mb-16 pb-12"
              >
                {/* Chapter number ornament */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/60 to-amber-300/60 dark:via-amber-700/40 dark:to-amber-700/40" />
                  <div className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/20 border border-amber-200/80 dark:border-amber-700/50 shadow-sm">
                    <span className="font-serif text-sm font-bold tracking-widest uppercase text-amber-700 dark:text-amber-400">
                      Chapter {chapter.number}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-300/60 to-amber-300/60 dark:via-amber-700/40 dark:to-amber-700/40" />
                </div>

                {/* Title with elegant typography */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight text-center lg:text-left">
                  <span className="bg-gradient-to-br from-gray-900 via-amber-900 to-gray-800 dark:from-white dark:via-amber-200 dark:to-gray-200 bg-clip-text text-transparent">
                    {chapter.title}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light text-center lg:text-left max-w-2xl">
                  {chapter.description}
                </p>

                {/* Decorative divider */}
                <div className="flex justify-center lg:justify-start pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <div className="w-12 h-0.5 bg-gradient-to-l from-amber-400 to-transparent rounded-full" />
                  </div>
                </div>
              </motion.header>

              {/* Premium Prose Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={`golden-age-prose prose ${fontSizeClass} dark:prose-invert max-w-none

                  /* Headings - Elegant serif with decorative touches */
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:tracking-tight

                  prose-h2:text-3xl prose-h2:sm:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:pt-12
                  prose-h2:border-t prose-h2:border-amber-200/60 dark:prose-h2:border-amber-800/40
                  prose-h2:relative

                  prose-h3:text-2xl prose-h3:mt-14 prose-h3:mb-6 prose-h3:text-amber-900 dark:prose-h3:text-amber-300

                  /* Paragraphs - Optimal reading comfort */
                  prose-p:text-gray-700 dark:prose-p:text-gray-300
                  prose-p:leading-[1.9] prose-p:mb-7
                  prose-p:tracking-[0.01em]

                  /* Emphasis - Subtle but distinctive */
                  prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                  prose-em:text-amber-800 dark:prose-em:text-amber-400 prose-em:not-italic prose-em:font-medium

                  /* Blockquotes - Elegant pull quotes */
                  prose-blockquote:border-l-4 prose-blockquote:border-amber-400 dark:prose-blockquote:border-amber-500
                  prose-blockquote:bg-gradient-to-r prose-blockquote:from-amber-50/80 prose-blockquote:to-transparent
                  dark:prose-blockquote:from-amber-900/20 dark:prose-blockquote:to-transparent
                  prose-blockquote:pl-8 prose-blockquote:py-6 prose-blockquote:pr-6
                  prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:my-10
                  prose-blockquote:text-gray-800 dark:prose-blockquote:text-gray-200
                  prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:leading-relaxed
                  prose-blockquote:shadow-sm prose-blockquote:shadow-amber-100/50 dark:prose-blockquote:shadow-none

                  /* Lists - Clean and scannable */
                  prose-ul:my-8 prose-ul:space-y-4
                  prose-ol:my-8 prose-ol:space-y-4
                  prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-relaxed prose-li:pl-2

                  /* Links - Subtle underline animation */
                  prose-a:text-amber-600 dark:prose-a:text-amber-400
                  prose-a:no-underline prose-a:font-medium
                  prose-a:border-b prose-a:border-amber-300/50 dark:prose-a:border-amber-600/50
                  hover:prose-a:border-amber-500 dark:hover:prose-a:border-amber-400
                  prose-a:transition-colors

                  /* Horizontal rules - Decorative dividers */
                  prose-hr:border-0 prose-hr:h-px
                  prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-amber-300/60 prose-hr:to-transparent
                  dark:prose-hr:via-amber-700/40 prose-hr:my-20

                  /* Drop cap for first letter */
                  first-letter:text-7xl first-letter:font-serif first-letter:font-bold
                  first-letter:float-left first-letter:mr-4 first-letter:mt-1
                  first-letter:text-amber-600 dark:first-letter:text-amber-500
                  first-letter:leading-[0.8]
                `}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Chapter Navigation */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-20 pt-12 border-t border-amber-200/50 dark:border-amber-800/30"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {previousChapter && previousChapter.published ? (
                    <Link
                      href={`/golden-age/${previousChapter.slug}`}
                      className="group relative p-6 rounded-2xl bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-slate-800/50 border border-amber-200/50 dark:border-amber-800/30 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-lg hover:shadow-amber-100/50 dark:hover:shadow-black/20 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/0 to-amber-100/50 dark:from-amber-900/0 dark:to-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="flex items-center gap-2 text-sm text-amber-600/70 dark:text-amber-400/70 mb-3">
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                          <span className="font-medium">Previous Chapter</span>
                        </div>
                        <div className="font-serif text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
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
                      className="group relative p-6 rounded-2xl bg-gradient-to-br from-amber-50/50 to-white dark:from-slate-800/50 dark:to-slate-900 border border-amber-200/50 dark:border-amber-800/30 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-lg hover:shadow-amber-100/50 dark:hover:shadow-black/20 transition-all duration-300 text-right cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-bl from-amber-100/0 to-amber-100/50 dark:from-amber-900/0 dark:to-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="flex items-center justify-end gap-2 text-sm text-amber-600/70 dark:text-amber-400/70 mb-3">
                          <span className="font-medium">Next Chapter</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="font-serif text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
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
                    className="group inline-flex items-center gap-3 px-8 py-4 text-gray-600 dark:text-gray-400 hover:text-amber-700 dark:hover:text-amber-400 font-medium transition-all cursor-pointer rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>View All Chapters</span>
                  </Link>
                </div>
              </motion.nav>

              {/* Chapter Feedback */}
              <ChapterFeedback
                chapterSlug={chapter.slug}
                chapterNumber={chapter.number}
              />
            </article>

            {/* Sidebar TOC */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block flex-shrink-0 w-72">
                <DesktopTOC items={tocItems} activeId={activeId} progress={progress} />
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
