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
