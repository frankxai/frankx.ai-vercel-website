import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Prototypes | Work-in-Progress AI Projects | FrankX',
  description: 'Early-stage prototypes and proof-of-concepts. See what\'s being built before it ships — AI tools, interfaces, and creative experiments.',
  path: '/prototypes',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
