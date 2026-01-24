'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
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
  Bookmark,
  BookMarked,
  Sparkles,
  Library,
  Minus,
  Plus,
  Moon,
  Sun,
  Palette,
} from 'lucide-react';
import type { Chapter, TOCItem } from '../types';
import ChapterFeedback from './ChapterFeedback';
import ShareQuote from './ShareQuote';

interface PremiumReaderProps {
  chapter: Chapter;
  content: string;
  previousChapter?: Chapter;
  nextChapter?: Chapter;
}

// Reading mode options
type ReadingMode = 'default' | 'sepia' | 'night';

// Premium Reading Progress - Minimal, elegant, always visible
function ReadingProgress({ progress, readingTime }: { progress: number; readingTime: string }) {
  const totalMinutes = parseInt(readingTime) || 10;
  const remaining = Math.ceil(totalMinutes * (1 - progress / 100));
  const timeText = remaining > 0 ? `${remaining} min left` : 'Complete';

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      {/* Ultra-thin progress line */}
      <div className="h-[3px] bg-amber-100/20 dark:bg-amber-900/20">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 relative"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {/* Glowing edge */}
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-amber-300 to-transparent blur-sm" />
        </motion.div>
      </div>

      {/* Time remaining - subtle, right-aligned */}
      <AnimatePresence>
        {progress > 5 && progress < 95 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute right-6 top-4 text-xs font-medium text-amber-700/60 dark:text-amber-400/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm px-2 py-1 rounded-full"
          >
            {timeText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Floating scroll-to-top with progress ring
function ScrollToTop({ progress }: { progress: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', toggleVisible, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-full shadow-2xl border border-amber-200/50 dark:border-amber-700/50" />

          {/* Progress ring */}
          <svg className="absolute inset-0 w-14 h-14 -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-amber-100 dark:text-amber-900/30"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="20"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
          </svg>

          {/* Icon */}
          <ChevronUp className="relative w-5 h-5 text-amber-600 dark:text-amber-400" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Enhanced Mobile TOC Drawer
function MobileTOC({
  items,
  isOpen,
  onClose,
  activeId,
  chapterNumber,
  chapterTitle,
  progress,
}: {
  items: TOCItem[];
  isOpen: boolean;
  onClose: () => void;
  activeId: string;
  chapterNumber: number;
  chapterTitle: string;
  progress: number;
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="fixed right-0 top-0 bottom-0 w-[320px] max-w-[85vw] z-[80] lg:hidden bg-gradient-to-br from-amber-50 via-white to-orange-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-amber-200/30 dark:border-amber-800/30 px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-semibold tracking-wide uppercase mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Chapter {chapterNumber}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                    {chapterTitle}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-amber-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1.5 bg-amber-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
                {Math.round(progress)}% complete
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
              {items.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all cursor-pointer ${
                    item.level === 2 ? 'font-medium' : 'pl-8 text-sm'
                  } ${
                    activeId === item.id
                      ? 'bg-gradient-to-r from-amber-100 to-orange-100/50 dark:from-amber-900/40 dark:to-orange-900/20 text-amber-900 dark:text-amber-200'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {activeId === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    )}
                    <span className="line-clamp-2">{item.text}</span>
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Premium Desktop TOC - Floating sidebar
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
      <div className="sticky top-24 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-amber-300/40 to-transparent dark:from-amber-700/40" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700/70 dark:text-amber-400/70">
            Contents
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-amber-300/40 to-transparent dark:from-amber-700/40" />
        </div>

        {/* Navigation */}
        <nav className="space-y-0.5 max-h-[50vh] overflow-y-auto pr-2">
          {items.map((item, index) => {
            const itemProgress = (index / items.length) * 100;
            const isPast = progress > itemProgress + 15;

            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`group block w-full text-left py-2.5 pl-4 pr-2 border-l-2 transition-all duration-200 cursor-pointer ${
                  item.level === 2 ? 'text-sm' : 'pl-6 text-xs'
                } ${
                  activeId === item.id
                    ? 'border-amber-500 dark:border-amber-400 bg-amber-50/50 dark:bg-amber-900/20'
                    : isPast
                      ? 'border-amber-200/50 dark:border-amber-800/30'
                      : 'border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700'
                }`}
              >
                <span
                  className={`transition-colors line-clamp-2 ${
                    activeId === item.id
                      ? 'text-amber-800 dark:text-amber-300 font-semibold'
                      : isPast
                        ? 'text-gray-400 dark:text-gray-600'
                        : 'text-gray-600 dark:text-gray-400 group-hover:text-amber-700 dark:group-hover:text-amber-400'
                  }`}
                >
                  {item.text}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Progress summary */}
        <div className="pt-4 border-t border-amber-200/30 dark:border-amber-800/30">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-2">
            <span>Reading Progress</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-amber-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Font Size Control
function FontSizeControl({ size, onSizeChange }: { size: number; onSizeChange: (size: number) => void }) {
  const sizes = [16, 18, 20, 22, 24];
  const currentIndex = sizes.indexOf(size);

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
      <button
        onClick={() => currentIndex > 0 && onSizeChange(sizes[currentIndex - 1])}
        disabled={currentIndex === 0}
        className="p-1.5 rounded hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer transition-colors"
        aria-label="Decrease font size"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-8 text-center text-xs font-medium text-gray-600 dark:text-gray-400">{size}</span>
      <button
        onClick={() => currentIndex < sizes.length - 1 && onSizeChange(sizes[currentIndex + 1])}
        disabled={currentIndex === sizes.length - 1}
        className="p-1.5 rounded hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer transition-colors"
        aria-label="Increase font size"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// Reading Mode Selector
function ReadingModeControl({ mode, onModeChange }: { mode: ReadingMode; onModeChange: (mode: ReadingMode) => void }) {
  const modes: { value: ReadingMode; icon: typeof Sun; label: string; bg: string }[] = [
    { value: 'default', icon: Sun, label: 'Default', bg: 'bg-white' },
    { value: 'sepia', icon: Palette, label: 'Sepia', bg: 'bg-amber-100' },
    { value: 'night', icon: Moon, label: 'Night', bg: 'bg-slate-800' },
  ];

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
      {modes.map(({ value, icon: Icon, label, bg }) => (
        <button
          key={value}
          onClick={() => onModeChange(value)}
          className={`p-1.5 rounded transition-all cursor-pointer ${
            mode === value
              ? 'bg-white dark:bg-slate-700 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
          aria-label={label}
          title={label}
        >
          <Icon className={`w-3.5 h-3.5 ${mode === value ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500'}`} />
        </button>
      ))}
    </div>
  );
}

// Bookmark Button
function BookmarkButton({ chapterSlug }: { chapterSlug: string }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('golden-age-bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(chapterSlug));
  }, [chapterSlug]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('golden-age-bookmarks') || '[]');
    const newBookmarks = isBookmarked
      ? bookmarks.filter((b: string) => b !== chapterSlug)
      : [...bookmarks, chapterSlug];
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
          : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500'
      }`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? <BookMarked className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
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
  const [fontSize, setFontSize] = useState(20);
  const [readingMode, setReadingMode] = useState<ReadingMode>('default');
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  // Track scroll progress
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  // Load saved preferences
  useEffect(() => {
    const savedFontSize = localStorage.getItem('golden-age-font-size');
    const savedMode = localStorage.getItem('golden-age-reading-mode');
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedMode) setReadingMode(savedMode as ReadingMode);
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('golden-age-font-size', fontSize.toString());
    localStorage.setItem('golden-age-reading-mode', readingMode);
  }, [fontSize, readingMode]);

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
      { rootMargin: '-20% 0% -60% 0%', threshold: 0 }
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
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre', 'span', 'hr'],
      ALLOWED_ATTR: ['href', 'id', 'class', 'target', 'rel'],
    });
  }, [content, tocItems]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get reading mode class
  const readingModeClass = readingMode === 'sepia' ? 'reading-mode-sepia' : readingMode === 'night' ? 'reading-mode-night' : '';

  return (
    <>
      <ReadingProgress progress={progress} readingTime={chapter.readingTime} />
      <ScrollToTop progress={progress} />
      <ShareQuote chapterTitle={chapter.title} chapterSlug={chapter.slug} />
      <MobileTOC
        items={tocItems}
        isOpen={tocOpen}
        onClose={() => setTocOpen(false)}
        activeId={activeId}
        chapterNumber={chapter.number}
        chapterTitle={chapter.title}
        progress={progress}
      />

      {/* Main container */}
      <div className={`min-h-screen relative ${readingModeClass}`}>
        {/* Background */}
        <div className="fixed inset-0 bg-gradient-to-b from-amber-50/60 via-white to-orange-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 pointer-events-none transition-colors duration-500" />
        <div
          className="fixed inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating Header */}
        <header className="sticky top-3 z-50 mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-lg shadow-black/5 dark:shadow-black/20">
            <div className="px-4 sm:px-6 py-3">
              <div className="flex items-center justify-between gap-4">
                {/* Left: Navigation */}
                <div className="flex items-center gap-3">
                  <Link
                    href="/golden-age"
                    className="group flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    aria-label="Back to chapters"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span className="hidden sm:inline text-sm font-medium">Chapters</span>
                  </Link>

                  <div className="hidden sm:block h-5 w-px bg-gray-200 dark:bg-gray-800" />

                  {/* Chapter indicator */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100/80 to-orange-100/60 dark:from-amber-900/30 dark:to-orange-900/20 text-amber-800 dark:text-amber-300 text-sm font-medium">
                    <Sparkles className="w-3 h-3" />
                    <span>Ch. {chapter.number}</span>
                  </div>
                </div>

                {/* Right: Controls */}
                <div className="flex items-center gap-2">
                  {/* Reading time - desktop only */}
                  <div className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mr-2">
                    <Clock className="w-4 h-4" />
                    <span>{chapter.readingTime}</span>
                  </div>

                  {/* Font size - desktop only */}
                  <div className="hidden md:block">
                    <FontSizeControl size={fontSize} onSizeChange={setFontSize} />
                  </div>

                  {/* Reading mode - desktop only */}
                  <div className="hidden lg:block">
                    <ReadingModeControl mode={readingMode} onModeChange={setReadingMode} />
                  </div>

                  {/* Research Hub */}
                  <Link
                    href={`/golden-age/research/${chapter.slug}`}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                  >
                    <Library className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Research</span>
                  </Link>

                  {/* Bookmark */}
                  <BookmarkButton chapterSlug={chapter.slug} />

                  {/* TOC toggle - mobile */}
                  {tocItems.length > 0 && (
                    <button
                      onClick={() => setTocOpen(true)}
                      className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
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
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="lg:flex lg:gap-16">
            {/* Article */}
            <article ref={articleRef} className="flex-1 max-w-3xl mx-auto lg:mx-0">
              {/* Chapter Header */}
              <motion.header
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-16 text-center lg:text-left"
              >
                {/* Chapter number */}
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                  <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent via-amber-300/50 to-amber-300/50 dark:via-amber-700/30 dark:to-amber-700/30" />
                  <div className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-100/80 to-orange-100/60 dark:from-amber-900/30 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/30">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
                      Chapter {chapter.number}
                    </span>
                  </div>
                  <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent via-amber-300/50 to-amber-300/50 dark:via-amber-700/30 dark:to-amber-700/30" />
                </div>

                {/* Title */}
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                  {chapter.title}
                </h1>

                {/* Description */}
                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                  {chapter.description}
                </p>

                {/* Divider */}
                <div className="flex justify-center lg:justify-start mt-10">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <div className="w-16 h-0.5 bg-gradient-to-l from-amber-400 to-transparent rounded-full" />
                  </div>
                </div>
              </motion.header>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="golden-age-prose prose prose-lg dark:prose-invert max-w-none"
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.85' }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Chapter Navigation */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-20 pt-12 border-t border-amber-200/30 dark:border-amber-800/30"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {previousChapter?.published && (
                    <Link
                      href={`/golden-age/${previousChapter.slug}`}
                      className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-2 text-sm text-amber-600/70 dark:text-amber-400/70 mb-2">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Previous</span>
                      </div>
                      <div className="font-display text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                        {previousChapter.title}
                      </div>
                    </Link>
                  )}

                  {nextChapter?.published && (
                    <Link
                      href={`/golden-age/${nextChapter.slug}`}
                      className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-lg transition-all text-right"
                    >
                      <div className="flex items-center justify-end gap-2 text-sm text-amber-600/70 dark:text-amber-400/70 mb-2">
                        <span>Next</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="font-display text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                        {nextChapter.title}
                      </div>
                    </Link>
                  )}
                </div>

                {/* Back to chapters */}
                <div className="mt-8 text-center">
                  <Link
                    href="/golden-age"
                    className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-amber-700 dark:hover:text-amber-400 font-medium rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>View All Chapters</span>
                  </Link>
                </div>
              </motion.nav>

              {/* Feedback */}
              <ChapterFeedback chapterSlug={chapter.slug} chapterNumber={chapter.number} />
            </article>

            {/* Desktop TOC Sidebar */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block flex-shrink-0 w-64">
                <DesktopTOC items={tocItems} activeId={activeId} progress={progress} />
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
