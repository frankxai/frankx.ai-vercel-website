import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V9: Cinematic Scroll",
  description: "GSAP ScrollTrigger for film-quality scroll experience — parallax layers, pinned sections, morphing.",
  path: "/design-lab/family-tree/v9",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
