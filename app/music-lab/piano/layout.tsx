import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Grand Piano | Play a Yamaha C5 Concert Grand in Your Browser | FrankX',
  description: 'Play a real Yamaha C5 concert grand piano in your browser. Salamander Grand Piano V3 samples, velocity-sensitive touch, sustain pedal. Free, no download required.',
  path: '/music-lab/piano',
})

export default function PianoLayout({ children }: { children: React.ReactNode }) {
  return children
}
