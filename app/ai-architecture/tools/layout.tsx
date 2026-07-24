import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architecture Tools & Infrastructure | FrankX',
  description: 'The evaluation, observability, gateway, and vector-infrastructure tools referenced across the AI architecture field guide — what each is for and when it earns its place.',
  path: '/ai-architecture/tools',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
