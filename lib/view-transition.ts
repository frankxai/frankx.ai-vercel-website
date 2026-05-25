/**
 * View Transitions API helper — graceful no-op on unsupported browsers.
 *
 * Usage:
 *   import { withViewTransition } from '@/lib/view-transition'
 *   withViewTransition(() => router.push('/watch/shorts/' + id))
 */

declare global {
  interface Document {
    startViewTransition?: (
      callback: () => void | Promise<void>
    ) => { finished: Promise<void> }
  }
}

export function withViewTransition(callback: () => void | Promise<void>) {
  if (typeof document === 'undefined') {
    return callback()
  }

  // If the Document supports it, wrap the DOM update in a View Transition.
  // Otherwise just run the callback — no regression for older browsers.
  if (typeof document.startViewTransition === 'function') {
    document.startViewTransition(() => callback())
    return
  }

  return callback()
}

/** Respect prefers-reduced-motion — skip transitions for those users. */
export function withViewTransitionSafe(callback: () => void | Promise<void>) {
  if (typeof window === 'undefined') return callback()
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduced) return callback()
  return withViewTransition(callback)
}
