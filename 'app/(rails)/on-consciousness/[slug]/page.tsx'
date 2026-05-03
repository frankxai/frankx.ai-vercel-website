import type { Metadata } from 'next';
import {
  EntryPage,
  buildEntryMetadata,
  entryStaticParams,
} from '@/lib/rails/render-helpers';

export function generateStaticParams() {
  return entryStaticParams('consciousness');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildEntryMetadata('consciousness', slug);
}

export default async function OnConsciousnessEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EntryPage hub="consciousness" slug={slug} />;
}
