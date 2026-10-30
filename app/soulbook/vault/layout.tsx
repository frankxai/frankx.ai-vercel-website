import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "The Soulbook Vault",
  description: "Track your progress, journal your journey, and achieve your goals across the 7 pillars.",
  path: "/soulbook/vault",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
