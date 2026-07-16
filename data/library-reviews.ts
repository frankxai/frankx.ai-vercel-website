import type { BookReview } from '@/app/books/types';
import { bookReviews as legacyBookReviews } from './book-reviews';

const blitzscalingReview: BookReview = {
  slug: 'blitzscaling',
  title: 'Blitzscaling: The Lightning-Fast Path to Building Massively Valuable Companies',
  author: 'Reid Hoffman and Chris Yeh',
  coverImage: '/images/library/blitzscaling-cover.webp',
  hasCover: true,
  rating: 5,
  reviewDate: '2026-07-16',
  categories: ['Scaling', 'Business Strategy', 'Leadership', 'Platforms'],
  readingTime: '5 min',
  publicationYear: 2018,
  tldr:
    'This source-marked field note connects two pages of Blitzscaling: page 83 shows how an internal capability can become a platform, while page 152 argues for a small layer of generalists who can move into undefined work before a specialist hierarchy exists. Together they define a scaling sequence: build adaptable capacity, make the reliable parts reusable, then add management only where coordination has become a recurring constraint.',
  keyInsights: [
    'Internal infrastructure becomes strategic when it stops being only a cost centre and becomes a capability other people can build on. Amazon turning logistics and computing systems into merchant services and AWS is the model on page 83.',
    'Software platforms compress coordination. APIs replace repeated person-to-person negotiation, which lets distribution and transaction volume scale without the same growth in human intervention.',
    'A scaling organisation still needs a small generalist layer. These people enter ambiguous work, cross functions, and shape problems before the company knows which permanent specialist role it needs.',
    'Management and executive work are different operating modes. Managers turn direction into detailed execution; executives lead managers, hold vision and strategy, and carry responsibility for organisational resolve.',
    'Role transitions should follow the company\'s coordination structure, not titles or headcount alone. Contributor, manager, and executive capacity become necessary at different stages and should not be collapsed into one founder-shaped job.',
  ],
  bestFor: [
    'Founders moving from founder-driven execution into a multi-team company',
    'Operators deciding which internal capability should become a product or platform',
    'AI-native ventures balancing specialist agents with human generalists',
    'Portfolio founders separating contributor, manager, and executive work',
  ],
  quotes: [
    {
      text: 'the Networked Age has made them vastly more powerful and valuable.',
      chapter: 'Business Model Innovation — p. 83',
      context:
        'The point is structural: software distribution and APIs remove the geographic and negotiation limits of earlier platforms.',
    },
    {
      text: 'Think of generalists as the “stem cells” of your organization.',
      chapter: 'Transition #3 — p. 152',
      context:
        'Generalists are the temporary adaptive capacity that enters undefined work before the permanent function is obvious.',
    },
  ],
  capture: {
    kind: 'book-photo',
    capturedAt: '2026-07-16',
    sourcePages: [83, 152],
    rightsStatus:
      'Personal reading capture. The public page uses two short excerpts, original commentary, and obscured derivatives of the photographed pages; readable originals remain private.',
    publicNote:
      'A field note from two pages selected during a personal reading session. The public artifact keeps the page references and operating synthesis while the full readable scans stay outside the repository.',
    images: [
      {
        src: '/images/library/blitzscaling-page-83-source.webp',
        alt: 'Obscured editorial treatment of page 83 from a personal copy of Blitzscaling.',
        caption:
          'Page 83 · Business Model Innovation · public derivative; the readable source remains private.',
      },
      {
        src: '/images/library/blitzscaling-page-152-source.webp',
        alt: 'Obscured editorial treatment of page 152 from a personal copy of Blitzscaling.',
        caption:
          'Page 152 · Contributors to Managers to Executives · public derivative; the readable source remains private.',
      },
    ],
  },
  application: {
    title: 'Build the stem-cell layer before the hierarchy',
    body:
      'FrankX, Arcanea, and Starlight Intelligence should share a small generalist operating cell that can enter ambiguous work, assemble specialist agents, and stabilize a repeatable delivery loop. Once a capability becomes reliable, expose it as a template, API, or product surface. Formal management appears only where recurring coordination demands it; executive attention stays on portfolio direction, capital allocation, standards, and organisational resolve.',
    practice: {
      title: 'Fourteen-day role and platform audit',
      duration: '14 days',
      instruction:
        'Label every active responsibility contributor, manager, or executive. Reclaim the executive work that only the founder can do, assign recurring coordination to an explicit owner, and keep one or two generalists free for undefined cross-venture problems. Then choose one internal capability and define the smallest reusable interface that turns it into a platform asset.',
    },
    connections: [
      {
        label: 'Agentic AI Center',
        href: '/agentic-ai-center',
        reason:
          'The operating model for combining human judgment, reusable agents, and delivery standards without cloning a conventional hierarchy.',
        kind: 'product',
      },
      {
        label: 'AI Ops Architecture',
        href: '/ai-ops/architecture',
        reason:
          'The technical layer where internal workflows become governed, reusable interfaces instead of one-off founder effort.',
        kind: 'practice',
      },
    ],
  },
  faq: [
    {
      q: 'Is this a full summary of Blitzscaling?',
      a: 'No. This is a source-marked field note from pages 83 and 152. It makes claims only about the photographed passages and their application to platform and organisational design.',
    },
    {
      q: 'Why connect the platform chapter with the generalist section?',
      a: 'They describe two sides of the same scaling move. A platform makes reliable capability reusable; generalists supply adaptive capacity while the capability, role, or market is still undefined.',
    },
    {
      q: 'How does the platform thesis apply to an AI-native venture?',
      a: 'When a research, delivery, or agent workflow works repeatedly, stop treating it as private founder craft. Give it a stable contract — a template, skill, API, or governed product surface — so other people and agents can build on it.',
    },
    {
      q: 'When should a founder separate manager and executive work?',
      a: 'When recurring coordination across contributors starts consuming the attention required for direction, capital allocation, standards, and long-range choices. The response is a real management layer, not a larger founder task list.',
    },
  ],
};

// Keep capture modules small and independently publishable. The filter makes this
// migration-safe while older entries are gradually moved out of the legacy registry.
export const bookReviews: BookReview[] = [
  blitzscalingReview,
  ...legacyBookReviews.filter((review) => review.slug !== blitzscalingReview.slug),
];

export function getReviewBySlug(slug: string): BookReview | undefined {
  return bookReviews.find((review) => review.slug === slug);
}

export function getReviewsByCategory(category: string): BookReview[] {
  return bookReviews.filter((review) => review.categories.includes(category));
}

export function getAllReviewSlugs(): string[] {
  return bookReviews.map((review) => review.slug);
}

export function getAllReviewCategories(): string[] {
  return Array.from(new Set(bookReviews.flatMap((review) => review.categories))).sort();
}
