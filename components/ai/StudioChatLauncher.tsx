'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'

const StudioChatSheet = dynamic(() => import('./StudioChatSheet'), { ssr: false })

/**
 * Floating launcher for the Studio Crew chat. Mounted globally in app/layout.tsx.
 * Renders as a small ambient orb bottom-right (bottom-left on mobile to avoid
 * conflicting with browser back gestures), opens the chat sheet on click.
 */
export default function StudioChatLauncher() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Talk to Frank's studio crew"
        className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/30 ring-1 ring-white/10 transition-shadow hover:shadow-xl hover:shadow-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:bottom-6 md:right-6"
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

      <StudioChatSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
