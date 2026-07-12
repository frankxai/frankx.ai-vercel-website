import { NextResponse } from 'next/server'

/**
 * Vercel's deployed filesystem is read-only outside /tmp — a write there
 * would either throw or silently land in /tmp and vanish on the next
 * invocation. Call at the top of a write handler and return early if it
 * returns non-null, so the caller fails loud instead of pretending an
 * edit was saved.
 */
export function writesUnavailable(message?: string): NextResponse | null {
  if (!process.env.VERCEL) return null
  return NextResponse.json(
    { error: message ?? 'Admin writes are not available on the deployed site — run this from local `npm run dev`.' },
    { status: 503 }
  )
}
