import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Drum Machine | 808 Step Sequencer | FrankX Music Lab',
  description: 'Program beats with an authentic 808 drum machine. 16-step sequencer, 8 synthesized sounds, metallic hi-hats, adjustable BPM. Free browser beat maker.',
  path: '/music-lab/drums',
})

export default function DrumsLayout({ children }: { children: React.ReactNode }) {
  return children
}
