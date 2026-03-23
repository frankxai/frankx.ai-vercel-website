import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'For Developers | APIs, SDKs & Technical Resources | FrankX',
  description: 'Developer resources for integrating with FrankX systems. API documentation, SDKs, code examples, and technical architecture guides.',
  path: '/developers',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
