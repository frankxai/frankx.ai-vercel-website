import type { BookConfig } from '../types';

export const bookCollections = ['All books', 'Intelligence & work', 'Attention & practice', 'Poetry & reflection', 'Arcanea fiction'] as const;
export type BookCollection = typeof bookCollections[number];

export function getBookCollection(book: Pick<BookConfig, 'slug' | 'categories'>): BookCollection {
  if (book.categories.includes('Arcanea')) return 'Arcanea fiction';
  if (['golden-age-of-intelligence', 'golden-age', 'great-transition', 'fable', 'the-book-of-secrets'].includes(book.slug)) return 'Intelligence & work';
  if (['love-and-poetry', 'hope', 'hoffnung', 'fire-horse-poems'].includes(book.slug)) return 'Poetry & reflection';
  return 'Attention & practice';
}

export function filterBooks<T extends Pick<BookConfig, 'slug' | 'title' | 'subtitle' | 'description' | 'categories'>>(books: T[], query: string, collection: BookCollection): T[] {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return books.filter(book =>
    (collection === 'All books' || getBookCollection(book) === collection) &&
    words.every(word => [book.title, book.subtitle, book.description, ...book.categories].join(' ').toLocaleLowerCase().includes(word)),
  );
}
