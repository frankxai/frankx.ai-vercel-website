import type { TOCItem } from '../types';

/** Bare roman or arabic numerals, optional trailing period. e.g. "I.", "XI", "3." */
const BARE_NUMERAL_HEADING = /^(?:[IVXLCDM]+|\d+)\.?$/i;

export function isBareNumeralHeading(text: string): boolean {
  return BARE_NUMERAL_HEADING.test(text.trim());
}

function isMetaHeading(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes('chapter') ||
    lower.includes('source') ||
    lower.includes('quotable') ||
    lower.includes('end chapter')
  );
}

export function headingSourceId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Readable TOC label for a bare numeral heading, e.g. "I." -> "Section I". */
export function labelBareNumeralHeading(text: string): string {
  return `Section ${text.trim().replace(/\.$/, '')}`;
}

/**
 * The markdown heading text that must stay in the chapter source (and in
 * the injected span). TOC display text may be a label; never retitle the book.
 */
export function tocHeadingSourceText(item: TOCItem): string {
  return item.sourceText ?? item.text;
}

/**
 * Build the golden-age chapter TOC from markdown headings (h1–h3).
 * Skips chapter/source/quotable/end-chapter titles.
 *
 * Bare numeral-only headings such as "## I." / "## XI." are skipped when the
 * chapter also has titled headings (chapter 1 keeps "II. The History You Carry"
 * and drops the empty I./XI. labels). If every remaining heading is a bare
 * numeral — as in chapters 2 and 3 — keep them with a "Section I" label so the
 * TOC is not empty. Jump ids stay derived from the original heading text.
 */
export function extractChapterToc(content: string): TOCItem[] {
  const collected: { level: number; sourceText: string }[] = [];
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const sourceText = match[2].trim();
    if (isMetaHeading(sourceText)) continue;
    collected.push({ level, sourceText });
  }

  const hasTitledHeading = collected.some(
    (item) => !isBareNumeralHeading(item.sourceText),
  );

  return collected
    .filter((item) => !(hasTitledHeading && isBareNumeralHeading(item.sourceText)))
    .map((item) => ({
      id: headingSourceId(item.sourceText),
      text: isBareNumeralHeading(item.sourceText)
        ? labelBareNumeralHeading(item.sourceText)
        : item.sourceText,
      level: item.level,
      sourceText: item.sourceText,
    }));
}
