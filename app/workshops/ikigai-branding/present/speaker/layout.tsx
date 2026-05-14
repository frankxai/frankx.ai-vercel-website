import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ikigai & Branding · Speaker View',
  description:
    'Presenter view with current + next slide preview, speaker notes, and timer. Designed for dual-screen workshop facilitation.',
  robots: { index: false, follow: false },
}

export default function SpeakerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
