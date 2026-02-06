import { Metadata } from 'next'
import HomePageGradient from '@/components/home/HomePageGradient'

export const metadata: Metadata = {
  title: 'V9: Gradient Wave | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function V9Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-gradient-to-r from-violet-600 via-cyan-600 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        V9: Gradient Wave
      </div>
      <HomePageGradient />
    </div>
  )
}
