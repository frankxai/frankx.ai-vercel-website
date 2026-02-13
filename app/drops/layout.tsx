import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Drops | Limited Releases & Exclusive Content | FrankX',
  description: 'Limited-edition drops: AI music releases, exclusive templates, prompt packs, and digital collectibles. New drops released regularly.',
  path: '/drops',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
