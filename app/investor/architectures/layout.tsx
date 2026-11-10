import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "System Architectures for Investors",
  description: "Full-stack intelligence blueprints for investors. Architecture blueprints are being prepared.",
  path: "/investor/architectures",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
