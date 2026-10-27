import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V5: 3D Constellation",
  description: "Family as glowing stars in 3D space. Orbiting camera, connection beams, interactive hover labels.",
  path: "/design-lab/family-tree/v5",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
