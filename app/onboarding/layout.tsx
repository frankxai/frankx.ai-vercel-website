import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Onboarding | Personalize Your FrankX Experience',
  description:
    'Set your goals, experience level, and interests in a short guided flow, then get a personalized plan of courses, tools, and resources to start with.',
  path: '/onboarding',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
