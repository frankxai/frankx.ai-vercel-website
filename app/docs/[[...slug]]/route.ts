import { NextRequest, NextResponse } from "next/server";

// Docs proxy — serves the frankx docs under frankx.ai/docs.
//
// Upstream is the docs-platform deployment ("frankx/" path prefix selects the
// frankx brand on it). When docs.frankx.ai goes live (IONOS CNAME) it will
// serve the same pages at the root with no changes here or upstream.
//
// The upstream HTML references build assets (/‌_next/...) as root-relative
// paths belonging to the docs-platform origin, so they are rewritten to
// absolute URLs under that origin. Internal "/frankx/..." links are rewritten
// to "/docs/..." so client-side navigation stays on frankx.ai. Skipped
// assets (fonts, JS chunks, CSS) load directly from the docs-platform origin,
// so no shared /_next path collision on frankx.ai can occur.
//
// Note: the docs-platform has no in-page search UI — search is API-only — so
// only the docs API surface is exposed here.

const DOCS_ORIGIN = "https://docs-platform-nine.vercel.app";

type RouteContext = { params: Promise<{ slug?: string[] }> };

function buildUpstreamUrl(slug: string[] | undefined, request: NextRequest): URL {
  let upstreamPath: string;
  if (!slug || slug.length === 0) {
    upstreamPath = "/frankx/intro";
  } else if (slug[0] === "api" && slug[1] === "search") {
    upstreamPath = "/api/search"; // brand=frankx is set explicitly below
  } else {
    upstreamPath = `/frankx/${slug.map(encodeURIComponent).join("/")}`;
  }

  const upstream = new URL(upstreamPath, DOCS_ORIGIN);
  request.nextUrl.searchParams.forEach((value, key) => {
    upstream.searchParams.set(key, value);
  });
  if (slug?.[0] === "api" && slug[1] === "search") {
    upstream.searchParams.set("brand", "frankx");
  }
  return upstream;
}

function rewriteForProxyHost(html: string): string {
  return html
    .replaceAll("/_next/", `${DOCS_ORIGIN}/_next/`)
    .replaceAll('href="/frankx/', 'href="/docs/')
    .replaceAll("href='/frankx/", "href='/docs/");
}

function forwardHeaders(upstream: Response): HeadersInit {
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
  const upstreamUrl = buildUpstreamUrl(params.slug, request);

  const accept = request.headers.get("accept");
  const upstream = await fetch(upstreamUrl, {
    headers: accept ? { accept } : undefined,
    redirect: "follow",
  });

  const contentType = upstream.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    const html = await upstream.text();
    return new NextResponse(rewriteForProxyHost(html), {
      status: upstream.status,
      headers: forwardHeaders(upstream),
    });
  }

  // Markdown (llms / .md negotiation) and JSON (search API) pass through.
  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: forwardHeaders(upstream),
  });
}

export async function GET(request: NextRequest, context: RouteContext): Promise<Response> {
  return handle(request, context);
}

export const HEAD = GET;
