import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Soulbook Assessment",
  description: "Take the free assessment to discover which Life Book aligns with your current needs and transformation goals.",
  path: "/soulbook/assessment",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
