'use client'

import { useState } from 'react'

interface CheckoutButtonProps {
  productId?: string
  variantId?: string // Legacy support
  price: number
  originalPrice?: number
  label?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Stripe checkout button.
 * When Stripe is not configured (missing productId), shows a "Coming Soon" state.
 * When configured, calls /api/checkout and redirects to the Stripe hosted checkout session.
 */
export default function CheckoutButton({
  productId,
  variantId,
  price,
  originalPrice,
  label = 'Buy Now',
  className = '',
  size = 'md',
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const targetId = productId || variantId
  const isConfigured = Boolean(targetId)

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const handleCheckout = async () => {
    if (!targetId) return

    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: targetId }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        console.error('Checkout failed:', data.error)
        alert(data.error || 'Checkout failed. Please try again.')
      }
    } catch (err) {
      console.error('Checkout request failed:', err)
      alert('Network error. Please check your connection and try again.')
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
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Processing...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
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
