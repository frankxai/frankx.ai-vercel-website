// Upstream URL builder for the frankx.ai/docs proxy.
//
// frankx.ai serves one brand. Every upstream URL must stay on DOCS_ORIGIN and
// under a frankx-prefixed path (or the frankx-scoped search API). Dot segments
// are rejected before the URL parser can normalize `/frankx/../../akamoto`
// into `/akamoto`. The resolved URL is checked again so a redirect or an
// unencoded join cannot leave that prefix.

export const DOCS_ORIGIN = "https://docs-platform-nine.vercel.app";

export class DocsUpstreamRejected extends Error {
  constructor() {
    super("Docs path is outside the frankx prefix.");
    this.name = "DocsUpstreamRejected";
  }
}

function encodeSegments(segments: string[]): string {
  return segments.map(encodeURIComponent).join("/");
}

function pageSlug(slug: string[] | undefined): string[] {
  // accept the platform's own brand-prefixed form (/docs/frankx/intro)
  // instead of double-prefixing it
  if (slug && slug.length > 0 && slug[0] === "frankx") return slug.slice(1);
  return slug ?? [];
}

function isUnsafeSegment(segment: string): boolean {
  if (segment.length === 0 || segment === "." || segment === "..") return true;
  if (/[\\/\0#?]/.test(segment)) return true;
  let decoded: string;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    return true;
  }
  if (decoded === "." || decoded === "..") return true;
  if (/[\\/\0#?]/.test(decoded)) return true;
  return false;
}

function assertSafeSlug(slug: string[] | undefined): void {
  if (!slug) return;
  for (const segment of slug) {
    if (isUnsafeSegment(segment)) throw new DocsUpstreamRejected();
  }
}

function isFrankxDocsPath(pathname: string): boolean {
  if (pathname.includes("\\") || pathname.includes("\0")) return false;
  if (pathname === "/frankx" || pathname.startsWith("/frankx/")) return true;
  if (pathname === "/llms.mdx/frankx" || pathname.startsWith("/llms.mdx/frankx/")) return true;
  if (pathname === "/llms-full.mdx/frankx" || pathname.startsWith("/llms-full.mdx/frankx/")) {
    return true;
  }
  if (pathname === "/llms-index/frankx") return true;
  if (pathname === "/og/frankx" || pathname.startsWith("/og/frankx/")) return true;
  return false;
}

/** True when the resolved URL is the docs-platform origin and a frankx path. */
export function isAllowedDocsUpstream(url: URL): boolean {
  if (url.origin !== DOCS_ORIGIN || url.username || url.password) return false;
  if (url.protocol !== "https:") return false;
  const pathname = url.pathname;
  if (pathname === "/api/search" || pathname === "/api/search/") return true;
  return isFrankxDocsPath(pathname);
}

/** Reject off-prefix URLs. Search results are always pinned to brand=frankx. */
export function lockDocsUpstream(url: URL): URL {
  if (!isAllowedDocsUpstream(url)) throw new DocsUpstreamRejected();
  if (url.pathname === "/api/search" || url.pathname === "/api/search/") {
    url.searchParams.set("brand", "frankx");
  }
  return url;
}

export function buildDocsUpstreamUrl(
  slug: string[] | undefined,
  searchParams: URLSearchParams,
): URL {
  assertSafeSlug(slug);

  let path: string;
  if (!slug || slug.length === 0) {
    path = "/frankx/intro";
  } else if (slug[0] === "api" && slug[1] === "search") {
    // search API: brand rides as an explicit query param below; extra
    // segments are ignored, the query carries the request
    path = "/api/search";
  } else if (
    slug.length >= 2 &&
    (slug[0] === "llms.mdx" || slug[0] === "llms-full.mdx" || slug[0] === "og")
  ) {
    // Platform-owned feed/og paths pass through with the brand segment
    // FORCED to frankx — frankx.ai serves exactly one brand, matching the
    // search and bare-feed branches. A foreign brand in the URL
    // (/docs/llms.mdx/akamoto/..., /docs/og/gencreator/...) must never
    // publish another brand's content or metadata under frankx.ai.
    path = `/${slug[0]}/frankx${slug.length > 2 ? `/${encodeSegments(slug.slice(2))}` : ""}`;
  } else if (slug.length === 2 && slug[0] === "llms-index") {
    path = "/llms-index/frankx";
  } else if (slug.length === 1 && slug[0] === "llms.txt") {
    path = "/llms-index/frankx";
  } else if (slug.length === 1 && slug[0] === "llms-full.txt") {
    path = "/llms-full.mdx/frankx";
  } else {
    const body = pageSlug(slug);
    if (body.length === 0) {
      path = "/frankx/intro";
    } else if (body[body.length - 1].endsWith(".md")) {
      // .md suffix negotiation: the platform exposes page markdown only under
      // /llms.mdx/<brand>/.../content.md. Segments are encoded so a raw join
      // cannot inject `/`, `?`, or `#` into the upstream path.
      const page = body
        .map((segment) => segment.replace(/\.md$/, ""))
        .map(encodeURIComponent)
        .join("/");
      path = `/llms.mdx/frankx/${page}/content.md`;
    } else {
      path = `/frankx/${encodeSegments(body)}`;
    }
  }

  const upstream = new URL(path, DOCS_ORIGIN);
  searchParams.forEach((value, key) => {
    upstream.searchParams.set(key, value);
  });
  return lockDocsUpstream(upstream);
}

export function markdownNegotiatedDocsUrl(slug: string[] | undefined): URL {
  assertSafeSlug(slug);
  let body = pageSlug(slug);
  if (body.length === 0) body = ["intro"];
  return lockDocsUpstream(
    new URL(`/llms.mdx/frankx/${encodeSegments(body)}/content.md`, DOCS_ORIGIN),
  );
}

/** Resolve one upstream redirect and refuse any target outside the frankx prefix. */
export function nextAllowedDocsUrl(current: URL, location: string): URL {
  return lockDocsUpstream(new URL(location, current));
}
