import type { Metadata } from 'next';
import {
  EntryPage,
  buildEntryMetadata,
  entryStaticParams,
} from '@/lib/rails/render-helpers';

export function generateStaticParams() {
  return entryStaticParams('god');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildEntryMetadata('god', slug);
}

export default async function OnGodEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EntryPage hub="god" slug={slug} />;
}
