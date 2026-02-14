import type { Metadata } from 'next'
import { Cormorant_Garamond, Lora, Dancing_Script } from 'next/font/google'
import './valentines.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-body-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-cursive',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: "Love, Engineered with Soul | FrankX.ai",
  description: "An AI Architect's approach to the most human thing: love. Where intelligence meets the heart.",
  openGraph: {
    title: "Love, Engineered with Soul",
    description: "Where intelligence meets the heart.",
    images: ["/images/valentines/og-valentines-2026.png"],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Love, Engineered with Soul | FrankX.ai",
    description: "Where intelligence meets the heart.",
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
