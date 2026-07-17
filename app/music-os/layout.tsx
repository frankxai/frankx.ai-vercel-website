import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Agentic Music OS | Release Cockpit | FrankX',
  description:
    'A Suno-native music production operating cockpit for release packets, A&R gates, asset generation, distribution prep, and telemetry.',
  path: '/music-os',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
