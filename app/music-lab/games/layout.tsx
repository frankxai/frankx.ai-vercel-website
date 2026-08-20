import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music Games | Play Music in Your Browser | FrankX Music Lab',
  description:
    'Browser music games from the FrankX Music Lab. Rhythm Duel is a Guitar Hero-style game: solo on any device, two players side by side on a keyboard or a landscape tablet. No downloads, no accounts.',
  path: '/music-lab/games',
})

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return children
}
