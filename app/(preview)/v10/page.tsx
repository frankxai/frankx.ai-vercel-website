import { Metadata } from 'next'
import HomePageFeed from '@/components/home/HomePageFeed'

export const metadata: Metadata = {
  title: 'V10: Feed | FrankX Preview',
  robots: 'noindex, nofollow',
}

export default function V10Page() {
  return (
    <div className="relative">
      <div className="fixed top-20 left-4 z-50 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        V10: Feed
      </div>
      <HomePageFeed />
    </div>
  )
}
