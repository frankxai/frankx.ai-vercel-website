import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ikigai & Branding · Presenter Mode',
  description:
    'Fullscreen slide presenter for the Ikigai & Branding workshop. Keyboard navigation, speaker notes, timer, print-to-PDF.',
  robots: { index: false, follow: false },
}

export default function PresentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
