import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design Lab | FrankX.AI',
  description: 'Interactive component playground. PremiumCard system with gradients, glass, tilt, glow, and shine.',
  robots: { index: false, follow: false },
}

export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  return children
}
