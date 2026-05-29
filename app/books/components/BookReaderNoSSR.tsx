'use client';

import dynamic from 'next/dynamic';

/**
 * Client wrapper that disables SSR for BookReader.
 *
 * Why: BookReader.tsx renders runtime markdown via `marked` →
 * `isomorphic-dompurify` (which transitively `require()`s `jsdom`).
 * Even with marked + dompurify + jsdom in serverExternalPackages,
 * Turbopack's SSR pre-render of the client component still trips
 * at runtime with "Failed to load external [module]" (verified
 * against deploys `dpl_3jbY...` and `dpl_9GQi...` 2026-05-27).
 *
 * Wrapping in `dynamic(... { ssr: false })` skips the SSR pre-render
 * entirely. Server returns a placeholder; hydration swaps in the
 * real BookReader. Client-side functionality is unaffected.
 *
 * Consumed by app/books/[bookSlug]/[chapterSlug]/page.tsx.
 */
const BookReader = dynamic(() => import('./BookReader'), {
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

export default BookReader;
