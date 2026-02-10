import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Nature-Tech Hub Variants — Homepage & Key Page Redesign Concepts | FrankX.AI',
  description:
    'Nature-inspired design variants for FrankX.AI homepage, products, blog, labs, inner circle, and ACOS hubs. Premium dark-mode concepts merging organic intelligence with technology.',
  keywords: [
    'nature tech design variants',
    'homepage redesign concept',
    'dark mode design system',
    'organic ui design',
    'premium web design',
    'ai generated design concepts',
  ],
  path: '/design-lab/nature/variants',
})

export default function NatureVariantsLayout({ children }: { children: React.ReactNode }) {
  return children
}
