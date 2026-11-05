import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Life Symphony",
  description: "A 12-week journey through all 7 pillars of conscious living, to transform every area of your life in harmony.",
  path: "/soulbook/life-symphony",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
