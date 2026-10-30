import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "AI ROI Calculator",
  description: "Calculate the return on investment for your AI initiatives with financial modeling and risk assessment.",
  path: "/tools/roi-calculator",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
