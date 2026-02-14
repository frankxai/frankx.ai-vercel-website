'use client';

import Link from 'next/link';
import type { BookChapter } from '../types';

interface BookChapterNavProps {
  bookSlug: string;
  previousChapter?: BookChapter;
  nextChapter?: BookChapter;
  hoverBorderClass: string;
  hoverRingClass: string;
}

export default function BookChapterNav({
  bookSlug,
  previousChapter,
  nextChapter,
  hoverBorderClass,
  hoverRingClass,
}: BookChapterNavProps) {
  return (
    <nav className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 pt-12 border-t border-white/10">
      {previousChapter ? (
        <Link
          href={`/books/${bookSlug}/${previousChapter.slug}`}
          className={`group flex items-center gap-4 p-6 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl ${hoverBorderClass} hover:shadow-lg ${hoverRingClass} transition-all`}
        >
          <svg className="w-6 h-6 text-white/30 group-hover:text-white/70 group-hover:-translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          <div className="space-y-1">
            <div className="text-sm font-medium text-white/40">Previous</div>
            <div className="font-serif text-lg font-bold text-white/80 group-hover:text-white transition-colors">
              {previousChapter.title}
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextChapter ? (
        <Link
          href={`/books/${bookSlug}/${nextChapter.slug}`}
          className={`group flex items-center gap-4 p-6 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl ${hoverBorderClass} hover:shadow-lg ${hoverRingClass} transition-all sm:justify-end sm:text-right`}
        >
          <div className="space-y-1">
            <div className="text-sm font-medium text-white/40">Next</div>
            <div className="font-serif text-lg font-bold text-white/80 group-hover:text-white transition-colors">
              {nextChapter.title}
            </div>
          </div>
          <svg className="w-6 h-6 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
