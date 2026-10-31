import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './valentines.css'

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

const dancingScript = localFont({
  src: [
    { path: '../../public/fonts/brand/DancingScript-Variable.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/brand/DancingScript-Variable.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/brand/DancingScript-Variable.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/brand/DancingScript-Variable.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-cursive',
  display: 'swap',
  adjustFontFallback: 'Arial',
})

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
