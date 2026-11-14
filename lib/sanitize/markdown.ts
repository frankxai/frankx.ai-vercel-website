import { Marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

/**
 * Chapter policy used by ChapterReader and PremiumReader.
 * Named and kept distinct from the prompt policy rather than unified.
 */
export const chapterSanitizeConfig = {
  ALLOWED_TAGS: [
    'p',
    'br',
    'strong',
    'em',
    'a',
    'ul',
    'ol',
    'li',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'code',
    'pre',
    'span',
    'hr',
  ],
  ALLOWED_ATTR: ['href', 'id', 'class', 'target', 'rel'],
}

/**
 * Prompt policy used by PromptCard.
 * ALLOWED_ATTR is empty so hrefs are stripped; h1–h4 are intentionally omitted.
 */
export const promptSanitizeConfig = {
  ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'br', 'hr'],
  ALLOWED_ATTR: [] as string[],
}

export function sanitizeChapterHtml(html: string): string {
  return DOMPurify.sanitize(html, chapterSanitizeConfig)
}

export function sanitizePromptHtml(html: string): string {
  return DOMPurify.sanitize(html, promptSanitizeConfig)
}

/*
 * Main's effective marked options at 3b9352ea (including global setOptions
 * side effects and import order):
 *
 * The site used the default marked singleton. PromptCard called
 * marked.setOptions({ gfm: true, breaks: false }) once at module evaluation
 * and then marked.parse(body, { async: false }) on each render, without
 * resetting options. ChapterReader and PremiumReader called
 * marked.setOptions({ gfm: true, breaks: true }) on every render, then
 * marked.parse(processedContent) with no async flag.
 *
 * Because those chapter renders mutate the same singleton:
 * - A chapter render's effective options were always { gfm: true, breaks: true },
 *   regardless of whether PromptCard had already been imported.
 * - A PromptCard render's effective options were { gfm: true, breaks: false }
 *   after its own module init, and stayed that way until a chapter renderer
 *   ran in the same cached client graph. After a chapter render (typical
 *   client navigation: workshop → chapter → back to workshop, PromptCard
 *   module already evaluated), a later PromptCard render inherited
 *   breaks: true. Soft linebreaks such as "alpha\nbeta" then became
 *   <p>alpha<br>beta</p> instead of <p>alpha\nbeta</p>.
 *
 * These helpers use a scoped `new Marked(...)` instance per policy and never
 * call the global marked.setOptions or marked.use. Chapter output matches
 * main at every chapter render. Prompt output matches main's intended
 * PromptCard configuration (module-init options), not the leaked
 * post-chapter state. That leak is a deliberate isolation fix, not preserved.
 */
const chapterParser = new Marked({
  gfm: true,
  breaks: true,
})

const promptParser = new Marked({
  gfm: true,
  breaks: false,
})

/** Parse markdown with the chapter marked options, then sanitize. */
export function renderSanitizedChapterMarkdown(markdown: string): string {
  const rawHtml = chapterParser.parse(markdown)
  return sanitizeChapterHtml(rawHtml as string)
}

/** Parse markdown with the prompt marked options, then sanitize. */
export function renderSanitizedPromptMarkdown(markdown: string): string {
  const html = promptParser.parse(markdown, { async: false }) as string
  return sanitizePromptHtml(html)
}