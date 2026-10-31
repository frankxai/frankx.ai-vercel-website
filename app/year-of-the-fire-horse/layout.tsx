import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './fire-horse.css'

const cormorant = localFont({
  src: [
    { path: '../../public/fonts/brand/CormorantGaramond-Variable.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/brand/CormorantGaramond-Variable.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/brand/CormorantGaramond-Variable.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/brand/CormorantGaramond-Variable.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/brand/CormorantGaramond-Variable.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/brand/CormorantGaramond-Italic-Variable.woff2', weight: '300', style: 'italic' },
    { path: '../../public/fonts/brand/CormorantGaramond-Italic-Variable.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/brand/CormorantGaramond-Italic-Variable.woff2', weight: '500', style: 'italic' },
    { path: '../../public/fonts/brand/CormorantGaramond-Italic-Variable.woff2', weight: '600', style: 'italic' },
    { path: '../../public/fonts/brand/CormorantGaramond-Italic-Variable.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

const lora = localFont({
  src: [
    { path: '../../public/fonts/brand/Lora-Variable.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/brand/Lora-Variable.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/brand/Lora-Variable.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/brand/Lora-Variable.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/brand/Lora-Italic-Variable.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/brand/Lora-Italic-Variable.woff2', weight: '500', style: 'italic' },
    { path: '../../public/fonts/brand/Lora-Italic-Variable.woff2', weight: '600', style: 'italic' },
    { path: '../../public/fonts/brand/Lora-Italic-Variable.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-body-serif',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

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
