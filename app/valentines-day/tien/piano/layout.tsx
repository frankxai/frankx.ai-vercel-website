import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Piano for Tien',
  robots: { index: false, follow: false },
}

export default function PianoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
