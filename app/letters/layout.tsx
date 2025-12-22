import type { Metadata } from 'next'
import { privateRobotsConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Private Letters',
  description: 'Personal letters - not for public viewing',
  robots: privateRobotsConfig,
}

export default function LettersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* No navigation - these are private, intimate pages */}
      <main className="relative">
        {children}
      </main>
      {/* Minimal footer */}
      <footer className="py-8 text-center text-slate-500 text-sm">
        <p className="opacity-50">A private moment in time</p>
      </footer>
    </div>
  )
}
