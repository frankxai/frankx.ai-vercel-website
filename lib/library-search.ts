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
  const terms = normalized.split(/\s+/).filter(Boolean);
  const searchQuery = terms.length > 1 ? {
    $and: terms.map(term => ({ $or: ['title', 'author', 'aliases', 'searchable', 'description'].map(key => ({ [key]: term })) })),
  } : normalized;
  const exactSlugs = new Set(normalized ? books.filter(book => {
    const text = normalizeLibraryQuery([book.title, book.author, ...book.aliases, ...book.categories, book.description].join(' '));
    return terms.every(term => text.includes(term));
  }).map(book => book.slug) : []);
  const ranked = normalized ? index.search(searchQuery).map(result => result.item) : [...books];
  // Use fuzzy matching when literal terms find nothing; keep common words in
  // long descriptions from crowding out a title or author the reader named.
  const matches = exactSlugs.size ? ranked.filter(book => exactSlugs.has(book.slug)) : ranked;
  const filtered = matches.filter(book => (!category || book.categories.includes(category)) && (!collectionSlugs || collectionSlugs.includes(book.slug)));
  if (sort === 'title') return filtered.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === 'author') return filtered.sort((a, b) => a.author.localeCompare(b.author) || a.title.localeCompare(b.title));
  return normalized ? filtered : filtered.sort((a, b) => b.reviewDate.localeCompare(a.reviewDate) || a.title.localeCompare(b.title));
}
