import type { Metadata } from 'next'
import { privateRobotsConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Letter to Future Frank | Private',
  description: 'A personal letter to myself',
  robots: privateRobotsConfig,
}

export default function FutureFrankLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
