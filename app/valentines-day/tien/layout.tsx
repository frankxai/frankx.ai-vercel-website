import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For Tien',
  robots: { index: false, follow: false },
}

export default function TienLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
