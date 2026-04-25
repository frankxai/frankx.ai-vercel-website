'use client';

/**
 * QuoteShareToolbar — selection-based share + per-quote action bar.
 *
 * UX pattern: Medium / NYT / Substack
 *
 * Renders nothing visually until:
 *   (a) user selects text inside a `[data-shareable="quote"]` region,
 *       OR
 *   (b) user hovers / focuses on a `[data-shareable="quote"]` region.
 *
 * Then a floating pill appears anchored to the selection (or the figure)
 * with: X (Twitter), LinkedIn, Copy Link, native Web Share (mobile).
 *
 * Each shareable region must declare:
 *   data-shareable="quote"
 *   data-quote-text="..."           (the verbatim quote text)
 *   data-quote-author="..."         (book author)
 *   data-quote-source="..."         (book title)
 *   data-quote-permalink="..."      (absolute URL incl. anchor #q-N)
 *
 * Accessibility: keyboard users can Tab to a quote (figures are tab-focusable
 * via tabIndex=0) and press 'S' to invoke share; Enter copies link.
 */

import { useEffect, useRef, useState } from 'react';

type ShareIntent = {
  text: string;
  author: string;
  source: string;
  permalink: string;
};

const SITE_URL = 'https://frankx.ai';

function buildTwitterUrl({ text, author, source, permalink }: ShareIntent) {
  const body = `"${text}"\n\n— ${author}, ${source}`;
  const params = new URLSearchParams({ text: body, url: permalink });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

function buildLinkedInUrl({ permalink }: ShareIntent) {
  const params = new URLSearchParams({ url: permalink });
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

function buildCopyText({ text, author, source, permalink }: ShareIntent) {
  return `"${text}"\n\n— ${author}, ${source}\n${permalink}`;
}

function findShareableTarget(node: Node | null): HTMLElement | null {
  let current: Node | null = node;
  while (current) {
    if (current.nodeType === Node.ELEMENT_NODE) {
      const el = current as HTMLElement;
      if (el.dataset?.shareable === 'quote') return el;
    }
    current = current.parentNode;
  }
  return null;
}

function readIntent(el: HTMLElement): ShareIntent | null {
  const text = el.dataset.quoteText;
  const author = el.dataset.quoteAuthor;
  const source = el.dataset.quoteSource;
  const permalink = el.dataset.quotePermalink;
  if (!text || !author || !source || !permalink) return null;
  // Build absolute permalink if relative
  const fullPermalink = permalink.startsWith('http')
    ? permalink
    : `${SITE_URL}${permalink}`;
  return { text, author, source, permalink: fullPermalink };
}

export function QuoteShareToolbar() {
  const [intent, setIntent] = useState<ShareIntent | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setHasNativeShare(true);
    }
  }, []);

  // Show toolbar based on selection within shareable region
  useEffect(() => {
    function onSelectionChange() {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        // No selection — only hide if not currently hovering toolbar
        if (!toolbarRef.current?.matches(':hover')) {
          setIntent(null);
          setPosition(null);
        }
        return;
      }

      const range = sel.getRangeAt(0);
      const target = findShareableTarget(range.commonAncestorContainer);
      if (!target) {
        setIntent(null);
        setPosition(null);
        return;
      }

      const newIntent = readIntent(target);
      if (!newIntent) return;

      // Position toolbar above the selection
      const rect = range.getBoundingClientRect();
      const top = rect.top + window.scrollY - 56;
      const left = rect.left + rect.width / 2 + window.scrollX;
      setIntent(newIntent);
      setPosition({ top, left });
      setCopied(false);
    }

    document.addEventListener('selectionchange', onSelectionChange);
    return () => document.removeEventListener('selectionchange', onSelectionChange);
  }, []);

  // Keyboard shortcut: when focus is on a [data-shareable="quote"] figure,
  // pressing 'S' opens share for the whole quote
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== 's' || e.metaKey || e.ctrlKey || e.altKey) return;
      const active = document.activeElement;
      if (!active) return;
      const target = findShareableTarget(active);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const newIntent = readIntent(target);
      if (!newIntent) return;
      e.preventDefault();
      setIntent(newIntent);
      setPosition({
        top: rect.top + window.scrollY - 56,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
      setCopied(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Dismiss on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && intent) {
        setIntent(null);
        setPosition(null);
        window.getSelection()?.removeAllRanges();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [intent]);

  if (!intent || !position) return null;

  async function onCopy() {
    if (!intent) return;
    try {
      await navigator.clipboard.writeText(buildCopyText(intent));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback — silent fail; copy intent failed
    }
  }

  async function onNativeShare() {
    if (!intent) return;
    try {
      await navigator.share({
        title: intent.source,
        text: `"${intent.text}" — ${intent.author}, ${intent.source}`,
        url: intent.permalink,
      });
    } catch {
      // User cancelled — silent
    }
  }

  return (
    <div
      ref={toolbarRef}
      role="toolbar"
      aria-label="Share this quote"
      className="pointer-events-auto fixed z-50 -translate-x-1/2 transition-opacity"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#0a0a0b]/95 backdrop-blur shadow-xl shadow-black/40 px-1.5 py-1.5">
        <a
          href={buildTwitterUrl(intent)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X (Twitter)"
          className="group inline-flex items-center justify-center w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        <a
          href={buildLinkedInUrl(intent)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="group inline-flex items-center justify-center w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>

        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy quote and link'}
          className="group inline-flex items-center justify-center w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          {copied ? (
            <svg className="w-4 h-4 text-emerald-300" viewBox="0 0 24 24" fill="none" strokeWidth={2.5} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          )}
        </button>

        {hasNativeShare && (
          <button
            type="button"
            onClick={onNativeShare}
            aria-label="Share via system share sheet"
            className="group inline-flex items-center justify-center w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
        )}

        {/* Caret pointing to the selection */}
        <span
          aria-hidden
          className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#0a0a0b]/95 border-r border-b border-white/10"
        />
      </div>

      {/* Copy success toast */}
      {copied && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-500/25 text-[11px] font-medium whitespace-nowrap">
          Quote + link copied
        </div>
      )}
    </div>
  );
}
