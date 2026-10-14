import type { Metadata } from 'next'
import '../../valentines-day/valentines.css'

const cormorant = { variable: 'fx-font-var-display' }

const lora = { variable: 'fx-font-var-body-serif' }

const dancingScript = { variable: 'fx-font-var-cursive' }

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
