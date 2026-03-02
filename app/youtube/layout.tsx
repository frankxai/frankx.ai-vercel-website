import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'YouTube Channel | AI Architecture, Music & Creator Tools | FrankX',
  description: 'AI architecture deep dives, music production with Suno AI, creator tools tutorials, and opinion pieces. Subscribe to the FrankX YouTube channel.',
  path: '/youtube',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
