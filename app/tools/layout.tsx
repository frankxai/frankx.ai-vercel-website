import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Tools | ROI Calculator, Strategy Canvas & More | FrankX',
  description: 'Free AI tools: Agent ROI Calculator, Strategy Canvas, and Builder. Quantify the impact of AI agents on your workflow.',
  path: '/tools',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
