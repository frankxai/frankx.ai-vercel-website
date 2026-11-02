import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architecture Tools — Frameworks, Vector Stores & Cloud Stack',
  description:
    'Curated AI engineering tools across model workbenches, orchestration frameworks, vector databases, observability, and cloud deployment.',
  path: '/ai-architecture/tools',
  keywords: [
    'ai architecture tools',
    'ai orchestration frameworks',
    'vector databases comparison',
    'ai observability tools',
  ],
})

export default function AIArchitectureToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
