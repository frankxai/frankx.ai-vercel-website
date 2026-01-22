import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Department Blueprint - Build Your AI Team',
  description:
    'The blueprint for building your own AI department. 9 AI specialists, zero payroll. See how I ship content, code, and music daily - and how you can too.',
  keywords: [
    'ai team',
    'ai department',
    'ai agents',
    'agentic creator os',
    'ai for creators',
    'ai for founders',
    'ai for musicians',
    'build ai team',
    'ai workflow',
    'ai orchestration',
  ],
  path: '/team',
})

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
