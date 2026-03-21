import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Learn Music | Best Teachers, Free Sheet Music & AI Tools | FrankX',
  description:
    'Learn piano, violin, guitar, and more with curated YouTube teachers, free sheet music, AI practice tools, and structured guides. From an AI Architect who creates music.',
  path: '/music/learn',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
