import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Tools | ROI Calculator, Strategy Canvas & Decision Atlases | FrankX',
  description:
    'Free, in-browser instruments built by FrankX: the AI ROI Calculator, the Strategy Canvas, and the Social Tool Decision Atlas.',
  path: '/tools',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
