import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music Tools & Apps | Best Digital Tools for Musicians | FrankX',
  description:
    'Curated collection of the best apps, tools, and platforms for musicians. From practice apps to AI composition, DAWs to theory trainers.',
  path: '/music/tools',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
