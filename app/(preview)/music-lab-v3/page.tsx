import { Metadata } from 'next'
import MusicLabStudio from '@/components/music-lab/MusicLabStudio'

export const metadata: Metadata = {
  title: 'Music Lab V3: Studio | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function MusicLabV3Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-gradient-to-r from-violet-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        Music Lab V3: Studio
      </div>
      <MusicLabStudio />
    </div>
  )
}
