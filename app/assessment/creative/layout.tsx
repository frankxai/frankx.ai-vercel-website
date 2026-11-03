import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Creative AI Assessment Results",
  description: "Your creative AI assessment results and next steps for creators and content-focused organizations.",
  path: "/assessment/creative",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
