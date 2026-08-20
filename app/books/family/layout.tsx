import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | FrankX Family Library',
    default: 'Family Library | FrankX',
  },
  description:
    'Illustrated family stories designed for children and the adults reading beside them.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function FamilyBooksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
