import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  canonical: './',
  title: 'Affiliate Program | Earn with AI Tools & Products | FrankX',
  description: 'Join the FrankX affiliate program. Promote AI architecture tools, creative systems, and digital products. Earn commissions on every referral.',
  path: '/affiliates',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
