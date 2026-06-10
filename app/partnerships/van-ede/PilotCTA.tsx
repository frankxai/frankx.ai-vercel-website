'use client'

/**
 * PilotCTA — the page's single conversion point.
 *
 * A mailto link (the proposal is a private email forward, not a funnel) that
 * fires the `vanede_pilot_cta` named event on click. Tracking is best-effort
 * and silent — analytics must never block the mail client from opening.
 */

import { ArrowUpRight } from 'lucide-react'

// Subject kept exactly as specified, URL-encoded (× = U+00D7, — = U+2014).
const MAILTO = `mailto:frank.riemer97@gmail.com?subject=${encodeURIComponent(
  'Van Ede × FrankX — pilot workshop',
)}`

export function PilotCTA() {
  function handleClick() {
    // Fire the named conversion event on the analytics surfaces the site already
    // loads (Vercel Analytics `window.va`, plus a gtag fallback). Best-effort and
    // silent — analytics must never block the mail client from opening.
    try {
      const w = window as unknown as {
        va?: (event: 'event', props: { name: string }) => void
        gtag?: (command: 'event', name: string, params?: Record<string, string>) => void
      }
      w.va?.('event', { name: 'vanede_pilot_cta' })
      w.gtag?.('event', 'vanede_pilot_cta')
    } catch {
      /* silent — never block the mailto */
    }
  }

  return (
    <a
      href={MAILTO}
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
      style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
    >
      Book the pilot workshop
      <ArrowUpRight className="w-4 h-4" aria-hidden />
    </a>
  )
}
