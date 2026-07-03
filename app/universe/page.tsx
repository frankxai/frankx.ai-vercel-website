import { createMetadata } from '@/lib/seo'
import UniversePageClient from './UniversePageClient'

export const metadata = createMetadata({
  title: 'The Universe — FrankX · All Brands & Domains',
  description:
    'The full ecosystem — every brand, domain, and intelligence system Frank Riemer is building in public. Arcanea, Starlight Intelligence, GenCreator, Agentic Income, and more.',
  path: '/universe',
})

export default function UniversePage() {
  return <UniversePageClient />
}
