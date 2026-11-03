import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "ACOS Trading Cards",
  description: "Cards that capture pieces of the ACOS ecosystem with stats, lore, and rarity tiers. Click any card to flip it and reveal its story.",
  path: "/collectibles/trading-cards",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
