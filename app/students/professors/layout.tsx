import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'AI Workshop Toolkit for Educators | FrankX',
  description:
    'Free workshop templates, syllabi, and tools for professors teaching AI. 2-hour, half-day, and full-day formats with pre-built agendas using interactive student tools.',
  path: '/students/professors',
  keywords: ['ai workshop', 'ai curriculum', 'ai for educators', 'ai teaching tools', 'professor toolkit', 'ai syllabus'],
  type: 'website',
})

export default function ProfessorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
