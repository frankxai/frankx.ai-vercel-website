import 'server-only';
import { Marked } from 'marked';
// The sanitizer runs on a hast tree (parse5, the WHATWG HTML parser) with no DOM emulation.
// The previous isomorphic-dompurify sanitizer loaded jsdom on the server; jsdom's
// html-encoding-sniffer require()s the ESM-only @exodus/bytes, so on Vercel every chapter
// rendered at request time failed with ERR_REQUIRE_ESM (#919, reverted by #934).
// Do not reintroduce a jsdom-backed sanitizer here: scripts/tests/book-reader.test.mjs walks
// this route's import graph, and scripts/tests/book-chapter-rendered.test.mjs checks the built
// route's file trace, so either one fails if jsdom comes back.
import { fromHtml } from 'hast-util-from-html';
import { sanitize, type Schema } from 'hast-util-sanitize';
import { toHtml } from 'hast-util-to-html';
import { toString as textOf } from 'hast-util-to-string';
import type { Element, Root } from 'hast';
import type { TOCItem } from '../types';

const allowedTags = [
  'p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre', 'span', 'hr',
  'img', 'figure', 'figcaption', 'picture', 'source',
  'table', 'thead', 'tbody', 'tr', 'td', 'th', 'caption',
  'div', 'section', 'aside', 'details', 'summary',
  'sup', 'sub', 'mark', 'del', 'ins', 'abbr', 'small',
];
// hast property names (className, colSpan, ariaLabel, ...) for the same attribute allowlist.
const allowedProperties = [
  'href', 'id', 'className', 'target', 'rel', 'src', 'alt', 'width', 'height',
  'loading', 'title', 'colSpan', 'rowSpan', 'scope', 'open', 'dateTime', 'cite',
  // DOMPurify allowed ARIA and data attributes by default; footnote links rely on aria-label.
  'ariaLabel', 'ariaLabelledBy', 'ariaDescribedBy', 'ariaHidden', 'ariaCurrent', 'ariaExpanded', 'ariaControls',
  'data*',
];
// Disallowed elements are unwrapped (their text stays), except these, which go with their content.
const strippedTags = [
  'script', 'style', 'textarea', 'option', 'select', 'noscript', 'template', 'title',
  'iframe', 'object', 'embed', 'svg', 'math',
];

// Element IDs that would shadow document or form properties (DOM clobbering).
// DOMPurify removed these as `value in document || value in formElement`; with no
// DOM on the server, keep an explicit list of the names a chapter heading can produce.
const clobberingIds = new Set([
  ...Object.getOwnPropertyNames(Object.prototype),
  'action', 'activeElement', 'all', 'anchors', 'append', 'applets', 'attributes', 'autocomplete',
  'baseURI', 'blur', 'body', 'characterSet', 'charset', 'childElementCount', 'childNodes', 'children',
  'click', 'close', 'compatMode', 'contains', 'contentType', 'cookie', 'currentScript', 'dataset',
  'defaultView', 'designMode', 'dir', 'doctype', 'document', 'documentElement', 'documentURI', 'domain',
  'elements', 'embeds', 'encoding', 'enctype', 'firstChild', 'focus', 'fonts', 'forms', 'fullscreen',
  'head', 'hidden', 'id', 'images', 'implementation', 'innerHTML', 'inputEncoding', 'lang', 'lastChild',
  'lastModified', 'length', 'links', 'location', 'method', 'name', 'nodeName', 'nodeType', 'nodeValue',
  'normalize', 'open', 'ownerDocument', 'parentElement', 'parentNode', 'plugins', 'prepend', 'readyState',
  'referrer', 'rel', 'remove', 'reset', 'scripts', 'scrollingElement', 'style', 'styleSheets', 'submit',
  'target', 'textContent', 'timeline', 'title', 'translate', 'URL', 'visibilityState', 'write', 'writeln',
]);
const isSafeId = (id: string) => id.length > 0 && !clobberingIds.has(id);

const schema = (properties: string[]): Schema => ({
  tagNames: allowedTags,
  attributes: { '*': properties },
  // Relative URLs and fragments stay allowed; javascript:, data:, vbscript: and every other scheme are removed.
  protocols: { href: ['http', 'https', 'mailto', 'tel'], src: ['http', 'https'], cite: ['http', 'https'] },
  strip: strippedTags,
  // Authored and generated anchors are the contents targets, so IDs are not prefixed;
  // clobbering IDs are removed instead (see isSafeId).
  clobber: [],
  clobberPrefix: '',
  ancestors: {},
  required: {},
  allowComments: false,
  allowDoctypes: false,
});

