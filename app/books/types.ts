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
}
