import type { Metadata } from 'next';
import FamilyBooksHub from './FamilyBooksHub';

export const metadata: Metadata = {
  title: 'Family Library',
  description: 'Four names. Four illustrated worlds waiting to open.',
};

export default function FamilyBooksPage() {
  return <FamilyBooksHub />;
}
