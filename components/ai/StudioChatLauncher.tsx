'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'

const StudioChatSheet = dynamic(() => import('./StudioChatSheet'), { ssr: false })

/**
 * Routes where the floating chat orb must not appear:
 *  - /auth/*       sign-in / error pages; chat shouldn't fire before session
 *  - /dashboard/*  admin views with PII per lib/auth.ts
 *  - /admin/*      same
 *  - /studio*      presenter / fullscreen modes (have their own chrome)
 */
const HIDDEN_PREFIXES = ['/auth', '/dashboard', '/admin', '/studio']

/**
 * Floating launcher for the Studio Crew chat. Mounted globally in
 * app/layout.tsx (inside HideOnLandingRoutes so it also stays off /connect).
 * Renders as a small ambient orb — bottom-left on mobile so it doesn't sit
 * under iOS Safari's swipe-from-right back gesture, bottom-right on desktop.
 */
export default function StudioChatLauncher() {
  const pathname = usePathname() ?? ''
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    setMounted(true)
    // Deep-link from /ask pages: `?ask=<question>` auto-opens the chat and
    // prefills the question, closing the loop from indexed Q&A into live chat.
    // Read from the URL directly (not useSearchParams) to avoid a Suspense
    // boundary requirement on every page that renders the launcher.
    try {
      const params = new URLSearchParams(window.location.search)
      const ask = params.get('ask')
      if (ask !== null) {
        setIsOpen(true)
        if (ask && ask !== 'open' && ask !== '1') setInitialPrompt(ask)
      }
    } catch {
      /* no-op */
    }
  }, [])

  if (!mounted) return null
  if (HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Talk to Frank's studio crew"
        className="group fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/30 ring-1 ring-white/10 transition-shadow hover:shadow-xl hover:shadow-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:bottom-6 md:left-auto md:right-6"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 22 }}
      >
        {!prefersReduced && (
          <motion.span
            className="absolute inset-0 rounded-full bg-cyan-400/40 blur-md"
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
        )}
        <span
          className="absolute inset-0 rounded-full bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
        <Sparkles className="relative z-10 h-6 w-6" strokeWidth={2} />
        <span className="sr-only">Open studio chat</span>
      </motion.button>

      <StudioChatSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialPrompt={initialPrompt}
      />
    </>
  )
}
