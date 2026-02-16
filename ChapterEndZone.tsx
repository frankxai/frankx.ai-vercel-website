'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ChapterFeedback from './ChapterFeedback';
import ChapterShareButtons from './ChapterShareButtons';
import { EmailSignup } from '@/components/email-signup';
import { GlassCard } from '@/components/liquid-glass';
import { markChapterRead } from '@/lib/reading-progress';
import { getBookGlossary } from '@/lib/glossary';

interface ChapterEndZoneProps {
  bookSlug: string;
  bookTitle: string;
  chapterSlug: string;
  chapterTitle: string;
  chapterNumber: number;
  chapterDescription: string;
  themeId: string;
  borderClass: string;
}

export default function ChapterEndZone({
  bookSlug,
  bookTitle,
  chapterSlug,
  chapterTitle,
  chapterNumber,
  chapterDescription,
  themeId,
  borderClass,
}: ChapterEndZoneProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const glossary = getBookGlossary(bookSlug);

  // Mark chapter as read when user scrolls to this zone
  useEffect(() => {
    const el = zoneRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markChapterRead(bookSlug, chapterSlug);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [bookSlug, chapterSlug]);

  return (
    <div ref={zoneRef} className="mt-16 mb-12 space-y-8">
      {/* Divider */}
      <div className={`border-t ${borderClass}`} />

      {/* Glossary Link (if available) */}
      {glossary && (
        <GlassCard material="frosted" elevation="low" className="p-5">
          <Link
            href={`/books/${bookSlug}/glossary`}
            className="flex items-center gap-3 group"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 group-hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white group-hover:text-white/90 transition-colors">
                {glossary.title}
              </div>
              <div className="text-sm text-white/50 group-hover:text-white/60 transition-colors">
                {glossary.terms.length} terms defined
              </div>
            </div>
            <svg className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </GlassCard>
      )}

      {/* Feedback */}
      <ChapterFeedback
        bookSlug={bookSlug}
        chapterSlug={chapterSlug}
        chapterNumber={chapterNumber}
        themeId={themeId}
        bookTitle={bookTitle}
      />

      {/* Share buttons */}
      <ChapterShareButtons
        bookTitle={bookTitle}
        chapterTitle={chapterTitle}
        chapterDescription={chapterDescription}
        bookSlug={bookSlug}
        chapterSlug={chapterSlug}
      />

      {/* Email capture */}
      <GlassCard material="crystal" elevation="medium" className="p-8 max-w-md mx-auto">
        <div className="text-center space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-white/60 text-sm">
              Get new chapters and the full PDF when it&apos;s ready
            </p>
          </div>
          <EmailSignup
            listType="newsletter"
            placeholder="Your email"
            buttonText="Subscribe"
            compact
          />
        </div>
      </GlassCard>
    </div>
  );
}
