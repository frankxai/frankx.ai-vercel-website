import type { Metadata } from 'next'
import './fire-horse.css'

const cormorant = { variable: 'fx-font-var-display' }

const lora = { variable: 'fx-font-var-body-serif' }

export const metadata: Metadata = {
  title: 'Year of the Fire Horse 2026 — Poetry, Wisdom & Vision | FrankX.ai',
  description:
    'The Fire Horse returns after 60 years. A Ring of Fire eclipse on Chinese New Year. Proverbs, Rumi, Thich Nhat Hanh, lucky foods, and 9 principles for 2026.',
  alternates: {
    canonical: 'https://frankx.ai/year-of-the-fire-horse',
  },
  openGraph: {
    title: 'Year of the Fire Horse 2026 — Poetry, Wisdom & Vision',
    description:
      'The Fire Horse returns after 60 years on the same day as a Ring of Fire eclipse. Cultural wisdom, poetry, and principles for the year ahead.',
    type: 'article',
    url: 'https://frankx.ai/year-of-the-fire-horse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Year of the Fire Horse 2026',
    description:
      'The Fire Horse returns after 60 years. Poetry, proverbs, and principles for 2026.',
  },
}

export default function FireHorseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${cormorant.variable} ${lora.variable} fire-scroll`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {children}
    </div>
  )
}
