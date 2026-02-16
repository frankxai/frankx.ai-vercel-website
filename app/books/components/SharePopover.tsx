'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SHARE_URLS } from '@/lib/social-links';

interface SharePopoverProps {
  bookTitle: string;
  chapterTitle: string;
  chapterNumber: number;
  bookSlug: string;
  chapterSlug: string;
}

export default function SharePopover({
  bookTitle,
  chapterTitle,
  chapterNumber,
  bookSlug,
  chapterSlug,
}: SharePopoverProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState('');
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const chapterUrl = `https://frankx.ai/books/${bookSlug}/${chapterSlug}`;

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim() || '';

    if (text.length < 10) {
      setVisible(false);
      return;
    }

    const range = selection?.getRangeAt(0);
    if (!range) return;

    const rect = range.getBoundingClientRect();
    setPosition({
      top: rect.top + window.scrollY - 52,
      left: rect.left + rect.width / 2,
    });
    setSelectedText(text);
    setVisible(true);
    setCopied(false);
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', () => {
      // Debounce slightly to avoid flickering
      setTimeout(handleSelection, 200);
    });

    const handleClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        const selection = window.getSelection();
        if (!selection || selection.toString().trim().length < 10) {
          setVisible(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleSelection]);

  const truncateForTweet = (text: string, maxLen: number) => {
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen - 3) + '...';
  };

  const handleShareX = () => {
    const quote = truncateForTweet(selectedText, 200);
    const tweetText = `"${quote}"\n\n— ${bookTitle}, Ch.${chapterNumber}`;
    const url = SHARE_URLS.twitter(tweetText, chapterUrl, 'frankxeth');
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
    setVisible(false);
  };

  const handleShareLinkedIn = () => {
    const url = SHARE_URLS.linkedin(chapterUrl);
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
    setVisible(false);
  };

  const handleCopy = async () => {
    const quote = `"${selectedText}"\n\n— ${chapterTitle}, ${bookTitle}\n${chapterUrl}`;
    await navigator.clipboard.writeText(quote);
    setCopied(true);
    setTimeout(() => setVisible(false), 1200);
  };

  if (!visible) return null;

  return (
    <div
      ref={popoverRef}
      className="fixed z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 duration-200"
      style={{ top: position.top, left: position.left }}
    >
      <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        <button
          onClick={handleShareX}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          title="Share on X"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Tweet
        </button>

        <div className="w-px h-4 bg-white/20" />

        <button
          onClick={handleShareLinkedIn}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          title="Share on LinkedIn"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </button>

        <div className="w-px h-4 bg-white/20" />

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          title="Copy quote"
        >
          {copied ? (
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <div className="w-2.5 h-2.5 bg-white/10 border-r border-b border-white/20 rotate-45 -mt-1.5" />
      </div>
    </div>
  );
}
