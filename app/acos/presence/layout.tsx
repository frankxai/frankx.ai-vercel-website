import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Full Presence Activation",
  description: "The entry ritual for every ACOS session: eight sensory gates that close the gap between where you were and where you need to be.",
  path: "/acos/presence",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
