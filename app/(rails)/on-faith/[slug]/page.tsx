import type { Metadata } from 'next';
import {
  EntryPage,
  buildEntryMetadata,
  entryStaticParams,
} from '@/lib/rails/render-helpers';

export function generateStaticParams() {
  return entryStaticParams('faith');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildEntryMetadata('faith', slug);
}

export default async function OnFaithEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EntryPage hub="faith" slug={slug} />;
}
