import Image from 'next/image';
import type { BookConfig } from '../types';
import { getBookCollection } from '../lib/book-collections';
import styles from './BookJacket.module.css';

export default function BookJacket({ book, priority = false }: { book: BookConfig; priority?: boolean }) {
  const collection = getBookCollection(book);
  return (
    <div className={styles.jacket} data-collection={collection} data-treatment={book.coverTreatment ?? 'cloth'} aria-hidden="true">
      {book.coverTreatment === 'illustrated' && book.coverImage && <Image src={book.coverImage} alt="" fill priority={priority} sizes="(max-width: 640px) 44vw, 320px" className={styles.art} />}
      <div className={styles.shade} />
      <div className={styles.weave} />
      <div className={styles.binding} />
      <div className={styles.type}>
        <span className={styles.imprint}>{collection === 'Arcanea fiction' ? 'Arcanea' : 'FrankX books'}</span>
        <div className={styles.title}>{book.title}</div>
        <div className={styles.subtitle}>{book.subtitle}</div>
        <span className={styles.author}>{book.author}</span>
      </div>
    </div>
  );
}
