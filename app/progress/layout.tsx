import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "The 7 Pillars Journey",
  description: "Real progress across Energy, Mind, Craft, Flow, Prosperity, Connection, and Purpose, followed by the 7 Pillars self-assessment.",
  path: "/progress",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
