import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { libraryCollections, belongsToCollection } from '@/data/library-collections';
import { libraryBooks } from '@/lib/library-catalog';
import { BookCover } from './BookCover';

export function CollectionCards() {
  return <section aria-labelledby="collection-heading" className="pt-12">
    <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
      <h2 id="collection-heading" className="text-2xl font-semibold text-white">Follow a thread</h2>
      <p className="text-sm text-white/65">Six ways into the collection</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {libraryCollections.map(collection => {
        const books = libraryBooks.filter(book => belongsToCollection(book, collection));
        const featured = collection.featured.map(slug => libraryBooks.find(book => book.slug === slug)).filter(book => book !== undefined);
        return <Link key={collection.slug} href={`/library/collections/${collection.slug}`} prefetch={false}
          className="group overflow-hidden rounded-2xl border border-white/15 bg-white/[0.025] p-5 hover:border-emerald-300/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
          <div className="mb-5 flex h-28 items-end gap-3 overflow-hidden" aria-hidden="true">
            {featured.map((book, i) => <BookCover key={book.slug} title={book.title} author={book.author} src={book.cover} imageAlt={book.coverAlt} className={`w-[68px] ${i === 1 ? 'mb-2' : ''}`} />)}
          </div>
          <div className="flex items-start justify-between gap-3"><h3 className="text-lg font-semibold leading-snug text-white group-hover:text-emerald-200">{collection.title}</h3><ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" /></div>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{collection.description}</p>
          <p className="mt-4 text-xs text-emerald-200">{books.length} books · Explore collection</p>
        </Link>;
      })}
    </div>
  </section>;
}
