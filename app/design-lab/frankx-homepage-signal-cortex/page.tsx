import type { Metadata } from 'next'
import {
  FrankxHomepageConceptPage,
  getFrankxHomepageConcept,
} from '@/components/design-lab/FrankxHomepageConceptPage'

export const metadata: Metadata = {
  title: 'FrankX Homepage Concept: Signal Cortex',
  description:
    'Research homepage direction for FrankX built around signal maps, route finding, and intelligence layers.',
}

export default function Page() {
  return (
    <FrankxHomepageConceptPage
      concept={getFrankxHomepageConcept('frankx-homepage-signal-cortex')}
    />
  )
}
