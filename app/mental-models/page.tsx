import type { Metadata } from 'next'
import MentalModelsView from '@/components/mental-models/MentalModelsView'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'

export const metadata: Metadata = createMetadata({
  title: 'The 8 Sovereign Mental Models & Peak OS | FrankX',
  description:
    'The cognitive operating system of an AI Architect. Master first-principles deconstruction, high-order leverage, cybernetics, antifragility, and peak performance protocols.',
  keywords: [
    'mental models',
    'sovereign mental models',
    'first principles thinking',
    'ai architect',
    'high leverage',
    'peak performance protocols',
    'deep work',
    'flow state',
    'antifragile systems',
    'cybernetics',
    'creator operating system',
  ],
  path: '/mental-models',
})

const mentalModelsSchema = {
  name: 'The 8 Sovereign Mental Models & Peak Performance OS',
  url: 'https://frankx.ai/mental-models',
  description:
    'Master the cognitive frameworks and peak performance operating protocols for sovereign creators and AI architects.',
  about: [
    { '@type': 'Thing', name: 'First-Principles Deconstruction' },
    { '@type': 'Thing', name: 'High-Order Leverage Vectors' },
    { '@type': 'Thing', name: 'Cybernetic Feedback Loops' },
    { '@type': 'Thing', name: 'Inversion and Asymmetric Payoffs' },
    { '@type': 'Thing', name: 'Antifragile System Architecture' },
    { '@type': 'Thing', name: 'Deep Work and Flow State Protocols' },
    { '@type': 'Thing', name: 'Radical Agency and Sovereignty' },
    { '@type': 'Thing', name: 'Humble Mastery and Zero Slop' },
  ],
}

export default function MentalModelsPage() {
  return (
    <>
      <MentalModelsView />
      <JsonLd type="WebSite" data={mentalModelsSchema} />
    </>
  )
}
