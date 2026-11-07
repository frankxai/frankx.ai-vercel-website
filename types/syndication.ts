/**
 * Syndication manifest — one entry per (post, channel) copy published off-site.
 *
 * frankx.ai is the canonical home of every post. A syndicated copy is a cut of
 * that post on another channel; it should link back to `canonicalUrl` (and set
 * the channel's own canonical field where the channel supports one).
 *
 * Data lives in data/syndication-manifest.json. Validation: lib/syndication.ts.
 */

/** Off-site channels a post can be syndicated to. */
export type SyndicationChannel =
  | 'linkedin-article'
  | 'linkedin-post'
  | 'x-thread'
  | 'substack'
  | 'medium'
  | 'dev-to'
  | 'hashnode'
  | 'newsletter'
  | 'youtube-community'

/**
 * How much of the post the channel copy carries.
 * - full: the whole post, with a canonical link back
 * - excerpt: the opening section, then a link back
 * - summary: a rewritten short version, then a link back
 * - thread: the argument split into short posts, link back in the last one
 */
export type SyndicationCut = 'full' | 'excerpt' | 'summary' | 'thread'

/**
 * Lifecycle of one channel copy.
 * Only `draft` is set by agents; `scheduled` and `published` record a human
 * action and must carry the channel URL once it exists.
 */
export type SyndicationStatus = 'draft' | 'scheduled' | 'published' | 'withdrawn'

export interface SyndicationChannelEntry {
  channel: SyndicationChannel
  cut: SyndicationCut
  status: SyndicationStatus
  /** URL of the copy on the channel. Required once status is `published`. */
  url?: string
  /** ISO date (YYYY-MM-DD) the copy went live. Required once status is `published`. */
  publishedAt?: string
  notes?: string
}

export interface SyndicationEntry {
  /** Blog slug under /blog/<slug>. */
  slug: string
  /** Must be https://www.frankx.ai/blog/<slug> (or the post's own canonical override). */
  canonicalUrl: string
  channels: SyndicationChannelEntry[]
}

export interface SyndicationManifest {
  version: 1
  entries: SyndicationEntry[]
}
