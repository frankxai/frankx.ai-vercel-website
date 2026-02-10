import { Metadata } from 'next'
import HomePageBrutalist from '@/components/home/HomePageBrutalist'

export const metadata: Metadata = {
  title: 'V8: Brutalist | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function V8Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-[#FF3366] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        V8: Brutalist
      </div>
      <HomePageBrutalist />
    </div>
  )
}
