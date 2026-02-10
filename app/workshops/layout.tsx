import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Workshops | Hands-On AI Architecture & Creator Labs | FrankX',
  description: 'Live and recorded workshops on AI architecture, agentic systems, music production with AI, and creative workflow automation.',
  path: '/workshops',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
