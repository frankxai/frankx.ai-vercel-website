import { marked } from 'marked'
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

/**
 * Parse markdown with the chapter marked options, then sanitize.
 * setOptions is called on every invocation because marked options are global
 * and must not leak into the prompt policy (or vice versa).
 */
export function renderSanitizedChapterMarkdown(markdown: string): string {
  marked.setOptions({
    gfm: true,
    breaks: true,
  })
  const rawHtml = marked.parse(markdown)
  return sanitizeChapterHtml(rawHtml as string)
}

/**
 * Parse markdown with the prompt marked options, then sanitize.
 * setOptions is called on every invocation for the same reason as the chapter helper.
 * PromptCard historically set these options at module load; calling them here
 * preserves the same options at parse time.
 */
export function renderSanitizedPromptMarkdown(markdown: string): string {
  marked.setOptions({ gfm: true, breaks: false })
  const html = marked.parse(markdown, { async: false }) as string
  return sanitizePromptHtml(html)
}