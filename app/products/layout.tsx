import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Products | AI Tools, Courses & Creator Resources',
  description:
    'Digital products for AI builders and creators. Courses on AI architecture, prompt engineering, music production with Suno, and agentic workflows.',
  keywords: [
    'ai courses',
    'ai tools',
    'creator resources',
    'prompt engineering course',
    'suno music course',
    'agentic workflows',
    'ai architecture training',
  ],
  path: '/products',
})

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
