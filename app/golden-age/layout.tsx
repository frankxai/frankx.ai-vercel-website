import { Metadata } from 'next';
import localFont from 'next/font/local';

const playfair = localFont({
  src: [
    { path: '../../public/fonts/brand/PlayfairDisplay-Variable.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/brand/PlayfairDisplay-Variable.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/brand/PlayfairDisplay-Variable.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/brand/PlayfairDisplay-Variable.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-playfair',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

const inter = localFont({
  src: [
    { path: '../../public/fonts/brand/Inter-Variable.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/brand/Inter-Variable.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/brand/Inter-Variable.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/brand/Inter-Variable.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/brand/Inter-Variable.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  title: 'The Golden Age of Creators | FrankX.AI',
  description: 'A transformative book about the democratization of creative capability and distribution in the age of AI.',
  openGraph: {
    title: 'The Golden Age of Creators',
    description: 'Discover how the creator economy and AI are reshaping what it means to build a creative life.',
    type: 'book',
    images: [
      {
        url: '/images/golden-age/hero-golden-age.png',
        width: 1584,
        height: 672,
        alt: 'The Golden Age of Creators - A creator conducting an orchestra of creative energy',
      },
    ],
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
