import type { Metadata } from 'next'
import {
  FrankxHomepageConceptPage,
  getFrankxHomepageConcept,
} from '@/components/design-lab/FrankxHomepageConceptPage'

export const metadata: Metadata = {
  title: 'FrankX Homepage Concept: Sonic OS',
  description:
    'Music-first homepage direction for FrankX with Vibe OS, waveform choreography, and creator system proof.',
}

export default function Page() {
  return (
    <FrankxHomepageConceptPage
      concept={getFrankxHomepageConcept('frankx-homepage-sonic-os')}
    />
  )
}
