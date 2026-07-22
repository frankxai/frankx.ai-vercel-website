import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Architecture Blueprints — Costed, Tested AI Systems | FrankX',
  description: 'Production AI architecture blueprints with when-to-use verdicts, cost and reliability notes, request flows, and runnable reference implementations across Vercel, Railway, and GCP.',
  path: '/ai-architecture/blueprints',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
