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
      <div><p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80">{label}</p><h2 className="mt-2 font-display text-2xl text-white sm:text-3xl">{title}</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">{description}</p></div>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-5" role="list">
      {books.map((book, index) => <div key={book.slug} role="listitem" className="min-w-0">
        <Link href={`/library/${book.slug}`} prefetch={false} className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]">
          <BookCover title={book.title} author={book.author} src={book.cover} imageAlt={book.coverAlt} hasGuide={book.hasGuide} className="w-full shadow-[0_18px_30px_-24px_rgba(0,0,0,0.9)] transition-transform duration-200 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:shadow-none" />
          <div className="mt-4">
            <p className="font-mono text-[11px] tracking-[0.14em] text-white/55"><span aria-label={`Position ${index + 1} in editorial reading order`}>{String(index + 1).padStart(2, '0')}</span></p>
            <h3 className="mt-1 line-clamp-2 text-base font-medium leading-snug text-white group-hover:text-emerald-200">{book.title}</h3>
            <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/65">{book.author}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-200/80">{book.hasGuide ? 'Read guide' : 'Read review'} <ArrowUpRight className="h-3 w-3" aria-hidden="true" /></span>
          </div>
        </Link>
      </div>)}
    </div>
  </section>;
}
