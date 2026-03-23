import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | FrankX Library',
    default: 'Library | FrankX',
  },
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
