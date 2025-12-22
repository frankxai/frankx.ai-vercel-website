import type { Metadata } from 'next'
import { privateRobotsConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'For Tien | A Love Letter',
  description: 'A private letter of love and gratitude',
  robots: privateRobotsConfig,
}

export default function TienLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
