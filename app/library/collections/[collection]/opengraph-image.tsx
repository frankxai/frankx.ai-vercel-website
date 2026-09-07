import { libraryCollections } from '@/data/library-collections';
import { libraryOg } from '@/lib/library-og';
export const alt = 'Curated reading collection in the FrankX Library';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: slug } = await params;
  const collection = libraryCollections.find(item => item.slug === slug);
  if (!collection) return new Response('Not found', { status: 404 });
  return libraryOg(collection.title, collection.description, 'Curated reading collection');
}
