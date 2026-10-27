import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Liquid Glass System",
  description: "Apple iOS 18 liquid glass meets Arcanea's iridescence. Interact with live components.",
  path: "/design-lab/arcanea/liquid-glass",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
