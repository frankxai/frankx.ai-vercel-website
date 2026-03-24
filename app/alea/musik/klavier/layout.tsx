import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Klavier Lernen | Aleas Musikschule | FrankX",
  description: 'Klavier lernen Schritt für Schritt mit deutschen YouTube-Lehrern, kostenlosen Noten und Übe-Tipps.',
  path: '/alea/musik/klavier',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
