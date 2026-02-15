'use client'

import dynamic from 'next/dynamic'

const FamilyTreeV9Inner = dynamic(
  () => import('./FamilyTreeV9Inner'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white/60">Loading GSAP experience...</div>
      </div>
    ),
  }
)

export default function FamilyTreeV9Page() {
  return <FamilyTreeV9Inner />
}
