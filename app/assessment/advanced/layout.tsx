import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Advanced AI Assessment",
  description: "A comprehensive assessment designed by the Agent Team to create your personalized pathway to conscious AI mastery.",
  path: "/assessment/advanced",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
