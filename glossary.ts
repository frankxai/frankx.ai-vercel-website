/**
 * Glossary System
 *
 * Manages book glossaries for inline tooltips and reference pages.
 * Each book can have a glossary defining key terms that appear in chapters.
 */

import fs from 'fs';
import path from 'path';

export interface GlossaryTerm {
  term: string;
  definition: string;
  extended?: string;
  chapter?: number;
  aliases?: string[];
  relatedTerms?: string[];
  category?: string;
}

export interface BookGlossary {
  bookSlug: string;
  title: string;
  description: string;
  terms: GlossaryTerm[];
}

const GLOSSARIES_DIR = path.join(process.cwd(), 'data', 'glossaries');

/**
 * Get glossary for a specific book
 */
export function getBookGlossary(bookSlug: string): BookGlossary | null {
  try {
    const filePath = path.join(GLOSSARIES_DIR, `${bookSlug}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as BookGlossary;
  } catch (error) {
    console.error(`Failed to load glossary for ${bookSlug}:`, error);
    return null;
  }
}

/**
 * Get all available glossaries
 */
export function getAllGlossaries(): BookGlossary[] {
  try {
    const files = fs.readdirSync(GLOSSARIES_DIR)
      .filter(file => file.endsWith('.json'));

    return files
      .map(file => {
        const bookSlug = file.replace('.json', '');
        return getBookGlossary(bookSlug);
      })
      .filter((g): g is BookGlossary => g !== null);
  } catch (error) {
    console.error('Failed to load glossaries:', error);
    return [];
  }
}

/**
 * Find a term in a glossary (case-insensitive, including aliases)
 */
export function findTerm(
  glossary: BookGlossary,
  searchTerm: string
): GlossaryTerm | null {
  const normalized = searchTerm.toLowerCase().trim();

  return glossary.terms.find(term => {
    // Check main term
    if (term.term.toLowerCase() === normalized) {
      return true;
    }

    // Check aliases
    if (term.aliases) {
      return term.aliases.some(alias =>
        alias.toLowerCase() === normalized
      );
    }

    return false;
  }) || null;
}

/**
 * Get terms by category
 */
export function getTermsByCategory(
  glossary: BookGlossary
): Record<string, GlossaryTerm[]> {
  const categorized: Record<string, GlossaryTerm[]> = {};

  glossary.terms.forEach(term => {
    const category = term.category || 'General';
    if (!categorized[category]) {
      categorized[category] = [];
    }
    categorized[category].push(term);
  });

  // Sort terms alphabetically within each category
  Object.keys(categorized).forEach(category => {
    categorized[category].sort((a, b) =>
      a.term.localeCompare(b.term)
    );
  });

  return categorized;
}

/**
 * Search terms by keyword
 */
export function searchTerms(
  glossary: BookGlossary,
  query: string
): GlossaryTerm[] {
  const normalized = query.toLowerCase().trim();

  if (!normalized) {
    return glossary.terms;
  }

  return glossary.terms.filter(term => {
    // Search in term name
    if (term.term.toLowerCase().includes(normalized)) {
      return true;
    }

    // Search in definition
    if (term.definition.toLowerCase().includes(normalized)) {
      return true;
    }

    // Search in extended definition
    if (term.extended?.toLowerCase().includes(normalized)) {
      return true;
    }

    // Search in aliases
    if (term.aliases?.some(alias =>
      alias.toLowerCase().includes(normalized)
    )) {
      return true;
    }

    return false;
  });
}

/**
 * Get alphabetical index (A-Z grouping)
 */
export function getAlphabeticalIndex(
  glossary: BookGlossary
): Record<string, GlossaryTerm[]> {
  const index: Record<string, GlossaryTerm[]> = {};

  glossary.terms.forEach(term => {
    const firstLetter = term.term[0].toUpperCase();
    if (!index[firstLetter]) {
      index[firstLetter] = [];
    }
    index[firstLetter].push(term);
  });

  // Sort terms alphabetically within each letter
  Object.keys(index).forEach(letter => {
    index[letter].sort((a, b) =>
      a.term.localeCompare(b.term)
    );
  });

  return index;
}
