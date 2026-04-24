/**
 * Unified type definitions for the FrankX Book Publishing Platform
 */

// ─── Book Theme System ──────────────────────────────────────────

export interface BookTheme {
  id: string;
  name: string;
  primary: string;
  accent: string;
  bgDark: string;
  headingFont: 'serif' | 'sans';
  bodyFont: 'serif' | 'sans';
}

// ─── Core Book Types ────────────────────────────────────────────

export interface BookChapter {
  slug: string;
  title: string;
  number: number;
  readingTime: string;
  description: string;
  published: boolean;
  image?: string;
  type?: 'prose' | 'poetry' | 'quotes' | 'exercises';
  epigraph?: { text: string; author: string };
}

export interface BookConfig {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  publishDate: string;
  description: string;
  keywords: string[];
  coverImage: string;
  theme: BookTheme;
  status: 'draft' | 'in-progress' | 'published';
  categories: string[];
  chapters: BookChapter[];
  contentDir: string; // relative path to chapter markdown files
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

// ─── Library / Review Types ─────────────────────────────────────

export interface BookQuote {
  text: string;
  chapter?: string; // e.g. "Chapter 3" or "Introduction"
  page?: number;
  context?: string; // short framing (1 sentence)
}

export interface BookChapterSummary {
  number: number;
  title: string;
  summary: string; // 2–4 sentences
  keyIdea: string; // one-line distillation
}

export interface RelatedReadingItem {
  title: string;
  author: string;
  reason: string; // why it pairs with this book
  url?: string; // canonical purchase/reference URL
}

export interface BookVideo {
  title: string;
  creator: string; // channel / host
  url: string;
  description: string;
  duration?: string; // e.g. "1h 42m"
  kind?: 'interview' | 'lecture' | 'talk' | 'explainer' | 'summary';
}

export interface BookReview {
  slug: string;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  reviewDate: string;
  categories: string[];
  readingTime: string;
  keyInsights: string[];
  bestFor: string[];
  amazonUrl?: string;
  relatedBook?: string; // slug of our own book
  tldr?: string; // 1–2 sentence answer block for AEO / summary cards
  faq?: Array<{ q: string; a: string }>; // curated Q&A for FAQPage schema
  publicationYear?: number;
  hasCover?: boolean; // true if coverImage file ships in /public/images/library/
  quotes?: BookQuote[]; // curated memorable quotes
  chapters?: BookChapterSummary[]; // chapter-by-chapter breakdown
  continueReading?: RelatedReadingItem[]; // external related books
  videos?: BookVideo[]; // YouTube / podcast deep-dives
}
