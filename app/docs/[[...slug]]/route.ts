import { NextRequest, NextResponse } from "next/server";
import {
  DOCS_ORIGIN,
  buildDocsUpstreamUrl,
  markdownNegotiatedDocsUrl,
  nextAllowedDocsUrl,
} from "@/lib/docs-proxy";

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
// being prefixed twice. Dot segments and any resolved URL outside the frankx
// prefix are rejected in lib/docs-proxy.ts before the fetch.
//
// Rewrites cover three root-relative reference classes found in the upstream
// HTML and flight payloads:
//   1. /_next/... build assets        -> absolute docs-platform URLs
//   2. "/frankx/..." internal links   -> "/docs/..."
//   3. "/llms.mdx/frankx/..." and "/llms-index/frankx" feed links -> absolute
//
// Known platform-side limitation: the upstream build's webpack runtime
// requests route chunks from its own /_next/ public path. Literal asset
// references in HTML and flight payloads are rewritten below, but fetched
// JavaScript is not, so dynamically loaded chunks still resolve against
// frankx.ai/_next/. This is resolved upstream — by serving docs at the
// domain root (docs.frankx.ai) or by an absolute assetPrefix on the
// docs-platform deployment — not by rewriting JavaScript here.
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

const UPSTREAM_REQUEST_HEADERS = [
  "accept",
  "rsc",
  "next-router-prefetch",
  "next-router-state-tree",
  "next-url",
] as const;

const UPSTREAM_TIMEOUT_MS = 20_000;

type RouteContext = { params: Promise<{ slug?: string[] }> };

const UPSTREAM_REDIRECT_HOPS = 3;

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

// Route prefixes owned by the platform — feeds, search and OG images are
// markdown/JSON/binary by construction. Markdown negotiation applies to
// document routes only (bare /docs, page slugs, brand-prefixed pages); a
// dedicated feed must never be re-targeted to a page path because of an
// Accept header.
const NON_DOCUMENT_PREFIXES = new Set([
  "api",
  "llms.mdx",
  "llms-full.mdx",
  "llms-index",
  "llms.txt",
  "llms-full.txt",
  "og",
]);

function isDocumentRoute(slug: string[] | undefined): boolean {
  if (!slug || slug.length === 0) return true; // bare /docs -> intro
  if (slug[0] === "frankx") return true; // brand-prefixed page form
  return !NON_DOCUMENT_PREFIXES.has(slug[0]);
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
    upstreamUrl = buildDocsUpstreamUrl(slug, request.nextUrl.searchParams);
    const mdSuffix = slug?.[slug.length - 1]?.endsWith(".md") ?? false;
    // .md-suffixed requests are already markdown and map through
    // buildDocsUpstreamUrl's own suffix branch; negotiation duplicates that and
    // would double-suffix the path.
    if (isDocumentRoute(slug) && !mdSuffix && isMarkdownPreferred(request)) {
      upstreamUrl = markdownNegotiatedDocsUrl(slug);
    }
  } catch (error) {
    console.error("[docs-proxy] failed to build upstream URL", slug, error);
    return new NextResponse("Bad request.", {
      status: 400,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  try {
    // The timeout budget bounds upstream connect + response start only.
    // Once headers arrive the timer is released: a streamed body such as
    // /llms-full.mdx/frankx may legitimately take longer than the budget to
    // finish transferring, and aborting after the client already received a
    // committed 200 would silently truncate the stream (the surrounding
    // catch could not replace a response that has already begun).
    const upstreamController = new AbortController();
    const timeoutTimer = setTimeout(
      () => upstreamController.abort(),
      UPSTREAM_TIMEOUT_MS,
    );
    let upstream: Response | undefined;
    try {
      const headers = buildUpstreamHeaders(request);
      // Follow same-origin redirects by hand. redirect:"follow" would accept
      // a 308/302 onto another brand or host after the prefix check passed.
      for (let hop = 0; hop < UPSTREAM_REDIRECT_HOPS; hop++) {
        upstream = await fetch(upstreamUrl, {
          headers,
          redirect: "manual",
          cache: "no-store",
          signal: upstreamController.signal,
        });
        if (upstream.status < 300 || upstream.status >= 400) break;
        const location = upstream.headers.get("location");
        await upstream.body?.cancel();
        if (!location || hop === UPSTREAM_REDIRECT_HOPS - 1) {
          throw new Error("upstream redirect was not a frankx docs path");
        }
        upstreamUrl = nextAllowedDocsUrl(upstreamUrl, location);
      }
    } finally {
      clearTimeout(timeoutTimer);
    }
    if (!upstream) {
      throw new Error("upstream fetch did not start");
    }

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
