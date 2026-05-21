/**
 * GitHub latest release helper.
 *
 * Used by /starlight-intelligence-system/ and /ana-intelligence-system/ pages
 * to fetch the latest release tag at build-time so the .zip download links
 * stay current automatically when Frank tags a new version.
 *
 * Mirrors the existing SIS pattern (hardcoded STARTER_ZIP constant) but
 * generalized so both pages share one fetcher.
 *
 * Usage in a Server Component:
 *
 *   const ais = await getLatestRelease('frankxai/Ana-Intelligence-System', {
 *     fallbackTag: 'v0.1.0',
 *   })
 *   // ais.tag      → 'v0.3.2'
 *   // ais.zipUrl   → 'https://github.com/.../archive/refs/tags/v0.3.2.zip'
 *   // ais.htmlUrl  → 'https://github.com/.../releases/tag/v0.3.2'
 */

export interface GithubRelease {
  /** The tag name, e.g. 'v0.3.2' */
  tag: string
  /** Direct zipball URL for one-click download */
  zipUrl: string
  /** GitHub HTML release page URL */
  htmlUrl: string
  /** True when fetched live; false when fallback tag was used */
  live: boolean
}

interface FetchOpts {
  /** Tag to use if the API call fails (no network at build time, repo doesn't exist yet, etc.) */
  fallbackTag: string
  /** Optional cache duration in seconds. Default 3600 (1h). */
  revalidate?: number
}

/**
 * Fetch the latest GitHub release tag and return zipball + html URLs.
 *
 * Defensive — never throws. If the API errors (rate limit, no network, repo
 * doesn't exist yet, no releases yet), returns the fallback tag with `live: false`
 * so build still succeeds and the page still renders a valid (even if stale) link.
 */
export async function getLatestRelease(
  repo: string,
  { fallbackTag, revalidate = 3600 }: FetchOpts,
): Promise<GithubRelease> {
  const fallback: GithubRelease = {
    tag: fallbackTag,
    zipUrl: `https://github.com/${repo}/archive/refs/tags/${fallbackTag}.zip`,
    htmlUrl: `https://github.com/${repo}/releases/tag/${fallbackTag}`,
    live: false,
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'frankx.ai-build',
      },
      next: { revalidate },
    })
    if (!res.ok) return fallback
    const data = (await res.json()) as { tag_name?: string; html_url?: string }
    if (!data.tag_name) return fallback
    return {
      tag: data.tag_name,
      zipUrl: `https://github.com/${repo}/archive/refs/tags/${data.tag_name}.zip`,
      htmlUrl: data.html_url ?? fallback.htmlUrl,
      live: true,
    }
  } catch {
    return fallback
  }
}
