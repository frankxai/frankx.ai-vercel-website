import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ikigai Workshop — moved to /workshops/ikigai-branding',
  description:
    'The Ikigai workshop has been upgraded into the full Ikigai & Branding Workshop with a guided coach, purpose statement synthesis, and brand bridge.',
  alternates: {
    canonical: 'https://frankx.ai/workshops/ikigai-branding',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LegacyIkigaiPage() {
  redirect('/workshops/ikigai-branding')
}
