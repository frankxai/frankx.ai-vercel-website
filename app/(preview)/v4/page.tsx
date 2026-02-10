import { Metadata } from 'next'
import HomePageTerminal from '@/components/home/HomePageTerminal'

export const metadata: Metadata = {
  title: 'V4: Dark Terminal | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function V4Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-[#27c93f] text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg font-mono">
        V4: Dark Terminal
      </div>
      <HomePageTerminal />
    </div>
  )
}
