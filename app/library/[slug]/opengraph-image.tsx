import { getReviewBySlug } from '@/data/book-reviews';
import { libraryOg } from '@/lib/library-og';
export const alt = 'Book reading guide in the FrankX Library';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getReviewBySlug(slug);
  if (!book) return new Response('Not found', { status: 404 });
  return libraryOg(book.title, book.author, book.guide?.kind || 'Book review & key insights');
}
