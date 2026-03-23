import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ArcaneaVault — Visual Asset Library | FrankX',
  description:
    'Browse 484 AI-generated visual assets across 30 collections — blog heroes, mascot concepts, ecosystem infographics, architecture diagrams, and more.',
  openGraph: {
    title: 'ArcaneaVault — Visual Asset Library',
    description:
      'The complete visual asset library for the FrankX ecosystem. 484 assets. 30 collections.',
    images: ['/images/ecosystem/01-frankx-ecosystem-overview.png'],
  },
}

export default function VaultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
