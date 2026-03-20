import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'AI for Professors — Workshop Toolkit, Curriculum, AI Tools | FrankX',
  description:
    'Everything professors need to teach AI effectively. Workshop templates (2hr/half-day/full-day), syllabus suggestions, the modern AI toolkit explained, and free interactive student tools. Built by an AI architect.',
  path: '/professors',
  keywords: [
    'ai for professors', 'ai workshop toolkit', 'ai curriculum', 'ai teaching tools',
    'ai syllabus', 'chatgpt for education', 'claude for teaching', 'ai in higher education',
  ],
  type: 'website',
})

export default function ProfessorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
