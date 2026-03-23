import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Rituals | Daily Creative & Productivity Practices | FrankX',
  description: 'Structured daily practices for creators and builders. Morning routines, creative rituals, and productivity systems powered by AI.',
  path: '/rituals',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
