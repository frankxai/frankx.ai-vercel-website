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
  title: 'The Golden Age of Creators | FrankX.AI',
  description: 'A transformative book about the democratization of creative capability and distribution in the age of AI.',
  openGraph: {
    title: 'The Golden Age of Creators',
    description: 'Discover how the creator economy and AI are reshaping what it means to build a creative life.',
    type: 'book',
  },
};

export default function GoldenAgeLayout({
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
