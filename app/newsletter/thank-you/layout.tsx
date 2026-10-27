import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Welcome In",
  description: "Confirmation that you are subscribed to the FrankX newsletter.",
  path: "/newsletter/thank-you",
  noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
