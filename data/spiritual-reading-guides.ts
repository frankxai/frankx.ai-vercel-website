import type { BookReview } from '@/app/books/types';
import entries from './library-reading-guides.json';

// Publication date records this editorial guide, never a personal reading claim.
export const spiritualReadingGuides: BookReview[] = entries.map(entry => ({
  slug: entry.slug,
  title: entry.title,
  author: entry.author,
  coverImage: '',
  hasCover: false,
  rating: 0, // Unrated guides do not emit Review/Rating markup.
  reviewDate: '2026-09-07',
  readingTime: '2 min',
  categories: entry.categories,
  tldr: entry.summary,
  keyInsights: entry.keyInsights,
  bestFor: [`Readers exploring ${entry.tradition}`, 'Readers choosing a source or edition before a complete reading'],
  guide: {
    ...entry,
    kind: entry.kind as NonNullable<BookReview['guide']>['kind'],
    claimBasis: entry.kind === 'Primary text' ? 'Symbolic' : entry.kind === 'Modern commentary' ? 'Established' : 'Experiential',
  },
}));

export const taoReadingGuide: NonNullable<BookReview['guide']> = {
  tradition: 'Daoism',
  kind: 'Primary text',
  claimBasis: 'Symbolic',
  context: 'The Tao Te Ching, also written Daodejing, is traditionally attributed to Laozi. Its brief chapters address the Dao, conduct, government, and non-forcing. The field note below is Frank’s application of selected passages, not a substitute for the whole work.',
  editionNote: 'The existing reading capture uses David Hinton’s translation, pages 6, 7, 21, and 22. Preserve that edition when following the quotations. Compare other named translations as interpretations; their wording and explanatory choices differ.',
  readingPath: [
    { title: 'Read the opening chapters', note: 'Begin with the difficulty of naming and describing the Dao. Allow ambiguity before seeking a rule.' },
    { title: 'Return to the captured passages', note: 'Read chapters 7 and 22 in full around the excerpts. Compare the source with the application below.' },
    { title: 'Pair with Zhuangzi', note: 'Move from compressed verse to stories and shifting perspectives within Daoist thought.' },
  ],
  sources: [
    { title: 'David Hinton’s publisher', url: 'https://www.panmacmillan.com/authors/david-hinton/43470', note: 'Translator and edition context for the existing reading capture.' },
    { title: 'Penguin Random House: Tao Te Ching', url: 'https://www.penguinrandomhouse.com/books/349945/tao-te-ching-by-lao-tzu/', note: 'A separate named edition for comparison; not the source of the captured quotations.' },
  ],
  relatedSlugs: ['zhuangzi', 'analects', 'meditations', 'the-untethered-soul'],
  aliases: ['Dao De Jing', 'Daodejing', 'Laozi', 'Lao Tzu', 'Taoism', 'Daoism', 'wu wei'],
};
