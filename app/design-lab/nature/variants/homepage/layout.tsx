import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Nature-Tech Homepage Variant — Live Design Prototype | FrankX.AI',
  description:
    'Working prototype of the nature-tech homepage redesign concept. ForestCanopy background, bioluminescent stats, organic card design with real content and interactions.',
  keywords: [
    'nature tech homepage',
    'design prototype',
    'dark mode homepage',
    'organic ui design',
  ],
  path: '/design-lab/nature/variants/homepage',
})

export default function HomepageVariantLayout({ children }: { children: React.ReactNode }) {
  return children
}
