import type { Metadata } from 'next'
import {
  FrankxHomepageConceptPage,
  getFrankxHomepageConcept,
} from '@/components/design-lab/FrankxHomepageConceptPage'

export const metadata: Metadata = {
  title: 'FrankX Homepage Concept: Command Room',
  description:
    'Production homepage direction for FrankX with command core, Suno soundtrack, and premium scroll motion.',
}

export default function Page() {
  return (
    <FrankxHomepageConceptPage
      concept={getFrankxHomepageConcept('frankx-homepage-command-room')}
    />
  )
}
