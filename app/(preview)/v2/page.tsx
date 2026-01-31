import { Metadata } from 'next'
import HomePagePremium from '@/components/home/HomePagePremium'

export const metadata: Metadata = {
  title: 'V2: Premium Raycast | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function V2Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-cyan-500 text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        V2: Premium Raycast
      </div>
      <HomePagePremium />
    </div>
  )
}