type Parent = Root | Element;
/** Visit every element in document order, with its parent. */
function walk(parent: Parent, visit: (element: Element, parent: Parent) => void) {
  for (const child of parent.children) {
    if (child.type !== 'element') continue;
    visit(child, parent);
    walk(child, visit);
  }
}
function elements(root: Parent, test: (element: Element) => boolean) {
  const found: Element[] = [];
  walk(root, element => { if (test(element)) found.push(element); });
  return found;
}
const idOf = (element: Element) => (typeof element.properties.id === 'string' ? element.properties.id : '');
const isHeading = (element: Element) => element.tagName === 'h2' || element.tagName === 'h3';

/** Parse an HTML fragment and return it sanitized; DOM-clobbering IDs never reach the output. */
function safeFragment(html: string, properties: string[]): Root {
  return sanitizeTree(fromHtml(html, { fragment: true }), properties);
}
function sanitizeTree(tree: Root, properties: string[]): Root {
  const clean = sanitize(tree, schema(properties)) as Root;
  // Removal only: this cannot introduce unsafe markup after sanitization.
  walk(clean, element => { if ('id' in element.properties && !isSafeId(idOf(element))) delete element.properties.id; });
  return clean;
}

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
  const authoredIds = definitions.size ? elements(safeFragment(content, ['id']), element => Boolean(idOf(element))).map(idOf) : [];
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
  const document = safeFragment(rawHtml, allowedProperties);

  // The route already presents the chapter title. Remove only a matching opening title.
  const opening = document.children.find((child): child is Element => child.type === 'element');
  if (opening?.tagName === 'h1' && normalizedTitle(textOf(opening)) === normalizedTitle(chapterTitle)) {
    document.children.splice(document.children.indexOf(opening), 1);
  }
  for (const heading of elements(document, element => element.tagName === 'h1')) heading.tagName = 'h2';

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
    // Authored note HTML is sanitized here, and the whole document again after every transformation.
    const notes = safeFragment(`<section class="footnotes" aria-label="Footnotes"><h2 id="footnotes">Footnotes</h2><ol class="footnote-list">${items}</ol></section>`, allowedProperties);
    const section = notes.children.find((child): child is Element => child.type === 'element');
    if (section) {
      let replaced = false;
      walk(document, (element, parent) => {
        if (replaced || element.tagName !== 'h2' || normalizedTitle(textOf(element)) !== 'footnotes') return;
        parent.children.splice(parent.children.indexOf(element), 1, section);
        replaced = true;
      });
      if (!replaced) document.children.push(section);
    }
  }

  // Preserve the first authored anchor, but disambiguate subsequent duplicates.
  const usedIds = new Set<string>();
  for (const element of elements(document, candidate => Boolean(idOf(candidate)))) {
    const base = idOf(element);
    let id = base;
    let suffix = 2;
    while (usedIds.has(id)) id = `${base}-${suffix++}`;
    element.properties.id = id;
    usedIds.add(id);
  }
  for (const heading of elements(document, isHeading)) {
    if (!idOf(heading)) {
      const base = textOf(heading).normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section';
      let id = base;
      let suffix = 2;
      while (usedIds.has(id) || !isSafeId(id)) id = `${base}-${suffix++}`;
      heading.properties.id = id;
      usedIds.add(id);
    }
    heading.properties.tabIndex = -1;
  }
  for (const link of elements(document, element => element.tagName === 'a' && element.properties.target === '_blank')) {
    link.properties.rel = ['noopener', 'noreferrer'];
  }

  // Sanitize again after document transformations; never ship post-sanitizer mutations.
  const finalTree = sanitizeTree(document, [...allowedProperties, 'tabIndex']);
  const tocItems = elements(finalTree, element => isHeading(element) && Boolean(idOf(element))).map(heading => ({
    id: idOf(heading), text: textOf(heading).trim(), level: Number(heading.tagName[1]),
  })).filter(item => item.text && !/chapter|source|end chapter/i.test(item.text) && !/^(prolog|epilog)/i.test(item.text));
  return { html: toHtml(finalTree), tocItems };
}
