import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Student Hub | AI Skills for the Next Generation | FrankX',
  description: 'Free AI learning resources for students. Build real AI skills with hands-on workshops, role-based prompts, and the CoE Builder.',
  path: '/students',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
