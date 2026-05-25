import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Strategy | FrankX (Private)',
  description: 'Internal content strategy dashboard. Not indexed.',
  robots: { index: false, follow: false },
}

export default function ContentStrategyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}
