'use client'

import dynamic from 'next/dynamic'

const FamilyTreeV15Inner = dynamic(
  () => import('./FamilyTreeV15Inner'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white/60">Loading Anime.js experience...</div>
      </div>
    ),
  }
)

export default function FamilyTreeV15Page() {
  return <FamilyTreeV15Inner />
}
