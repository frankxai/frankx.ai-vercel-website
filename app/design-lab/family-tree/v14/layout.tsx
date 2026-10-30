import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V14: Web Animations API",
  description: "Zero-dependency native browser animations. Uses element.animate() with spring-like CSS linear() easing.",
  path: "/design-lab/family-tree/v14",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
