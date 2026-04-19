import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Learn Music | Piano, Violin, Guitar & Voice | FrankX',
  description:
    'Curated music learning resources for beginners and young musicians. Piano, violin, guitar, and singing — the best teachers, tools, and practice guides.',
  path: '/music/learn',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
