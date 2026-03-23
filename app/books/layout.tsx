import { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | FrankX Books',
    default: 'Books | FrankX',
  },
  description:
    'Six books on love, discipline, creativity, self-development, imagination, and manifestation. Read free online or download as PDF.',
  openGraph: {
    title: 'The FrankX Library',
    description: 'Six books. One voice. No filler.',
    type: 'website',
  },
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${playfair.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
