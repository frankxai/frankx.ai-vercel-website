import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getBookBySlug } from '../lib/books-registry';

interface BookLayoutProps {
  children: ReactNode;
  params: Promise<{ bookSlug: string }>;
}

export default async function BookLayout({ children, params }: BookLayoutProps) {
  const { bookSlug } = await params;
  const book = getBookBySlug(bookSlug);

  if (!book || book.status === 'draft') notFound();

  return children;
}
