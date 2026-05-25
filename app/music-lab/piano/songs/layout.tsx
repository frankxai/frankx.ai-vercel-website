import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Piano Songs & Sheet Music | Play & Learn | FrankX Music Lab',
  description:
    'Curated piano songs with auto-play tutorials and free sheet music. Studio Ghibli, classical favorites, and film scores — all playable in your browser.',
  path: '/music-lab/piano/songs',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
