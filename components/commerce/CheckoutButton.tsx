'use client'

import { useState } from 'react'

interface CheckoutButtonProps {
  variantId?: string
  price: number
  originalPrice?: number
  label?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Lemon Squeezy checkout button with overlay support.
 * When Lemon Squeezy is not configured, shows a "Coming Soon" state.
 * When configured, opens the Lemon Squeezy checkout overlay.
 */
export default function CheckoutButton({
  variantId,
  price,
  originalPrice,
  label = 'Buy Now',
  className = '',
  size = 'md',
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const isConfigured = Boolean(variantId)

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const handleCheckout = async () => {
    if (!variantId) return

    setLoading(true)
    try {
      // Use Lemon Squeezy JS overlay if available
      if (typeof window !== 'undefined' && (window as any).LemonSqueezy) {
        ;(window as any).LemonSqueezy.Url.Open(
          `https://frankx.lemonsqueezy.com/checkout/buy/${variantId}`
        )
      } else {
        // Fallback: redirect to checkout page
        window.location.href = `https://frankx.lemonsqueezy.com/checkout/buy/${variantId}`
      }
    } catch {
      // Fallback to direct URL
      window.location.href = `https://frankx.lemonsqueezy.com/checkout/buy/${variantId}`
    } finally {
      setLoading(false)
    }
  }

  if (!isConfigured) {
    return (
      <button
        disabled
        className={`${sizeClasses[size]} font-semibold rounded-xl bg-white/[0.06] text-white/40 border border-white/10 cursor-not-allowed ${className}`}
      >
        Coming Soon · ${price}
      </button>
    )
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${sizeClasses[size]} font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-wait ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Processing...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {label}
          <span className="flex items-center gap-1">
            {originalPrice && (
              <span className="line-through text-white/40 text-sm">${originalPrice}</span>
            )}
            <span>${price}</span>
          </span>
        </span>
      )}
    </button>
  )
}
