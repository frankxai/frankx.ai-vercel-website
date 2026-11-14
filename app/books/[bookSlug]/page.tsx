import { notFound } from 'next/navigation';
import Link from 'next/link';
import { booksRegistry, getBookBySlug } from '../lib/books-registry';
import { getThemeClasses } from '../lib/theme-classes';
import { createMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import BookDownloadGate, { hasBookPdf } from '../components/BookDownloadGate';
import BookJacket from '../components/BookJacket';
import { getBookCollection } from '../lib/book-collections';
import styles from '../components/BookLanding.module.css';
import ResumeReading from '../components/ResumeReading';

interface PageProps {
  params: Promise<{ bookSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { bookSlug } = await params;
  const book = getBookBySlug(bookSlug);

  if (!book) {
    return createMetadata({
      title: 'Book Not Found',
      description: 'The requested book could not be found.',
      path: `/books/${bookSlug}`,
    });
  }

  // Prefer the book's static cover image — reliable, works on every platform.
  // /api/og is dynamic but next/og has issues in Next 16 (empty body in
  // production); the cover JPG is a real file that always renders.
  const ogImage = book.coverImage || `/api/og?title=${encodeURIComponent(book.title)}`;

  return createMetadata({
    title: `${book.title} — ${book.subtitle}`,
    description: book.description,
    path: `/books/${book.slug}`,
    type: 'website',
    keywords: book.keywords,
    authors: [book.author],
    image: ogImage,
  });
}

export async function generateStaticParams() {
  return booksRegistry.map((book) => ({ bookSlug: book.slug }));
}

export default async function BookLandingPage({ params }: PageProps) {
  const { bookSlug } = await params;
  const book = getBookBySlug(bookSlug);

  if (!book) notFound();

  const tc = getThemeClasses(book.theme.id);
  const publishedChapters = book.chapters.filter((c) => c.published);
  const totalReadingTime = publishedChapters.reduce((acc, c) => {
    const mins = parseInt(c.readingTime) || 0;
    return acc + mins;
  }, 0);
  return (
    <>
      <JsonLd type="Book" data={{
        name: book.title,
        description: book.description,
        author: { '@type': 'Person', name: book.author },
        publisher: { '@type': 'Organization', name: 'FrankX.AI' },
        bookFormat: 'EBook',
        inLanguage: book.language ?? 'en',
        isAccessibleForFree: true,
      }} />
      <div className={styles.page} lang={book.language ?? 'en'}>
        <section className={styles.hero}>
          <Link href="/books" className={styles.back}><span aria-hidden="true">←</span> All books</Link>
          <div className={styles.composition}>
            <div>
              <p className={styles.kicker}>{getBookCollection(book)} · {book.status === 'published' ? 'Published' : 'In progress'}</p>
              <h1>{book.title}</h1>
              <p className={styles.subtitle}>{book.subtitle}</p>
              <p className={styles.description}>{book.description}</p>
              <div className={styles.stats}><span>By <strong>{book.author}</strong></span><span><strong>{publishedChapters.length}</strong> chapters available</span><span>About <strong>{totalReadingTime} min</strong></span></div>
              <div className={styles.actions}>
                {publishedChapters.length > 0 && <Link href={`/books/${bookSlug}/${publishedChapters[0].slug}`} className={styles.start}>Start reading <span aria-hidden="true">→</span></Link>}
                <a href="#chapters" className={styles.contentsLink}>Browse chapters</a>
              </div>
              <div className="mt-4"><ResumeReading key={book.slug} bookSlug={book.slug} chapters={book.chapters} /></div>
            </div>
            <div className={styles.cover}><BookJacket book={book} priority /></div>
          </div>
        </section>
        <section id="chapters" className={styles.contents}>
          <h2>Contents</h2>
          <p className={styles.note}>Every available chapter is free to read online.{book.status === 'in-progress' ? ' This book is being written; unfinished chapters are marked below.' : ''}</p>
          <ol className={styles.list} role="list">
            {book.chapters.map((chapter, index) => <li key={chapter.slug}>
              {chapter.published ? <Link href={`/books/${bookSlug}/${chapter.slug}`} className={styles.row}>
                <span className={`${styles.number} ${tc.badgeText}`}>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{chapter.title}</h3><p>{chapter.description}</p></div>
                <span className={styles.time}>{chapter.readingTime} <span aria-hidden="true">↗</span></span>
              </Link> : <div className={`${styles.row} ${styles.unavailable}`}>
                <span className={`${styles.number} ${tc.badgeText}`}>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{chapter.title}</h3><p>{chapter.description}</p></div><span className={styles.time}>In preparation</span>
              </div>}
            </li>)}
          </ol>
        </section>
        {hasBookPdf(book.slug) && <section className={styles.download}><p className={styles.note}>The existing PDF edition may use an earlier cover or title.</p><BookDownloadGate bookSlug={book.slug} bookTitle={book.title} themeColor={book.theme.primary} /></section>}
      </div>
    </>
  );
}
