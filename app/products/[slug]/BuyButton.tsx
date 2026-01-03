'use client'

import { trackConversion } from '@/lib/gtag'

interface BuyButtonProps {
  price: number
  checkoutUrl?: string
}

export default function BuyButton({ price, checkoutUrl }: BuyButtonProps) {
  const handleBuyNow = () => {
    // Track conversion if checkout URL and conversion ID are configured
    if (checkoutUrl && process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID) {
      trackConversion(checkoutUrl, process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID)
      window.location.href = checkoutUrl
    } else {
      // Fallback to contact page for waitlist/interest
      window.location.href = '/contact?product=purchase-interest'
    }
  }

  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-white">${price}</p>
      <button
        onClick={handleBuyNow}
        className="mt-6 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-0.5"
      >
        {checkoutUrl ? 'Buy Now' : 'Get Started'}
      </button>
    </div>
  )
}