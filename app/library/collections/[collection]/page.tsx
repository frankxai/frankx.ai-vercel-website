import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { libraryCollections, belongsToCollection } from '@/data/library-collections';
import { libraryBooks } from '@/lib/library-catalog';
import { LibraryExplorer } from '@/components/library/LibraryExplorer';

type Props = { params: Promise<{ collection: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export function generateStaticParams() {
  return libraryCollections.map(collection => ({ collection: collection.slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = libraryCollections.find(item => item.slug === slug);
  if (!collection) notFound();
  const filters = await searchParams;
  const url = `https://www.frankx.ai/library/collections/${slug}`;
  return {
    title: collection.title, description: collection.description,
    alternates: { canonical: url },
    ...(filters.q || filters.category || filters.sort ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title: collection.title, description: collection.description, url, type: 'website', images: [{ url: `${url}/opengraph-image`, width: 1200, height: 630, alt: collection.title }] },
    twitter: { card: 'summary_large_image', title: collection.title, description: collection.description, images: [`${url}/opengraph-image`] },
  };
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { collection: slug } = await params;
  const collection = libraryCollections.find(item => item.slug === slug);
  if (!collection) notFound();
  const books = libraryBooks.filter(book => belongsToCollection(book, collection));
  const filters = await searchParams;
  const value = (input: string | string[] | undefined) => typeof input === 'string' ? input : '';
  const url = `https://www.frankx.ai/library/collections/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Library', item: 'https://www.frankx.ai/library' },
        { '@type': 'ListItem', position: 3, name: collection.title, item: url },
      ] },
      { '@type': 'CollectionPage', name: collection.title, description: collection.introduction, url,
        mainEntity: { '@type': 'ItemList', numberOfItems: books.length, itemListElement: books.map((book, index) => ({ '@type': 'ListItem', position: index + 1, name: book.title, url: `https://www.frankx.ai/library/${book.slug}` })) } },
    ],
  };
  return <main className="min-h-screen bg-[#0a0a0b] pb-20">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <header className="mx-auto max-w-6xl px-6 pb-10 pt-28 sm:pt-32">
      <Link href="/library" className="inline-flex min-h-11 items-center text-sm text-emerald-200 hover:underline focus-visible:ring-2 focus-visible:ring-emerald-300">← All collections</Link>
      <p className="mb-3 mt-6 text-sm text-white/65">A FrankX reading collection · {books.length} books</p>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">{collection.title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/75">{collection.introduction}</p>
      <nav aria-label="Suggested starting books" className="mt-6 flex flex-wrap gap-3">
        {collection.featured.map(slug => {
          const book = libraryBooks.find(book => book.slug === slug);
          return book ? <Link key={slug} href={`/library/${slug}`} className="inline-flex min-h-11 items-center rounded-full border border-emerald-300/25 px-4 text-sm text-emerald-100 hover:bg-emerald-300/10 focus-visible:ring-2 focus-visible:ring-emerald-300">{book.title} →</Link> : null;
        })}
      </nav>
    </header>
    <div className="mx-auto max-w-6xl px-6"><LibraryExplorer books={books} initial={{ q: value(filters.q), category: value(filters.category), sort: value(filters.sort) || 'recent' }} /></div>
  </main>;
}
