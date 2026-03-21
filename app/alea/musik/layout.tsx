import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Musik Lernen | Aleas Musikschule | FrankX",
  description: 'Aleas persönliche Musikschule — Klavier, Geige, Gitarre und Singen lernen mit den besten deutschen Lehrern.',
  path: '/alea/musik',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
