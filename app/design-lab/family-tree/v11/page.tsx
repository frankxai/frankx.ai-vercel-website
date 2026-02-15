'use client'

import dynamic from 'next/dynamic'

const FamilyTreeV11Inner = dynamic(
  () => import('./FamilyTreeV11Inner'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white/60">Loading Sunburst chart...</div>
      </div>
    ),
  }
)

export default function FamilyTreeV11Page() {
  return <FamilyTreeV11Inner />
}
