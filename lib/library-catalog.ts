import { bookReviews } from '@/data/book-reviews';
import type { LibraryBook } from './library-search';

// Only card/search fields cross the client boundary; chapter and quote corpora stay on the server.
export const libraryBooks: LibraryBook[] = bookReviews.map(book => ({
  slug: book.slug,
  title: book.title,
  author: book.author,
  categories: book.categories,
  aliases: book.guide?.aliases || [],
  description: book.tldr || book.keyInsights[0] || '',
  // A photograph of a reading capture is evidence, never the book's cover.
  cover: book.hasCover ? book.coverImage : undefined,
  coverAlt: book.hasCover ? `${book.title} by ${book.author} — pictured edition` : undefined,
  reviewDate: book.reviewDate,
  readingTime: book.readingTime,
  kind: book.guide ? book.guide.kind : book.capture ? 'Reading field note' : 'Book review',
  hasGuide: Boolean(book.guide),
}));
