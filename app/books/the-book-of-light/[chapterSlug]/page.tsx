import { readFileSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBookBySlug } from '../../lib/books-registry';
import BookOfLightReaderClient from './BookOfLightReaderClient';

interface PageProps {
  params: Promise<{
    chapterSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { chapterSlug } = await params;
  const book = getBookBySlug('the-book-of-light');
  const chapter = book?.chapters.find((c) => c.slug === chapterSlug);

  if (!book || !chapter) {
    return {
      title: 'Chapter Not Found | FrankX',
    };
  }

  return {
    title: `${chapter.title} — The Book of Light | FrankX`,
    description: chapter.description,
    alternates: {
      canonical: `https://frankx.ai/books/the-book-of-light/${chapterSlug}`,
    },
    openGraph: {
      title: `${chapter.title} — The Book of Light`,
      description: chapter.description,
      type: 'article',
      url: `https://frankx.ai/books/the-book-of-light/${chapterSlug}`,
    },
  };
}

export async function generateStaticParams() {
  const book = getBookBySlug('the-book-of-light');
  if (!book) return [];
  return book.chapters.map((c) => ({ chapterSlug: c.slug }));
}

export default async function BookOfLightChapterPage({ params }: PageProps) {
  const { chapterSlug } = await params;
  const book = getBookBySlug('the-book-of-light');

  if (!book) notFound();

  const chapterIndex = book.chapters.findIndex((c) => c.slug === chapterSlug);
  const chapter = book.chapters[chapterIndex];

  if (!chapter) notFound();

  const filePath = join(
    process.cwd(),
    book.contentDir,
    `${chapterSlug}.md`
  );

  let content = '';
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch {
    notFound();
  }

  const previousChapter =
    chapterIndex > 0 ? book.chapters[chapterIndex - 1] : undefined;
  const nextChapter =
    chapterIndex < book.chapters.length - 1
      ? book.chapters[chapterIndex + 1]
      : undefined;

  return (
    <BookOfLightReaderClient
      chapter={chapter}
      content={content}
      previousChapter={previousChapter}
      nextChapter={nextChapter}
      totalChapters={book.chapters.length}
    />
  );
}
