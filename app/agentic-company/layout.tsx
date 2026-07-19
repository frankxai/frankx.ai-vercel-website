import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'The Agentic Company, Installed in 30 Days | Starlight Intelligence Blueprint',
  description:
    'For founder-led businesses (€500k–€10m) where the founder is still the routing layer. Starlight installs the minimum intelligence system that increases output without adding headcount.',
  path: '/agentic-company',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
