import type { Metadata } from 'next';
import DavidStorybook from './DavidStorybook';

export const metadata: Metadata = {
  title: 'David and the Song Inside His Name',
  description:
    'An illustrated bilingual story of shepherds, kings, songs, courage, repair, and the meaning of being beloved.',
  openGraph: {
    title: 'David and the Song Inside His Name',
    description: 'A living English and German family storybook, created for David.',
    images: [
      {
        url: '/images/books/family/david/cover.webp',
        width: 1023,
        height: 1537,
        alt: 'David and the Song Inside His Name',
      },
    ],
  },
};

export default function DavidStoryPage() {
  return <DavidStorybook />;
}
