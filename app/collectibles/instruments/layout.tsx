import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Bio-Tech Instrument Prints",
  description: "Concert grand pianos with neural network strings and violins with mycelium acoustics, each design a numbered edition of 10.",
  path: "/collectibles/instruments",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
