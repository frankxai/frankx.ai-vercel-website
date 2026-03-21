import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Mias Katzenwelt | Aleas virtuelles Kätzchen | FrankX",
  description:
    'Eine magische Katzenwelt für Alea — mit virtuellem Kätzchen Mia, Katzenwissen, Spielen und Geschichten. Von Onkel Frank.',
  path: '/alea/katze',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
