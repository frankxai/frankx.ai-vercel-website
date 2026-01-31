import { Metadata } from 'next'
import HomePageEditorial from '@/components/home/HomePageEditorial'

export const metadata: Metadata = {
  title: 'V3: Editorial Luxury | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function V3Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-[#8b5cf6] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        V3: Editorial Luxury
      </div>
      <HomePageEditorial />
    </div>
  )
}
