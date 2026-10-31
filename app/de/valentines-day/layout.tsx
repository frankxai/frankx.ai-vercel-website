import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../../valentines-day/valentines.css'

const cormorant = localFont({
  src: [
    { path: '../../../public/fonts/brand/CormorantGaramond-Variable.woff2', weight: '300', style: 'normal' },
    { path: '../../../public/fonts/brand/CormorantGaramond-Variable.woff2', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/brand/CormorantGaramond-Variable.woff2', weight: '500', style: 'normal' },
    { path: '../../../public/fonts/brand/CormorantGaramond-Variable.woff2', weight: '600', style: 'normal' },
    { path: '../../../public/fonts/brand/CormorantGaramond-Variable.woff2', weight: '700', style: 'normal' },
    { path: '../../../public/fonts/brand/CormorantGaramond-Italic-Variable.woff2', weight: '300', style: 'italic' },
    { path: '../../../public/fonts/brand/CormorantGaramond-Italic-Variable.woff2', weight: '400', style: 'italic' },
    { path: '../../../public/fonts/brand/CormorantGaramond-Italic-Variable.woff2', weight: '500', style: 'italic' },
    { path: '../../../public/fonts/brand/CormorantGaramond-Italic-Variable.woff2', weight: '600', style: 'italic' },
    { path: '../../../public/fonts/brand/CormorantGaramond-Italic-Variable.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

const lora = localFont({
  src: [
    { path: '../../../public/fonts/brand/Lora-Variable.woff2', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/brand/Lora-Variable.woff2', weight: '500', style: 'normal' },
    { path: '../../../public/fonts/brand/Lora-Variable.woff2', weight: '600', style: 'normal' },
    { path: '../../../public/fonts/brand/Lora-Variable.woff2', weight: '700', style: 'normal' },
    { path: '../../../public/fonts/brand/Lora-Italic-Variable.woff2', weight: '400', style: 'italic' },
    { path: '../../../public/fonts/brand/Lora-Italic-Variable.woff2', weight: '500', style: 'italic' },
    { path: '../../../public/fonts/brand/Lora-Italic-Variable.woff2', weight: '600', style: 'italic' },
    { path: '../../../public/fonts/brand/Lora-Italic-Variable.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-body-serif',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

const dancingScript = localFont({
  src: [
    { path: '../../../public/fonts/brand/DancingScript-Variable.woff2', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/brand/DancingScript-Variable.woff2', weight: '500', style: 'normal' },
    { path: '../../../public/fonts/brand/DancingScript-Variable.woff2', weight: '600', style: 'normal' },
    { path: '../../../public/fonts/brand/DancingScript-Variable.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-cursive',
  display: 'swap',
  adjustFontFallback: 'Arial',
})

export const metadata: Metadata = {
  title: 'Lob der Liebe — Gedichte & Meditationen | FrankX.ai',
  description:
    'Eine kuratierte Sammlung von Liebesgedichten, literarischen Passagen und Meditationen von Rilke, Goethe, Hesse, Bachmann, Celan und mehr.',
  alternates: {
    canonical: 'https://frankx.ai/de/valentines-day',
    languages: {
      en: '/valentines-day',
      de: '/de/valentines-day',
    },
  },
  openGraph: {
    title: 'Lob der Liebe — Gedichte & Meditationen',
    description:
      'Liebeslyrik, Literatur und Meditationen. Teile es mit jemandem.',
    locale: 'de_DE',
    images: ['/images/valentines/og-valentines-2026.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lob der Liebe — Gedichte & Meditationen',
    description:
      'Liebeslyrik, Literatur und Meditationen. Teile es mit jemandem.',
  },
}

export default function DeValentinesLayout({
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
