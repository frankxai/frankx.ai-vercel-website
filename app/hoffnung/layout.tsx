import { EB_Garamond, Lora } from 'next/font/google'
import type { Metadata } from 'next'

const garamond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-garamond',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-lora',
  display: 'swap',
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
