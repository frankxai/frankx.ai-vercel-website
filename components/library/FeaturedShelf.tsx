import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BookCover } from './BookCover';
import type { LibraryBook } from '@/lib/library-search';

export function FeaturedShelf({ title, description, books, label = 'Selected reading order' }: {
  title: string;
  description: string;
  books: LibraryBook[];
  label?: string;
}) {
  if (!books.length) return null;
  return <section aria-label={title} className="pt-10">
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div><p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80">{label}</p><h2 className="mt-2 font-serif text-2xl text-white sm:text-3xl">{title}</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">{description}</p></div>
    </div>
    <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-5 sm:gap-6" role="list">
      {books.map((book, index) => <div key={book.slug} role="listitem" className="w-[44vw] max-w-[175px] min-w-[145px] shrink-0 snap-start sm:w-44">
        <Link href={`/library/${book.slug}`} prefetch={false} className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]">
          <div className="relative">
            <BookCover title={book.title} author={book.author} src={book.cover} imageAlt={book.coverAlt} className="w-full transition-transform duration-200 group-hover:-translate-y-1 motion-reduce:transition-none" />
            <span className="absolute -bottom-2 -left-2 rounded-sm border border-white/20 bg-[#0a0a0b] px-2 py-1 font-mono text-xs text-white/85" aria-label={`Position ${index + 1} in editorial reading order`}>{String(index + 1).padStart(2, '0')}</span>
          </div>
          <div className="mt-5"><h3 className="line-clamp-2 text-sm font-medium leading-snug text-white group-hover:text-emerald-200">{book.title}</h3><p className="mt-1 line-clamp-1 text-xs text-white/60">{book.author}</p><span className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-200/80">Read guide <ArrowUpRight className="h-3 w-3" aria-hidden="true" /></span></div>
        </Link>
      </div>)}
    </div>
  </section>;
}
