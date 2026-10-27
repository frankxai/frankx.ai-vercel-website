import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Familiengeschichte: Von der Wolga nach Amsterdam",
  description: "Die Familien Riemer, Schneider, Gorte und Prager sind vermutlich Teil der russlanddeutschen Geschichte, aber jede konkrete Verbindung ist noch unbewiesen.",
  path: "/familie/geschichte",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
