import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Coaching | AI Architecture & Creator Workflows',
  description:
    'One-on-one coaching for AI architecture, agentic workflows, music production, and creative business building. Enterprise AI strategy and hands-on mentorship.',
  keywords: [
    'ai coaching',
    'ai architecture coaching',
    'agentic workflow coaching',
    'ai mentor',
    'enterprise ai training',
    'creator coaching',
  ],
  path: '/coaching',
})

export default function CoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
