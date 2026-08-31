/**
 * Glossary System
 *
 * Manages book glossaries for inline tooltips and reference pages.
 * Data is imported statically so serverless and client bundles both
 * receive the JSON — runtime `fs` lookups miss `data/glossaries` on Vercel.
 */

import hoffnung from '@/data/glossaries/hoffnung.json';
import spartanMindset from '@/data/glossaries/spartan-mindset.json';

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

type GlossaryFile = {
  bookSlug?: string;
  book?: string;
  title?: string;
  description?: string;
  terms?: GlossaryTerm[];
};

const GLOSSARY_FILES: Record<string, GlossaryFile> = {
  'spartan-mindset': spartanMindset,
  hoffnung,
};

function toGlossary(bookSlug: string, raw: GlossaryFile): BookGlossary {
  const terms = Array.isArray(raw.terms) ? raw.terms : [];
  return {
    bookSlug: raw.bookSlug || raw.book || bookSlug,
    title: raw.title || 'Glossary',
    description: raw.description || '',
    terms,
  };
}

const GLOSSARIES: Record<string, BookGlossary> = Object.fromEntries(
  Object.entries(GLOSSARY_FILES).map(([slug, raw]) => [slug, toGlossary(slug, raw)]),
);

/**
 * Get glossary for a specific book
 */
export function getBookGlossary(bookSlug: string): BookGlossary | null {
  return GLOSSARIES[bookSlug] ?? null;
}

/**
 * Get all available glossaries
 */
export function getAllGlossaries(): BookGlossary[] {
  return Object.values(GLOSSARIES);
}

export function findTerm(
  glossary: BookGlossary,
  query: string
): GlossaryTerm | null {
  const normalized = query.toLowerCase().trim();

  return glossary.terms.find(term => {
    // Check main term
    if (term.term.toLowerCase() === normalized) {
      return true;
    }
    return term.aliases?.some(alias => alias.toLowerCase() === normalized) ?? false;
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
