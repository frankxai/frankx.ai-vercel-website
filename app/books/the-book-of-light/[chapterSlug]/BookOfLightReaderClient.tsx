'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookChapter } from '../../types';
import AmbientStemMixer from '../../components/AmbientStemMixer';
import BookOfLightCheckoutModal from '../../components/BookOfLightCheckoutModal';

interface BookOfLightReaderClientProps {
  chapter: BookChapter;
  content: string;
  previousChapter?: BookChapter;
  nextChapter?: BookChapter;
  totalChapters: number;
}

export default function BookOfLightReaderClient({
  chapter,
  content,
  previousChapter,
  nextChapter,
  totalChapters,
}: BookOfLightReaderClientProps) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isZenMode, setIsZenMode] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(
          100,
          Math.max(0, Math.round((window.scrollY / totalHeight) * 100))
        );
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyQuote = (quote: string) => {
    navigator.clipboard.writeText(`"${quote}" — Frank Riemer, The Book of Light`);
    setCopiedQuote(quote);
    setTimeout(() => setCopiedQuote(null), 2000);
  };

  const fontClass =
    fontSize === 'normal'
      ? 'text-base sm:text-lg leading-relaxed sm:leading-loose'
      : fontSize === 'large'
      ? 'text-lg sm:text-xl leading-relaxed sm:leading-loose'
      : 'text-xl sm:text-2xl leading-relaxed sm:leading-loose';

  return (
    <div className="min-h-screen bg-[#07080B] text-slate-200 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-900">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Reader Controls Bar */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-2xl bg-[#0d0f15]/90 border border-amber-500/20 backdrop-blur-xl shadow-2xl flex items-center gap-3 transition-opacity ${
          isZenMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'
        }`}
      >
        <Link
          href="/books/the-book-of-light"
          className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 pr-2 border-r border-slate-800"
        >
          <span>←</span>
          <span className="hidden sm:inline">Table of Contents</span>
        </Link>

        {/* Audio Sanctuary Toggle */}
        <button
          onClick={() => setIsAudioOpen(!isAudioOpen)}
          className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5 ${
            isAudioOpen
              ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
              : 'bg-slate-900 text-amber-300 border-amber-500/30 hover:bg-slate-800'
          }`}
        >
          <span>✨</span>
          <span>{isAudioOpen ? 'Hide Stems' : 'Ambient Stems'}</span>
        </button>

        {/* Font Sizer */}
        <div className="hidden sm:flex items-center gap-1 border-l border-slate-800 pl-2">
          <button
            onClick={() => setFontSize('normal')}
            className={`px-2 py-0.5 text-xs font-serif rounded ${
              fontSize === 'normal'
                ? 'bg-amber-500/20 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('large')}
            className={`px-2 py-0.5 text-sm font-serif rounded ${
              fontSize === 'large'
                ? 'bg-amber-500/20 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            A+
          </button>
        </div>

        {/* Zen Mode Toggle */}
        <button
          onClick={() => setIsZenMode(!isZenMode)}
          className={`px-2 py-1 text-xs font-mono rounded-lg border transition-colors ${
            isZenMode
              ? 'bg-slate-800 text-amber-300 border-slate-700'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          {isZenMode ? 'Zen ON' : 'Zen View'}
        </button>
      </nav>

      <div className="mx-auto max-w-3xl px-6 pt-28 pb-32 space-y-12">
        {/* Collapsible Ambient Stem Mixer */}
        {isAudioOpen && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <AmbientStemMixer />
          </div>
        )}

        {/* Chapter Header */}
        <header className="space-y-6 border-b border-amber-500/15 pb-10">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400/80">
            <span>
              Chapter {chapter.number} of {totalChapters}
            </span>
            <span>{chapter.readingTime} reading time</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-[1.15]">
            {chapter.title}
          </h1>

          {chapter.epigraph && (
            <blockquote className="p-4 rounded-xl bg-amber-950/20 border-l-2 border-amber-400 italic font-serif text-amber-200/80 text-sm sm:text-base space-y-1">
              <p>&ldquo;{chapter.epigraph.text}&rdquo;</p>
              {chapter.epigraph.author && (
                <cite className="block text-xs font-sans not-italic text-amber-400/70 font-mono">
                  — {chapter.epigraph.author}
                </cite>
              )}
            </blockquote>
          )}
        </header>

        {/* Main Chapter Content Body */}
        <div className={`space-y-6 font-serif ${fontClass} text-slate-300 leading-relaxed`}>
          {content.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('# ')) {
              return null; // Skip main h1 as it is in header
            }

            if (trimmed.startsWith('## ')) {
              return (
                <h2
                  key={index}
                  className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight pt-6 pb-2"
                >
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }

            if (trimmed.startsWith('---')) {
              return (
                <div key={index} className="my-10 flex justify-center text-amber-500/40">
                  <span className="text-xl tracking-[0.5em] font-serif">✦ ✦ ✦</span>
                </div>
              );
            }

            if (trimmed.startsWith('```')) {
              return (
                <pre
                  key={index}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 overflow-x-auto my-4"
                >
                  {trimmed.replace(/```/g, '')}
                </pre>
              );
            }

            return (
              <p key={index} className="leading-relaxed sm:leading-loose">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Shareable Quote Card */}
        {chapter.epigraph && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-amber-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                ✦ Sovereign Quote from Chapter {chapter.number}
              </span>
              <button
                onClick={() => handleCopyQuote(chapter.epigraph!.text)}
                className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              >
                {copiedQuote === chapter.epigraph.text ? '✓ Copied' : 'Share Quote'}
              </button>
            </div>
            <p className="text-base font-serif italic text-white">
              &ldquo;{chapter.epigraph.text}&rdquo;
            </p>
          </div>
        )}

        {/* Chapter Navigation Footer */}
        <nav className="pt-10 border-t border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          {previousChapter ? (
            <Link
              href={`/books/the-book-of-light/${previousChapter.slug}`}
              className="w-full sm:w-auto p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-all text-left group"
            >
              <span className="text-[10px] font-mono text-slate-500 block">
                ← Previous Chapter
              </span>
              <span className="text-sm font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                {previousChapter.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextChapter ? (
            <Link
              href={`/books/the-book-of-light/${nextChapter.slug}`}
              className="w-full sm:w-auto p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-all text-right group"
            >
              <span className="text-[10px] font-mono text-slate-500 block">
                Next Chapter →
              </span>
              <span className="text-sm font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                {nextChapter.title}
              </span>
            </Link>
          ) : (
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full sm:w-auto p-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold font-mono text-xs shadow-lg shadow-amber-500/10"
            >
              Complete Reading · Unlock Deluxe Master Edition
            </button>
          )}
        </nav>
      </div>

      <BookOfLightCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
