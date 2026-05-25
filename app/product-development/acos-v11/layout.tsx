import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'ACOS v11 Video Intelligence Roadmap | FrankX Product Development',
  description: 'Complete product roadmap for ACOS v11 Video Intelligence System. 4-phase rollout, tool analysis, cost projections, ROI models, and content pipeline architecture.',
  path: '/product-development/acos-v11',
  keywords: [
    'acos v11',
    'video intelligence system',
    'ai video production',
    'content pipeline',
    'creator operating system',
    'opusclip automation',
    'youtube mcp',
  ],
})

export default function ACOSv11Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
