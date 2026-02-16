'use client';

import { useState } from 'react';
import { SHARE_URLS } from '@/lib/social-links';

interface ChapterShareButtonsProps {
  bookTitle: string;
  chapterTitle: string;
  chapterDescription: string;
  bookSlug: string;
  chapterSlug: string;
}

export default function ChapterShareButtons({
  bookTitle,
  chapterTitle,
  chapterDescription,
  bookSlug,
  chapterSlug,
}: ChapterShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const chapterUrl = `https://frankx.ai/books/${bookSlug}/${chapterSlug}`;

  const handleShareX = () => {
    const text = `Reading "${chapterTitle}" from ${bookTitle} by @frankxeth\n\n${chapterDescription}`;
    const url = SHARE_URLS.twitter(text, chapterUrl, 'frankxeth');
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleShareLinkedIn = () => {
    const url = SHARE_URLS.linkedin(chapterUrl);
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(chapterUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <span className="text-white/30 text-xs mr-1">Share</span>

      <button
        onClick={handleShareX}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Post on X
      </button>

      <button
        onClick={handleShareLinkedIn}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Copy link
          </>
        )}
      </button>
    </div>
  );
}
