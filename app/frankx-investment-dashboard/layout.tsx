import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Investor Intelligence",
  description: "Product inventory, status tracking and revenue views across the FrankX catalog.",
  path: "/frankx-investment-dashboard",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
