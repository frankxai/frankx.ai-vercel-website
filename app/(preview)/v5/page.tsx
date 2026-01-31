import { Metadata } from 'next'
import HomePageVibrant from '@/components/home/HomePageVibrant'

export const metadata: Metadata = {
  title: 'V5: Vibrant Creator | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function V5Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-gradient-to-r from-violet-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        V5: Vibrant Creator
      </div>
      <HomePageVibrant />
    </div>
  )
}
