import type { BookMetadata, Chapter, Essay } from './types';

export const bookMetadata: BookMetadata = {
  title: 'The Golden Age of Creators',
  subtitle: 'The Democratization of Creative Capability and Distribution',
  author: 'Frank',
  publishDate: '2026',
  description: 'A transformative exploration of how the creator economy crossed $250 billion, how 45 million people now create professionally, and how the barriers to creative expression have evaporated like morning fog.',
  keywords: [
    'creator economy',
    'AI and creativity',
    'golden age of intelligence',
    'independent creators',
    'creative entrepreneurship',
    'agentic AI',
    'content creation',
    'digital transformation',
  ],
};

export const chapters: Chapter[] = [
  {
    slug: 'chapter-01-when-creation-calls',
    title: 'When Creation Calls',
    number: 1,
    readingTime: '18 min',
    description: 'The question beneath all questions: What am I here to create?',
    published: true,
    image: '/images/golden-age/chapter-01-when-creation-calls.png',
  },
  {
    slug: 'chapter-02-the-orchestration-age',
    title: 'The Orchestration Age',
    number: 2,
    readingTime: '14 min',
    description: 'From using AI to conducting AI agents like an orchestra.',
    published: true,
    image: '/images/golden-age/chapter-02-the-orchestration-age.png',
  },
  {
    slug: 'chapter-03-the-first-gesture',
    title: 'The First Gesture',
    number: 3,
    readingTime: '15 min',
    description: 'The genesis moment — when intent becomes creation and the first mark is made.',
    published: true,
    image: '/images/golden-age/chapter-03-the-first-gesture.png',
  },
];

export const essays: Essay[] = [
  {
    slug: '08-golden-age-of-intelligence',
    title: 'The Golden Age of Intelligence',
    subtitle: 'Flagship Atlas for Agentic Marketing Teams',
    readingTime: '52 min',
    category: 'Flagship',
    description: 'A 15,000-word masterwork fusing SEO strategy, agentic operations, and automation.',
  },
  {
    slug: 'golden-age-field-guide',
    title: 'Golden Age Field Guide',
    subtitle: 'Principles and Rituals',
    readingTime: '5 min',
    category: 'Quick Reference',
    description: 'Navigate the Golden Age with clarity, momentum, and soul.',
  },
  {
    slug: 'reader-first-golden-age',
    title: 'Reader-First Growth Playbook',
    subtitle: 'Practical Implementation',
    readingTime: '14 min',
    category: 'Strategy',
    description: 'Translate the Golden Age narrative into content and distribution moves.',
  },
];
