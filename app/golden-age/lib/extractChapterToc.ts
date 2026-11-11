import type { TOCItem } from '../types';

/** Bare roman or arabic numerals, optional trailing period. e.g. "I.", "XI", "3." */
const BARE_NUMERAL_HEADING = /^(?:[IVXLCDM]+|\d+)\.?$/i;

export function isBareNumeralHeading(text: string): boolean {
  return BARE_NUMERAL_HEADING.test(text.trim());
}

/**
 * Build the golden-age chapter TOC from markdown headings (h1–h3).
 * Skips chapter/source/quotable/end-chapter titles, and bare numeral-only
 * headings such as "## I." / "## XI." — those have no section title, and
 * their generated ids existed only so the TOC could jump to them.
 */
export function extractChapterToc(content: string): TOCItem[] {
  const items: TOCItem[] = [];
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const lower = text.toLowerCase();

    if (
      lower.includes('chapter') ||
      lower.includes('source') ||
      lower.includes('quotable') ||
      lower.includes('end chapter') ||
      isBareNumeralHeading(text)
    ) {
      continue;
    }

    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    items.push({ id, text, level });
  }

  return items;
}