import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Readiness Assessment | Evaluate Your AI Maturity | FrankX',
  description: 'Assess your organization\'s AI readiness. Evaluate maturity across strategy, infrastructure, talent, and governance dimensions.',
  path: '/ai-assessment',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
