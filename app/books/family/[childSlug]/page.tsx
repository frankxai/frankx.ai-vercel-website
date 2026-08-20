import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FutureStoryPage from '../FutureStoryPage';

const futureStories = {
  amilina: 'Amilina',
  'alea-sophia': 'Alea Sophia',
  adam: 'Adam',
} as const;

type FutureSlug = keyof typeof futureStories;
type PageProps = { params: Promise<{ childSlug: string }> };

export function generateStaticParams() {
  return Object.keys(futureStories).map((childSlug) => ({ childSlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { childSlug } = await params;
  const title = futureStories[childSlug as FutureSlug];
  if (!title) return { title: 'Story not found' };
  return {
    title,
    description: `${title}'s future place in the FrankX family storybook library.`,
  };
}

export default async function ChildStoryPage({ params }: PageProps) {
  const { childSlug } = await params;
  if (!(childSlug in futureStories)) notFound();
  return <FutureStoryPage slug={childSlug as FutureSlug} />;
}
