/**
 * Shared type definitions for Golden Age book
 */

export interface Chapter {
  slug: string;
  title: string;
  number: number;
  readingTime: string;
  description: string;
  published: boolean;
}

export interface Essay {
  slug: string;
  title: string;
  subtitle: string;
  readingTime: string;
  category: string;
  description: string;
}

export interface BookMetadata {
  title: string;
  subtitle: string;
  author: string;
  publishDate: string;
  description: string;
  keywords: string[];
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}
