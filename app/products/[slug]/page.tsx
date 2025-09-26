'use client'

import { products } from '@/lib/products'
import { trackConversion } from '@/lib/gtag'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.id === params.slug)

  if (!product) {
    return <div>Product not found</div>
  }

  const handleBuyNow = () => {
    trackConversion('https://checkout.example.com', 'AW-CONVERSION_ID')
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">{product.name}</h1>
        <p className="mt-4 text-lg text-slate-400">{product.description}</p>
      </div>

      <div className="mt-12">
        <div className="flex justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">${product.price}</p>
            <button
              onClick={handleBuyNow}
              className="mt-6 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-0.5"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
