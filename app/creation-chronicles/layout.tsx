import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Creation Chronicles | Behind the Build | FrankX',
  description: 'Behind-the-scenes stories of building AI systems, creating music with AI, and shipping digital products. Raw creation logs from the studio.',
  path: '/creation-chronicles',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
