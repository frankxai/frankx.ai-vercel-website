import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FrankX CMS - Tina Edition',
  description: 'Content Management for FrankX courses and articles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
