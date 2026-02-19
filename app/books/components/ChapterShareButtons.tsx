'use client';

import { useState } from 'react';
import { SHARE_URLS } from '@/lib/social-links';

interface ChapterShareButtonsProps {
  bookTitle: string;
  chapterTitle: string;
  chapterDescription: string;
  bookSlug: string;
  chapterSlug: string;
  epigraph?: {
    text: string;
    author: string;
  };
}

export default function ChapterShareButtons({
  bookTitle,
  chapterTitle,
  chapterDescription,
  bookSlug,
  chapterSlug,
  epigraph,
}: ChapterShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const chapterUrl = `https://frankx.ai/books/${bookSlug}/${chapterSlug}`;

  const shareText = epigraph 
    ? `"${epigraph.text}" — ${epigraph.author}\n\nReading "${chapterTitle}" from ${bookTitle}`
    : `Reading "${chapterTitle}" from ${bookTitle} by @frankxeth\n\n${chapterDescription}`;

  const handleShareX = () => {
    const url = SHARE_URLS.twitter(shareText, chapterUrl, 'frankxeth');
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleShareLinkedIn = () => {
    const url = SHARE_URLS.linkedin(chapterUrl);
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleShareWhatsApp = () => {
    const url = SHARE_URLS.whatsapp(shareText, chapterUrl);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareTelegram = () => {
    const url = SHARE_URLS.telegram(shareText, chapterUrl);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = () => {
    const url = SHARE_URLS.facebook(chapterUrl);
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(chapterUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-6">
      <span className="text-white/30 text-xs w-full text-center mb-1">Share Chapter</span>

      <button
        onClick={handleShareX}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
        title="Share on X"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        X
      </button>

      <button
        onClick={handleShareLinkedIn}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
        title="Share on LinkedIn"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </button>

      <button
        onClick={handleShareWhatsApp}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
        title="Share on WhatsApp"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72 0 3.412.583 5.123.583 6.553 0 11.89-5.335 11.893-11.892a11.826 11.826 0 00-3.353-8.414z" />
        </svg>
      </button>

      <button
        onClick={handleShareTelegram}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
        title="Share on Telegram"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0C5.347 0 0 5.347 0 11.944c0 6.597 5.347 11.944 11.944 11.944 6.597 0 11.944-5.347 11.944-11.944C23.888 5.347 18.541 0 11.944 0zm5.204 8.017c-.161 1.701-.861 5.86-1.218 7.766-.151.808-.444 1.079-.731 1.106-.623.058-1.096-.411-1.7-.808-.945-.621-1.478-1.008-2.396-1.611-1.06-.697-.373-1.08.232-1.709.158-.164 2.904-2.662 2.956-2.887.006-.028.012-.133-.051-.188-.063-.056-.156-.037-.223-.022-.095.021-1.609 1.021-4.544 3.001-.43.295-.819.44-1.168.432-.383-.009-1.118-.217-1.665-.395-.672-.218-1.206-.334-1.16-.705.024-.193.291-.39.801-.59 3.124-1.359 5.207-2.257 6.249-2.693 2.972-1.242 3.59-1.458 3.993-1.465.089-.001.288.021.417.126.11.089.14.209.154.296.014.086.031.291.018.441z" />
        </svg>
      </button>

      <button
        onClick={handleShareFacebook}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
        title="Share on Facebook"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
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
