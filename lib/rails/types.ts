/**
 * Reality Intelligence System — core types
 *
 * Portable: NO FrankX-specific imports. This module is the extraction surface
 * for the future open-source `reality-intelligence-system` repo (sibling to
 * Library OS and Starlight Intelligence System). Keep it framework-agnostic.
 *
 * The four-hub architecture: a contemplative-rails substrate where every entry
 * has one canonical hub and 1-3 cross-tagged hubs, citing canonical thinkers
 * stored in a shared `/canon/` library.
 */

export type HubSlug = 'god' | 'reality' | 'consciousness' | 'faith';

export const HUB_ORDER: readonly HubSlug[] = ['god', 'reality', 'consciousness', 'faith'] as const;

/**
 * URL prefix is `/on-` to signal essay register over destination ("notes on
 * God" not "the God section"). Internal hub key stays unprefixed for code
 * brevity. Map via `hubUrl(slug)`.
 */
export const URL_PREFIX = '/on-' as const;

export function hubUrl(slug: HubSlug): string {
  return `${URL_PREFIX}${slug}`;
}

export type TraditionSlug =
  | 'christian-mysticism'
  | 'advaita-vedanta'
  | 'sufism'
  | 'kabbalah'
  | 'mahayana-buddhism'
  | 'zen'
  | 'dzogchen'
  | 'neville-goddard'
  | 'modern-physics'
  | 'consciousness-science'
  | 'analytic-idealism'
  | 'process-philosophy'
  | 'comparative-religion'
  | 'desert-fathers'
  | 'hesychasm'
  | 'apophatic-theology'
  | 'volga-german-faith';

export interface RailQuote {
  /** ≤15 words per voice rule. Direct quotation, exact wording. */
  text: string;
  /** Source label, e.g. "Sermon 48", "I Am That, ch. 3". */
  source: string;
  /** Canon slug for attribution (must exist in /canon/[slug]). */
  attribution: string;
  page?: number;
  edition?: string;
  /** Was this quote verified against the primary source by Frank? */
  verified?: boolean;
}

export interface RailFaq {
  q: string;
  a: string;
}

/**
 * RailEntry frontmatter — every .md file in content/rails/{hub}/ must validate
 * to this shape. Validation enforced by scripts/rails/validate-frontmatter.mjs.
 */
export interface RailEntryFrontmatter {
  title: string;
  slug: string;
  hub: HubSlug;
  /** Hubs this entry should appear in beyond its canonical home. */
  crossTags: HubSlug[];
  /** First-80-words AEO answer block. Renders as drop-cap lead paragraph. */
  thesisSentence: string;
  dateWritten: string;
  datePublished: string;
  /** Semver. Drives "v1.0 written DATE" footer. */
  version: string;
  status: 'draft' | 'live' | 'paused';
  traditions: TraditionSlug[];
  /** 3-7 free-form theme tags for filtering. */
  themes: string[];
  /** Canon slugs cited in body. Must all exist in content/canon/. */
  canonCited: string[];
  quotes?: RailQuote[];
  faq?: RailFaq[];
  description: string;
  keywords: string[];
  /** Mandatory single-line AI-partner statement, rendered in entry footer. */
  aiInvolvement: string;
  readingTime?: string;
}

export interface RailEntry extends RailEntryFrontmatter {
  /** Markdown body, post-frontmatter. */
  body: string;
  /** Pre-rendered HTML, computed at load time. */
  bodyHtml?: string;
  filePath: string;
}

export interface HubConfig {
  slug: HubSlug;
  /** The head question this hub asks ("What is God?"). */
  question: string;
  /** Display title for SEO + page H1 ("Notes on God"). */
  displayTitle: string;
  /** 200-300 word manifesto rendered on the hub index. */
  manifesto: string;
  /** SEO target queries from the original handoff §2. */
  keywordSpine: string[];
  /** FrankX color spectrum: tech (emerald/cyan), soul (amber), bridge (violet). */
  spectrum: 'tech' | 'soul' | 'bridge';
}

export interface CanonWork {
  title: string;
  year?: number;
  edition?: string;
  publisher?: string;
  url?: string;
}

export interface CanonExternalLink {
  label: string;
  url: string;
  kind: 'wikipedia' | 'archive' | 'official' | 'paper' | 'video' | 'other';
}

export interface CanonPageFrontmatter {
  slug: string;
  name: string;
  born?: string;
  died?: string;
  tradition: TraditionSlug;
  /** 3-5 single-sentence claims, the "what they actually said" core. */
  centralClaims: string[];
  keyWorks: CanonWork[];
  externalLinks: CanonExternalLink[];
  /** Optional /library/[slug] book review by Frank. */
  relatedLibraryBook?: string;
}

export interface CanonPage extends CanonPageFrontmatter {
  /** 400-600 word biographical-and-claims body in markdown. */
  body: string;
  bodyHtml?: string;
  /** Auto-computed: rail entries that cite this canon. */
  citedIn?: Array<{ hub: HubSlug; slug: string; title: string }>;
  filePath: string;
}

/**
 * Cross-tag decision matrix from the original handoff §1 — encodes which
 * "center of gravity" maps to which canonical hub.
 */
export interface CrossTagRule {
  centerOfGravity: string;
  canonicalHub: HubSlug;
  example: string;
}
