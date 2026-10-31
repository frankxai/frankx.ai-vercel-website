import localFont from 'next/font/local'
import type { Metadata } from 'next'

const garamond = localFont({
  src: [
    { path: '../../public/fonts/brand/EBGaramond-Variable.woff2', weight: '400 800', style: 'normal' },
  ],
  variable: '--font-garamond',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

const lora = localFont({
  src: [
    { path: '../../public/fonts/brand/Lora-Variable.woff2', weight: '400 700', style: 'normal' },
  ],
  variable: '--font-lora',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

export const metadata: Metadata = {
  title: 'Hoffnung — Ein Licht in der Dunkelheit',
  description:
    'Poesie, Musik, Meditation und symbolische Klangräume — eine künstlerische Erfahrung über Hoffnung, Trauer und Verbundenheit.',
  openGraph: {
    title: 'Hoffnung — Ein Licht in der Dunkelheit',
    description:
      'Poesie, Musik, Meditation und symbolische Klangräume. Eine künstlerische Erfahrung der Hoffnung.',
    images: ['/images/books/hoffnung-cover.png'],
  },
}

export default function HoffnungLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${garamond.variable} ${lora.variable}`}>{children}</div>
  )
}
