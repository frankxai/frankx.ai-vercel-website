import 'server-only';
import { Marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import type { TOCItem } from '../types';

const allowedTags = [
  'p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre', 'span', 'hr',
  'img', 'figure', 'figcaption', 'picture', 'source',
  'table', 'thead', 'tbody', 'tr', 'td', 'th', 'caption',
  'div', 'section', 'aside', 'details', 'summary',
  'sup', 'sub', 'mark', 'del', 'ins', 'abbr', 'small',
];
const allowedAttributes = [
  'href', 'id', 'class', 'target', 'rel', 'src', 'alt', 'width', 'height',
  'loading', 'title', 'colspan', 'rowspan', 'scope', 'open', 'datetime', 'cite',
];

function separateFootnotes(content: string) {
  const definitions = new Map<string, string>();
  const lines = content.split(/\r?\n/);
  const body: string[] = [];
  let fence: { character: string; length: number } | undefined;
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const delimiter = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    if (fence) {
      body.push(line);
      if (delimiter && delimiter[1][0] === fence.character && delimiter[1].length >= fence.length && !delimiter[2].trim()) fence = undefined;
      continue;
    }
    if (delimiter) {
      fence = { character: delimiter[1][0], length: delimiter[1].length };
      body.push(line);
      continue;
    }
    const definition = /^ {0,3}\[\^([\w-]+)\]:\s*(.*)$/.exec(line);
    if (!definition || definitions.has(definition[1])) {
      body.push(line);
      continue;
    }
    const parts = [definition[2]];
    while (index + 1 < lines.length && /^(?: {4,}|\t)\S/.test(lines[index + 1])) parts.push(lines[++index].trim());
    definitions.set(definition[1], parts.join(' '));
  }
  return { body: body.join('\n'), definitions };
}

const normalizedTitle = (text: string) => text.normalize('NFKC').replace(/\s+/g, ' ').trim().toLocaleLowerCase('en-US');

/** Prepare the complete reading document on the server; client controls receive only safe HTML/anchors. */
export function renderChapter(content: string, chapterTitle: string): { html: string; tocItems: TOCItem[] } {
  const { body, definitions } = separateFootnotes(content);
  const references = new Map<string, { number: number; count: number }>();
  // Generated notes must not hijack an authored HTML anchor, including encoded IDs.
  const authoredIds = definitions.size ? [...DOMPurify.sanitize(content, {
    ALLOWED_TAGS: allowedTags, ALLOWED_ATTR: ['id'], RETURN_DOM_FRAGMENT: true,
  }).querySelectorAll('[id]')].map(element => element.id) : [];
  let notePrefix = 'fn';
  while (authoredIds.some(id => id.startsWith(`${notePrefix}-`) || id.startsWith(`${notePrefix}ref-`))) notePrefix = `book-${notePrefix}`;
  // A parser per document keeps footnote state out of concurrent chapter requests.
  const parser = new Marked({ gfm: true, breaks: true, async: false });
  parser.use({ extensions: [{
    name: 'bookFootnote', level: 'inline',
    start: (source) => source.indexOf('[^'),
    tokenizer(source) {
      const match = /^\[\^([\w-]+)\]/.exec(source);
      if (match && definitions.has(match[1])) return { type: 'bookFootnote', raw: match[0], key: match[1] };
    },
    renderer(token) {
      const key = token.key as string;
      const reference = references.get(key) ?? { number: references.size + 1, count: 0 };
      reference.count++;
      references.set(key, reference);
      const id = `${notePrefix}ref-${reference.number}${reference.count > 1 ? `-${reference.count}` : ''}`;
      return `<sup class="footnote-ref"><a href="#${notePrefix}-${reference.number}" id="${id}" aria-label="Footnote ${reference.number}">${reference.number}</a></sup>`;
    },
  }] });
  const rawHtml = parser.parse(body) as string;
  const fragment = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: allowedTags, ALLOWED_ATTR: allowedAttributes, RETURN_DOM_FRAGMENT: true,
  });
  const document = fragment.ownerDocument;

  // The route already presents the chapter title. Remove only a matching opening title.
  const opening = fragment.firstElementChild;
  if (opening?.tagName === 'H1' && normalizedTitle(opening.textContent ?? '') === normalizedTitle(chapterTitle)) opening.remove();
  for (const heading of fragment.querySelectorAll('h1')) {
    const replacement = document.createElement('h2');
    for (const attribute of heading.attributes) replacement.setAttribute(attribute.name, attribute.value);
    replacement.append(...Array.from(heading.childNodes));
    heading.replaceWith(replacement);
  }

  if (definitions.size) {
    // Retain unreferenced authored notes, after the notes in first-reference order.
    const ordered = [...references.keys(), ...[...definitions.keys()].filter(key => !references.has(key))];
    const inlineParser = new Marked({ gfm: true, breaks: true, async: false });
    const items = ordered.map((key, index) => {
      const number = index + 1;
      const note = inlineParser.parseInline(definitions.get(key) ?? '') as string;
      const back = references.has(key) ? ` <a href="#${notePrefix}ref-${number}" class="footnote-back" aria-label="Back to reference ${number}">↩</a>` : '';
      return `<li id="${notePrefix}-${number}" class="footnote-item">${note}${back}</li>`;
    }).join('\n');
    const container = document.createElement('div');
    container.innerHTML = `<section class="footnotes" aria-label="Footnotes"><h2 id="footnotes">Footnotes</h2><ol class="footnote-list">${items}</ol></section>`;
    const section = container.firstElementChild!;
    const oldHeading = [...fragment.querySelectorAll('h2')].find(heading => normalizedTitle(heading.textContent ?? '') === 'footnotes');
    if (oldHeading) oldHeading.replaceWith(section);
    else fragment.append(section);
  }

  // Preserve the first authored anchor, but disambiguate subsequent duplicates.
  const usedIds = new Set<string>();
  for (const element of fragment.querySelectorAll('[id]')) {
    const base = element.id;
    let suffix = 2;
    while (usedIds.has(element.id)) element.id = `${base}-${suffix++}`;
    usedIds.add(element.id);
  }
  for (const heading of fragment.querySelectorAll('h2,h3')) {
    if (!heading.id) {
      const base = (heading.textContent ?? '').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section';
      let id = base;
      let suffix = 2;
      while (usedIds.has(id)) id = `${base}-${suffix++}`;
      heading.id = id;
      usedIds.add(id);
    }
    heading.setAttribute('tabindex', '-1');
  }
  for (const link of fragment.querySelectorAll('a[target="_blank"]')) link.setAttribute('rel', 'noopener noreferrer');

  // Sanitize again after document transformations; never ship post-sanitizer mutations.
  const finalFragment = DOMPurify.sanitize(fragment, {
    ALLOWED_TAGS: allowedTags, ALLOWED_ATTR: [...allowedAttributes, 'tabindex'], RETURN_DOM_FRAGMENT: true,
  });
  const tocItems = [...finalFragment.querySelectorAll('h2[id],h3[id]')].map(heading => ({
    id: heading.id, text: heading.textContent?.trim() ?? '', level: Number(heading.tagName[1]),
  })).filter(item => item.text && !/chapter|source|end chapter/i.test(item.text) && !/^(prolog|epilog)/i.test(item.text));
  const wrapper = finalFragment.ownerDocument.createElement('div');
  wrapper.append(finalFragment);
  return { html: wrapper.innerHTML, tocItems };
}
