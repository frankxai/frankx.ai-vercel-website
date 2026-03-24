import { Metadata } from 'next'
import PresenceClient from './PresenceClient'

export const metadata: Metadata = {
  title: 'Full Presence Activation — FrankX',
  description:
    'A guided practice for arriving fully in this moment. 8 sensory gates inspired by Buddhist mindfulness, Taoist flow, and Eckhart Tolle. Integrated with ACOS as the entry ritual before every creative session.',
  keywords: [
    'presence practice',
    'mindfulness for creators',
    'full presence activation',
    'sensory awareness meditation',
    'creator rituals',
    'acos mindfulness module',
    'presence before creating',
    'eckhart tolle now',
    'buddhist six sense bases',
  ],
  openGraph: {
    title: 'Full Presence Activation — Arrive before you create',
    description:
      '8 sensory gates. 5 depth levels. The ritual that changes what you create from.',
    type: 'website',
  },
}

export default function PresencePage() {
  return <PresenceClient />
}
