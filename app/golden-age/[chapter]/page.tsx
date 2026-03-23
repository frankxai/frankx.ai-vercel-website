import { readFileSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';
import ChapterReader from '../components/ChapterReader';
import { chapters, bookMetadata } from '../metadata';
import { createMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

interface PageProps {
  params: Promise<{
    chapter: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const chapter = chapters.find((c) => c.slug === resolvedParams.chapter);

  if (!chapter) {
    return createMetadata({
      title: 'Chapter Not Found',
      description: 'The requested chapter could not be found.',
      path: `/golden-age/${resolvedParams.chapter}`,
    });
  }

  return createMetadata({
    title: `${chapter.title} | ${bookMetadata.title}`,
    description: chapter.description,
    path: `/golden-age/${chapter.slug}`,
    type: 'article',
    keywords: bookMetadata.keywords,
    authors: [bookMetadata.author],
  });
}

export async function generateStaticParams() {
  return chapters
    .filter((c) => c.published)
    .map((chapter) => ({
      chapter: chapter.slug,
    }));
}

export default async function ChapterPage({ params }: PageProps) {
  const resolvedParams = await params;
  const chapterSlug = resolvedParams.chapter;

  // Find chapter metadata
  const chapterIndex = chapters.findIndex((c) => c.slug === chapterSlug);
  const chapter = chapters[chapterIndex];

  if (!chapter || !chapter.published) {
    notFound();
  }

  // Read chapter content
  const filePath = join(
    process.cwd(),
    'content',
    'golden-age-book',
    `${chapterSlug}.md`
  );

  let content: string;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Error reading chapter:', error);
    notFound();
  }

  // Get previous and next chapters
  const previousChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : undefined;
  const nextChapter =
    chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : undefined;

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd
        type="Article"
        data={{
          headline: chapter.title,
          description: chapter.description,
          author: {
            '@type': 'Person',
            name: bookMetadata.author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'FrankX.AI',
          },
          isPartOf: {
            '@type': 'Book',
            name: bookMetadata.title,
            description: bookMetadata.subtitle,
            author: {
              '@type': 'Person',
              name: bookMetadata.author,
            },
          },
          position: chapter.number,
          wordCount: content.split(/\s+/).length,
          timeRequired: chapter.readingTime,
        }}
      />

      <ChapterReader
        chapter={chapter}
        content={content}
        previousChapter={previousChapter}
        nextChapter={nextChapter}
      />
    </>
  );
}
