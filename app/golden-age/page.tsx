import Script from 'next/script';
import GoldenAgeShell from '@/components/golden-age/GoldenAgeShell';
import { bookMetadata, chapters } from './metadata';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: bookMetadata.title,
  alternativeHeadline: bookMetadata.subtitle,
  description: bookMetadata.description,
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
  publisher: { '@type': 'Organization', name: 'FrankX.AI', url: 'https://frankx.ai' },
  url: 'https://frankx.ai/golden-age',
  datePublished: bookMetadata.publishDate,
  inLanguage: 'en',
  keywords: bookMetadata.keywords.join(', '),
  image: 'https://frankx.ai/images/golden-age/hero-golden-age.png',
  hasPart: chapters.map((chapter) => ({
    '@type': 'Chapter',
    position: chapter.number,
    name: chapter.title,
    description: chapter.description,
    url: `https://frankx.ai/golden-age/${chapter.slug}`,
    timeRequired: chapter.readingTime,
  })),
};

export default function GoldenAgePage() {
  return (
    <>
      <Script id="golden-age-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <GoldenAgeShell />
    </>
  );
}
