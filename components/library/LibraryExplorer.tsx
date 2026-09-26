'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { BookCover } from './BookCover';
import { createLibrarySearch, filterLibrary, type LibraryBook } from '@/lib/library-search';

type Filters = { q: string; category: string; sort: string };
const emptyFilters: Filters = { q: '', category: '', sort: 'recent' };

export function LibraryExplorer({ books, children, initial = emptyFilters }: { books: LibraryBook[]; children?: ReactNode; initial?: Filters }) {
  const [filters, setFilters] = useState(initial);
  const categories = useMemo(() => [...new Set(books.flatMap(book => book.categories))].sort(), [books]);
  const index = useMemo(() => createLibrarySearch(books), [books]);
  const results = useMemo(() => filterLibrary(books, filters.q, filters.category, undefined, filters.sort, index), [books, filters, index]);

  useEffect(() => {
    function syncFromUrl() {
      const params = new URLSearchParams(window.location.search);
      setFilters({ q: params.get('q') || '', category: params.get('category') || '', sort: params.get('sort') || 'recent' });
    }
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  function update(next: Filters) {
    setFilters(next);
    const url = new URL(window.location.href);
    for (const key of ['q', 'category', 'sort'] as const) {
      if (next[key] && !(key === 'sort' && next[key] === 'recent')) url.searchParams.set(key, next[key]);
      else url.searchParams.delete(key);
    }
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }

  return (
    <div>
      <form role="search" aria-label="Search the Library" onSubmit={event => event.preventDefault()} className="rounded-2xl border border-white/15 bg-white/[0.025] p-4 sm:p-5">
        <label htmlFor="library-search" className="mb-2 block text-sm font-medium text-white">Find your next book</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-emerald-300" aria-hidden="true" />
          <input id="library-search" type="search" value={filters.q} onChange={event => update({ ...filters, q: event.target.value })} placeholder="Title, author, tradition, or idea…" autoComplete="off"
            className="min-h-[52px] w-full rounded-xl border border-white/20 bg-[#0a0a0b] py-3 pl-12 pr-12 text-base text-white placeholder:text-white/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 [&::-webkit-search-cancel-button]:appearance-none" />
          {filters.q && <button type="button" onClick={() => update({ ...filters, q: '' })} aria-label="Clear search" className="absolute right-1 top-1 flex h-11 w-11 items-center justify-center rounded-lg text-white/70 focus-visible:ring-2 focus-visible:ring-emerald-300"><X className="h-5 w-5" aria-hidden="true" /></button>}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <label className="text-xs text-white/70">Topic
            <select value={filters.category} onChange={event => update({ ...filters, category: event.target.value })} className="mt-1 block min-h-11 w-full rounded-lg border border-white/15 bg-[#0a0a0b] px-3 text-sm text-white focus-visible:ring-2 focus-visible:ring-emerald-300">
              <option value="">All topics</option>{categories.map(category => <option key={category}>{category}</option>)}
            </select>
          </label>
          <label className="text-xs text-white/70">Order
            <select value={filters.sort} onChange={event => update({ ...filters, sort: event.target.value })} className="mt-1 block min-h-11 w-full rounded-lg border border-white/15 bg-[#0a0a0b] px-3 text-sm text-white focus-visible:ring-2 focus-visible:ring-emerald-300">
              <option value="recent">{filters.q ? 'Best match' : 'Recently added'}</option><option value="title">Title A–Z</option><option value="author">Author A–Z</option>
            </select>
          </label>
          {(filters.q || filters.category || filters.sort !== 'recent') && <button type="button" onClick={() => update(emptyFilters)} className="min-h-11 rounded-lg px-3 text-sm text-emerald-200 underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-emerald-300">Reset filters</button>}
        </div>
      </form>

      {!filters.q && !filters.category && children}

      <section id="book-results" aria-label="Books" className="scroll-mt-24 py-10">
        <div className="mb-6 flex items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold text-white">{filters.q || filters.category ? 'Matching books' : 'Browse the shelves'}</h2>
          <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-white/65">{results.length} {results.length === 1 ? 'book' : 'books'}</p>
        </div>
        {results.length === 0 ? <div className="rounded-2xl border border-white/10 p-8 text-center"><h3 className="text-lg font-medium text-white">No books found</h3><p className="mt-2 text-white/65">Try an author’s surname, a shorter title, or clear the topic filter.</p><button type="button" onClick={() => update(emptyFilters)} className="mt-5 min-h-11 rounded-full border border-emerald-300/40 px-5 text-sm text-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-300">Show all books</button></div> :
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {results.map(book => <article key={book.slug} className="min-w-0">
              <Link href={`/library/${book.slug}`} prefetch={false} className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]">
                <BookCover title={book.title} author={book.author} src={book.cover} imageAlt={book.coverAlt} hasGuide={book.hasGuide} className="w-full max-w-[205px] transition-transform duration-200 group-hover:-translate-y-1 motion-reduce:transition-none" />
                <div className="mt-3 max-w-[205px]">
                  <p className="mb-1 text-[11px] leading-snug text-emerald-200/85">{book.kind}</p>
                  <h3 className="text-sm font-semibold leading-snug text-white group-hover:text-emerald-200 sm:text-base">{book.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/65">{book.author}</p>
                  <p className="mt-2 hidden line-clamp-3 text-xs leading-relaxed text-white/60 sm:block">{book.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-white/60">{book.readingTime}{book.hasGuide ? ' guide' : ''}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
                </div>
              </Link>
            </article>)}
          </div>}
      </section>
    </div>
  );
}
