import { Metadata } from 'next'
import MusicLabPage from '@/app/music-lab/page'

export const metadata: Metadata = {
  title: 'Music Lab V1: Tutorial (Current) | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function MusicLabV1Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        Music Lab V1: Tutorial
      </div>
      <MusicLabPage />
    </div>
  )
}
