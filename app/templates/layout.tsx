import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Templates | AI Architecture & Creator Starter Kits | FrankX',
  description: 'Production-ready templates for AI projects. Architecture blueprints, prompt libraries, workflow automations, and creator system starter kits.',
  path: '/templates',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
