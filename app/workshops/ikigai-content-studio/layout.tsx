import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Ikigai + AI Content Studio | FrankX',
  description:
    'Facilitator-led workshop that picks up where the self-serve Ikigai wizard stops. Map purpose, distill positioning, ship your first AI-augmented brand asset in one session.',
  path: '/workshops/ikigai-content-studio',
  image: '/hero-homepage.png',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
