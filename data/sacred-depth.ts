import entries from './sacred-depth.json';

/**
 * Depth layer for primary sacred-text guides.
 *
 * Quotations come from named translations and carry the page they were checked
 * against. `rightsBasis` states why the wording may appear here: a public-domain
 * translation, a short attributed quotation, or no wording at all (locator-only).
 * Sections, FAQ, practice, and `why` notes are original FrankX editorial prose.
 */
export type SacredDepth = {
  slug: string;
  translation: {
    translator: string;
    title: string;
    year: number;
    sourceUrl: string;
    rightsBasis: 'public-domain' | 'quotation' | 'locator-only';
    rightsNote: string;
  };
  quotes: Array<{ text: string; locator: string; sourceUrl: string; why: string }>;
  sections: Array<{ number: number; title: string; keyIdea: string; summary: string }>;
  faq: Array<{ q: string; a: string }>;
  practice: { title: string; duration: string; instruction: string };
  facts: { origin: string; language: string; form: string; firstRead: string };
};

export const sacredDepth: Record<string, SacredDepth> = Object.fromEntries(
  (entries as SacredDepth[]).map(entry => [entry.slug, entry]),
);
