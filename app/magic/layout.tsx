import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Magic | Creative AI Experiments | FrankX',
  description: 'Experimental creative AI projects pushing the boundaries of generative art, music, and interactive experiences.',
  path: '/magic',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
