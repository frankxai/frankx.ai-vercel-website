import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music | AI-Generated Tracks & Production',
  description:
    'Explore AI-generated music by FrankX. 12,000+ tracks produced with Suno AI across genres including cinematic, ambient, electronic, and hip-hop.',
  keywords: [
    'ai music',
    'ai generated music',
    'suno ai music',
    'ai tracks',
    'ai music production',
    'frankx music',
  ],
  path: '/music',
})

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
