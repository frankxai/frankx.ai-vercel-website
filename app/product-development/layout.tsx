import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Product Development",
  description: "Real-time insights into ACOS v10 autonomous intelligence. Watch the system learn, adapt, and optimize itself.",
  path: "/product-development",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
