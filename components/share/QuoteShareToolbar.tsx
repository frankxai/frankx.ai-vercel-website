'use client';

/**
 * QuoteShareToolbar — selection-based (desktop) + tap-to-share (mobile).
 *
 * Each shareable region declares:
 *   data-shareable="quote"
 *   data-quote-text="..."
 *   data-quote-author="..."
 *   data-quote-source="..."
 *   data-quote-permalink="..."
 *
 * Desktop: floating toolbar appears above text selection inside a quote figure.
 * Mobile (touch + coarse pointer): a "Tap to share" badge is injected into
 * each figure on mount; tapping the figure opens the toolbar centered above it.
 * Every share action raises a toast so the user gets confirmation that an
 * intent fired even when it opens in a new tab.
 */

import { useEffect, useRef, useState } from 'react';

type ShareIntent = {
  text: string;
  author: string;
  source: string;
  permalink: string;
};

type Toast = { msg: string; tone: 'info' | 'success' | 'error' };

const SITE_URL = 'https://frankx.ai';
const TOAST_MS = 2400;
const VIEWPORT_PADDING = 12;

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
  const fullPermalink = permalink.startsWith('http')
    ? permalink
    : `${SITE_URL}${permalink}`;
  return { text, author, source, permalink: fullPermalink };
}

function clampLeft(rawLeft: number, viewportWidth: number, toolbarWidth: number) {
  const half = toolbarWidth / 2;
  const minLeft = half + VIEWPORT_PADDING;
  const maxLeft = viewportWidth - half - VIEWPORT_PADDING;
  if (maxLeft < minLeft) return viewportWidth / 2;
  return Math.max(minLeft, Math.min(rawLeft, maxLeft));
}

function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouch(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return isTouch;
}

