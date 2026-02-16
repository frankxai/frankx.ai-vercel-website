'use client';

import { useEffect, useRef } from 'react';
import ChapterFeedback from './ChapterFeedback';
import ChapterShareButtons from './ChapterShareButtons';
import { EmailSignup } from '@/components/email-signup';
import { markChapterRead } from '@/lib/reading-progress';

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
    <div ref={zoneRef} className="mt-16 mb-12 space-y-0">
      {/* Divider */}
      <div className={`border-t ${borderClass} mb-8`} />

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
      <div className="max-w-md mx-auto pt-6 pb-2">
        <p className="text-center text-white/40 text-xs mb-3">
          Get new chapters and the full PDF when it&apos;s ready
        </p>
        <EmailSignup
          listType="newsletter"
          placeholder="Your email"
          buttonText="Subscribe"
          compact
        />
      </div>
    </div>
  );
}
