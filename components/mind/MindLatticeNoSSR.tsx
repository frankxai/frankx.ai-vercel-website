'use client'

import dynamic from 'next/dynamic'

const MindLatticeScene = dynamic(() => import('./MindLatticeScene'), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 bg-black/10"
      aria-hidden
    />
  ),
})

export default function MindLatticeNoSSR({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return <MindLatticeScene reducedMotion={reducedMotion} />
}
