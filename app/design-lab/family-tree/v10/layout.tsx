import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V10: GPU-Enhanced 3D",
  description: "Upgraded Three.js with orbital rings, enhanced particles, and WebGPU-ready architecture.",
  path: "/design-lab/family-tree/v10",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
