import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Newsletter | Weekly AI Architecture & Creator Insights | FrankX',
  description: 'Weekly insights on AI architecture, agentic systems, and creative AI workflows. Join builders and architects staying ahead of the curve.',
  path: '/newsletter',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
