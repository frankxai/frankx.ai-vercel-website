/**
 * Canonical permanent redirects for legacy blog slugs.
 *
 * Redirect sources remain valid compatibility URLs, but they are not articles:
 * they must not appear in the blog index, route index, or sitemap.
 */
export const BLOG_REDIRECTS = Object.freeze([
  {
    source: '/blog/big-props-to-the-builders-of-this-era',
    destination: '/blog/props-to-the-builders-of-this-era',
    permanent: true,
  },
  {
    source: '/blog/01-ai-doesnt-have-to-be-soulless',
    destination: '/blog/ai-doesnt-have-to-be-soulless',
    permanent: true,
  },
  {
    source: '/blog/02-the-soul-frequency-framework',
    destination: '/blog/soul-frequency-framework',
    permanent: true,
  },
  {
    source: '/blog/03-ai-guide-for-families-and-professionals',
    destination: '/blog/ai-guide-for-families-and-professionals',
    permanent: true,
  },
  {
    source: '/blog/04-conscious-ai-for-entrepreneurs',
    destination: '/blog/conscious-ai-for-entrepreneurs',
    permanent: true,
  },
  {
    source: '/blog/05-music-as-consciousness-technology',
    destination: '/blog/music-as-consciousness-technology',
    permanent: true,
  },
  {
    source: '/blog/06-intelligence-revolution-2025',
    destination: '/blog/intelligence-revolution-2025',
    permanent: true,
  },
  {
    source: '/blog/07-agentic-creator-os',
    destination: '/blog/agentic-creator-os',
    permanent: true,
  },
  {
    source: '/blog/08-golden-age-of-intelligence',
    destination: '/blog/golden-age-of-intelligence',
    permanent: true,
  },
  {
    source: '/blog/09-reader-first-golden-age',
    destination: '/blog/reader-first-golden-age',
    permanent: true,
  },
  {
    source: '/blog/10-agentic-ai-roadmap-2025',
    destination: '/blog/agentic-ai-roadmap-2025',
    permanent: true,
  },
])

const BLOG_REDIRECT_SOURCE_SLUGS = new Set(
  BLOG_REDIRECTS.map(({ source }) => source.slice('/blog/'.length)),
)

export function isCanonicalBlogSlug(slug) {
  return !BLOG_REDIRECT_SOURCE_SLUGS.has(slug)
}

export function isCanonicalBlogHref(href) {
  return !href.startsWith('/blog/') || isCanonicalBlogSlug(href.slice('/blog/'.length))
}
