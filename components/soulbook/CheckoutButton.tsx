'use client'

import { useState } from 'react'
import { ShoppingCart, Loader2 } from 'lucide-react'

interface CheckoutButtonProps {
  productId: string
  productName: string
  price: number
  className?: string
  children?: React.ReactNode
}

export default function CheckoutButton({ 
  productId, 
  productName, 
  price, 
  className = '',
  children 
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    
    try {
      // Create checkout session
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          productName,
          price
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { checkoutUrl } = await response.json()
      
      // Redirect to Lemon Squeezy checkout
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('[Checkout] Error:', error)
      alert('Failed to start checkout. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={className || 'inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-lg font-semibold text-white hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading checkout...
        </>
      ) : (
        <>
          {children || (
            <>
              <ShoppingCart className="h-5 w-5" />
              Get Instant Access — ${price}
            </>
          )}
        </>
      )}
    </button>
  )
}
