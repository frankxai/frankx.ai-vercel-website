import { Metadata } from 'next'
import HomePageElite from '@/components/home/HomePageElite'

export const metadata: Metadata = {
  title: 'V1: Elite (Current) | FrankX Preview',
  robots: 'noindex, nofollow', // Prevent SEO indexing
}

export default function V1Page() {
  return (
    <div className="relative">
      {/* Variant indicator */}
      <div className="fixed top-20 left-4 z-50 bg-emerald-500 text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        V1: Elite (Current)
      </div>
      <HomePageElite />
    </div>
  )
}
