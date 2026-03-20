import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'AI for Doctors — Clinical Tools, Workflow Automation, Medical AI | FrankX',
  description:
    'AI tools and workflows for healthcare professionals. Clinical decision support, documentation automation, research synthesis, and patient communication — with privacy and safety at the center.',
  path: '/doctors',
  keywords: [
    'ai for doctors', 'clinical ai', 'healthcare ai', 'medical ai tools',
    'ai clinical decision support', 'ai medical documentation', 'ai patient communication',
  ],
  type: 'website',
})

export default function DoctorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
