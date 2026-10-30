import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Explore Creator Roles",
  description: "Discover AI-native creator roles, target companies, and wedge ideas to stand out. Pick 2-3 roles that fit your skills and interests.",
  path: "/students/roles",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
