import { Metadata } from 'next'
import ProductsPageBento from '@/components/products/ProductsPageBento'

export const metadata: Metadata = {
  title: 'Products V2: Bento Grid | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function ProductsV2Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        Products V2: Bento
      </div>
      <ProductsPageBento />
    </div>
  )
}
