import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Geige Lernen | Aleas Musikschule | FrankX",
  description: 'Geige lernen mit Suzuki-Methode, deutschen Lehrern, kostenlosen Noten und inspirierenden Geiger*innen.',
  path: '/alea/musik/geige',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
