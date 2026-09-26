import { redirect } from 'next/navigation';

/** Temporary guard after accidental stub overwrite of this page on the honesty tip. Full review body restore follows. */
export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/library?q=${encodeURIComponent(slug)}`);
}
