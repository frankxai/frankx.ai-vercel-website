import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Investor Intelligence",
  description: "Product inventory, status tracking, and revenue management, with direct checkout on frankx.ai through Stripe Checkout sessions.",
  path: "/frankx-investment-dashboard",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
