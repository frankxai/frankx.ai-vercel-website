'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Loader2 } from 'lucide-react'

export interface BlueprintCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    name: string
    price: number
    badge: string
    deliverables: string[]
    color: 'emerald' | 'violet'
  } | null
}

export function BlueprintCheckoutModal({
  isOpen,
  onClose,
  product,
}: BlueprintCheckoutModalProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatusMessage('enter a valid email address')
      return
    }

    setLoading(true)
    setStatusMessage(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          email,
        }),
      })

      const data = await res.json()

      if (res.ok && data.url) {
        // Direct redirect to live Stripe Checkout session
        window.location.href = data.url
        return
      }

      // If checkout is gated (waitlist-first / doctrine 0 staging gate)
      if (res.status === 503 || data.refusal) {
        // Post to waitlist / VIP reservation
        try {
          await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              source: `blueprint-${product.id}`,
            }),
          })
        } catch {
          // Non-blocking
        }
        setIsSuccess(true)
        setStatusMessage('reservation confirmed: early-access seat locked at this price')
      } else {
        setStatusMessage(data.error || 'checkout could not be initiated')
      }
    } catch {
      setStatusMessage('network error: unable to reach checkout service. please retry in a moment.')
    } finally {
      setLoading(false)
    }
  }

  const isEmerald = product.color === 'emerald'

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#000000]/80 backdrop-blur-md"
        />

        {/* Modal content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0b] p-6 shadow-[0_16px_64px_rgba(0,0,0,0.8)]"
        >
          {/* Subtle ambient accent blur */}
          <div
            className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl opacity-30 ${
              isEmerald ? 'bg-emerald-500' : 'bg-violet-500'
            }`}
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white"
            aria-label="close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-4">
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium lowercase ${
                isEmerald
                  ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border border-violet-500/30 bg-violet-500/10 text-violet-300'
              }`}
            >
              {product.badge.toLowerCase()}
            </span>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">
              {product.name.toLowerCase()}
            </h3>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">
                ${product.price}
              </span>
              <span className="text-xs font-mono text-white/40">one-time access · instant delivery</span>
            </div>
          </div>

          {/* Deliverables summary */}
          <div className="mb-5 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 text-xs">
            <div className="mb-2 font-mono text-[10px] text-white/40">what you receive immediately:</div>
            <ul className="space-y-1.5 text-white/70">
              {product.deliverables.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                      isEmerald ? 'text-emerald-400' : 'text-violet-400'
                    }`}
                  />
                  <span>{item.toLowerCase()}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Checkout form or success view */}
          {isSuccess ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
              <Sparkles className="mx-auto h-7 w-7 text-emerald-400" />
              <h4 className="mt-2 text-sm font-semibold text-white">seat secured</h4>
              <p className="mt-1 text-xs text-white/70">
                {statusMessage}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/20"
              >
                continue exploring
              </button>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label
                  htmlFor="checkout-email"
                  className="block text-xs font-mono text-white/60 mb-1.5"
                >
                  your delivery email
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  placeholder="frank@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.1] bg-[#000000]/60 px-3.5 py-2.5 text-sm text-white placeholder-white/30 transition-colors focus:border-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-emerald-400/60"
                />
              </div>

              {statusMessage && (
                <p className="text-xs text-amber-300 font-mono">{statusMessage}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-black transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 ${
                  isEmerald
                    ? 'bg-emerald-400 hover:bg-emerald-300'
                    : 'bg-violet-400 hover:bg-violet-300'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>initiating secure checkout...</span>
                  </>
                ) : (
                  <>
                    <span>proceed to checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-white/40 pt-1">
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-emerald-400" />
                  256-bit encrypted
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  stripe secure checkout
                </span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
