import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Drum Machine | 16-Pad Beat Maker & Step Sequencer | FrankX Music Lab',
  description: 'Play 16 synthesized drum sounds with a built-in step sequencer. Kick, snare, hi-hat, toms, and more — all generated with Web Audio API. Free browser-based drum machine.',
  path: '/music-lab/drums',
})

export default function DrumsLayout({ children }: { children: React.ReactNode }) {
  return children
}
