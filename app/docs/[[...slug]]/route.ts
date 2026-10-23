import { NextRequest, NextResponse } from "next/server";

// Docs proxy — serves the frankx docs under frankx.ai/docs.
//
// Upstream is the docs-platform deployment ("frankx/" path prefix selects the
// frankx brand on it). When docs.frankx.ai goes live (IONOS CNAME) it will
// serve the same pages at the root with no changes here or upstream.
//
// This handler mirrors the platform's brand-host middleware semantics
// (proxy.ts) for the frankx brand: bare /  -> /frankx/intro, llms.txt ->
// /llms-index/frankx, llms-full.txt -> /llms-full.mdx/frankx, .md suffix and
// Accept: text/markdown negotiation -> /llms.mdx/.../content.md, and the
// platform's own brand-prefixed paths (/docs/frankx/...) pass through without
// being prefixed twice.
//
// Rewrites cover three root-relative reference classes found in the upstream
// HTML and flight payloads:
//   1. /_next/... build assets        -> absolute docs-platform URLs
//   2. "/frankx/..." internal links   -> "/docs/..."
//   3. "/llms.mdx/frankx/..." and "/llms-index/frankx" feed links -> absolute
//
// Replacements match references immediately preceded by a quote (optionally
// JSON-escaped). That excludes absolute URLs (https://.../_next/...) and
// composite paths like /og/frankx/... (preceded by a letter or slash, not a
// quote), so canonical, og:image and feed URLs pass through untouched.
//
// RSC navigation: router headers are forwarded upstream so prefetch and
// client-side navigation requests return flight data (rewritten with the same
// rules). If a rewritten payload ever fails to parse on the client, the
// Next.js router falls back to a full-page navigation to the /docs path,
// which round-trips through this proxy — degraded to a reload, never broken.
//
// Note: the docs-platform has no in-page search UI — search is API-only — so
// only the docs API surface is exposed here.

const DOCS_ORIGIN = "https://docs-platform-nine.vercel.app";

const UPSTREAM_REQUEST_HEADERS = [
  "accept",
  "rsc",
  "next-router-prefetch",
  "next-router-state-tree",
  "next-url",
] as const;

const UPSTREAM_TIMEOUT_MS = 20_000;

type RouteContext = { params: Promise<{ slug?: string[] }> };

function encodeSegments(segments: string[]): string {
  return segments.map(encodeURIComponent).join("/");
}

function pageSlug(slug: string[] | undefined): string[] {
  // accept the platform's own brand-prefixed form (/docs/frankx/intro)
  // instead of double-prefixing it
  if (slug && slug.length > 0 && slug[0] === "frankx") return slug.slice(1);
  return slug ?? [];
}

function buildUpstreamUrl(slug: string[] | undefined, request: NextRequest): URL {
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
    // platform-owned feed/og paths pass through as-is
    path = `/${encodeSegments(slug)}`;
  } else if (slug.length === 2 && slug[0] === "llms-index") {
    path = `/${encodeSegments(slug)}`;
  } else if (slug.length === 1 && slug[0] === "llms.txt") {
    // bare feeds resolve to the frankx-scoped feeds, like on every brand host
    path = "/llms-index/frankx";
  } else if (slug.length === 1 && slug[0] === "llms-full.txt") {
    path = "/llms-full.mdx/frankx";
  } else {
    const body = pageSlug(slug);
    if (body.length === 0) {
      path = "/frankx/intro";
    } else if (body[body.length - 1].endsWith(".md")) {
      // .md suffix negotiation: the platform exposes page markdown only under
      // /llms.mdx/<brand>/.../content.md (its own suffix handling runs on
      // brand hosts, not on the deployment origin this proxy fetches).
      const page = body.map((s) => s.replace(/\.md$/, "")).join("/");
      path = `/llms.mdx/frankx/${page}/content.md`;
    } else {
      path = `/frankx/${encodeSegments(body)}`;
    }
  }

  const upstream = new URL(path, DOCS_ORIGIN);
  request.nextUrl.searchParams.forEach((value, key) => {
    upstream.searchParams.set(key, value);
  });
  if (slug?.[0] === "api" && slug[1] === "search") {
    upstream.searchParams.set("brand", "frankx");
  }
  return upstream;
}

