import { Metadata } from 'next'
import ProductsPage from '@/app/products/page'

export const metadata: Metadata = {
  title: 'Products V1: Grid (Current) | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function ProductsV1Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-violet-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        Products V1: Grid
      </div>
      <ProductsPage />
    </div>
  )
}
