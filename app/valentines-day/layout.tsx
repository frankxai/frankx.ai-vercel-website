import type { Metadata } from 'next'
import './valentines.css'

const cormorant = { variable: 'fx-font-var-display' }

const lora = { variable: 'fx-font-var-body-serif' }

const dancingScript = { variable: 'fx-font-var-cursive' }

export const metadata: Metadata = {
  title: "In Praise of Love — Poems & Passages for Today | FrankX.ai",
  description: "A curated collection of love poetry, literary passages, and meditations from Rumi, Neruda, Shakespeare, Rilke, and more. For anyone, on any day.",
  alternates: {
    canonical: 'https://frankx.ai/valentines-day',
    languages: {
      en: '/valentines-day',
      de: '/de/valentines-day',
    },
  },
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
