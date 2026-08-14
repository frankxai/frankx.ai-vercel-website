import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music Games | Play Music in Your Browser | FrankX Music Lab',
  description:
    'Browser music games from the FrankX Music Lab. Rhythm Duel is a two-player, Guitar Hero-style game for keyboard, tablet, and phone — no downloads, no accounts.',
  path: '/music-lab/games',
})

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return children
}
