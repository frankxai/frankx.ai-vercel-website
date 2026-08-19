import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Collectibles | ACOS Trading Cards & Limited Prints | FrankX',
  description:
    'Digital and physical collectibles from the ACOS ecosystem: the 40-card Genesis trading card set, Bio-Tech Instrument design prints, and rotating mixed drops.',
  path: '/collectibles',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
