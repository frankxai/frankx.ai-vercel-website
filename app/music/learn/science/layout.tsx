import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music Science & The Brain | Hz Frequencies, Flow States & Neuroscience | FrankX',
  description:
    'Explore the neuroscience of music — how Hz frequencies shape consciousness, trigger flow states, and rewire neural pathways. From 528Hz healing to binaural beats.',
  path: '/music/learn/science',
  keywords: [
    'music science brain',
    'Hz frequency music',
    'binaural beats',
    '528Hz healing',
    'music neuroscience',
    'flow state music',
    'solfeggio frequencies',
    'neuro state engineering',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
