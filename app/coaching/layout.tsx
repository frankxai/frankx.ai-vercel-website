import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Coaching | 1-on-1 Architecture & Creator Mentorship | FrankX',
  description: 'Private coaching for AI architects and creators. Build production AI systems, scale creative workflows, and accelerate your career with expert guidance.',
  path: '/coaching',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
