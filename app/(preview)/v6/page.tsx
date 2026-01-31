import { Metadata } from 'next'
import HomePageCinematic from '@/components/home/HomePageCinematic'

export const metadata: Metadata = {
  title: 'V6: Cinematic | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function V6Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        V6: Cinematic
      </div>
      <HomePageCinematic />
    </div>
  )
}
