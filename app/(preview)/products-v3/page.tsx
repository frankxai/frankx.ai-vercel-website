import { Metadata } from 'next'
import ProductsPageTimeline from '@/components/products/ProductsPageTimeline'

export const metadata: Metadata = {
  title: 'Products V3: Timeline | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function ProductsV3Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        Products V3: Timeline
      </div>
      <ProductsPageTimeline />
    </div>
  )
}
