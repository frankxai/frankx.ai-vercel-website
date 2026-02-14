import type { Metadata } from 'next'
import { Cormorant_Garamond, Lora, Dancing_Script } from 'next/font/google'
import './valentines.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-body-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-cursive',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: "In Praise of Love — Poems & Passages for Today | FrankX.ai",
  description: "A curated collection of love poetry, literary passages, and meditations from Rumi, Neruda, Shakespeare, Rilke, and more. For anyone, on any day.",
  openGraph: {
    title: "In Praise of Love — Poems & Passages for Today",
    description: "Poetry, literature, and meditations about love in all its forms. Share it with someone.",
    images: ["/images/valentines/og-valentines-2026.png"],
  },
  twitter: {
    card: 'summary_large_image',
    title: "In Praise of Love — Poems & Passages for Today",
    description: "Poetry, literature, and meditations about love in all its forms. Share it with someone.",
  },
}

export default function ValentinesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${cormorant.variable} ${lora.variable} ${dancingScript.variable} valentine-scroll`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {children}
    </div>
  )
}
