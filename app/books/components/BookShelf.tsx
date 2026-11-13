'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import type { BookConfig } from '../types';
import { bookCollections, filterBooks, getBookCollection, type BookCollection } from '../lib/book-collections';
import BookJacket from './BookJacket';
import styles from './BookShelf.module.css';

export default function BookShelf({ books }: { books: BookConfig[] }) {
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState<BookCollection>('All books');
  const searchRef = useRef<HTMLInputElement>(null);
  const filtered = filterBooks(books, query, collection);
  function reset() {
    setQuery(''); setCollection('All books'); searchRef.current?.focus();
  }
  return (
    <section className={styles.shelf} id="shelf">
      <div className={styles.toolbar}>
        <div><p className={styles.kicker}>The collection</p><h2>Choose your next book.</h2></div>
        <div className={styles.search}><label htmlFor="book-search">Search the books</label><input ref={searchRef} id="book-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Title, subject or idea" /></div>
      </div>
      <div className={styles.filters} role="group" aria-label="Book subjects">
        {bookCollections.map(item => <button type="button" key={item} aria-pressed={collection === item} onClick={() => setCollection(item)}>{item}</button>)}
      </div>
      <p className={styles.count} role="status" aria-atomic="true">{filtered.length} {filtered.length === 1 ? 'book' : 'books'}{collection !== 'All books' ? ` · ${collection}` : ''}</p>
      <ul className={styles.grid} role="list">
        {filtered.map(book => <li key={book.slug} lang={book.language ?? 'en'}>
          <Link href={`/books/${book.slug}`} className={styles.book}>
            <div className={styles.cover}><BookJacket book={book} /></div>
            <div className={styles.meta}>{getBookCollection(book)}<span>{book.status === 'published' ? 'Published' : 'In progress'}</span></div>
            <h3>{book.title}</h3><p className={styles.subtitle}>{book.subtitle}</p>
            <p className={styles.description}>{book.description}</p>
            <span className={styles.read}>{book.chapters.filter(chapter => chapter.published).length} chapters available <span aria-hidden="true">↗</span></span>
          </Link>
        </li>)}
      </ul>
      {filtered.length === 0 && <div className={styles.empty}><h3>No books match this search.</h3><p>Try a shorter phrase or another subject.</p><button type="button" onClick={reset}>Clear search and filters</button></div>}
    </section>
  );
}