export function QuoteShareToolbar() {
  const isTouch = useIsTouch();
  const [intent, setIntent] = useState<ShareIntent | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setHasNativeShare(true);
    }
  }, []);

  function showToast(msg: string, tone: Toast['tone'] = 'info') {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ msg, tone });
    toastTimerRef.current = setTimeout(() => setToast(null), TOAST_MS);
  }

  function toolbarWidthEstimate() {
    return hasNativeShare ? 240 : 200;
  }

  function showToolbarForElement(el: HTMLElement) {
    const newIntent = readIntent(el);
    if (!newIntent) return;
    const rect = el.getBoundingClientRect();
    const rawLeft = rect.left + rect.width / 2 + window.scrollX;
    const left = clampLeft(rawLeft, window.innerWidth, toolbarWidthEstimate());
    const aboveTop = rect.top + window.scrollY - 56;
    const belowTop = rect.bottom + window.scrollY + 12;
    const top = aboveTop > window.scrollY + 8 ? aboveTop : belowTop;
    setIntent(newIntent);
    setPosition({ top, left });
  }

  // Selection-based behavior (desktop / non-touch)
  useEffect(() => {
    if (isTouch) return;
    function onSelectionChange() {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
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
      const rect = range.getBoundingClientRect();
      const rawLeft = rect.left + rect.width / 2 + window.scrollX;
      const left = clampLeft(rawLeft, window.innerWidth, toolbarWidthEstimate());
      setIntent(newIntent);
      setPosition({ top: rect.top + window.scrollY - 56, left });
    }
    document.addEventListener('selectionchange', onSelectionChange);
    return () => document.removeEventListener('selectionchange', onSelectionChange);
    // Intentionally keyed on isTouch/hasNativeShare; inline helpers are stable in practice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch, hasNativeShare]);

  // Tap-to-share (touch devices)
  useEffect(() => {
    if (!isTouch) return;
    function onClick(e: MouseEvent) {
      const root = e.target as Node;
      if (toolbarRef.current?.contains(root)) return;
      const target = findShareableTarget(root);
      if (target) {
        showToolbarForElement(target);
      } else {
        setIntent(null);
        setPosition(null);
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
    // Intentionally keyed on isTouch/hasNativeShare; showToolbarForElement is stable in practice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch, hasNativeShare]);

  // Inject "Tap to share" affordance into each figure on touch devices
  useEffect(() => {
    if (!isTouch || typeof document === 'undefined') return;
    const figures = Array.from(
      document.querySelectorAll<HTMLElement>('[data-shareable="quote"]'),
    );
    const cleanups: Array<() => void> = [];
    figures.forEach((fig) => {
      if (fig.dataset.shareBadgeInjected === 'true') return;
      fig.dataset.shareBadgeInjected = 'true';
      const computed = window.getComputedStyle(fig);
      let restorePosition: string | null = null;
      if (computed.position === 'static') {
        restorePosition = fig.style.position;
        fig.style.position = 'relative';
      }
      const badge = document.createElement('div');
      badge.setAttribute('aria-hidden', 'true');
      badge.dataset.shareFab = 'true';
      badge.className =
        'pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/8 backdrop-blur px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/60 border border-white/10';
      badge.textContent = '↗ Tap to share';
      fig.appendChild(badge);
      cleanups.push(() => {
        badge.remove();
        delete fig.dataset.shareBadgeInjected;
        if (restorePosition !== null) fig.style.position = restorePosition;
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [isTouch]);

  // 'S' shortcut on focused figure (keyboard / accessibility)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== 's' || e.metaKey || e.ctrlKey || e.altKey) return;
      const active = document.activeElement;
      if (!active) return;
      const target = findShareableTarget(active);
      if (!target) return;
      e.preventDefault();
      showToolbarForElement(target as HTMLElement);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
    // Intentionally keyed on hasNativeShare; showToolbarForElement is stable in practice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNativeShare]);

  // Escape dismisses
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

  // Re-clamp toolbar on viewport resize
  useEffect(() => {
    function onResize() {
      if (!intent || !position) return;
      const left = clampLeft(position.left, window.innerWidth, toolbarWidthEstimate());
      if (left !== position.left) setPosition({ ...position, left });
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // Intentionally keyed on intent/position/hasNativeShare; toolbarWidthEstimate is stable in practice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intent, position, hasNativeShare]);

  async function onCopy() {
    if (!intent) return;
    try {
      await navigator.clipboard.writeText(buildCopyText(intent));
      showToast('Quote + link copied', 'success');
    } catch {
      showToast('Could not copy — try again', 'error');
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
      showToast('Shared', 'success');
    } catch (err) {
      const name = (err as Error)?.name;
      if (name && name !== 'AbortError') {
        showToast('Share dialog unavailable', 'error');
      }
    }
  }

  function onTwitterClick() {
    showToast('Opening on X — finish in the new tab', 'info');
  }

  function onLinkedInClick() {
    showToast('Opening on LinkedIn — finish in the new tab', 'info');
  }

  const toastEl = toast ? (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-full text-[12px] font-medium border shadow-2xl backdrop-blur whitespace-nowrap pointer-events-none ${
        toast.tone === 'success'
          ? 'bg-emerald-500/15 text-emerald-100 border-emerald-500/30'
          : toast.tone === 'error'
          ? 'bg-rose-500/15 text-rose-100 border-rose-500/30'
          : 'bg-white/10 text-white/90 border-white/20'
      }`}
    >
      {toast.msg}
    </div>
  ) : null;

  if (!intent || !position) return toastEl;

  const buttonSize = isTouch ? 'w-12 h-12' : 'w-10 h-10';
  const iconSize = isTouch ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <>
      <div
        ref={toolbarRef}
        role="toolbar"
        aria-label="Share this quote"
        className="pointer-events-auto fixed z-50 -translate-x-1/2 transition-opacity"
        style={{ top: position.top, left: position.left }}
      >
        <div className="flex items-center gap-1 rounded-full border border-white/12 bg-[#0a0a0b]/95 backdrop-blur shadow-2xl shadow-black/60 px-1.5 py-1.5">
          <a
            href={buildTwitterUrl(intent)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onTwitterClick}
            aria-label="Share on X (Twitter)"
            className={`group inline-flex items-center justify-center ${buttonSize} rounded-full text-white/75 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors`}
          >
            <svg className={iconSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <a
            href={buildLinkedInUrl(intent)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkedInClick}
            aria-label="Share on LinkedIn"
            className={`group inline-flex items-center justify-center ${buttonSize} rounded-full text-white/75 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors`}
          >
            <svg className={iconSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <button
            type="button"
            onClick={onCopy}
            aria-label="Copy quote and link"
            className={`group inline-flex items-center justify-center ${buttonSize} rounded-full text-white/75 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors`}
          >
            <svg className={iconSize} viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </button>

          {hasNativeShare && (
            <button
              type="button"
              onClick={onNativeShare}
              aria-label="Share via system share sheet"
              className={`group inline-flex items-center justify-center ${buttonSize} rounded-full text-white/75 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors`}
            >
              <svg className={iconSize} viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </button>
          )}

          <span
            aria-hidden
            className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#0a0a0b]/95 border-r border-b border-white/12"
          />
        </div>
      </div>
      {toastEl}
    </>
  );
}
