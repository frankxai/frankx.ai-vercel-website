import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Multi-Cloud Architecture for AI-Powered Platforms",
  description: "Independent analysis of AWS, Google Cloud, Azure, and Oracle Cloud for AI-powered creator platforms, with cost comparisons and decision frameworks.",
  path: "/ai-architecture/multi-cloud-comparison",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
