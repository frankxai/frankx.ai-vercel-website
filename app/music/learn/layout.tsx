import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music Academy | Learn Instruments, Theory & Production | FrankX',
  description:
    'FrankX Music Academy — learn piano, violin, music theory, and production with curated teachers, free resources, and AI-powered tools. From an AI Architect who creates music.',
  path: '/music/learn',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
