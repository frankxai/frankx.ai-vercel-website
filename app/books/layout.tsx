import { Metadata } from 'next';

const playfair = { variable: 'fx-font-var-playfair' }

const inter = { variable: 'fx-font-var-inter' }

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
