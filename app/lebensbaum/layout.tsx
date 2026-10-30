import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Lebensbaum",
  description: "Der Lebensbaum als interaktive Vollbild-Visualisierung aus dem Hoffnung-Projekt.",
  path: "/lebensbaum",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
