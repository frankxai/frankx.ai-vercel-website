import Fuse from 'fuse.js';

export type LibraryBook = {
  slug: string;
  title: string;
  author: string;
  categories: string[];
  aliases: string[];
  description: string;
  cover?: string;
  coverAlt?: string;
  reviewDate: string;
  readingTime: string;
  kind: string;
};

export const normalizeLibraryQuery = (value: string) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[’']/g, '').toLowerCase().trim();

export function createLibrarySearch(books: LibraryBook[]) {
  return new Fuse(books.map(book => ({ ...book, searchable: normalizeLibraryQuery([book.title, book.author, ...book.aliases, ...book.categories].join(' ')) })), {
    keys: [{ name: 'title', weight: 0.35 }, { name: 'author', weight: 0.25 }, { name: 'aliases', weight: 0.2 }, { name: 'searchable', weight: 0.15 }, { name: 'description', weight: 0.05 }],
    threshold: 0.3,
    ignoreLocation: true,
    ignoreDiacritics: true,
    includeScore: true,
  });
}

export function filterLibrary(books: LibraryBook[], query: string, category: string, collectionSlugs?: string[], sort = 'recent', index = createLibrarySearch(books)) {
  const normalized = normalizeLibraryQuery(query);
  const matches = normalized ? index.search(normalized).map(result => result.item) : [...books];
  const filtered = matches.filter(book => (!category || book.categories.includes(category)) && (!collectionSlugs || collectionSlugs.includes(book.slug)));
  if (sort === 'title') return filtered.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === 'author') return filtered.sort((a, b) => a.author.localeCompare(b.author) || a.title.localeCompare(b.title));
  return normalized ? filtered : filtered.sort((a, b) => b.reviewDate.localeCompare(a.reviewDate) || a.title.localeCompare(b.title));
}
