import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music — AI-generated tracks and studio production',
  description: 'Explore AI-generated tracks across genres, from neoclassical soundscapes and orchestral arrangements to electronic, tech house, and hip hop.',
  path: '/music',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
