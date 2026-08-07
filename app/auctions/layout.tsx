import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Auctions | Limited Drops & Custom Build Slots | FrankX',
  description:
    'Limited edition prints, custom builds, and personal coaching slots, allocated by silent proposal. Selection weighs project alignment and fit, not just bid price.',
  path: '/auctions',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
