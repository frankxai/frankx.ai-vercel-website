import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Content Studio | AI-Powered Content Creation | FrankX',
  description: 'Create, edit, and publish content with AI assistance. Blog posts, social media, newsletters, and product copy — all in one studio.',
  path: '/content-studio',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
