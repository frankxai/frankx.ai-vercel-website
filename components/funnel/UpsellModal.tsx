'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, ArrowRight, Sparkles, Terminal } from 'lucide-react'
import Link from 'next/link'

export interface UpsellOffer {
  id: string
  title: string
  badge?: string
  headline: string
  description: string
  price: number
  regularPrice?: number
  currencySymbol: string
  features: string[]
  ctaText: string
  ctaHref: string
  dismissText?: string
  footnote?: string
}

interface UpsellModalProps {
  isOpen: boolean
  onClose: () => void
  offer: UpsellOffer
  triggerContext?: string
}

export function UpsellModal({
  isOpen,
  onClose,
  offer,
  triggerContext = 'download'
}: UpsellModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // Dialog focus management: move focus in on open, trap Tab, close on Escape,
  // and return focus to the element that was focused when the dialog opened.
  useEffect(() => {
    if (!isOpen) return

    const returnTo = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const getFocusable = () =>
      Array.from(modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [])

    const frame = window.requestAnimationFrame(() => {
      const [first] = getFocusable()
      ;(first ?? modalRef.current)?.focus()
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = getFocusable()
      if (focusable.length === 0) {
        e.preventDefault()
        modalRef.current?.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      const inside = active instanceof Node && modalRef.current?.contains(active)
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyDown)
      if (returnTo && document.contains(returnTo)) returnTo.focus()
    }
  }, [isOpen])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="upsell-modal-title"
        >
          {/* Backdrop with subtle blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl rounded-2xl bg-[#0c0d12] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10"
          >
            {/* Top ambient glow line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/30 via-cyan-500/80 to-blue-500/30" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Badge & Context Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  {offer.badge || 'Launch list'}
                </span>
                {triggerContext === 'download' && (
                  <span className="text-xs text-zinc-400">
                    Your vault download has started.
                  </span>
                )}
              </div>

              {/* Title & Headline */}
              <h2
                id="upsell-modal-title"
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2"
              >
                {offer.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 font-medium mb-4">
                {offer.headline}
              </p>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                {offer.description}
              </p>

              {/* Value Stack / Inclusions */}
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 mb-6 space-y-3">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  What's in the kit:
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-200">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 rounded-full p-0.5 bg-emerald-500/20 text-emerald-400 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/[0.06]">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white tracking-tight">
                      {offer.currencySymbol}{offer.price}
                    </span>
                    {offer.regularPrice && (
                      <span className="text-sm line-through text-zinc-500">
                        {offer.currencySymbol || '$'}{offer.regularPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                  <Link
                    href={offer.ctaHref}
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-[box-shadow,background-color,color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span>{offer.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Dismiss / Secondary Action */}
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                <button
                  onClick={onClose}
                  className="hover:text-zinc-300 underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
                >
                  {offer.dismissText || 'No thanks, continue with my free vault'}
                </button>
              </div>

              {offer.footnote && (
                <p className="mt-3 text-[11px] text-zinc-600 text-center">
                  {offer.footnote}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
