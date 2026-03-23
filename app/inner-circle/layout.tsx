import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Inner Circle | Premium AI Architecture Community | FrankX',
  description: 'Exclusive access to advanced AI architecture content, private workshops, direct mentorship, and early product releases.',
  path: '/inner-circle',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
