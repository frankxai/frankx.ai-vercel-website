import { Metadata } from 'next'
import MusicLabPlayer from '@/components/music-lab/MusicLabPlayer'

export const metadata: Metadata = {
  title: 'Music Lab V2: Player | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function MusicLabV2Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-gradient-to-r from-pink-500 to-violet-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        Music Lab V2: Player
      </div>
      <MusicLabPlayer />
    </div>
  )
}
