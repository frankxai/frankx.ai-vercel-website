import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  canonical: './',
  title: 'Investor field notes and the paying-studios case',
  description:
    'Four records, one founder claim and a five-minute source check. Write a partner memo in ChatGPT or Claude and compare it with the reviewer’s key.',
  image: '/images/gencreator/gencreator-framework-hero.webp',
  path: '/investor',
  keywords: ['investment diligence', 'source checking', 'partner memo', 'AI research'],
})

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return children
}
