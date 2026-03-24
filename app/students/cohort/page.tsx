import type { Metadata } from 'next'
import CohortClient from './CohortClient'

export const metadata: Metadata = {
  title: 'AI Creator Accelerator — Free 4-Week Cohort | FrankX',
  description:
    'Join a free, intensive 4-week cohort for builders who want to create with AI. Mentored by an AI Architect with enterprise experience across 8+ industries. Build something real. Ship it.',
  keywords: [
    'AI cohort',
    'AI creator accelerator',
    'free AI course',
    'build with AI',
    'AI mentorship',
    'GenCreator',
    'AI portfolio',
    'AI product launch',
  ],
  openGraph: {
    title: 'AI Creator Accelerator — Free 4-Week Cohort',
    description:
      'Build something real with AI in 4 weeks. Free cohort, limited to 44 builders. Mentored by an AI Architect.',
    url: 'https://frankx.ai/students/cohort',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Creator Accelerator — Free 4-Week Cohort',
    description:
      'Build something real with AI in 4 weeks. Free cohort, limited to 44 builders.',
  },
}

export default function CohortPage() {
  return <CohortClient />
}
