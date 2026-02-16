import type { Metadata } from 'next'
import { Cormorant_Garamond, Lora } from 'next/font/google'
import './mama.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const lora = Lora({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Musik für Mama — Piano, Orchester & Klänge für die Familie | FrankX',
  description:
    'Eine persönliche Musiksammlung für Mama. Klavier, Orchester, Kindermusik und Aktivitäten für die ganze Familie. Mit Liebe von Frank.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Musik für Mama — Von Frank mit Liebe',
    description:
      'Piano, Orchesterklänge und Musik zum Genießen. Inklusive Aktivitäten für Nichten und Neffen.',
  },
}

export default function MamaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${cormorant.variable} ${lora.variable} mama-scroll`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {children}
    </div>
  )
}
