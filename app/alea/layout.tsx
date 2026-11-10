import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  canonical: './',
  title: "Alea's World | A Growing Portal of Wonder | FrankX",
  description:
    'A magical space of poetry, games, music, and stories — growing every birthday. With love from Uncle Frank.',
  path: '/alea',
  noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
