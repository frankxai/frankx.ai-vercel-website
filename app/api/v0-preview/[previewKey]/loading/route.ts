import {
  getPreviewReadiness,
  isPreviewKey,
} from "@/lib/v0/preview/config"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface RouteContext {
  params: Promise<{ previewKey: string }>
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function safeReturnTo(value: string | null, previewKey: string): string {
  const prefix = `/api/v0-preview/${previewKey}/`
  if (!value) return prefix

  try {
    const base = new URL("https://preview.invalid")
    const target = new URL(value, base)
    if (target.origin !== base.origin || !target.pathname.startsWith(prefix)) {
      return prefix
    }
    return target.pathname + target.search
  } catch {
    return prefix
  }
}

export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { previewKey } = await context.params
  if (
    !isPreviewKey(previewKey) ||
    getPreviewReadiness(previewKey) !== "ready"
  ) {
    return new Response("Not found", { status: 404 })
  }

  const requestUrl = new URL(request.url)
  const returnTo = safeReturnTo(
    requestUrl.searchParams.get("returnTo"),
    previewKey,
  )
  const escapedReturnTo = escapeHtml(returnTo)
  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="refresh" content="3;url=${escapedReturnTo}">
<title>Starting preview</title>
<style>
  :root { color-scheme: dark; font-family: Inter, system-ui, sans-serif; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0a0a0b; color: #f4f4f5; }
  main { width: min(28rem, calc(100% - 3rem)); border-top: 1px solid #2a2a2e; padding-top: 1.25rem; }
  p { color: #8a8a93; line-height: 1.6; }
  a { color: #34d399; }
</style>
</head>
<body>
<main>
  <strong>Starting the read-only preview</strong>
  <p>The v0 sandbox is waking up. This frame retries automatically.</p>
  <a href="${escapedReturnTo}">Retry now</a>
</main>
</body>
</html>`

  return new Response(body, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "content-security-policy":
        "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'self'",
      "referrer-policy": "no-referrer",
      refresh: `3;url=${returnTo}`,
      "x-content-type-options": "nosniff",
    },
  })
}
