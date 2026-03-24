import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FrankX Command Center',
  description: 'Private nerve center dashboard',
  robots: { index: false, follow: false },
}

export default function CommandCenterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
