import { defaultOpenGraphImages, siteConfig } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedBooks } from './lib/books-registry';
import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import BookJacket from './components/BookJacket';
import BookShelf from './components/BookShelf';
import styles from './Books.module.css';

export const metadata: Metadata = {
  title: 'Books',
  description: 'Read FrankX books on intelligence, creative work and attention, alongside poetry and Arcanea fiction. Every available chapter is free to read online.',
  openGraph: {
    images: defaultOpenGraphImages,
    title: 'Books by Frank Riemer',
    description: 'Essays, poetry and stories. Read every available chapter free online.',
    type: 'website',
  },
};

export default function BooksHubPage() {
  const books = getPublishedBooks();
  const featured = ['fable', 'the-wordless-laws-book-two'].flatMap(slug => books.find(book => book.slug === slug) ?? []);
  // Book ItemList so search and answer engines can enumerate the library.
  const librarySchema = {
    name: 'The FrankX Library',
    url: `${siteConfig.url}/books`,
    numberOfItems: books.length,
    itemListElement: books.map((book, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteConfig.url}/books/${book.slug}`,
      item: {
        '@type': 'Book',
        name: book.title,
        ...(book.subtitle ? { alternativeHeadline: book.subtitle } : {}),
        description: book.description,
        url: `${siteConfig.url}/books/${book.slug}`,
        author: { '@id': `${siteConfig.url}/#frank-riemer` },
        inLanguage: book.language ?? 'en',
        ...(book.coverImage ? { image: `${siteConfig.url}${book.coverImage}` } : {}),
        ...(book.publishDate ? { datePublished: book.publishDate } : {}),
        isAccessibleForFree: true,
      },
    })),
  };

  return (
    <div className={styles.page}>
      <JsonLd type="ItemList" data={librarySchema} />
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Frank Riemer · Books</p>
          <h1>A place for a longer thought.</h1>
          <p className={styles.deck}>Essays on intelligence and creative work. Poetry for the quieter hours. Stories from Arcanea. Choose a book and read every available chapter here, free.</p>
          <a href="#shelf" className={styles.action}>Explore {books.length} books <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.heroBooks}>
          {featured.map(book => <Link key={book.slug} href={`/books/${book.slug}`} aria-label={`Read ${book.title}`}><BookJacket book={book} priority /></Link>)}
        </div>
      </section>
      <figure className={styles.scene}>
        <div className={styles.sceneImage}><Image src="/images/books/reading-room-nilo-brio-v1.webp" alt="Nilo and Brio reading a clothbound book together under a brass lamp in a night library." fill sizes="(max-width: 1200px) 100vw, 1168px" /></div>
        <figcaption className={styles.sceneCaption}>In the reading room with Nilo and Brio. Original FrankX characters, illustrated with AI.</figcaption>
      </figure>
      <BookShelf books={books} />
      <section className={styles.end}>
        <div><h2>Read together.</h2><p>The illustrated family library brings English and German stories into the same reading experience.</p><Link href="/books/family">Visit the family library ↗</Link></div>
        <div><h2>The books behind the work.</h2><p>Reading notes, selected passages and reviews of the books that inform this collection.</p><Link href="/library">Browse the reading library ↗</Link></div>
      </section>
    </div>
  );
}
