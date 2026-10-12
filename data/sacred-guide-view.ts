import type { BookQuote, BookReview } from '@/app/books/types';

/** Shape the guide page needs. Kept local so this file never imports sacred-depth.json. */
type SacredGuideDepth = {
  translation: { translator: string; year: number; notice?: string; rightsBasis: string };
  quotes: Array<{ text: string; locator: string; sourceUrl: string; why: string }>;
  sections: Array<{ number: number; title: string; keyIdea: string; summary: string }>;
  faq: Array<{ q: string; a: string }>;
};

export function isCompletionFillerFaq(faq: BookReview['faq']): boolean {
  const first = faq?.[0]?.q ?? '';
  return !faq?.length || first.startsWith('Where does a first reading of ');
}

export function sacredPassages(depth: SacredGuideDepth): BookQuote[] {
  if (depth.translation.rightsBasis === 'locator-only' || depth.quotes.length === 0) return [];
  const label = [`${depth.translation.translator}, ${depth.translation.year}`, depth.translation.notice].filter(Boolean).join(' · ');
  return depth.quotes.map((quote) => ({
    text: quote.text,
    chapter: quote.locator,
    context: quote.why,
    source: { label, url: quote.sourceUrl },
  }));
}

/**
 * Guide-page overlay only. Existing quotations, including the Tao Te Ching field note, stay.
 * Depth FAQ replaces the completion filler and leaves a real field-note FAQ in place.
 * Callers must not write the result back onto the shared bookReviews array.
 */
export function withSacredDepth(review: BookReview, depth: SacredGuideDepth | undefined): BookReview {
  if (!depth) return review;
  return {
    ...review,
    quotes: review.quotes?.length ? review.quotes : sacredPassages(depth),
    chapters: review.chapters?.length ? review.chapters : depth.sections,
    faq: isCompletionFillerFaq(review.faq) ? depth.faq : review.faq,
  };
}
