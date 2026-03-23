import { readFileSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';
import BookReader from '../../components/BookReader';
import { booksRegistry, getBookBySlug } from '../../lib/books-registry';
import { createMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

interface PageProps {
  params: Promise<{
    bookSlug: string;
    chapterSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { bookSlug, chapterSlug } = await params;
  const book = getBookBySlug(bookSlug);
  const chapter = book?.chapters.find((c) => c.slug === chapterSlug);

  if (!book || !chapter) {
    return createMetadata({
      title: 'Chapter Not Found',
      description: 'The requested chapter could not be found.',
      path: `/books/${bookSlug}/${chapterSlug}`,
    });
  }

  return createMetadata({
    title: `${chapter.title} | ${book.title}`,
    description: chapter.description,
    path: `/books/${bookSlug}/${chapter.slug}`,
    type: 'article',
    keywords: book.keywords,
    authors: [book.author],
  });
}

export async function generateStaticParams() {
  const params: { bookSlug: string; chapterSlug: string }[] = [];
  for (const book of booksRegistry) {
    for (const chapter of book.chapters.filter((c) => c.published)) {
      params.push({ bookSlug: book.slug, chapterSlug: chapter.slug });
    }
  }
  return params;
}

export default async function ChapterPage({ params }: PageProps) {
  const { bookSlug, chapterSlug } = await params;
  const book = getBookBySlug(bookSlug);

  if (!book) notFound();

  const chapterIndex = book.chapters.findIndex((c) => c.slug === chapterSlug);
  const chapter = book.chapters[chapterIndex];

  if (!chapter || !chapter.published) notFound();

  // Read chapter content from the book's content directory
  const filePath = join(process.cwd(), book.contentDir, `${chapterSlug}.md`);

  let content: string;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch {
    notFound();
  }

  const previousChapter = chapterIndex > 0 ? book.chapters[chapterIndex - 1] : undefined;
  const nextChapter = chapterIndex < book.chapters.length - 1 ? book.chapters[chapterIndex + 1] : undefined;

  return (
    <>
      <JsonLd
        type="Article"
        data={{
          headline: chapter.title,
          description: chapter.description,
          author: { '@type': 'Person', name: book.author },
          publisher: { '@type': 'Organization', name: 'FrankX.AI' },
          isPartOf: {
            '@type': 'Book',
            name: book.title,
            description: book.subtitle,
            author: { '@type': 'Person', name: book.author },
          },
          position: chapter.number,
          wordCount: content.split(/\s+/).length,
          timeRequired: chapter.readingTime,
        }}
      />

      <BookReader
        chapter={chapter}
        content={content}
        bookSlug={bookSlug}
        bookTitle={book.title}
        theme={book.theme}
        previousChapter={previousChapter}
        nextChapter={nextChapter}
      />
    </>
  );
}
