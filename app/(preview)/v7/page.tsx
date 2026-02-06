import { Metadata } from 'next'
import HomePageMinimalist from '@/components/home/HomePageMinimalist'

export const metadata: Metadata = {
  title: 'V7: Minimalist | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function V7Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/20">
        V7: Minimalist
      </div>
      <HomePageMinimalist />
    </div>
  )
}
