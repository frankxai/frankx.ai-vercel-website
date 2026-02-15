import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Word Forge — Daily Word Puzzle | FrankX Games Lab',
  description: 'Guess the 5-letter word in 6 tries. Color-coded clues guide your guesses. Daily challenge + unlimited practice mode.',
  keywords: ['word game', 'wordle', 'daily puzzle', 'word forge', 'browser word game', '5 letter words'],
  openGraph: {
    title: 'Word Forge — Daily Word Puzzle',
    description: 'Guess the word in 6 tries. Free browser game — no download.',
    url: 'https://frankx.ai/games/word-forge',
  },
}

export default function WordForgeLayout({ children }: { children: React.ReactNode }) {
  return children
}
