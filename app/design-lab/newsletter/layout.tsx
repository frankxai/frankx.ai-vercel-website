import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Arcanea Compose — Email Design System | FrankX.AI',
  description:
    'The "Oasis of Calm" email design system: 13 templates, 5 accent palettes, monochrome dark typography-driven design for premium newsletter experiences.',
  keywords: [
    'email design system',
    'newsletter template design',
    'dark mode email templates',
    'oasis of calm design',
    'email component library',
    'arcanea compose',
    'frankx email system',
  ],
  path: '/design-lab/newsletter',
})

export default function NewsletterDesignLabLayout({ children }: { children: React.ReactNode }) {
  return children
}
