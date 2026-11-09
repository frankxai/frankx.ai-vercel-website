// Pure validator with type-only imports, so node --experimental-strip-types can
// load it in scripts/tests/owned-canon-contract.test.mjs. Data: data/syndication-manifest.json.
import type {
  SyndicationChannel,
  SyndicationCut,
  SyndicationManifest,
  SyndicationStatus,
} from '@/types/syndication'

const SITE_URL = 'https://www.frankx.ai'

export const SYNDICATION_CHANNELS: readonly SyndicationChannel[] = [
  'linkedin-article',
  'linkedin-post',
  'x-thread',
  'substack',
  'medium',
  'dev-to',
  'hashnode',
  'newsletter',
  'youtube-community',
]
export const SYNDICATION_CUTS: readonly SyndicationCut[] = ['full', 'excerpt', 'summary', 'thread']
export const SYNDICATION_STATUSES: readonly SyndicationStatus[] = [
  'draft',
  'scheduled',
  'published',
  'withdrawn',
]

/**
 * Returns a list of problems; an empty list means the manifest is valid.
 * `knownPosts`, when given, maps each blog slug to the post's resolved canonical
 * URL (its frontmatter `canonical`, else /blog/<slug>). Every referenced slug
 * must be in it and `canonicalUrl` must equal that post's canonical. Without
 * the map, `canonicalUrl` must be exactly https://www.frankx.ai/blog/<slug>.
 */
export function validateSyndicationManifest(
  manifest: SyndicationManifest,
  knownPosts?: ReadonlyMap<string, string>,
): string[] {
  const errors: string[] = []
  if (manifest.version !== 1) errors.push(`unsupported version ${String(manifest.version)}`)
  if (!Array.isArray(manifest.entries)) return [...errors, 'entries must be an array']

  const seenSlugs = new Set<string>()
  for (const entry of manifest.entries) {
    const at = `entry ${entry.slug || '(no slug)'}`
    if (!entry.slug) errors.push(`${at}: slug is required`)
    if (seenSlugs.has(entry.slug)) errors.push(`${at}: duplicate slug`)
    seenSlugs.add(entry.slug)
    if (knownPosts && entry.slug && !knownPosts.has(entry.slug)) {
      errors.push(`${at}: no blog post with this slug`)
    } else if (entry.slug) {
      const expected = knownPosts?.get(entry.slug) ?? `${SITE_URL}/blog/${entry.slug}`
      if (entry.canonicalUrl !== expected) {
        errors.push(`${at}: canonicalUrl must be the post's canonical ${expected}`)
      }
    }

    const seenChannels = new Set<string>()
    for (const copy of entry.channels ?? []) {
      const where = `${at} / ${copy.channel}`
      if (!SYNDICATION_CHANNELS.includes(copy.channel)) errors.push(`${where}: unknown channel`)
      if (seenChannels.has(copy.channel)) errors.push(`${where}: duplicate channel`)
      seenChannels.add(copy.channel)
      if (!SYNDICATION_CUTS.includes(copy.cut)) errors.push(`${where}: unknown cut ${String(copy.cut)}`)
      if (!SYNDICATION_STATUSES.includes(copy.status)) {
        errors.push(`${where}: unknown status ${String(copy.status)}`)
      }
      if (copy.status === 'published' && (!copy.url || !copy.publishedAt)) {
        errors.push(`${where}: published copies need url and publishedAt`)
      }
    }
  }
  return errors
}
