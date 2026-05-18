import type { Metadata } from 'next'
import { Noto_Serif_JP } from 'next/font/google'

/**
 * Route-segment layout for Ikigai V4 — composed canonical.
 *
 * Owns three things V3 couldn't (as a 'use client' page):
 *   1. Per-route metadata + canonical + OG image
 *   2. Scoped Noto Serif JP with preload=true (no global font cost)
 *   3. Server-component boundary for future RSC architecture migrations
 *
 * The page.tsx beneath stays 'use client' for now (Framer Motion, useScroll,
 * IntersectionObserver, useState all need it). A future ELEVATE pass can
 * split the static structural shell off into server-rendered chunks.
 */

const notoSerifJP = Noto_Serif_JP({
  weight: ['200', '400'],
  variable: '--font-jp-serif',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Ikigai — Editorial Cinema · Workshop',
  description:
    'A Japanese-typography workshop walk through ikigai with your AI as the instrument. Ten chapters, thirteen prompts, four cadences for after.',
  alternates: {
    // V4 is the composed canonical — once promoted, /workshops/ikigai-branding
    // will redirect here. Until then, V1 stays canonical and V4 points back.
    canonical: '/workshops/ikigai-branding',
  },
  openGraph: {
    title: 'Ikigai — Editorial Cinema · FrankX Workshop',
    description:
      'Map your ikigai, write your purpose statement, ship a 30-day plan, walk out with three brand-launch visuals.',
    images: [
      {
        url: '/api/og?title=Ikigai&subtitle=Editorial+Cinema',
        width: 1200,
        height: 630,
        alt: 'Ikigai — Editorial Cinema',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ikigai — Editorial Cinema',
    description:
      'A Japanese-typography workshop. AI as the instrument. The artifact is the proof.',
  },
}

export default function IkigaiV4Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={notoSerifJP.variable}>{children}</div>
}
