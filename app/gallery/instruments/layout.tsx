import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Instruments Reimagined",
  description: "Concert grand pianos with neural network strings, violins with mycelium acoustics, synthesis controllers grown from coral. View each image with its generation prompt.",
  path: "/gallery/instruments",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
