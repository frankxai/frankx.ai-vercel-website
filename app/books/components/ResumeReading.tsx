'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { BookChapter } from '../types';

interface ResumeState {
  chapterSlug: string;
  chapterNumber: number;
  chapterTitle: string;
  scrollPct: number;
  updatedAt: number;
}

/**
 * Surfaces a "continue where you left off" affordance on a book's landing page,
 * driven entirely by the reader's own browser (localStorage written by BookReader).
 * Renders nothing on the server and nothing until prior progress is found, so it
 * never causes a hydration mismatch and never shows for first-time readers.
 */
export default function ResumeReading({ bookSlug, chapters, accentClass }: { bookSlug: string; chapters: Pick<BookChapter, 'slug' | 'title' | 'number' | 'published'>[]; accentClass?: string }) {
  const [resume, setResume] = useState<ResumeState | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(`frankx:reading:${bookSlug}`);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ResumeState;
      const chapter = chapters.find(candidate => candidate.published && candidate.slug === parsed?.chapterSlug);
      if (chapter) setResume({ ...parsed, chapterSlug: chapter.slug, chapterTitle: chapter.title, chapterNumber: chapter.number, scrollPct: Number.isFinite(parsed.scrollPct) ? parsed.scrollPct : 0 });
    } catch {
      // Corrupt/blocked storage — silently skip; "Start Reading" remains.
    }
  }, [bookSlug, chapters]);

  if (!resume) return null;

  const pct = Math.max(0, Math.min(100, Math.round(resume.scrollPct)));

  return (
    <Link
      href={`/books/${bookSlug}/${resume.chapterSlug}`}
      className="group inline-flex min-h-11 items-center gap-3 px-5 py-3 rounded-full border border-white/25 text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <svg className="w-4 h-4 flex-shrink-0 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z M12 7v5l3 2" /></svg>
      <span className="text-sm font-medium">
        Continue reading · Chapter {resume.chapterNumber}
        <span className="text-white/70"> · {resume.chapterTitle}</span>
        {pct > 0 && pct < 100 && <span className={`ml-1 ${accentClass ?? 'text-white/50'}`}>({pct}%)</span>}
      </span>
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </Link>
  );
}
