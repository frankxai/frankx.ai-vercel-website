import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music | AI-Generated Tracks & Production | FrankX',
  description: 'Explore 500+ AI-generated tracks across genres. From cinematic orchestral to electronic, hip-hop, and experimental music created with AI tools.',
  path: '/music',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