function buildUpstreamHeaders(request: NextRequest): Headers {
  const headers = new Headers();
  for (const name of UPSTREAM_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
}

// Match "/path/ or '/path/ where the quote may carry JSON-style escaping
// (up to one backslash) — but only when the quote sits DIRECTLY before the
// slash, so absolute URLs and composite paths are never touched.
const FRANKX_RE = /(?<=\\?["'])\/frankx\//g;
const NEXT_ASSETS_RE = /(?<=\\?["'])\/_next\//g;
const FRANKX_LLMS_RE = /(?<=\\?["'])\/llms\.mdx\/frankx\//g;
const FRANKX_LLMS_INDEX_RE = /(?<=\\?["'])\/llms-index\/frankx/g;

function rewriteForProxyHost(text: string): string {
  return text
    .replaceAll(FRANKX_RE, "/docs/")
    .replaceAll(NEXT_ASSETS_RE, `${DOCS_ORIGIN}/_next/`)
    .replaceAll(FRANKX_LLMS_RE, `${DOCS_ORIGIN}/llms.mdx/frankx/`)
    .replaceAll(FRANKX_LLMS_INDEX_RE, `${DOCS_ORIGIN}/llms-index/frankx`);
}

// Mirrors the upstream platform's negotiation: markdown only wins when the
// client prefers it over HTML (fumadocs isMarkdownPreferred semantics).
function isMarkdownPreferred(request: NextRequest): boolean {
  const accept = request.headers.get("accept");
  if (!accept) return false;
  const weight = (type: string): number | null => {
    for (const part of accept.split(",")) {
      const [media, ...params] = part.trim().split(";");
      if (media.trim() === type) {
        for (const param of params) {
          const [key, value] = param.trim().split("=");
          if (key === "q") return Number(value ?? "1");
        }
        return 1;
      }
    }
    return null;
  };
  const markdown = weight("text/markdown");
  if (markdown === null) return false;
  const html = weight("text/html");
  return html === null || markdown > html;
}

function forwardHeaders(upstream: Response): Headers {
  const headers = new Headers();
  const contentType = upstream.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  const cacheControl = upstream.headers.get("cache-control");
  if (cacheControl) headers.set("cache-control", cacheControl);
  const vary = upstream.headers.get("vary");
  if (vary) headers.set("vary", vary);
  return headers;
}

async function handle(request: NextRequest, context: RouteContext): Promise<Response> {
  const params = await context.params;
  const slug = params.slug;
  let upstreamUrl: URL;
  try {
    upstreamUrl = buildUpstreamUrl(slug, request);
  } catch (error) {
    console.error("[docs-proxy] failed to build upstream URL", slug, error);
    return new NextResponse("Bad request.", {
      status: 400,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const mdSuffix = slug?.[slug.length - 1]?.endsWith(".md") ?? false;
  const skipNegotiation =
    !slug ||
    mdSuffix ||
    slug[0] === "api" ||
    slug[0] === "llms.mdx" ||
    slug[0] === "llms-full.mdx";
  if (!skipNegotiation && isMarkdownPreferred(request)) {
    let body = pageSlug(slug);
    if (body.length === 0) body = ["intro"];
    upstreamUrl = new URL(
      `/llms.mdx/frankx/${encodeSegments(body)}/content.md`,
      DOCS_ORIGIN,
    );
  }

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: buildUpstreamHeaders(request),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    const contentType = upstream.headers.get("content-type") ?? "";
    if (contentType.includes("text/html") || contentType.startsWith("text/x-component")) {
      const text = await upstream.text();
      return new NextResponse(rewriteForProxyHost(text), {
        status: upstream.status,
        headers: forwardHeaders(upstream),
      });
    }

    // Everything else (markdown feeds, JSON search API) passes through.
    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: forwardHeaders(upstream),
    });
  } catch (error) {
    console.error("[docs-proxy] upstream fetch/read failed", upstreamUrl, error);
    return new NextResponse(
      "Docs are temporarily unavailable upstream. Try again shortly.",
      { status: 502, headers: { "content-type": "text/plain; charset=utf-8" } },
    );
  }
}

export async function GET(request: NextRequest, context: RouteContext): Promise<Response> {
  return handle(request, context);
}

export const HEAD = GET;
