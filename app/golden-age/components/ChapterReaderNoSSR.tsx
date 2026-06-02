'use client';

import dynamic from 'next/dynamic';

/**
 * Client wrapper that disables SSR for ChapterReader.
 *
 * Why: ChapterReader.tsx renders runtime markdown via `marked` →
 * `isomorphic-dompurify` (which transitively `require()`s `jsdom`).
 * Even with marked + dompurify + jsdom in serverExternalPackages,
 * Turbopack's SSR pre-render of the client component trips at runtime
 * with "Failed to load external [module]" — a live 500 on every
 * /golden-age/<chapter> page (verified 2026-06-03, dpl_5Xfd8q…).
 *
 * Wrapping in `dynamic(... { ssr: false })` skips the SSR pre-render
 * entirely. Server returns the placeholder; hydration swaps in the real
 * ChapterReader. Same proven fix as app/books/components/BookReaderNoSSR.tsx.
 *
 * Consumed by app/golden-age/[chapter]/page.tsx.
 */
const ChapterReader = dynamic(() => import('./ChapterReader'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[60vh] animate-pulse">
      <div className="mx-auto h-8 w-2/3 rounded bg-white/5" />
      <div className="mx-auto mt-4 h-4 w-1/2 rounded bg-white/5" />
      <div className="mx-auto mt-12 space-y-3">
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-11/12 rounded bg-white/5" />
        <div className="h-4 w-10/12 rounded bg-white/5" />
        <div className="h-4 w-full rounded bg-white/5" />
      </div>
    </div>
  ),
});

export default ChapterReader;
