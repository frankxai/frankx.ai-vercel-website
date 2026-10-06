import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Rituals | Daily Creative & Production Protocols | FrankX',
  description: 'Structured daily protocols for creative production. Morning prime, deep work, music sessions, and evening review. The systems behind the Suno songs and the articles.',
  path: '/rituals',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
