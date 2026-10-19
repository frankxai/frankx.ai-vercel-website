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
  cover: book.hasCover ? book.coverImage : book.capture?.images?.[0]?.src,
  coverAlt: book.hasCover ? `${book.title} by ${book.author} — book cover` : book.capture?.images?.[0]?.alt,
  reviewDate: book.reviewDate,
  readingTime: book.readingTime,
  kind: book.guide ? book.guide.kind : book.capture ? 'Reading field note' : 'Book review',
}));
