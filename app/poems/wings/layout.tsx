import type { Metadata } from 'next'
import { Cormorant_Garamond, Lora } from 'next/font/google'
import './wings.css'

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
  title: 'Wings — A Poem by FrankX',
  description:
    'You thought I wanted to chain you down and take your freedom. But all I wanted was to give you wings.',
  openGraph: {
    title: 'Wings — A Poem by FrankX',
    description:
      'You thought I wanted to chain you down. But all I wanted was to give you wings.',
  },
}

export default function WingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${cormorant.variable} ${lora.variable} wings-scroll`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {children}
    </div>
  )
}
